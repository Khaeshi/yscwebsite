import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import Schedule from '../../../lib/db/models/Schedule.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const schedule = await Schedule.findById(params.id)
      .populate('studentId', 'name telegramChatId phone')
      .lean();

    if (!schedule || !schedule.studentId)
       return json({ success: false, message: 'Schedule not found' }, 404);
      
    return json({ success: true, schedule });
  } catch (error) {
    return json({ success: false, message: 'Failed to fetch schedule' }, 500);
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    await connectDB();
    const body = await request.json();

    const schedule = await Schedule.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate('studentId', 'name telegramChatId phone').lean();

    if (!schedule) return json({ success: false, message: 'Schedule not found' }, 404);
    return json({ success: true, schedule });
  } catch (error) {
    return json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update schedule',
    }, 500);
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const schedule = await Schedule.findByIdAndDelete(params.id);
    if (!schedule) return json({ success: false, message: 'Schedule not found' }, 404);
    return json({ success: true, message: 'Schedule deleted' });
  } catch (error) {
    return json({ success: false, message: 'Failed to delete schedule' }, 500);
  }
};