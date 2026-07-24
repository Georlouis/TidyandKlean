import dbConnect from "@/lib/mongodb";
import News from "@/models/News";
import { Plus, Edit } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteNews } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

export const metadata = {
  title: "Manage News | Workspace",
};

export default async function NewsAdmin() {
  await dbConnect();
  const rawNews = await News.find({}).lean();
  const newsList = rawNews.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-white tracking-tight">News & Updates</h1>
          <p className="text-slate-400 text-sm mt-1">Manage the blog posts and news shown on your website.</p>
        </div>
        <Link 
          href="/admin/news/new" 
          className="flex items-center px-5 py-2.5 bg-[#0095f6] text-white font-bold rounded-xl shadow-lg shadow-[#0095f6]/20 hover:bg-[#1877f2] transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add News
        </Link>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-xs border-b border-slate-800">
              <tr>
                <th className="px-6 py-5">Image</th>
                <th className="px-6 py-5">Title</th>
                <th className="px-6 py-5 hidden md:table-cell">Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {newsList.map((item: any) => (
                <tr key={item._id.toString()} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700">
                       <Image src={item.imageUrl} alt={item.title} fill sizes="64px" className="object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-white max-w-[200px] truncate">{item.title}</td>
                  <td className="px-6 py-4 text-slate-400 hidden md:table-cell">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link 
                        href={`/admin/news/${item._id.toString()}/edit`}
                        className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors inline-flex"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <DeleteButton id={item._id.toString()} action={deleteNews} />
                    </div>
                  </td>
                </tr>
              ))}
              {newsList.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500 italic">No news registered yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
