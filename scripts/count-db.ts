import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Service from '../src/models/Service';
import Partner from '../src/models/Partner';
import HomeStat from '../src/models/HomeStat';
import Testimonial from '../src/models/Testimonial';

dotenv.config({ path: '.env.local' });

async function checkDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("No MONGODB_URI");
    return;
  }
  
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
    console.log("Connected. Counting documents...");
    
    const services = await Service.countDocuments();
    const partners = await Partner.countDocuments();
    const stats = await HomeStat.countDocuments();
    const testimonials = await Testimonial.countDocuments();
    
    console.log(`Services: ${services}`);
    console.log(`Partners: ${partners}`);
    console.log(`Stats: ${stats}`);
    console.log(`Testimonials: ${testimonials}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed:", error);
  }
}

checkDb();
