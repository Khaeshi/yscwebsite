import mongoose from 'mongoose';

const MONGODB_URI = import.meta.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable');
}

// Ensure the URI always targets the YSC database
function getURI(): string {
  const uri = MONGODB_URI;
  if (uri.includes('/YSC')) return uri;
  if (uri.includes('?')) {
    return uri.replace('?', '/YSC?');
  }
  return uri.endsWith('/') ? `${uri}YSC` : `${uri}/YSC`;
}

const FINAL_URI = getURI();

// Use a module-level variable instead of global for serverless compatibility
let conn: typeof mongoose | null = null;

export async function connectDB(): Promise<typeof mongoose> {
  // If already connected, reuse
  if (conn && mongoose.connection.readyState === 1) {
    return conn;
  }

  // Reset if in a bad state
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  conn = await mongoose.connect(FINAL_URI, {
    bufferCommands: false,
    dbName: 'YSC',       
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 10000,
  });

  console.log('DB connected to:', mongoose.connection.db?.databaseName);
  return conn;
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await connectDB();
    return mongoose.connection.readyState === 1;
  } catch (err) {
    console.error('Database connection failed:', err);
    return false;
  }
}