import NewsForm from "@/components/admin/forms/NewsForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit News | Workspace",
};

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const resolvedParams = await params;
  
  const item = await News.findById(resolvedParams.id).lean();
  if (!item) notFound();

  // Convert ObjectIDs to strings for Client Component passing
  const serializedItem = {
    ...item,
    _id: item._id.toString(),
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <Link href="/admin/news" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to News
        </Link>
        <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Edit News</h1>
        <p className="text-slate-400 mt-2">Update the article using the Pro Editor.</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 p-6 md:p-8">
        <NewsForm initialData={serializedItem} />
      </div>
    </div>
  );
}
