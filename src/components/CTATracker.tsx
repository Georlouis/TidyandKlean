"use client";

import React, { ReactNode } from "react";

interface CTATrackerProps {
  eventName: string;
  children: ReactNode;
  className?: string;
}

export default function CTATracker({ eventName, children, className = "" }: CTATrackerProps) {
  const trackConversion = async () => {
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName,
          path: window.location.pathname,
          userAgent: navigator.userAgent,
          device: /mobile/i.test(navigator.userAgent) ? "mobile" : "desktop",
          os: /windows/i.test(navigator.userAgent) ? "Windows" : /mac/i.test(navigator.userAgent) && !/iphone|ipad/i.test(navigator.userAgent) ? "macOS" : /iphone|ipad/i.test(navigator.userAgent) ? "iOS" : /android/i.test(navigator.userAgent) ? "Android" : "Unknown",
        })
      });
    } catch (e) {
      // Silently fail, analytics shouldn't break the user experience
    }
  };

  return (
    <div className={className} onClick={trackConversion}>
      {children}
    </div>
  );
}
