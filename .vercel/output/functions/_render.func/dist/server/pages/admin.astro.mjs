import { e as createAstro, f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from "../chunks/astro/server_DobZlz4c.mjs";
import "piccolore";
import { $ as $$AdminLayout } from "../chunks/AdminLayout_CK29TekP.mjs";
import { c as connectDB } from "../chunks/client_CKK2n-7R.mjs";
import { S as Student } from "../chunks/Student_BYlgW2Kz.mjs";
import { S as Schedule } from "../chunks/Schedule_BiCOHfXk.mjs";
import { renderers } from "../renderers.mjs";
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
const $$Astro = createAstro("https://youngstarterclub.asia");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { userId } = Astro2.locals.auth();
  if (!userId) return Astro2.redirect("/admin/login");
  let stats = { totalStudents: 0, totalPrograms: 0, totalEnrollments: 0 };
  console.log("Dashboard stats:", stats);
  try {
    stats = await getDashboardStats();
  } catch (err) {
    console.error("Failed to load dashboard stats:", err);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard | YSC Admin", "description": "Admin Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-7xl mx-auto"> <h1 class="text-3xl font-bold mb-8">Dashboard</h1> <!-- Stats Grid --> <div class="grid md:grid-cols-3 gap-6 mb-8"> <div class="bg-white rounded-lg border border-gray-200 p-6"> <div class="flex items-center justify-between mb-2"> <span class="text-gray-600 text-sm font-medium">Total Students</span> <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"> <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path> </svg> </div> </div> <p class="text-3xl font-bold text-gray-900">${stats.totalStudents}</p> <p class="text-sm text-green-600 mt-1">↑ Active</p> </div> <div class="bg-white rounded-lg border border-gray-200 p-6"> <div class="flex items-center justify-between mb-2"> <span class="text-gray-600 text-sm font-medium">Total Programs</span> <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"> <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg> </div> </div> <p class="text-3xl font-bold text-gray-900">${stats.totalPrograms}</p> <p class="text-sm text-gray-500 mt-1">Available courses</p> </div> <div class="bg-white rounded-lg border border-gray-200 p-6"> <div class="flex items-center justify-between mb-2"> <span class="text-gray-600 text-sm font-medium">Enrollments</span> <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"> <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path> </svg> </div> </div> <p class="text-3xl font-bold text-gray-900">${stats.totalEnrollments}</p> <p class="text-sm text-gray-500 mt-1">This year</p> </div> </div> <!-- Quick Actions --> <div class="bg-white rounded-lg border border-gray-200 p-6 mb-8"> <h2 class="text-xl font-bold mb-4">Quick Actions</h2> <div class="grid md:grid-cols-4 gap-4"> <a href="/admin/students" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"> <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2"> <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path> </svg> </div> <span class="text-sm font-medium">Add Student</span> </a> <a href="/admin/schedules" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"> <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2"> <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </div> <span class="text-sm font-medium">Schedules</span> </a> <a href="/admin/programs" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"> <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2"> <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg> </div> <span class="text-sm font-medium">Add Program</span> </a> <a href="/" target="_blank" class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"> <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2"> <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path> </svg> </div> <span class="text-sm font-medium">View Site</span> </a> </div> </div> <!-- Recent Activity --> <div class="bg-white rounded-lg border border-gray-200 p-6"> <h2 class="text-xl font-bold mb-4">Recent Activity</h2> <p class="text-gray-500 text-center py-8">Recent enrollments and updates will appear here</p> </div> </div> ` })}`;
}, "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/index.astro", void 0);
const $$file = "C:/Users/user/Desktop/OngoingProjects/YSCMIGRATE/yscwebsite/src/pages/admin/index.astro";
const $$url = "/admin";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  renderers
};
