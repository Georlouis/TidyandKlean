import PartnerForm from "@/components/admin/forms/PartnerForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPartnerPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/partners" className="text-gray-500 hover:text-gray-700 flex items-center transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Partners
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Partner</h1>
        <PartnerForm />
      </div>
    </div>
  );
}
