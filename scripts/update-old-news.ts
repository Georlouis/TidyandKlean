import { config } from "dotenv";
config({ path: ".env.local" });
import mongoose from "mongoose";
import News from "../src/models/News";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tidyandklean";

const sampleContent1 = `
  <h2>1. Stock Up on Essentials</h2>
  <p>The busy season means rapid turnovers. Make sure you have plenty of toilet paper, paper towels, and premium toiletries. Bulk buying saves money and ensures you never run out.</p>
  <h3>2. Schedule Deep Cleanings</h3>
  <p>Between guests, you only have time for a standard turnover clean. Schedule a deep clean from <strong>Tidy & Klean</strong> at the start of the season to wash windows, shampoo carpets, and clean behind appliances.</p>
  <blockquote>"A pristine Airbnb translates directly into 5-star reviews and higher booking rates."</blockquote>
  <ul>
    <li>Check all linens for stains.</li>
    <li>Test all lightbulbs.</li>
    <li>Sanitize high-touch areas like remotes and doorknobs.</li>
  </ul>
`;

const sampleContent2 = `
  <h2>Spring Cleaning is More Than Just Dusting</h2>
  <p>When the weather warms up, it's time to open the windows and tackle the dirt that accumulated over the winter. Spring cleaning is a tradition for a reason!</p>
  <p><img src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80" alt="Spring Cleaning" /></p>
  <h3>Key Areas to Focus On:</h3>
  <ol>
    <li><strong>Baseboards and Crown Molding:</strong> These collect a surprising amount of dust.</li>
    <li><strong>Window Treatments:</strong> Wash curtains and wipe down blinds.</li>
    <li><strong>Upholstery:</strong> Vacuum couches and chairs thoroughly.</li>
  </ol>
`;

async function updateNews() {
  try {
    await mongoose.connect(MONGODB_URI);
    
    // Update Airbnb article
    await News.updateOne(
      { slug: "prepare-airbnb-busy-season" },
      { $set: { content: sampleContent1 } }
    );

    // Update Spring Cleaning article
    await News.updateOne(
      { slug: "5-spring-cleaning-tips" },
      { $set: { content: sampleContent2 } }
    );
    
    // Update any other placeholders
    await News.updateMany(
      { content: { $regex: /Placeholder for now/ } },
      { $set: { content: "<p>Welcome to our new and improved blog! This article is currently being updated with rich, informative content.</p>" } }
    );

    console.log("✅ Old placeholder articles updated with Rich Text HTML.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating news:", error);
    process.exit(1);
  }
}

updateNews();
