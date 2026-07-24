import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Our Services | Tidy & Klean",
  description: "Explore our professional cleaning services in Florida.",
};

import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  await dbConnect();
  const servicesData = await Service.find({}).lean();
  const services = servicesData.map(doc => ({
    title: doc.title,
    description: doc.description,
    features: doc.features,
    image: doc.imageUrl
  }));
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-brand-blue text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional, reliable, and tailored cleaning solutions for every need.
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={index} className={`bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="relative h-64 md:h-full min-h-[300px] w-full md:w-1/2">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{service.title}</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {service.description}
                </p>
                <h4 className="font-semibold text-brand-blue mb-4 uppercase tracking-wider text-sm">What&apos;s included:</h4>
                <ul className="space-y-3 mb-10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle2 className="h-5 w-5 text-brand-magenta mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div>
                  <a href="/contact" className="inline-block bg-brand-light text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-blue transition-colors">
                    Request this service
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
