import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: { type: [String], required: true },
  imageUrl: { type: String, required: true },
});

// Check if the model exists before compiling it
const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
