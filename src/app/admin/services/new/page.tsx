import ServiceForm from "@/components/admin/forms/ServiceForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "New Service | Workspace",
};

export default function NewServicePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <Link href="/admin/services" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Services
        </Link>
        <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Add New Service</h1>
        <p className="text-slate-400 mt-2">Fill out the details to publish a new service on the main website.</p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 p-6 md:p-8">
        <ServiceForm />
      </div>
    </div>
  );
}
