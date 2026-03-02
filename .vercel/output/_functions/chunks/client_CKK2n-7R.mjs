import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://kagtabss_db_user:cktabss12212003@cluster0.hfebfep.mongodb.net/YSC?retryWrites=true&w=majority&appName=Cluster0";
function getURI() {
  const uri = MONGODB_URI;
  if (uri.includes("/YSC")) return uri;
  if (uri.includes("?")) {
    return uri.replace("?", "/YSC?");
  }
  return uri.endsWith("/") ? `${uri}YSC` : `${uri}/YSC`;
}
const FINAL_URI = getURI();
let conn = null;
async function connectDB() {
  if (conn && mongoose.connection.readyState === 1) {
    return conn;
  }
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  conn = await mongoose.connect(FINAL_URI, {
    bufferCommands: false,
    dbName: "YSC",
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 1e4
  });
  console.log("DB connected to:", mongoose.connection.db?.databaseName);
  return conn;
}
export {
  connectDB as c
};
