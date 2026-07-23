import Link from "next/link";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="block mb-6">
              <span className="text-3xl font-extrabold text-white tracking-tighter leading-none block">
                Tidy<span className="text-brand-magenta">&</span>Klean
              </span>
              <span className="text-[0.65rem] font-bold tracking-[0.2em] text-gray-400 uppercase mt-1 block">
                Cleaning Service LLC
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Professional cleaning services in Florida. We deliver top-quality results to keep your spaces spotless and fresh.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-brand-light transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-brand-light transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-brand-light transition-colors"><Globe className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-light">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/partners" className="text-gray-400 hover:text-white transition-colors">Partners</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors">News</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-light">Our Services</h3>
            <ul className="space-y-4">
              <li className="text-gray-400">Deep Clean</li>
              <li className="text-gray-400">HSK Departure Clean</li>
              <li className="text-gray-400">Move-In / Move-Out</li>
              <li className="text-gray-400">Standard Cleaning</li>
              <li className="text-gray-400">Office Cleaning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brand-light">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-magenta mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Fort Walton Beach, FL</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-magenta mr-3 flex-shrink-0" />
                <a href="mailto:info@tidyandklean.com" className="text-gray-400 hover:text-white transition-colors">info@tidyandklean.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Tidy & Klean Cleaning Service LLC. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 space-x-6 text-sm">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
