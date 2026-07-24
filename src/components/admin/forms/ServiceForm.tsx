"use client";

import { useActionState, useEffect } from "react";
import { createService, updateService } from "@/lib/actions";
import SubmitButton from "@/components/admin/SubmitButton";
import ImageInput from "@/components/admin/ImageInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ServiceForm({ initialData }: { initialData?: any }) {
  // If initialData exists, we update. Otherwise, we create.
  const actionToUse = initialData ? updateService.bind(null, initialData._id) : createService;
  const [state, formAction] = useActionState(actionToUse, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) {
      toast.success(state.success);
      router.push("/admin/services");
    }
  }, [state, router]);

  const defaultFeatures = initialData?.features ? initialData.features.join(", ") : "";

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Service Title</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={initialData?.title || ""}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="e.g. Deep Cleaning"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Description</label>
            <textarea 
              name="description" 
              rows={4} 
              defaultValue={initialData?.description || ""}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="Describe the service..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Features (comma separated)</label>
            <textarea 
              name="features" 
              rows={3} 
              defaultValue={defaultFeatures}
              required 
              placeholder="e.g. Dusting, Mopping, Sanitization..." 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
            />
          </div>
        </div>
        <div>
          <ImageInput name="imageUrl" defaultValue={initialData?.imageUrl || ""} />
        </div>
      </div>
      <div className="pt-6 border-t border-slate-800 flex justify-end">
        <SubmitButton>{initialData ? "Save Changes" : "Create Service"}</SubmitButton>
      </div>
    </form>
  );
}
