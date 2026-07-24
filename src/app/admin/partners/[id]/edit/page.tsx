import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import PartnerForm from "@/components/admin/forms/PartnerForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await dbConnect();
  const partnerDoc = await Partner.findById(resolvedParams.id).lean();

  if (!partnerDoc) {
    notFound();
  }

  const partner = {
    ...partnerDoc,
    _id: partnerDoc._id.toString()
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/partners" className="text-gray-500 hover:text-gray-700 flex items-center transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Partners
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Partner</h1>
        <PartnerForm initialData={partner} />
      </div>
    </div>
  );
}
