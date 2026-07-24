import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  authorName: string;
  authorLocation: string;
  initials: string;
  content: string;
  rating: number;
  color: string;
}

const TestimonialSchema: Schema = new Schema({
  authorName: { type: String, required: true },
  authorLocation: { type: String, required: true },
  initials: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  color: { type: String, enum: ['yellow', 'blue', 'pink', 'green', 'orange'], default: 'yellow' },
});

// Check if the model exists before compiling it
const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
