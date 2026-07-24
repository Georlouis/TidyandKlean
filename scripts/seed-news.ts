import { config } from "dotenv";
config({ path: ".env.local" });
import mongoose from "mongoose";
import News from "../src/models/News";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tidyandklean";

const seedData = {
  title: "The Ultimate Guide to Deep Cleaning Your Kitchen",
  slug: "ultimate-guide-deep-cleaning-kitchen",
  category: "Tips & Tricks",
  date: new Date().toISOString().split('T')[0],
  excerpt: "A clean kitchen is the heart of a healthy home. Learn our professional secrets to tackling grease, sanitizing surfaces, and organizing your space efficiently.",
  imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=80",
  content: `
    <h2>Why a Deep Clean Matters</h2>
    <p>The kitchen is often the busiest room in the house. Between cooking meals, entertaining guests, and grabbing midnight snacks, it accumulates grease, crumbs, and bacteria faster than any other area. A surface wipe-down is great for daily maintenance, but a deep clean ensures your environment remains truly hygienic.</p>
    
    <p><img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" alt="Clean Kitchen Sink" /></p>
    
    <h3>1. Start with the High Surfaces</h3>
    <ul>
      <li><strong>Dust the top of cabinets:</strong> Grease and dust mix to form a sticky residue. Use a degreaser.</li>
      <li><strong>Clean light fixtures:</strong> Remove glass domes and wash them in soapy water.</li>
      <li><strong>Wipe down exhaust hoods:</strong> Don't forget to clean or replace the filters!</li>
    </ul>

    <h3>2. Tackle the Appliances</h3>
    <p>Appliances do the heavy lifting in your kitchen, and they need love too.</p>
    <ul>
      <li><em>The Microwave:</em> Heat a bowl of water with lemon slices for 3 minutes. The steam will loosen stuck-on food, making it easy to wipe away.</li>
      <li><em>The Oven:</em> Avoid harsh chemicals if possible. A paste of baking soda and water left overnight works wonders on baked-on grease.</li>
      <li><em>The Refrigerator:</em> Empty everything out. Wash the drawers in the sink and wipe down shelves with a food-safe cleaner (like vinegar and water).</li>
    </ul>

    <blockquote>
      "The secret to a spotless kitchen isn't cleaning harder, it's cleaning smarter. Let your products sit for 5 minutes before wiping." - <strong>Tidy & Klean Pro Team</strong>
    </blockquote>

    <h3>3. Sink and Counters</h3>
    <p>Sanitize your sink! It often harbors more bacteria than a toilet seat. Use a mild abrasive like Bar Keepers Friend for stainless steel sinks to make them shine. For counters, ensure you are using a cleaner appropriate for your stone (avoid acidic cleaners on marble or granite).</p>
    
    <h2>Need Help?</h2>
    <p>Deep cleaning is time-consuming. If you'd rather spend your weekend relaxing in Florida instead of scrubbing grout, <a href="/contact">contact Tidy & Klean</a>. Our professional deep cleaning service handles all of this and more.</p>
  `
};

async function seedNews() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Remove existing if it matches slug to avoid duplicates
    await News.deleteOne({ slug: seedData.slug });
    
    await News.create(seedData);
    
    console.log("✅ Pro News Article seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding news:", error);
    process.exit(1);
  }
}

seedNews();
