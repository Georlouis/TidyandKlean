"use client";

import { useActionState, useEffect } from "react";
import { updateSettings } from "@/lib/actions";
import SubmitButton from "@/components/admin/SubmitButton";
import toast from "react-hot-toast";

export default function SettingsForm({ initialData }: { initialData: any }) {
  const [state, formAction] = useActionState(updateSettings, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.timestamp]);

  return (
    <form action={formAction} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Counters Section */}
      <div className="bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800">
        <h2 className="text-xl font-bold text-white mb-6 font-serif">Platform Counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Cleanings Done</label>
            <input 
              type="number" 
              name="cleaningsDone" 
              defaultValue={initialData?.cleaningsDone || 5000}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Happy Clients (%)</label>
            <input 
              type="number" 
              name="happyClientsPercentage" 
              defaultValue={initialData?.happyClientsPercentage || 99}
              min="0" max="100"
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Pro Cleaners</label>
            <input 
              type="number" 
              name="proCleaners" 
              defaultValue={initialData?.proCleaners || 50}
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Average Rating (out of 5)</label>
            <input 
              type="number" 
              step="0.1"
              name="averageRating" 
              defaultValue={initialData?.averageRating || 4.9}
              min="1" max="5"
              required 
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
            />
          </div>
        </div>
      </div>

      {/* Social URLs Section */}
      <div className="bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800">
        <h2 className="text-xl font-bold text-white mb-6 font-serif">Social Media URLs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Facebook URL</label>
            <input 
              type="url" 
              name="facebookUrl" 
              defaultValue={initialData?.facebookUrl || ""}
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Twitter / X URL</label>
            <input 
              type="url" 
              name="twitterUrl" 
              defaultValue={initialData?.twitterUrl || ""}
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="https://twitter.com/yourhandle"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Instagram URL</label>
            <input 
              type="url" 
              name="instagramUrl" 
              defaultValue={initialData?.instagramUrl || ""}
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="https://instagram.com/yourprofile"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">LinkedIn URL</label>
            <input 
              type="url" 
              name="linkedinUrl" 
              defaultValue={initialData?.linkedinUrl || ""}
              className="block w-full border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 px-4 bg-slate-900 text-white placeholder-slate-500 transition-colors" 
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>
        </div>
      </div>
      
      {state?.error && <p className="text-rose-500 text-sm font-bold bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{state.error}</p>}
      
      <div className="flex justify-end pt-4">
        <SubmitButton>Save Settings</SubmitButton>
      </div>
    </form>
  );
}
