import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { Plus, Edit, Star } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTestimonial } from "@/lib/actions";
import Link from "next/link";

export const metadata = {
  title: "Manage Testimonials | Workspace",
};

export default async function TestimonialsAdmin() {
  await dbConnect();
  const testimonials = await Testimonial.find({}).lean();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Testimonials</h1>
          <p className="text-slate-400 text-sm mt-1">Manage what your clients are saying about your services.</p>
        </div>
        <Link 
          href="/admin/testimonials/new" 
          className="flex items-center px-5 py-2.5 bg-[#0095f6] text-white font-bold rounded-xl shadow-lg shadow-[#0095f6]/20 hover:bg-[#1877f2] transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Testimonial
        </Link>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-xs border-b border-slate-800">
              <tr>
                <th className="px-6 py-5">Author</th>
                <th className="px-6 py-5 hidden md:table-cell">Review</th>
                <th className="px-6 py-5">Rating</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {testimonials.map((item: any) => (
                <tr key={item._id.toString()} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{item.authorName}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.authorLocation}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 max-w-sm truncate hidden md:table-cell">{item.content}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-amber-400">
                      <span className="font-bold mr-1">{item.rating}</span>
                      <Star className="w-4 h-4 fill-amber-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/admin/testimonials/${item._id.toString()}/edit`}
                        className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors inline-flex"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <DeleteButton id={item._id.toString()} action={deleteTestimonial} />
                    </div>
                  </td>
                </tr>
              ))}
              {testimonials.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500 italic">No testimonials registered yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
