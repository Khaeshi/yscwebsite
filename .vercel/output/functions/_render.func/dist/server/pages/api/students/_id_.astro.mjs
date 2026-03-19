import { c as connectDB } from "../../../chunks/client_CIIRc5iH.mjs";
import { S as Student } from "../../../chunks/Student_B7ctikP2.mjs";
import "../../../chunks/Schedule_B2QLkfgY.mjs";
import "../../../chunks/Event_BKIXZnNN.mjs";
import "../../../chunks/Registration_DKoh7ux8.mjs";
import { r } from "../../../chunks/_@astro-renderers_BiNbQtZO.mjs";
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "Content-Type": "application/json" }
});
const GET = async ({ params }) => {
  try {
    await connectDB();
    const student = await Student.findById(params.id).lean();
    if (!student) return json({ success: false, message: "Student not found" }, 404);
    return json({ success: true, student });
  } catch (error) {
    return json({ success: false, message: "Failed to fetch student" }, 500);
  }
};
const PUT = async ({ params, request }) => {
  try {
    await connectDB();
    const body = await request.json();
    const student = await Student.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).lean();
    if (!student) return json({ success: false, message: "Student not found" }, 404);
    return json({ success: true, student });
  } catch (error) {
    return json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to update student"
    }, 500);
  }
};
const DELETE = async ({ params }) => {
  try {
    await connectDB();
    const student = await Student.findByIdAndDelete(params.id);
    if (!student) return json({ success: false, message: "Student not found" }, 404);
    return json({ success: true, message: "Student deleted" });
  } catch (error) {
    return json({ success: false, message: "Failed to delete student" }, 500);
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
