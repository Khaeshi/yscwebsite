import { c as connectDB } from "../../../chunks/client_CIIRc5iH.mjs";
import { E as Event } from "../../../chunks/Event_BKIXZnNN.mjs";
import { j as Command, k as commonParams, m as getEndpointPlugin, n as getThrow200ExceptionsPlugin, D as DeleteObject$, S as S3Client } from "../../../chunks/S3Client_BSd7K461.mjs";
import { r } from "../../../chunks/_@astro-renderers_BiNbQtZO.mjs";
class DeleteObjectCommand extends Command.classBuilder().ep({
  ...commonParams,
  Bucket: { type: "contextParams", name: "Bucket" },
  Key: { type: "contextParams", name: "Key" }
}).m(function(Command2, cs, config, o) {
  return [
    getEndpointPlugin(config, Command2.getEndpointParameterInstructions()),
    getThrow200ExceptionsPlugin(config)
  ];
}).s("AmazonS3", "DeleteObject", {}).n("S3Client", "DeleteObjectCommand").sc(DeleteObject$).build() {
}
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
const s3 = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "AKIAUT4OA2IFSSTYZZPM",
    secretAccessKey: "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"
  }
});
const GET = async ({ params }) => {
  try {
    await connectDB();
    const event = await Event.findById(params.id).lean();
    if (!event) return json({ success: false, message: "Event not found" }, 404);
    return json({ success: true, event });
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
};
const PUT = async ({ request, locals, params }) => {
  try {
    const { userId } = locals.auth();
    if (!userId) return json({ success: false, message: "Unauthorized" }, 401);
    await connectDB();
    const body = await request.json();
    const updated = await Event.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, returnDocument: "after" }
    );
    if (!updated) return json({ success: false, message: "Event not found" }, 404);
    return json({ success: true, event: updated });
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
};
const DELETE = async ({ locals, params }) => {
  try {
    const { userId } = locals.auth();
    if (!userId) return json({ success: false, message: "Unauthorized" }, 401);
    await connectDB();
    const event = await Event.findById(params.id).lean();
    if (!event) return json({ success: false, message: "Event not found" }, 404);
    if (event.coverPhotoKey) {
      await s3.send(new DeleteObjectCommand({
        Bucket: "aws-s3-ysc-admin-uploads",
        Key: event.coverPhotoKey
      })).catch(() => {
      });
    }
    await Event.findByIdAndDelete(params.id);
    return json({ success: true, message: "Event deleted" });
  } catch (err) {
    return json({ success: false, message: err.message }, 500);
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PUT
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
