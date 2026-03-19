import type { APIRoute } from 'astro';
import { MongoClient } from 'mongodb';

export const POST: APIRoute = async ({ request }) => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    const body = await request.json();

    if (!body.name) {
      return new Response(JSON.stringify({ success: false, message: 'Name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await client.connect();
    const db = client.db('YSC');
    const result = await db.collection('students').insertOne({
      name: body.name,
      phone: body.phone || '',
      email: body.email || '',
      telegramChatId: body.telegramChatId || '',
      active: body.active ?? true,
      createdAt: new Date().toISOString(),
    });

    const student = await db.collection('students').findOne({ _id: result.insertedId });

    return new Response(JSON.stringify({ success: true, student }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
};

export const GET: APIRoute = async () => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db('YSC');
    const students = await db.collection('students').find({}).sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify({ success: true, students }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
};