import { config } from "dotenv";
config({ path: ".env.local" });
import mongoose from "mongoose";
import Testimonial from "../src/models/Testimonial";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tidyandklean";

const seedData = [
  {
    authorName: "Sarah Jenkins",
    authorLocation: "Destin, FL",
    initials: "SJ",
    content: "Absolutely phenomenal! The team arrived on time and completely transformed our vacation rental. I've never seen the baseboards so clean. Highly recommend for anyone in the Destin area.",
    rating: 5,
    color: "green"
  },
  {
    authorName: "Mark & Linda T.",
    authorLocation: "Destin, FL",
    initials: "ML",
    content: "We hired Tidy & Klean for a deep clean before moving into our new beachfront condo. The level of detail was unmatched. The place smelled amazing, and every surface was spotless.",
    rating: 5,
    color: "orange"
  },
  {
    authorName: "Emma Roberts",
    authorLocation: "Destin, FL",
    initials: "ER",
    content: "Our office in Destin has never looked better. Professional, discreet, and incredibly thorough. The green cleaning products they use leave a fresh scent without any harsh chemicals.",
    rating: 4,
    color: "blue"
  }
];

async function seedTestimonials() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const data of seedData) {
      await Testimonial.create(data);
    }
    
    console.log("✅ 3 Testimonials from Destin, FL seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding testimonials:", error);
    process.exit(1);
  }
}

seedTestimonials();
