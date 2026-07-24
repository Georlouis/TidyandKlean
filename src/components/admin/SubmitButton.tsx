"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function SubmitButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center justify-center py-2.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgb(0,51,102,0.39)] text-sm font-bold text-white bg-brand-blue hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${className}`}
    >
      {pending && <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />}
      {children}
    </button>
  );
}
