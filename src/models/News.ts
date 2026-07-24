import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
}

const NewsSchema: Schema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
});

// Check if the model exists before compiling it
const News: Model<INews> = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

export default News;
