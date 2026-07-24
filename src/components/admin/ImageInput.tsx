"use client";

import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ImageInput({ name, defaultValue = "" }: { name: string, defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={name} className="block text-sm font-bold text-slate-300 mb-2">
          Image URL
        </label>
        <div className="relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LinkIcon className="h-5 w-5 text-slate-500" aria-hidden="true" />
          </div>
          <input
            type="url"
            name={name}
            id={name}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setImgError(false);
            }}
            className="block w-full pl-10 border border-slate-700 rounded-xl focus:ring-[#0095f6] focus:border-[#0095f6] py-3 bg-slate-900 text-white placeholder-slate-500 transition-colors"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        <p className="mt-2 text-xs text-slate-500 font-medium">
          Enter a direct link to the image. Prepared for Blob Storage migration.
        </p>
      </div>

      {url && !imgError && (
        <div className="relative h-48 w-full sm:w-2/3 lg:w-1/2 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-inner">
          <Image
            src={url}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        </div>
      )}
      {imgError && url && (
        <p className="text-sm text-rose-500 font-bold">The URL is not a valid image.</p>
      )}
    </div>
  );
}
