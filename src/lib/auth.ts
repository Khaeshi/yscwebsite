import { Lucia, type Adapter, type DatabaseSession, type DatabaseUser } from 'lucia';
import { MongoClient, ObjectId } from 'mongodb';

// ── Lazy client — never connect at module load time ──────────────────────────
let _client: MongoClient | null = null;

async function getDB() {
  if (!_client) {
    // import.meta.env works in Vite SSR context (middleware, API routes, pages)
    const uri = import.meta.env.MONGODB_URI as string;
    if (!uri) throw new Error('Missing MONGODB_URI environment variable');
    _client = new MongoClient(uri);
    await _client.connect();
  }
  return _client.db('YSC');
}

const adapter: Adapter = {
  async getSessionAndUser(sessionId: string): Promise<[DatabaseSession | null, DatabaseUser | null]> {
    const db      = await getDB();
    const session = await db.collection('sessions').findOne({ _id: sessionId as any });
    if (!session) return [null, null];
    const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId as string) });
    if (!user) return [null, null];
    return [
      {
        id:        session._id as unknown as string,
        userId:    session.userId as string,
        expiresAt: session.expiresAt as Date,
        attributes: {},
      },
      {
        id: user._id.toString(),
        attributes: {
          email: user.email as string,
          role:  user.role  as string,
        },
      },
    ];
  },

  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const db       = await getDB();
    const sessions = await db.collection('sessions').find({ userId }).toArray();
    return sessions.map(s => ({
      id:        s._id as unknown as string,
      userId:    s.userId    as string,
      expiresAt: s.expiresAt as Date,
      attributes: {},
    }));
  },

  async setSession(session: DatabaseSession): Promise<void> {
    const db = await getDB();
    await db.collection('sessions').insertOne({
      _id:       session.id as any,
      userId:    session.userId,
      expiresAt: session.expiresAt,
    });
  },

  async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    const db = await getDB();
    await db.collection('sessions').updateOne(
      { _id: sessionId as any },
      { $set: { expiresAt } }
    );
  },

  async deleteSession(sessionId: string): Promise<void> {
    const db = await getDB();
    await db.collection('sessions').deleteOne({ _id: sessionId as any });
  },

  async deleteUserSessions(userId: string): Promise<void> {
    const db = await getDB();
    await db.collection('sessions').deleteMany({ userId });
  },

  async deleteExpiredSessions(): Promise<void> {
    const db = await getDB();
    await db.collection('sessions').deleteMany({ expiresAt: { $lt: new Date() } });
  },
};

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD, // Astro sets this automatically
    },
  },
  getUserAttributes: (data) => ({
    email: (data as any).email,
    role:  (data as any).role,
  }),
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      role:  string;
    };
  }
}