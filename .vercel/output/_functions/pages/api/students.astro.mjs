import { MongoClient } from "mongodb";
import { r } from "../../chunks/_@astro-renderers_CovX3xsv.mjs";
const client = new MongoClient("mongodb+srv://kagtabss_db_user:cktabss12212003@cluster0.hfebfep.mongodb.net/YSC?retryWrites=true&w=majority&appName=Cluster0");
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.name) {
      return new Response(JSON.stringify({ success: false, message: "Name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await client.connect();
    const db = client.db("YSC");
    const result = await db.collection("students").insertOne({
      name: body.name,
      phone: body.phone || "",
      email: body.email || "",
      telegramChatId: body.telegramChatId || "",
      active: body.active ?? true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    const student = await db.collection("students").findOne({ _id: result.insertedId });
    return new Response(JSON.stringify({ success: true, student }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const GET = async () => {
  try {
    await client.connect();
    const db = client.db("YSC");
    const students = await db.collection("students").find({}).sort({ createdAt: -1 }).toArray();
    return new Response(JSON.stringify({ success: true, students }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page,
  r as renderers
};
