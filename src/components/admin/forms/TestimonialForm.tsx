"use client";

import { useActionState, useEffect } from "react";
import { createTestimonial, updateTestimonial } from "@/lib/actions";
import SubmitButton from "@/components/admin/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function TestimonialForm({ initialData }: { initialData?: any }) {
  const actionToUse = initialData ? updateTestimonial.bind(null, initialData._id) : createTestimonial;
  const [state, formAction] = useActionState(actionToUse, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) {
      toast.success(state.success);
      router.push("/admin/testimonials");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Author Name</label>
            <input 
              type="text" 
              name="authorName" 
              defaultValue={initialData?.authorName || ""}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="e.g. John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Author Location</label>
            <input 
              type="text" 
              name="authorLocation" 
              defaultValue={initialData?.authorLocation || ""}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="e.g. Miami, FL"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-bold text-slate-300 mb-2">Initials</label>
               <input 
                 type="text" 
                 name="initials" 
                 defaultValue={initialData?.initials || ""}
                 required
                 maxLength={3}
                 className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors uppercase" 
                 placeholder="e.g. JD"
               />
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-300 mb-2">Rating (1-5)</label>
               <input 
                 type="number" 
                 name="rating" 
                 min="1" max="5"
                 defaultValue={initialData?.rating || "5"}
                 required 
                 className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
               />
             </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Review Content</label>
            <textarea 
              name="content" 
              rows={5} 
              defaultValue={initialData?.content || ""}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="Write the review left by the client..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-4">Post-it Color</label>
            <div className="flex gap-4">
              {['yellow', 'blue', 'pink', 'green', 'orange'].map(color => (
                <label key={color} className="relative cursor-pointer">
                  <input 
                    type="radio" 
                    name="color" 
                    value={color} 
                    defaultChecked={initialData?.color ? initialData.color === color : color === 'yellow'} 
                    className="peer sr-only" 
                  />
                  <div className={`w-10 h-10 rounded-full border-2 border-transparent peer-checked:border-white peer-checked:scale-110 shadow-lg transition-all duration-200
                    ${color === 'yellow' ? 'bg-[#fef08a] shadow-[#fde047]/20' : 
                      color === 'blue' ? 'bg-[#bfdbfe] shadow-[#93c5fd]/20' : 
                      color === 'pink' ? 'bg-[#fbcfe8] shadow-[#f9a8d4]/20' : 
                      color === 'green' ? 'bg-[#bbf7d0] shadow-[#86efac]/20' : 
                      color === 'orange' ? 'bg-[#fed7aa] shadow-[#fdba74]/20' : ''
                    }
                  `} />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-slate-800 flex justify-end">
        <SubmitButton>{initialData ? "Save Changes" : "Add Testimonial"}</SubmitButton>
      </div>
    </form>
  );
}
