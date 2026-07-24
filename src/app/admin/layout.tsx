import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Admin Panel | Tidy & Klean",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8 relative selection:bg-[#0095f6] selection:text-white">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <Toaster position="top-right" toastOptions={{
        className: 'font-sans font-medium',
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#f8fafc',
          border: '1px solid #334155'
        },
      }} />
    </div>
  );
}
