import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
const uri = process.env.MONGODB_URI;

async function run() {
  // Use the connection string but specifically connect without a db in the URI to drop 'test'
  const client = new MongoClient(uri!);
  try {
    await client.connect();
    
    console.log("Dropping 'test' database to free up RU/s...");
    try {
      await client.db('test').dropDatabase();
      console.log("Dropped 'test'");
    } catch(e: any) {
      console.log("Error dropping test:", e.message);
    }

    console.log("Creating 'tidyandkleandb' with shared RU...");
    const db = client.db('tidyandkleandb');
    try {
      await db.command({
        customAction: "CreateDatabase",
        offerThroughput: 1000
      });
      console.log("Database 'tidyandkleandb' created with 1000 shared RU/s!");
    } catch (e: any) {
      console.error("Custom command error:", e.message);
    }
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await client.close();
  }
}
run();
