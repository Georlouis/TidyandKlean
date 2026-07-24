import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { Plus, Edit } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteService } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Manage Services | Workspace",
};

export default async function ServicesAdmin() {
  await dbConnect();
  const services = await Service.find({}).lean();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Services</h1>
          <p className="text-slate-400 text-sm mt-1">Manage the cleaning services offered on the public website.</p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="flex items-center px-5 py-2.5 bg-[#0095f6] text-white font-bold rounded-xl shadow-lg shadow-[#0095f6]/20 hover:bg-[#1877f2] transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Service
        </Link>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-xs border-b border-slate-800">
              <tr>
                <th className="px-6 py-5">Image</th>
                <th className="px-6 py-5">Service</th>
                <th className="px-6 py-5 hidden md:table-cell">Description</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {services.map((service: any) => (
                <tr key={service._id.toString()} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700">
                       <Image src={service.imageUrl} alt={service.title} fill sizes="64px" className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white">{service.title}</td>
                  <td className="px-6 py-4 text-slate-400 max-w-xs truncate hidden md:table-cell">{service.description}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/admin/services/${service._id.toString()}/edit`}
                        className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors inline-flex"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <DeleteButton id={service._id.toString()} action={deleteService} />
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500 italic">No services registered yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
