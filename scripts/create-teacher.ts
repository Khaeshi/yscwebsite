import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';
import { Argon2id } from 'oslo/password';

type Args = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  approved: boolean;
};

function parseBoolean(value: string | undefined, fallback = false): boolean {
  if (value == null) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'y';
}

function readArgs(): Args {
  const cliArgs = Object.fromEntries(
    process.argv.slice(2).map((entry) => {
      const [k, ...rest] = entry.split('=');
      return [k.replace(/^--/, ''), rest.join('=')];
    })
  );

  const email = (cliArgs.email || process.env.TEACHER_EMAIL || '').trim().toLowerCase();
  const password = (cliArgs.password || process.env.TEACHER_PASSWORD || '').toString();
  const name = (cliArgs.name || process.env.TEACHER_NAME || '').trim();
  const phoneRaw = (cliArgs.phone || process.env.TEACHER_PHONE || '').trim();
  const approved = parseBoolean(cliArgs.approved || process.env.TEACHER_APPROVED, false);

  if (!email || !password) {
    throw new Error(
      'Missing required inputs. Provide --email=... --password=... (or TEACHER_EMAIL/TEACHER_PASSWORD in .env).'
    );
  }

  return {
    email,
    password,
    name,
    phone: phoneRaw || undefined,
    approved,
  };
}

async function main() {
  const mongodbUri = process.env.MONGODB_URI;
  if (!mongodbUri) throw new Error('Missing MONGODB_URI in environment');

  const input = readArgs();
  const client = new MongoClient(mongodbUri);

  try {
    await client.connect();
    const users = client.db('YSC').collection('users');

    const existing = await users.findOne({ email: input.email });
    if (existing) {
      throw new Error(`User with email "${input.email}" already exists`);
    }

    const hashedPassword = await new Argon2id().hash(input.password);
    const now = new Date();

    await users.insertOne({
      _id: new ObjectId(),
      email: input.email,
      hashedPassword,
      role: 'teacher',
      name: input.name,
      phone: input.phone,
      isApproved: input.approved,
      approvedAt: input.approved ? now : null,
      approvedBy: null,
      createdAt: now,
    });

    console.log(`Teacher created: ${input.email}`);
    console.log(`Approved: ${input.approved ? 'yes' : 'no'}`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error('Failed to create teacher:', err.message);
  process.exit(1);
});

