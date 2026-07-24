import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "News & Blog | Tidy & Klean",
  description: "Cleaning tips, company updates, and news from Tidy & Klean.",
};

import dbConnect from "@/lib/mongodb";
import News from "@/models/News";

export default async function NewsPage() {
  await dbConnect();
  const newsData = await News.find({}).lean();
  
  const posts = newsData.map(doc => ({
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date,
    category: doc.category,
    image: doc.imageUrl,
    slug: doc.slug
  }));
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
                <Link href={`/news/${post.slug}`} className="text-brand-blue font-semibold flex items-center hover:text-brand-light transition-colors mt-auto">
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
