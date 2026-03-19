import type { APIRoute } from 'astro';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const json = (data: any, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

const s3 = new S3Client({
  region: import.meta.env.AWS_REGION,
  credentials: {
    accessKeyId:     import.meta.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const user = locals.user;
    if (!user) return json({ success: false, message: 'Unauthorized' }, 401);

    const formData = await request.formData();
    const file     = formData.get('file') as File | null;
    if (!file) return json({ success: false, message: 'No file provided' }, 400);

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      return json({ success: false, message: 'Only JPEG, PNG, or WebP allowed' }, 400);
    }
    if (file.size > 5 * 1024 * 1024) {
      return json({ success: false, message: 'File must be under 5MB' }, 400);
    }

    const ext    = file.type.split('/')[1];
    const key    = `events/covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(new PutObjectCommand({
      Bucket:      import.meta.env.AWS_S3_BUCKET,
      Key:         key,
      Body:        buffer,
      ContentType: file.type,
      ACL:         'public-read' as any,
    }));

    const url = `https://${import.meta.env.AWS_S3_BUCKET}.s3.${import.meta.env.AWS_REGION}.amazonaws.com/${key}`;
    return json({ success: true, url, key });
  } catch (err: any) {
    console.error('S3 upload error:', err);
    return json({ success: false, message: err.message ?? 'Upload failed' }, 500);
  }
};