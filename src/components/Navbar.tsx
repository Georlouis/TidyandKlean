"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full z-50 top-0 pt-4 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <nav className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md shadow-lg border border-gray-100 rounded-full">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex flex-col justify-center">
                <span className="text-2xl font-extrabold text-brand-blue tracking-tighter leading-none">
                  Tidy<span className="text-brand-magenta">&</span>Klean
                </span>
                <span className="text-[0.6rem] font-bold tracking-[0.2em] text-gray-500 uppercase mt-0.5">
                  Cleaning Service LLC
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/" className="text-gray-700 hover:text-brand-magenta font-semibold text-sm transition-colors">Home</Link>
              <Link href="/services" className="text-gray-700 hover:text-brand-magenta font-semibold text-sm transition-colors">Services</Link>
              <Link href="/about" className="text-gray-700 hover:text-brand-magenta font-semibold text-sm transition-colors">About Us</Link>
              <Link href="/partners" className="text-gray-700 hover:text-brand-magenta font-semibold text-sm transition-colors">Partners</Link>
              <Link href="/news" className="text-gray-700 hover:text-brand-magenta font-semibold text-sm transition-colors">News</Link>
              <Link href="/contact" className="text-gray-700 hover:text-brand-magenta font-semibold text-sm transition-colors">Contact</Link>
              <a href="tel:+1555" className="bg-gradient-to-r from-brand-blue to-brand-magenta text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-brand-magenta/30 hover:-translate-y-0.5 transition-all duration-300 text-sm">
                Get a Quote
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-brand-blue focus:outline-none p-2 rounded-full hover:bg-gray-100"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 bg-white/95 backdrop-blur-lg border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link href="/" className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-brand-magenta rounded-xl transition-colors">Home</Link>
            <Link href="/services" className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-brand-magenta rounded-xl transition-colors">Services</Link>
            <Link href="/about" className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-brand-magenta rounded-xl transition-colors">About Us</Link>
            <Link href="/partners" className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-brand-magenta rounded-xl transition-colors">Partners</Link>
            <Link href="/news" className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-brand-magenta rounded-xl transition-colors">News</Link>
            <Link href="/contact" className="block px-4 py-3 text-gray-800 font-bold hover:bg-gray-50 hover:text-brand-magenta rounded-xl transition-colors">Contact</Link>
            <div className="px-4 pt-2">
              <a href="tel:+1555" className="block w-full text-center bg-brand-blue text-white px-4 py-3 rounded-full font-bold hover:bg-brand-magenta transition-colors">
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
