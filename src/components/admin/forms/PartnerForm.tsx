"use client";

import { useActionState, useEffect } from "react";
import { createPartner, updatePartner } from "@/lib/actions";
import SubmitButton from "@/components/admin/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PartnerForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const action = initialData ? updatePartner.bind(null, initialData._id) : createPartner;
  const [state, formAction] = useActionState(action, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
      router.push("/admin/partners");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.timestamp]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input 
          type="text" 
          name="name" 
          defaultValue={initialData?.name}
          required 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Role (e.g. Strategic Partner)</label>
        <input 
          type="text" 
          name="role" 
          defaultValue={initialData?.role}
          required 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL (Cover/Logo)</label>
        <input 
          type="url" 
          name="imageUrl" 
          defaultValue={initialData?.imageUrl}
          required 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Icon Name (Lucide React)</label>
        <select 
          name="iconName"
          defaultValue={initialData?.iconName || "Building2"}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Building2">Building2</option>
          <option value="Key">Key</option>
          <option value="Home">Home</option>
          <option value="Star">Star</option>
          <option value="Landmark">Landmark</option>
          <option value="ShieldCheck">ShieldCheck</option>
        </select>
      </div>
      
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      
      <div className="flex justify-end">
        <SubmitButton>{initialData ? "Update Partner" : "Create Partner"}</SubmitButton>
      </div>
    </form>
  );
}
