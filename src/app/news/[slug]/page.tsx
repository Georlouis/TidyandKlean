import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, UserCircle2 } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import News from "@/models/News";
import HomeStat from "@/models/HomeStat";
import { notFound } from "next/navigation";
import CTATracker from "@/components/CTATracker";
import ReadingProgress from "@/components/ReadingProgress";

// Custom SVG Icons for Social Brands
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

function calculateReadTime(text: string) {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

export const dynamic = 'force-dynamic';

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  const resolvedParams = await params;
  
  const post = await News.findOne({ slug: resolvedParams.slug }).lean();
  if (!post) {
    notFound();
  }

  const settings = await HomeStat.findOne({}).lean();
  const readTime = calculateReadTime(post.content);

  return (
    <div className="bg-white min-h-screen pb-24 relative selection:bg-brand-blue/20">
      <ReadingProgress />

      {/* Hero Image Section (Magazine Style) */}
      <div className="relative h-[65vh] min-h-[500px] w-full mt-16 md:mt-20">
        <Image
          src={post.imageUrl || "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=80"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-transparent to-gray-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-4 pb-16">
          <Link href="/news" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-sm font-semibold tracking-wide uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-brand-magenta text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              {post.category}
            </span>
            <span className="flex items-center text-sm font-medium text-gray-300">
              <Calendar className="h-4 w-4 mr-1.5" />
              {post.date}
            </span>
            <span className="flex items-center text-sm font-medium text-gray-300">
              <Clock className="h-4 w-4 mr-1.5" />
              {readTime} min read
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-3xl leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col lg:flex-row gap-12 mt-12">
          
          {/* Left Sidebar (Floating Actions & Author) */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-32">
              
              {/* Author Block */}
              <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 mb-8 shadow-sm">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-light rounded-full flex items-center justify-center shadow-inner">
                    <UserCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Editorial Team</h3>
                    <p className="text-xs text-gray-500 font-medium">Tidy & Klean</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-light leading-relaxed">
                  Professional insights and expert advice from our top-tier cleaning specialists.
                </p>
              </div>

              {/* Follow Us / Social Links */}
              <div className="hidden lg:block bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                  <Share2 className="w-3 h-3 mr-2" /> Connect With Us
                </h4>
                <div className="flex flex-col space-y-3">
                  {settings?.facebookUrl && (
                    <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#1877F2] transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-[#1877F2]/10 transition-colors">
                        <FacebookIcon className="w-4 h-4" />
                      </div>
                      Facebook
                    </a>
                  )}
                  {settings?.instagramUrl && (
                    <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#E4405F] transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-[#E4405F]/10 transition-colors">
                        <InstagramIcon className="w-4 h-4" />
                      </div>
                      Instagram
                    </a>
                  )}
                  {settings?.twitterUrl && (
                    <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#1DA1F2] transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-[#1DA1F2]/10 transition-colors">
                        <TwitterIcon className="w-4 h-4" />
                      </div>
                      Twitter / X
                    </a>
                  )}
                  {settings?.linkedinUrl && (
                    <a href={settings.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#0A66C2] transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-[#0A66C2]/10 transition-colors">
                        <LinkedinIcon className="w-4 h-4" />
                      </div>
                      LinkedIn
                    </a>
                  )}

                </div>
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <CTATracker eventName={`Read News: ${post.title}`}>
            <article className="flex-1 max-w-none">
              <div 
                className="prose prose-lg md:prose-xl prose-slate max-w-none 
                  prose-p:leading-relaxed prose-p:text-gray-700
                  prose-headings:font-extrabold prose-headings:text-gray-900 prose-headings:tracking-tight
                  prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:mt-8 prose-h3:mb-4
                  prose-a:text-brand-blue hover:prose-a:text-brand-light prose-a:no-underline prose-a:border-b prose-a:border-brand-blue/30
                  prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:w-full prose-img:my-12
                  prose-blockquote:border-l-4 prose-blockquote:border-brand-magenta prose-blockquote:bg-gray-50 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-3xl prose-blockquote:not-italic prose-blockquote:text-gray-900 prose-blockquote:font-serif prose-blockquote:text-2xl
                  prose-li:marker:text-brand-blue prose-ul:space-y-2
                  
                  /* Super Pro Drop Cap for the very first paragraph */
                  first-letter:text-7xl first-letter:font-black first-letter:text-brand-blue first-letter:mr-3 first-letter:float-left first-letter:leading-none
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* End of Article CTA Block */}
              <div className="mt-20 bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-magenta/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <Sparkles className="w-12 h-12 text-brand-light mx-auto mb-6" />
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Ready to transform your space?</h3>
                  <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
                    Put these tips into practice instantly, or better yet, let our professionals handle the heavy lifting for you.
                  </p>
                  <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 bg-white hover:bg-gray-50 rounded-full transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    Get a Free Quote
                  </Link>
                </div>
              </div>
            </article>
          </CTATracker>
        </div>
      </div>
    </div>
  );
}
