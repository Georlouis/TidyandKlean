"use client";

import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import CTATracker from '@/components/CTATracker';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Deep Cleaning (Recommended)");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("access_key", "b930c82d-1bd0-4425-86c1-f9d183204403");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("service", service);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setService("Deep Cleaning (Recommended)");
        setMessage("");
      } else {
        console.error("Error submitting form:", data);
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Ultra-Premium Split Screen Hero */}
      <div className="flex flex-col lg:flex-row min-h-[90vh]">
        
        {/* Left Side: Image & Trust Signals */}
        <div className="lg:w-5/12 relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-gray-900">
          <Image 
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury spotless interior"
            fill
            className="object-cover absolute inset-0 z-0 opacity-80"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-brand-blue/30 z-10"></div>
          
          <div className="relative z-20 mt-20">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-6 tracking-wide uppercase">
              VIP Client Support
            </div>
            <h1 className="text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Let&apos;s create<br/>your <span className="text-brand-light">perfect</span><br/>environment.
            </h1>
            <p className="text-xl text-gray-300 font-light leading-relaxed max-w-md">
              Whether you need a one-time deep clean or recurring maintenance, our experts are ready to exceed your expectations.
            </p>
          </div>

          <div className="relative z-20 space-y-4 mb-10">
            {/* Address Card */}
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg border border-white/10 p-5 rounded-2xl w-full max-w-md transform hover:translate-x-2 transition-transform duration-300 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-brand-light/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-brand-light" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Headquarters</p>
                <p className="text-lg text-white font-bold leading-tight">Tidy & Klean Cleaning Service LLC<br/>Fort Walton Beach, FL</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg border border-white/10 p-5 rounded-2xl w-full max-w-md transform hover:translate-x-2 transition-transform duration-300 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-brand-magenta/20 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-brand-magenta" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Email our team</p>
                <a href="mailto:info@tidyandklean.com" className="text-lg text-white font-bold hover:text-brand-magenta transition-colors">info@tidyandklean.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Glassmorphism Form */}
        <div className="lg:w-7/12 flex items-center justify-center p-6 md:p-16 lg:p-24 relative overflow-hidden bg-gray-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-magenta/10 rounded-full blur-[80px] -z-0 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[80px] -z-0 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          <div className="w-full max-w-2xl relative z-10">
            {/* Mobile Header (Only visible on small screens) */}
            <div className="lg:hidden mb-12 text-center pt-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Contact Us</h1>
              <p className="text-lg text-gray-600">Reach out for a premium cleaning experience.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400 blur-2xl opacity-20 rounded-full"></div>
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center relative z-10 border border-green-100 shadow-xl">
                      <Send className="h-10 w-10 ml-1" />
                    </div>
                  </div>
                  <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight">Request Received!</h3>
                  <p className="text-xl text-gray-500 max-w-md font-light">Thank you for reaching out to Tidy & Klean. A dedicated specialist will contact you within 24 hours.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 px-8 py-3 rounded-full bg-gray-900 text-white font-bold hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Request a Quote</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-gray-700 tracking-wide uppercase">Full Name</label>
                        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-900" placeholder="Jane Doe" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-gray-700 tracking-wide uppercase">Email Address</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-900" placeholder="jane@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="service" className="text-sm font-bold text-gray-700 tracking-wide uppercase">Service Required</label>
                      <div className="relative">
                        <select id="service" name="service" value={service} onChange={(e) => setService(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-700 appearance-none cursor-pointer">
                          <option value="Deep Cleaning (Recommended)">Deep Cleaning (Recommended)</option>
                          <option value="Vacation Rental Turnover">Vacation Rental Turnover</option>
                          <option value="Move-In / Move-Out">Move-In / Move-Out</option>
                          <option value="Standard Recurring Cleaning">Standard Recurring Cleaning</option>
                          <option value="Commercial Space">Commercial Space</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-gray-700 tracking-wide uppercase">Additional Details</label>
                      <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required className="w-full px-5 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all resize-none text-gray-900" placeholder="Tell us about the space, square footage, or any specific requirements..."></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-brand-blue to-brand-magenta text-white py-5 rounded-xl font-extrabold text-lg hover:shadow-[0_10px_20px_rgba(217,70,239,0.3)] hover:-translate-y-1 transition-all duration-300 flex justify-center items-center group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Sending Request...' : (
                        <>Send Request <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Map Section with Premium Container */}
      <div className="bg-white py-24 relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center text-brand-magenta font-bold tracking-wider uppercase mb-4 text-sm bg-brand-magenta/10 w-fit px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5 mr-2" /> Serving Florida
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Our Primary Coverage
              </h3>
            </div>
            <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
              <span className="bg-gray-100 border border-gray-200 text-gray-800 text-sm font-bold px-5 py-2.5 rounded-full shadow-sm hover:bg-gray-200 transition-colors cursor-default">Destin</span>
              <span className="bg-gray-100 border border-gray-200 text-gray-800 text-sm font-bold px-5 py-2.5 rounded-full shadow-sm hover:bg-gray-200 transition-colors cursor-default">Fort Walton Beach</span>
              <span className="bg-gray-100 border border-gray-200 text-gray-800 text-sm font-bold px-5 py-2.5 rounded-full shadow-sm hover:bg-gray-200 transition-colors cursor-default">Santa Rosa</span>
            </div>
          </div>
          
          <div className="w-full h-[500px] rounded-[2rem] overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-gray-50 group">
            <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-[1.5rem] z-10"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219760.31688649842!2d-86.72147714275089!3d30.4357371803657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88913f019036c0a5%3A0x6a19f2010c7102f1!2sDestin%2C%20FL!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{border:0, filter: "contrast(1.1) opacity(0.9)"}} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
