import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let cached = mongoose;

if (!cached) {
  cached = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw Error("Missing Mongodb url!");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "visual-lift",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
