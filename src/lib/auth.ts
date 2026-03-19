import { Lucia, type Adapter, type DatabaseSession, type DatabaseUser } from 'lucia';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
await client.connect();
const db = client.db('YSC');

const adapter: Adapter = {
  async getSessionAndUser(sessionId: string): Promise<[DatabaseSession | null, DatabaseUser | null]> {
    const session = await db.collection('sessions').findOne({ _id: sessionId as any });
    if (!session) return [null, null];
    const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId as string) });
    if (!user) return [null, null];
    return [
      {
        id: (session._id as unknown) as string,
        userId: session.userId as string,
        expiresAt: session.expiresAt as Date,
        attributes: {},
      },
      {
        id: user._id.toString(),  // toString() is cleaner for ObjectId
        attributes: {
          email: user.email as string,
          role: user.role as string,
        },
      },
    ];
  },
  async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const sessions = await db.collection('sessions').find({ userId }).toArray();
    return sessions.map(s => ({
      id: (s._id as unknown) as string,
      userId: s.userId as string,
      expiresAt: s.expiresAt as Date,
      attributes: {},
    }));
  },
  async setSession(session: DatabaseSession): Promise<void> {
    await db.collection('sessions').insertOne({
      _id: session.id as any,
      userId: session.userId,
      expiresAt: session.expiresAt,
    });
  },
  async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    await db.collection('sessions').updateOne(
      { _id: sessionId as any },
      { $set: { expiresAt } }
    );
  },
  async deleteSession(sessionId: string): Promise<void> {
    await db.collection('sessions').deleteOne({ _id: sessionId as any });
  },
  async deleteUserSessions(userId: string): Promise<void> {
    await db.collection('sessions').deleteMany({ userId });
  },
  async deleteExpiredSessions(): Promise<void> {
    await db.collection('sessions').deleteMany({ expiresAt: { $lt: new Date() } });
  },
};

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (data) => ({
    email: (data as any).email,
    role: (data as any).role,
  }),
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      role: string;
    };
  }
}