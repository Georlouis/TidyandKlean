"use server";

import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import News from "@/models/News";
import Testimonial from "@/models/Testimonial";
import HomeStat from "@/models/HomeStat";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized. Please log in.");
  }
  return session;
}

// --- SERVICES ---
const ServiceSchema = z.object({
  title: z.string().min(3, "Title must have at least 3 characters"),
  description: z.string().min(10, "Description must have at least 10 characters"),
  features: z.string().min(3, "Enter at least one feature"),
  imageUrl: z.string().url("Must be a valid URL"),
});

export async function createService(prevState: any, formData: FormData) {
  try {
    await requireAuth();
    await dbConnect();
    
    const validatedFields = ServiceSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      features: formData.get("features"),
      imageUrl: formData.get("imageUrl"),
    });

    const featuresArray = validatedFields.features.split(',').map(f => f.trim()).filter(Boolean);

    await Service.create({
      ...validatedFields,
      features: featuresArray
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    
    return { success: "Service created successfully.", timestamp: Date.now() };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: (error as any).errors[0].message };
    return { error: "An error occurred while creating the service." };
  }
}

export async function updateService(id: string, prevState: any, formData: FormData) {
  try {
    await requireAuth();
    await dbConnect();
    
    const validatedFields = ServiceSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      features: formData.get("features"),
      imageUrl: formData.get("imageUrl"),
    });

    const featuresArray = validatedFields.features.split(',').map(f => f.trim()).filter(Boolean);

    await Service.findByIdAndUpdate(id, {
      ...validatedFields,
      features: featuresArray
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    
    return { success: "Service updated successfully.", timestamp: Date.now() };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: (error as any).errors[0].message };
    return { error: "An error occurred while updating the service." };
  }
}

export async function deleteService(id: string) {
  try {
    await requireAuth();
    await dbConnect();
    await Service.findByIdAndDelete(id);
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { success: "Service deleted." };
  } catch (error) {
    return { error: "Error deleting service." };
  }
}

// --- NEWS ---
const NewsSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  excerpt: z.string().min(10, "Excerpt is too short"),
  content: z.string().min(10, "Content is too short"),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(2, "Category is required"),
  imageUrl: z.string().url("Invalid image URL"),
  slug: z.string().min(2, "Slug is required"),
});

export async function createNews(prevState: any, formData: FormData) {
  try {
    await requireAuth();
    await dbConnect();
    
    const validatedFields = NewsSchema.parse({
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      date: formData.get("date"),
      category: formData.get("category"),
      imageUrl: formData.get("imageUrl"),
      slug: formData.get("slug"),
    });

    await News.create(validatedFields);
    revalidatePath("/admin/news");
    revalidatePath("/news");
    return { success: "News created successfully.", timestamp: Date.now() };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: (error as any).errors[0].message };
    return { error: "An error occurred while creating news." };
  }
}

export async function updateNews(id: string, prevState: any, formData: FormData) {
  try {
    await requireAuth();
    await dbConnect();
    
    const validatedFields = NewsSchema.parse({
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      date: formData.get("date"),
      category: formData.get("category"),
      imageUrl: formData.get("imageUrl"),
      slug: formData.get("slug"),
    });

    await News.findByIdAndUpdate(id, validatedFields);
    revalidatePath("/admin/news");
    revalidatePath("/news");
    return { success: "News updated successfully.", timestamp: Date.now() };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: (error as any).errors[0].message };
    return { error: "An error occurred while updating news." };
  }
}

export async function deleteNews(id: string) {
  try {
    await requireAuth();
    await dbConnect();
    await News.findByIdAndDelete(id);
    revalidatePath("/admin/news");
    revalidatePath("/news");
    return { success: "News deleted." };
  } catch (error) {
    return { error: "Error deleting news." };
  }
}

// --- TESTIMONIALS ---
const TestimonialSchema = z.object({
  authorName: z.string().min(2, "Name is required"),
  authorLocation: z.string().min(2, "Location is required"),
  initials: z.string().min(1, "Initials required").max(3, "Max 3 letters"),
  content: z.string().min(5, "Content is required"),
  rating: z.coerce.number().min(1).max(5),
});

export async function createTestimonial(prevState: any, formData: FormData) {
  try {
    await requireAuth();
    await dbConnect();
    
    const validatedFields = TestimonialSchema.parse({
      authorName: formData.get("authorName"),
      authorLocation: formData.get("authorLocation"),
      initials: formData.get("initials"),
      content: formData.get("content"),
      rating: formData.get("rating"),
    });

    await Testimonial.create(validatedFields);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: "Testimonial created successfully.", timestamp: Date.now() };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: (error as any).errors[0].message };
    return { error: "An error occurred while creating testimonial." };
  }
}

export async function updateTestimonial(id: string, prevState: any, formData: FormData) {
  try {
    await requireAuth();
    await dbConnect();
    
    const validatedFields = TestimonialSchema.parse({
      authorName: formData.get("authorName"),
      authorLocation: formData.get("authorLocation"),
      initials: formData.get("initials"),
      content: formData.get("content"),
      rating: formData.get("rating"),
    });

    await Testimonial.findByIdAndUpdate(id, validatedFields);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: "Testimonial updated successfully.", timestamp: Date.now() };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: (error as any).errors[0].message };
    return { error: "An error occurred while updating testimonial." };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await requireAuth();
    await dbConnect();
    await Testimonial.findByIdAndDelete(id);
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: "Testimonial deleted." };
  } catch (error) {
    return { error: "Error deleting testimonial." };
  }
}

const SettingsSchema = z.object({
  cleaningsDone: z.coerce.number().min(0),
  happyClientsPercentage: z.coerce.number().min(0).max(100),
  proCleaners: z.coerce.number().min(0),
  averageRating: z.coerce.number().min(0).max(5),
  facebookUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  instagramUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
});

export async function updateSettings(prevState: any, formData: FormData) {
  try {
    await requireAuth();
    await dbConnect();
    
    const validatedFields = SettingsSchema.parse({
      cleaningsDone: formData.get("cleaningsDone"),
      happyClientsPercentage: formData.get("happyClientsPercentage"),
      proCleaners: formData.get("proCleaners"),
      averageRating: formData.get("averageRating"),
      facebookUrl: formData.get("facebookUrl"),
      twitterUrl: formData.get("twitterUrl"),
      instagramUrl: formData.get("instagramUrl"),
      linkedinUrl: formData.get("linkedinUrl"),
    });

    // We only have one settings document, so we can just update the first one or create it if not exists.
    let stat = await HomeStat.findOne({});
    if (!stat) {
      stat = new HomeStat(validatedFields);
      await stat.save();
    } else {
      await HomeStat.updateOne({}, validatedFields);
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/news");
    revalidatePath("/admin/settings");
    return { success: "Site Settings updated successfully.", timestamp: Date.now() };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: (error as any).errors[0].message };
    return { error: "An error occurred while updating site settings." };
  }
}
