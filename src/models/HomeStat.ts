import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IHomeStat extends Document {
  cleaningsDone: number;
  happyClientsPercentage: number;
  proCleaners: number;
  averageRating: number;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
}

const HomeStatSchema: Schema = new Schema({
  cleaningsDone: { type: Number, required: true },
  happyClientsPercentage: { type: Number, required: true },
  proCleaners: { type: Number, required: true },
  averageRating: { type: Number, required: true },
  facebookUrl: { type: String, default: 'https://facebook.com' },
  twitterUrl: { type: String, default: 'https://twitter.com' },
  instagramUrl: { type: String, default: 'https://instagram.com' },
  linkedinUrl: { type: String, default: 'https://linkedin.com' },
});

// Check if the model exists before compiling it
const HomeStat: Model<IHomeStat> = mongoose.models.HomeStat || mongoose.model<IHomeStat>('HomeStat', HomeStatSchema);

export default HomeStat;
