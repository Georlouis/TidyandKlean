import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeletePartnerButton from "@/components/admin/DeletePartnerButton";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function AdminPartnersPage() {
  await dbConnect();
  const partnersData = await Partner.find({}).sort({ createdAt: -1 }).lean();
  
  // Transform to plain objects stringifying _id
  const partners = partnersData.map(doc => ({
    ...doc,
    _id: doc._id.toString()
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Partners</h1>
        <Link 
          href="/admin/partners/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Partner
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partners.map((partner) => (
              <tr key={partner._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative rounded-md overflow-hidden bg-gray-100">
                      <Image 
                        src={partner.imageUrl} 
                        alt={partner.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{partner.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link href={`/admin/partners/${partner._id}/edit`} className="text-blue-600 hover:text-blue-900 p-2">
                      <Edit className="w-5 h-5" />
                    </Link>
                    <DeletePartnerButton id={partner._id} />
                  </div>
                </td>
              </tr>
            ))}
            {partners.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  No partners found. Create your first partner!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
