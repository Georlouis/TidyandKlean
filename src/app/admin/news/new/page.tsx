import NewsForm from "@/components/admin/forms/NewsForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Publish News | Workspace",
};

export default function NewNewsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <Link href="/admin/news" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to News
        </Link>
        <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Publish News</h1>
        <p className="text-slate-400 mt-2">Write a new article or update using the Pro Editor.</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 p-6 md:p-8">
        <NewsForm />
      </div>
    </div>
  );
}
