import { config } from "dotenv";
config({ path: ".env.local" });
import mongoose from "mongoose";
import News from "../src/models/News";
import Testimonial from "../src/models/Testimonial";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tidyandklean";

async function check() {
  try {
    await mongoose.connect(MONGODB_URI);
    const news = await News.find({}).lean();
    console.log("NEWS COUNT:", news.length);
    console.log("SLUGS:", news.map(n => n.slug));
    
    const testimonials = await Testimonial.find({}).lean();
    console.log("TESTIMONIALS COUNT:", testimonials.length);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
check();
