import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, UserCheck, MapPin, ThumbsUp, Star } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury clean living room"
            fill
            className="object-cover"
            priority
          />
          {/* Pro Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/70 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 w-full px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 text-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-6 tracking-wide uppercase shadow-xl">
              ✨ Premium Cleaning in Florida
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Spotless Spaces, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-magenta">Stress-Free Lives</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-xl font-light leading-relaxed">
              We provide top-tier residential and commercial properties cleaning with unparalleled attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href="tel:+15551234567" className="bg-gradient-to-r from-brand-magenta to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-brand-magenta/40 hover:-translate-y-1 transition-all duration-300 flex items-center group">
                Book a Cleaning <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/services" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Counters Section */}
      <section className="bg-white border-b border-gray-100 py-12 relative z-20 -mt-10 mx-4 max-w-7xl lg:mx-auto rounded-3xl shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 text-center divide-x divide-gray-100">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-brand-blue mb-2">
              <AnimatedCounter prefix="+" end={5000} />
            </span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Cleanings Done</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-brand-magenta mb-2">
              <AnimatedCounter end={99} suffix="%" />
            </span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-brand-blue mb-2">
              <AnimatedCounter prefix="+" end={50} />
            </span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pro Cleaners</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-extrabold text-brand-magenta mb-2">
              <AnimatedCounter end={4.9} decimals={1} suffix="/5" />
            </span>
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Average Rating</span>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center text-gray-700 font-semibold text-lg">
            <ShieldCheck className="h-8 w-8 text-brand-magenta mr-3" />
            Bonded & Insured
          </div>
          <div className="flex items-center text-gray-700 font-semibold text-lg">
            <UserCheck className="h-8 w-8 text-brand-blue mr-3" />
            Background Checked
          </div>
          <div className="flex items-center text-gray-700 font-semibold text-lg">
            <ThumbsUp className="h-8 w-8 text-brand-magenta mr-3" />
            100% Satisfaction Guarantee
          </div>
        </div>
      </section>

      {/* Service Area (Local SEO) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-blue text-white rounded-[2rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(8,_112,_184,_0.25)] relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10">
            {/* Elegant glassmorphism blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-magenta/30 rounded-full blur-[80px] -z-0 translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-light/20 rounded-full blur-[60px] -z-0 -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="md:w-1/2 relative z-10 mb-10 md:mb-0">
              <div className="flex items-center text-brand-light font-bold tracking-wider uppercase mb-4 text-sm bg-brand-light/10 w-fit px-4 py-2 rounded-full border border-brand-light/20">
                <MapPin className="h-5 w-5 mr-2" /> Local Expertise
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">Proudly Serving<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-light">Florida, USA</span></h2>
              <p className="text-gray-300 text-lg mb-8 max-w-md font-light leading-relaxed">
                We bring our premium cleaning services directly to your doorstep. Covering the most beautiful and exclusive areas in the state.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full font-semibold shadow-xl text-sm tracking-wide hover:bg-white/20 transition-colors cursor-default">Destin</span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full font-semibold shadow-xl text-sm tracking-wide hover:bg-white/20 transition-colors cursor-default">Fort Walton Beach</span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full font-semibold shadow-xl text-sm tracking-wide hover:bg-white/20 transition-colors cursor-default">Santa Rosa</span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full font-semibold shadow-xl text-sm tracking-wide hover:bg-white/20 transition-colors cursor-default">30A Area</span>
              </div>
            </div>

            <div className="md:w-5/12 relative z-10">
              <div className="relative h-[400px] rounded-[1.5rem] overflow-hidden shadow-2xl border-[6px] border-white/10 rotate-2 hover:rotate-0 transition-transform duration-500 bg-white">
                <Image 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                  alt="Luxury Florida Homes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-gradient-to-r from-brand-blue/5 via-brand-magenta/5 to-brand-light/5 blur-3xl -z-10 rounded-[100%]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-4 tracking-tight">See Our Magic in Action</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl">
              Watch how our professional team transforms messy spaces into pristine sanctuaries. We take pride in our attention to detail.
            </p>
          </div>
          
          <div className="relative w-full max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] aspect-video bg-gray-900 border border-white/20 p-2 md:p-3 bg-gradient-to-br from-gray-100 to-gray-50 backdrop-blur-md group">
            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
                poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
              >
                <source src="https://cdn.coverr.co/videos/coverr-cleaning-the-house-2553/1080p.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play Button Overlay (purely decorative since it's autoplaying) */}
              <div className="absolute inset-0 bg-brand-blue/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-4 tracking-tight">Our Core Services</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl">
              Tailored cleaning solutions to meet your specific needs in Florida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
                alt="Deep Cleaning Kitchen"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full relative z-10">
                <h3 className="text-3xl font-bold text-white mb-3">Deep Cleaning</h3>
                <p className="text-gray-300 mb-6 line-clamp-2">Thorough, top-to-bottom cleaning that reaches the hidden dirt and grime in your home.</p>
                <div className="mt-auto flex justify-between items-center">
                  <Link href="/services" className="text-brand-light font-bold uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                    Learn More
                  </Link>
                  <div className="w-12 h-12 rounded-full bg-brand-magenta text-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
                alt="HSK Departure Clean Bedroom"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full relative z-10">
                <h3 className="text-3xl font-bold text-white mb-3">HSK Departure</h3>
                <p className="text-brand-light mb-6 line-clamp-2">Specialized housekeeping for vacation rentals and Airbnb turnovers. Ready for the next guest.</p>
                <div className="mt-auto flex justify-between items-center">
                  <Link href="/services" className="text-white font-bold uppercase tracking-wider text-sm transition-colors">
                    Learn More
                  </Link>
                  <div className="w-12 h-12 rounded-full bg-white text-brand-blue flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80"
                alt="Move In / Out Living Room"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full relative z-10">
                <h3 className="text-3xl font-bold text-white mb-3">Move-In / Out</h3>
                <p className="text-gray-300 mb-6 line-clamp-2">Make your transition smooth with a perfectly clean new home or leave the old one spotless.</p>
                <div className="mt-auto flex justify-between items-center">
                  <Link href="/services" className="text-brand-light font-bold uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                    Learn More
                  </Link>
                  <div className="w-12 h-12 rounded-full bg-brand-light text-gray-900 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium How it Works */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-magenta/20 rounded-full blur-[120px]"></div>
          
          {/* Subtle Grid Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-light text-sm font-semibold mb-6 tracking-widest uppercase">
              How It Works
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Frictionless Cleaning<br/>in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta to-brand-light">3 Steps</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">
              We&apos;ve engineered the process of hiring a professional cleaning service to be as effortless and luxurious as the results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-16">
            
            {/* Step 1 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 group relative shadow-2xl">
              <div className="absolute -top-10 left-10 w-20 h-20 bg-gradient-to-br from-brand-blue to-cyan-500 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-[0_10px_20px_rgba(14,165,233,0.3)] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                1
              </div>
              <div className="mt-10">
                <h3 className="text-3xl font-bold text-white mb-4">Book Online</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Select your luxury service, choose a date, and get an instant quote through our simple interface in under 60 seconds.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 group relative shadow-2xl md:mt-16">
              <div className="absolute -top-10 left-10 w-20 h-20 bg-gradient-to-br from-brand-magenta to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-[0_10px_20px_rgba(217,70,239,0.3)] transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                2
              </div>
              <div className="mt-10">
                <h3 className="text-3xl font-bold text-white mb-4">We Clean</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Our fully vetted and insured professionals arrive precisely on time to execute our rigorous cleaning protocols.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 group relative shadow-2xl md:mt-32">
              <div className="absolute -top-10 left-10 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-[0_10px_20px_rgba(52,211,153,0.3)] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                3
              </div>
              <div className="mt-10">
                <h3 className="text-3xl font-bold text-white mb-4">You Relax</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Return to a pristine environment and enjoy your free time, backed by our 100% satisfaction guarantee.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-white text-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Asymmetric Pro Image Layout */}
              <div className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 z-10">
                <Image 
                  src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80"
                  alt="Professional cleaning team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-blue rounded-[2rem] -z-10 hidden md:block"></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-magenta rounded-full -z-10 blur-xl opacity-30 hidden md:block"></div>
              
              {/* Experience Badge */}
              <div className="absolute bottom-10 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-20 flex items-center hidden md:flex animate-bounce-slow">
                <div className="text-4xl font-extrabold text-brand-blue mr-4">10+</div>
                <div className="text-sm font-bold text-gray-600 uppercase tracking-widest leading-tight">Years of<br/>Excellence</div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-sm font-semibold mb-6 tracking-wide uppercase">
                The Tidy & Klean Difference
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 tracking-tight leading-tight">Beyond Cleaning.<br/>We Curate Comfort.</h2>
              <p className="text-gray-600 mb-10 text-xl font-light leading-relaxed">
                We are more than just a cleaning company; we are your partners in maintaining a healthy, beautiful, and stress-free environment.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-brand-magenta/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-brand-magenta transition-colors duration-300">
                    <UserCheck className="h-7 w-7 text-brand-magenta group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-2 text-gray-900">Vetted Professionals</h4>
                    <p className="text-gray-500 text-lg">Our staff is fully trained, background-checked, and highly insured for your peace of mind.</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-brand-blue transition-colors duration-300">
                    <ShieldCheck className="h-7 w-7 text-brand-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-2 text-gray-900">Eco-Friendly Options</h4>
                    <p className="text-gray-500 text-lg">We offer premium green cleaning solutions safe for your pets, children, and the planet.</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-14 h-14 bg-brand-light/20 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-brand-light transition-colors duration-300">
                    <Star className="h-7 w-7 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-2 text-gray-900">Satisfaction Guaranteed</h4>
                    <p className="text-gray-500 text-lg">Not completely happy? We will return and re-clean it for free within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Post-it Style */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-4 tracking-tight">Loved by Homeowners</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl">
              Real notes from real clients. Our reputation is built on spotless results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            {/* Post-it 1 */}
            <div className="bg-[#fef08a] text-gray-800 p-8 md:p-10 shadow-[5px_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[10px_20px_30px_rgba(0,0,0,0.15)] transition-all flex flex-col h-full transform -rotate-2 hover:rotate-0 hover:-translate-y-2 relative border border-[#fde047]">
              {/* Pin design detail */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-red-400 shadow-md border border-red-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
              </div>
              
              <div className="flex items-center mb-6 mt-2">
                <div className="flex text-amber-500 mr-4">
                  <Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" />
                </div>
              </div>
              <p className="text-xl italic text-gray-800 mb-8 flex-grow font-serif leading-relaxed">
                &quot;Tidy & Klean is an absolute lifesaver. Their team was professional, on time, and left our Florida vacation home looking brand new. Highly recommended!&quot;
              </p>
              <div className="flex items-center border-t border-yellow-400 pt-4">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full mr-4 flex items-center justify-center font-bold">
                  SM
                </div>
                <div>
                  <h5 className="font-bold text-lg">Sarah Mitchell</h5>
                  <p className="text-sm font-medium text-gray-600">Orlando, FL</p>
                </div>
              </div>
              {/* Folded corner effect */}
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gray-200/50 to-transparent"></div>
            </div>

            {/* Post-it 2 */}
            <div className="bg-[#bfdbfe] text-gray-800 p-8 md:p-10 shadow-[5px_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[10px_20px_30px_rgba(0,0,0,0.15)] transition-all flex flex-col h-full transform rotate-3 hover:rotate-0 hover:-translate-y-2 relative border border-[#93c5fd] mt-4 md:mt-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 shadow-md border border-blue-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
              </div>
              <div className="flex items-center mb-6 mt-2">
                <div className="flex text-amber-500 mr-4">
                  <Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" />
                </div>
              </div>
              <p className="text-xl italic text-gray-800 mb-8 flex-grow font-serif leading-relaxed">
                &quot;I&apos;ve hired many cleaning services before, but the attention to detail from Tidy & Klean is unmatched. The deep cleaning was completely transformative.&quot;
              </p>
              <div className="flex items-center border-t border-blue-300 pt-4">
                <div className="w-12 h-12 bg-brand-blue text-white rounded-full mr-4 flex items-center justify-center font-bold">
                  JP
                </div>
                <div>
                  <h5 className="font-bold text-lg">James Peterson</h5>
                  <p className="text-sm font-medium text-gray-600">Miami, FL</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gray-200/50 to-transparent"></div>
            </div>

            {/* Post-it 3 */}
            <div className="bg-[#fbcfe8] text-gray-800 p-8 md:p-10 shadow-[5px_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[10px_20px_30px_rgba(0,0,0,0.15)] transition-all flex flex-col h-full transform -rotate-1 hover:rotate-0 hover:-translate-y-2 relative border border-[#f9a8d4] mt-2 md:mt-0">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-pink-500 shadow-md border border-pink-600 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white opacity-50"></div>
              </div>
              <div className="flex items-center mb-6 mt-2">
                <div className="flex text-amber-500 mr-4">
                  <Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" /><Star className="fill-current h-5 w-5" />
                </div>
              </div>
              <p className="text-xl italic text-gray-800 mb-8 flex-grow font-serif leading-relaxed">
                &quot;Incredible service! Booking online was super easy, and the crew that arrived was friendly and very thorough. I love the satisfaction guarantee.&quot;
              </p>
              <div className="flex items-center border-t border-pink-300 pt-4">
                <div className="w-12 h-12 bg-brand-magenta text-white rounded-full mr-4 flex items-center justify-center font-bold">
                  AR
                </div>
                <div>
                  <h5 className="font-bold text-lg">Amanda Rodriguez</h5>
                  <p className="text-sm font-medium text-gray-600">Tampa, FL</p>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gray-200/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Marquee Section */}
      <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Trusted by industry leaders & property managers</p>
        </div>
        <div className="flex space-x-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap items-center px-4 opacity-50 hover:opacity-100 transition-opacity">
          {/* We duplicate the set for seamless marquee scrolling */}
          {[1, 2, 3, 4].map((set) => (
            <div key={set} className="flex space-x-24 items-center min-w-max">
              <div className="text-3xl font-extrabold text-gray-400 font-sans">Beach Blue <span className="font-light">Properties</span></div>
              <div className="text-3xl font-bold text-gray-400 font-serif italic">Destin<span className="text-gray-300">Memories</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium CTA / Contact Us */}
      <section className="py-32 relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-gray-900 to-brand-magenta opacity-90 z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-magenta/30 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-light/20 rounded-full blur-[100px] -z-0 -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">Ready for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-white">Spotless</span> Space?</h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join hundreds of satisfied homeowners in Florida. Experience the most detailed, reliable, and premium cleaning service today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact" className="w-full sm:w-auto bg-white text-brand-blue px-10 py-5 rounded-full font-extrabold text-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group">
              Get a Free Quote <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <a href="tel:+15551234567" className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
