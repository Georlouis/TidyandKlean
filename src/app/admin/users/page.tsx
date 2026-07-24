import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { Plus, UserCog } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Manage Users | Workspace",
};

export default async function UsersAdmin() {
  await dbConnect();
  const users = await User.find({}).lean();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-white tracking-tight">System Users</h1>
          <p className="text-slate-400 text-sm mt-1">Manage administrators who have access to this workspace.</p>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl shadow-black/20 border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-xs border-b border-slate-800">
              <tr>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {users.map((item: any) => (
                <tr key={item._id.toString()} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-white flex items-center">
                    <UserCog className="w-5 h-5 mr-3 text-slate-500" />
                    {item.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center bg-[#0095f6]/10 border border-[#0095f6]/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-[0.1em] text-[#0095f6]">
                      Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date().toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-slate-500 italic">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
