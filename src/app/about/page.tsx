import Image from "next/image";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Sparkles, Clock, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import HomeStat from "@/models/HomeStat";

export const metadata = {
  title: "About Us | Tidy & Klean",
  description: "Learn about Tidy & Klean, our mission, and how we deliver top-quality cleaning.",
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  await dbConnect();
  const statsData = await HomeStat.findOne({}).lean();
  
  const stats = statsData ? {
    cleaningsDone: statsData.cleaningsDone,
    happyClientsPercentage: statsData.happyClientsPercentage,
    proCleaners: statsData.proCleaners,
  } : {
    cleaningsDone: 5000,
    happyClientsPercentage: 100,
    proCleaners: 50,
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900">
        <Image 
          src="https://images.unsplash.com/photo-1527515637-edb9859f9de6?auto=format&fit=crop&w=1920&q=80" 
          alt="Premium cleaning service" 
          fill 
          sizes="100vw"
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-brand-light" />
            <span className="text-white text-sm font-bold tracking-widest uppercase">The Tidy & Klean Difference</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Elevating Your Space,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-white">Enriching Your Life.</span>
          </h1>
        </div>
      </section>

      {/* 2. Authority Stats Bar */}
      <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2">
              <AnimatedCounter end={10} suffix="+" />
            </div>
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Years Experience</p>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2">
              <AnimatedCounter end={stats.cleaningsDone} suffix="+" />
            </div>
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Spaces Cleaned</p>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2">
              <AnimatedCounter end={stats.happyClientsPercentage} suffix="%" />
            </div>
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Satisfaction</p>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-2">
              <AnimatedCounter end={stats.proCleaners} suffix="+" />
            </div>
            <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">Pro Cleaners</p>
          </div>
        </div>
      </section>

      {/* 3. Magazine Style "Our Mission" */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              More than just cleaning, <br/>we deliver <span className="text-brand-magenta">peace of mind.</span>
            </h2>
            <div className="space-y-6 text-xl text-gray-600 font-light leading-relaxed">
              <p>
                At Tidy & Klean, our mission is simple: to provide the highest quality cleaning services while saving our clients their most valuable asset—time. We believe that a pristine environment leads to a clear mind and a happier life.
              </p>
              <p>
                Founded in Florida, we recognized the need for a reliable, professional, and uncompromising cleaning service that caters to both discerning homeowners and elite short-term rental hosts. 
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start">
                <ShieldCheck className="w-8 h-8 text-brand-blue mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Fully Insured</h4>
                  <p className="text-sm text-gray-500 mt-1">Your property is completely protected under our premium insurance policy.</p>
                </div>
              </div>
              <div className="flex items-start">
                <HeartHandshake className="w-8 h-8 text-brand-magenta mr-4 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Trusted Staff</h4>
                  <p className="text-sm text-gray-500 mt-1">Every professional is rigorously vetted, trained, and highly experienced.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Asymmetric Image Composition */}
          <div className="relative h-[600px] w-full">
            <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white z-10 transform translate-x-4 -translate-y-4">
              <Image
                src="https://images.unsplash.com/photo-1613506132712-1f4a9b6c166b?auto=format&fit=crop&w=800&q=80"
                alt="Detailed premium cleaning"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white z-20 transform -translate-x-4 translate-y-4">
              <Image
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
                alt="Sparkling clean interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-brand-light/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* 4. How We Work - Glassmorphism Redesign */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-magenta/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">How We Work</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">A seamless, luxury experience from the moment you book until you walk into your spotless home.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-light to-brand-blue rounded-2xl flex items-center justify-center text-3xl font-black text-white mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300 -rotate-3">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Book Online</h3>
              <p className="text-gray-400 leading-relaxed">
                Select your luxury service, choose a date and time, and get an instant quote through our simple contact form or by giving our VIP team a call.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors duration-300 group transform md:translate-y-8">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-magenta to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300 rotate-3">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">We Clean</h3>
              <p className="text-gray-400 leading-relaxed">
                Our fully equipped and meticulously vetted professionals arrive precisely on time and transform your space according to our rigorous standards.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] hover:bg-white/10 transition-colors duration-300 group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300 -rotate-3">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">You Relax</h3>
              <p className="text-gray-400 leading-relaxed">
                Return to a beautifully clean and fresh environment. Enjoy your newfound free time knowing the chores are completely taken care of.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
