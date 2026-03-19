import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.js';
import Event from '../../../lib/db/models/Event.js';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

const s3 = new S3Client({
  region: import.meta.env.AWS_REGION,
  credentials: {
    accessKeyId:     import.meta.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const event = await Event.findById(params.id).lean();
    if (!event) return json({ success: false, message: 'Event not found' }, 404);
    return json({ success: true, event });
  } catch (err: any) {
    return json({ success: false, message: err.message }, 500);
  }
};

export const PUT: APIRoute = async ({ request, locals, params }) => {
  try {
    const { userId } = locals.auth();
    if (!userId) return json({ success: false, message: 'Unauthorized' }, 401);

    await connectDB();
    const body    = await request.json();
    const updated = await Event.findByIdAndUpdate(
      params.id, { $set: body }, { new: true, returnDocument: 'after' }
    );
    if (!updated) return json({ success: false, message: 'Event not found' }, 404);
    return json({ success: true, event: updated });
  } catch (err: any) {
    return json({ success: false, message: err.message }, 500);
  }
};

export const DELETE: APIRoute = async ({ locals, params }) => {
  try {
    const { userId } = locals.auth();
    if (!userId) return json({ success: false, message: 'Unauthorized' }, 401);

    await connectDB();
    const event = await Event.findById(params.id).lean() as any;
    if (!event) return json({ success: false, message: 'Event not found' }, 404);

    if (event.coverPhotoKey) {
      await s3.send(new DeleteObjectCommand({
        Bucket: import.meta.env.AWS_S3_BUCKET,
        Key:    event.coverPhotoKey,
      })).catch(() => {});
    }

    await Event.findByIdAndDelete(params.id);
    return json({ success: true, message: 'Event deleted' });
  } catch (err: any) {
    return json({ success: false, message: err.message }, 500);
  }
};