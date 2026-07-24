import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String, required: true },
  iconName: { type: String, required: true, default: "Building2" },
}, { timestamps: true });

const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema);

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB...");

  // Clear existing partners to avoid duplicates on multiple runs
  await Partner.deleteMany({});
  console.log("Cleared existing partners.");

  const initialPartners = [
    { 
      name: "Destin Memories LLC", 
      role: "Property Management Partner",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      iconName: "Building2"
    },
    { 
      name: "Beach Blue Properties, LLC", 
      role: "Strategic Partner",
      imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
      iconName: "Key"
    }
  ];

  for (const p of initialPartners) {
    await Partner.create(p);
  }

  console.log(`Seeded ${initialPartners.length} partners.`);
  await mongoose.disconnect();
}

seed().catch(console.error);
