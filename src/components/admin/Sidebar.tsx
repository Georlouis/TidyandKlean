"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquareQuote, 
  Newspaper, 
  LogOut,
  Menu,
  X,
  Users,
  LineChart,
  Settings,
  Handshake
} from "lucide-react";
import { useState } from "react";
import { handleLogout } from "@/app/admin/actions";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Analytics", href: "/admin/analytics", icon: LineChart },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Partners", href: "/admin/partners", icon: Handshake },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 w-full bg-slate-900 border-b border-slate-800 text-slate-200 z-50 p-4 flex justify-between items-center shadow-lg">
        <span className="font-bold font-serif text-lg tracking-tight">T&K Workspace</span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:text-white transition-colors">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 text-slate-300 w-72 flex flex-col z-50 transition-transform duration-300 ease-in-out shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:z-auto
      `}>
        <div className="p-8 text-center border-b border-slate-800/80 mt-14 md:mt-0">
          <Link href="/" className="inline-block group" onClick={() => setIsOpen(false)}>
             <h2 className="text-3xl font-black font-serif tracking-tighter text-white group-hover:scale-105 transition-transform">
               Tidy & <span className="text-[#0095f6]">Klean</span>
             </h2>
             <div className="mt-3 inline-flex items-center bg-slate-800/50 border border-slate-700/50 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
               Workspace Pro
             </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Menu</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-[#0095f6]/10 border border-[#0095f6]/20 text-[#0095f6] font-bold shadow-sm" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                  isActive 
                    ? "text-[#0095f6]" 
                    : "text-slate-500 group-hover:text-slate-300"
                }`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800/80">
          <button 
             onClick={() => handleLogout()}
             className="flex items-center w-full px-4 py-3 text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-all group border border-transparent hover:border-rose-500/20"
          >
             <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
             <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
