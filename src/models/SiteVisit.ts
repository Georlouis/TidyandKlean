import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteVisit extends Document {
  ip: string;
  country: string;
  region: string;
  city: string;
  userAgent: string;
  device: 'mobile' | 'desktop' | 'tablet';
  os: string;
  referrer: string;
  isBot: boolean;
  path: string;
  eventName?: string;
  createdAt: Date;
}

const SiteVisitSchema = new Schema({
  ip: { type: String, required: true },
  country: { type: String, default: 'Unknown' },
  region: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' },
  userAgent: { type: String, required: true },
  device: { type: String, enum: ['mobile', 'desktop', 'tablet'], default: 'desktop' },
  os: { type: String, default: 'Unknown' },
  referrer: { type: String, default: 'Direct' },
  isBot: { type: Boolean, default: false },
  path: { type: String, required: true },
  eventName: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 90 } // Automatically delete after 90 days
});

export default mongoose.models.SiteVisit || mongoose.model<ISiteVisit>('SiteVisit', SiteVisitSchema);
