// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Helpful for TypeScript + serverless (avoid creating many connections)
declare global {
    // eslint-disable-next-line no-var
    var _mongoose: {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
    } | undefined;
}

let cached = global._mongoose;

if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<mongoose.Mongoose> {
    if (cached!.conn) {
        return cached!.conn!;
    }

    if (!cached!.promise) {
        const opts = {
            // These are default in recent mongoose but explicit is fine
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // You can set dbName here if preferred: dbName: 'project-tracker'
        };

        cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((m) => {
            return m;
        });
    }

    cached!.conn = await cached!.promise;
    return cached!.conn!;
}
