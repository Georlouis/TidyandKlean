"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeleteButton({ id, action }: { id: string, action: (id: string) => Promise<{success?: string, error?: string}> }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;
    
    setIsDeleting(true);
    const result = await action(id);
    setIsDeleting(false);
    
    if (result?.error) toast.error(result.error);
    else if (result?.success) toast.success(result.success);
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-rose-500 hover:text-rose-400 p-2 rounded-lg hover:bg-rose-500/10 transition-colors disabled:opacity-50 inline-flex"
      title="Delete"
    >
      {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
    </button>
  );
}
