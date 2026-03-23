import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';
import { Argon2id } from 'oslo/password';

console.log('Connecting to:', process.env.MONGODB_URI?.slice(0, 30) + '...');

const client = new MongoClient(process.env.MONGODB_URI!);

try {
  await client.connect();
  console.log('Connected!');

  const hashedPassword = await new Argon2id().hash('Matthew77*');

  await client.db('YSC').collection('users').insertOne({
    _id: new ObjectId(),
    email: 'youngstarterclub@gmail.com ',
    hashedPassword,
    role: 'admin',
    createdAt: new Date(),
  });

  console.log('Admin user created successfully');
} catch (err) {
  console.error('Error:', err);
} finally {
  await client.close();
}