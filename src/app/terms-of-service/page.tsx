import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Tidy & Klean",
  description: "Terms and Conditions for Tidy & Klean Cleaning Service LLC.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-brand-blue hover:text-brand-magenta transition-colors mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Terms & Conditions</h1>
        <p className="text-gray-500 mb-12">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-lg prose-blue max-w-none text-gray-700">
          <p>
            Welcome to <strong>Tidy & Klean Cleaning Service LLC</strong>. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing this website and booking our services, we assume you accept these terms and conditions. Do not continue to use Tidy & Klean if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Services Rendered</h2>
          <p>
            Tidy & Klean Cleaning Service LLC provides professional residential and commercial cleaning services. The specific scope of work, frequency, and pricing will be agreed upon prior to the commencement of any service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Booking and Cancellations</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Scheduling:</strong> Appointments must be booked in advance and are subject to availability.</li>
            <li><strong>Cancellations:</strong> We require a minimum of 24 hours&apos; notice for cancellations. Cancellations made with less than 24 hours&apos; notice may be subject to a cancellation fee.</li>
            <li><strong>Access:</strong> Clients must ensure our team has access to the property at the scheduled time. Lockouts may incur a fee.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. 100% Satisfaction Guarantee</h2>
          <p>
            We strive for perfection. If you are not completely satisfied with our cleaning, please notify us within 24 hours of the service completion. We will return to re-clean the disputed area at no additional charge. Refunds are not issued for services rendered.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Limitation of Liability</h2>
          <p>
            While we take the utmost care while cleaning your property, accidents can happen. Tidy & Klean Cleaning Service LLC carries liability insurance. However, we are not liable for pre-existing damage or damage to improperly secured items. Please secure all valuables and fragile items prior to our arrival.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Payment Terms</h2>
          <p>
            Payment is due in full at the time of service unless otherwise arranged. We accept major credit cards and other electronic payments. Late payments may incur additional fees.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Contact Information</h2>
          <p>If you have any questions or concerns regarding our Terms & Conditions, please contact us:</p>
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
