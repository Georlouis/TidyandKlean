import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Tidy & Klean",
  description: "Privacy Policy for Tidy & Klean Cleaning Service LLC.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-brand-blue hover:text-brand-magenta transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-lg prose-blue max-w-none text-gray-700">
          <p>
            At <strong>Tidy & Klean Cleaning Service LLC</strong>, accessible from tidyandklean.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Tidy & Klean and how we use it.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Contact Information:</strong> Name, email address, phone number, and service address.</li>
            <li><strong>Service Details:</strong> Information regarding your property size, cleaning requirements, and scheduling preferences.</li>
            <li><strong>Usage Data:</strong> Information on how the website is accessed and used (e.g., IP address, browser type).</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Provide, operate, and maintain our website and cleaning services.</li>
            <li>Improve, personalize, and expand our website.</li>
            <li>Understand and analyze how you use our website.</li>
            <li>Communicate with you for customer service, updates, and marketing (if opted in).</li>
            <li>Process transactions and send related information, including confirmations and invoices.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Log Files and Cookies</h2>
          <p>
            Tidy & Klean Cleaning Service LLC follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Third-Party Privacy Policies</h2>
          <p>
            Tidy & Klean Cleaning Service LLC&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. CCPA & GDPR Data Protection Rights</h2>
          <p>
            Depending on your location, you may have the right to request copies of your personal data, request that we correct any information you believe is inaccurate, or request that we erase your personal data, under certain conditions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Contact Us</h2>
          <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us:</p>
          <div className="bg-gray-50 p-6 rounded-2xl mt-6 border border-gray-100">
            <p className="font-semibold text-gray-900">Tidy & Klean Cleaning Service LLC</p>
            <p>14 Windham Av. Se.</p>
            <p>Fort Walton Beach, FL</p>
            <p className="mt-2"><strong>Email:</strong> info@tidyandklean.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
