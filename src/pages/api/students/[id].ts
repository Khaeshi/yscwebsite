// src/pages/api/students/[id].ts
import type { APIRoute } from 'astro';
import { connectDB } from '../../../lib/db/client.ts';
import { Student } from '../../../lib/db/models/index.ts';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const student = await Student.findById(params.id).lean();
    if (!student) return json({ success: false, message: 'Student not found' }, 404);
    return json({ success: true, student });
  } catch (error) {
    return json({ success: false, message: 'Failed to fetch student' }, 500);
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    await connectDB();
    const body = await request.json();

    const student = await Student.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).lean();

    if (!student) return json({ success: false, message: 'Student not found' }, 404);
    return json({ success: true, student });
  } catch (error) {
    return json({
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update student',
    }, 500);
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const student = await Student.findByIdAndDelete(params.id);
    if (!student) return json({ success: false, message: 'Student not found' }, 404);
    return json({ success: true, message: 'Student deleted' });
  } catch (error) {
    return json({ success: false, message: 'Failed to delete student' }, 500);
  }
};