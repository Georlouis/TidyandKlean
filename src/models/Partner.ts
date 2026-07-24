import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String, required: true },
  iconName: { type: String, required: true, default: "Building2" }, // Matches a lucide-react icon
}, { timestamps: true });

export default mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
