import mongoose from 'mongoose';

const MONGODB_URI = import.meta.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable');
}

// ── URI helper — always targets the YSC database ────────────────────────────
function getURI(): string {
  const uri = MONGODB_URI;
  if (uri.includes('/YSC')) return uri;
  if (uri.includes('?'))    return uri.replace('?', '/YSC?');
  return uri.endsWith('/') ? `${uri}YSC` : `${uri}/YSC`;
}

// ── Connection cache (survives hot-reloads in dev) ───────────────────────────
// We store the promise on the mongoose connection object itself so it
// persists across module re-imports in the same Node process.
interface MongooseCache {
  promise: Promise<typeof mongoose> | null;
  conn:    typeof mongoose | null;
}

// @ts-ignore — attach to global so it survives HMR
const cache: MongooseCache = (global as any).__mongooseCache ?? { promise: null, conn: null };
// @ts-ignore
(global as any).__mongooseCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  // Already connected — return immediately
  if (cache.conn) return cache.conn;

  // Connection in progress — wait for it
  if (!cache.promise) {
    cache.promise = mongoose.connect(getURI(), {
      bufferCommands: false,  // fail fast instead of buffering if not connected
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}