import { c as connectDB } from "../../chunks/client_CagqtE4a.mjs";
import { S as Student } from "../../chunks/Student_5CRQLq8X.mjs";
import { S as Schedule } from "../../chunks/Schedule_DLJUnlVr.mjs";
import { r } from "../../chunks/_@astro-renderers_B4KjVBz-.mjs";
async function getDashboardStats() {
  await connectDB();
  const [totalStudents, totalSchedules, activeSchedules] = await Promise.all([
    Student.countDocuments({ active: true }),
    Schedule.countDocuments(),
    Schedule.countDocuments({ active: true })
  ]);
  return {
    totalStudents,
    totalPrograms: 0,
    // add a Program model later
    totalEnrollments: totalSchedules,
    activeSchedules
  };
}
const GET = async () => {
  await connectDB();
  const stats = await getDashboardStats();
  return new Response(JSON.stringify({ success: true, ...stats }), {
    headers: { "Content-Type": "application/json" }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
