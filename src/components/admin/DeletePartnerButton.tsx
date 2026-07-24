"use client";

import { useTransition } from "react";
import { deletePartner } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function DeletePartnerButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this partner?")) {
      startTransition(async () => {
        const res = await deletePartner(id);
        if (res?.error) {
          toast.error(res.error);
        } else {
          toast.success("Partner deleted.");
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 transition-colors p-2"
      title="Delete Partner"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
