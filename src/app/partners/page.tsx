import Image from "next/image";
import { Building2, Home, Landmark, Key, Star } from "lucide-react";

export const metadata = {
  title: "Our Partners | Tidy & Klean",
  description: "See the companies and clients we work with in Florida.",
};

const partners = [
  { 
    name: "Destin Memories LLC", 
    role: "Property Management Partner",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    icon: <Building2 className="w-8 h-8" />
  },
  { 
    name: "Beach Blue Properties, LLC", 
    role: "Strategic Partner",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
    icon: <Key className="w-8 h-8" />
  },
];

export default function PartnersPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dark Mode Luxury Hero */}
      <div className="bg-gray-900 text-white pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Abstract Dark Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/20 rounded-full blur-[120px] -z-0 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-magenta/10 rounded-full blur-[100px] -z-0 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-light text-sm font-semibold mb-6 tracking-widest uppercase shadow-2xl">
            Trusted by Industry Leaders
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Who We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-magenta">Work With</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            From high-end real estate agencies to premium property managers, we are the trusted partner for maintaining Florida&apos;s most exclusive spaces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 -mt-10 relative z-20">
        
        {/* Luxury Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="group relative h-[350px] rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-default border border-white/50">
              <Image 
                src={partner.image}
                alt={partner.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Glassmorphism gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-black/10"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center mb-6 transform group-hover:-translate-y-2 transition-transform duration-500 shadow-xl">
                  {partner.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{partner.name}</h3>
                <p className="text-brand-light font-semibold uppercase tracking-wider text-sm">{partner.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Testimonial Block */}
        <div className="mt-32 mb-10">
          <div className="bg-white rounded-[3rem] p-8 md:p-24 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden flex flex-col md:flex-row items-center">
            
            <div className="absolute top-0 left-0 w-64 h-64 bg-brand-light/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="md:w-1/3 mb-10 md:mb-0 relative z-10 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-gray-100 pb-10 md:pb-0 md:pr-12">
              <div className="w-24 h-24 rounded-full bg-brand-blue/10 flex items-center justify-center mb-6">
                <Home className="w-10 h-10 text-brand-blue" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Airbnb &<br/>Vacation Rentals</h4>
              <p className="text-brand-magenta font-semibold mb-6">Hosts & Property Managers</p>
              <div className="flex text-yellow-400">
                <Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" />
              </div>
            </div>

            <div className="md:w-2/3 md:pl-16 relative z-10">
              <div className="absolute -top-10 -left-10 text-[150px] text-gray-100 font-serif leading-none opacity-50 z-0">&quot;</div>
              <p className="text-2xl md:text-4xl font-serif text-gray-800 leading-tight mb-8 relative z-10 italic">
                &quot;Tidy & Klean is our absolute go-to partner for all our vacation rentals. They never miss a detail, and their standard of luxury cleaning has directly increased our five-star guest reviews.&quot;
              </p>
              <p className="text-lg font-bold text-gray-500 uppercase tracking-widest relative z-10">
                — Superhost Partner
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
