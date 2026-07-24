"use client";

import { useActionState, useEffect, useState } from "react";
import { createNews, updateNews } from "@/lib/actions";
import SubmitButton from "@/components/admin/SubmitButton";
import ImageInput from "@/components/admin/ImageInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { format } from "date-fns";

export default function NewsForm({ initialData }: { initialData?: any }) {
  const actionToUse = initialData ? updateNews.bind(null, initialData._id) : createNews;
  const [state, formAction] = useActionState(actionToUse, null);
  const router = useRouter();
  
  const [content, setContent] = useState(initialData?.content || "");
  const [slug, setSlug] = useState(initialData?.slug || "");

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) {
      toast.success(state.success);
      router.push("/admin/news");
    }
  }, [state, router]);

  const generateSlug = (title: string) => {
    if (initialData) return; // Don't auto-generate if editing
    const newSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setSlug(newSlug);
  };

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Post Title</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={initialData?.title || ""}
              onChange={(e) => generateSlug(e.target.value)}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="e.g. 10 Tips for a Cleaner Home"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Category</label>
              <input 
                type="text" 
                name="category" 
                defaultValue={initialData?.category || ""}
                required 
                className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
                placeholder="e.g. Tips & Tricks"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Publish Date</label>
              <input 
                type="date" 
                name="date" 
                defaultValue={initialData?.date || format(new Date(), "yyyy-MM-dd")}
                required 
                className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors [color-scheme:dark]" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">URL Slug</label>
            <input 
              type="text" 
              name="slug" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-slate-400 font-mono text-sm transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Short Excerpt</label>
            <textarea 
              name="excerpt" 
              rows={3} 
              defaultValue={initialData?.excerpt || ""}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="A brief summary for the news cards..."
            />
          </div>
        </div>
        <div>
          <ImageInput name="imageUrl" defaultValue={initialData?.imageUrl || ""} />
        </div>
      </div>
      
      <div className="pt-6 border-t border-slate-800">
        <label className="block text-sm font-bold text-slate-300 mb-2">Full Content (Rich Text)</label>
        <p className="text-xs text-slate-500 mb-4">Format your text, add bold, sizes, images and more. What you see is what you get.</p>
        
        {/* Hidden input to pass the rich text string to Server Action */}
        <input type="hidden" name="content" value={content} />
        
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <div className="pt-6 flex justify-end">
        <SubmitButton>{initialData ? "Save Changes" : "Publish News"}</SubmitButton>
      </div>
    </form>
  );
}
