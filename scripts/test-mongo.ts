import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function test() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("No MONGODB_URI");
    return;
  }
  
  console.log("Attempting to connect to:", uri.replace(/:([^:@]+)@/, ':***@'));
  
  try {
    const startTime = Date.now();
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
    const endTime = Date.now();
    console.log(`Connected successfully in ${endTime - startTime}ms!`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

test();
