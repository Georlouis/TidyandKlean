import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Our Services | Tidy & Klean",
  description: "Explore our professional cleaning services in Florida.",
};

const services = [
  {
    title: "Deep Cleaning",
    description: "Our deep cleaning service is a comprehensive top-to-bottom cleaning of your home or office. We reach the hidden dirt and grime that regular cleaning misses. Perfect for spring cleaning or when your space needs a fresh start.",
    features: ["Baseboards and doors", "Inside appliances (oven, fridge)", "Deep dusting of all surfaces", "Window sills and tracks"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "HSK Departure Clean",
    description: "Designed specifically for Airbnb hosts and vacation rentals. We ensure the property is perfectly prepared for the next guest with hotel-standard housekeeping, laundry turnover, and supply restocking.",
    features: ["Linens and towels washing", "Restocking toiletries", "Damage inspection reporting", "Hotel-style bed making"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Move-In / Move-Out",
    description: "Make your transition smooth. We ensure your old home is left spotless for the next occupants, or we prepare your new home to be perfectly clean and sanitized before you move in.",
    features: ["Inside all cabinets and drawers", "Wall spot cleaning", "Deep carpet vacuuming", "Full bathroom sanitization"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Standard / Recurring Cleaning",
    description: "Keep your home consistently clean with our weekly, bi-weekly, or monthly cleaning services. Enjoy a pristine environment without lifting a finger.",
    features: ["Dusting and wiping surfaces", "Floors (vacuum and mop)", "Kitchen and bathroom cleaning", "Trash removal"],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  }
];

export default function ServicesPage() {
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
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
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
