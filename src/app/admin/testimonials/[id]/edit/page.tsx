import TestimonialForm from "@/components/admin/forms/TestimonialForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Testimonial | Workspace",
};

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const resolvedParams = await params;
  
  const item = await Testimonial.findById(resolvedParams.id).lean();
  if (!item) notFound();

  // Convert ObjectIDs to strings for Client Component passing
  const serializedItem = {
    ...item,
    _id: item._id.toString(),
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <Link href="/admin/testimonials" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Testimonials
        </Link>
        <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Edit Testimonial</h1>
        <p className="text-slate-400 mt-2">Update the contents of this client review.</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 p-6 md:p-8">
        <TestimonialForm initialData={serializedItem} />
      </div>
    </div>
  );
}
