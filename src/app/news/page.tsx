import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "News & Blog | Tidy & Klean",
  description: "Cleaning tips, company updates, and news from Tidy & Klean.",
};

const posts = [
  {
    title: "5 Spring Cleaning Tips for Florida Homes",
    excerpt: "Get your home ready for the warm weather with these essential spring cleaning tips tailored for the Florida climate.",
    date: "March 15, 2026",
    category: "Tips & Tricks",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "How to Prepare Your Airbnb for the Busy Season",
    excerpt: "Maximize your five-star reviews by ensuring your property is perfectly clean and stocked before the rush.",
    date: "February 28, 2026",
    category: "Property Management",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Tidy & Klean Launches New Packages for Vacation Rentals",
    excerpt: "We are thrilled to announce new specialized cleaning packages for Airbnb and vacation rentals in the Destin and Fort Walton Beach area.",
    date: "January 10, 2026",
    category: "Company News",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  }
];

export default function NewsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-brand-blue text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The latest cleaning tips, industry insights, and company news from the Tidy & Klean team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-60">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-magenta text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  {post.date}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h2>
                <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>
                <Link href="#" className="text-brand-blue font-semibold flex items-center hover:text-brand-light transition-colors mt-auto">
                  Read article <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
