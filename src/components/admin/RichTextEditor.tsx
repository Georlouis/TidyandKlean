"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useMemo } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-slate-900 border border-slate-700 animate-pulse rounded-xl flex items-center justify-center text-slate-500">Loading Pro Editor...</div>
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  return (
    <div className="pro-editor-container">
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder || "Start writing..."}
      />
      <style jsx global>{`
        .pro-editor-container .quill {
          border: 1px solid #334155;
          border-radius: 0.75rem;
          overflow: hidden;
          background-color: #0f172a;
        }
        .pro-editor-container .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #334155;
          background-color: #1e293b;
          padding: 12px;
        }
        .pro-editor-container .ql-container.ql-snow {
          border: none;
          min-height: 250px;
          font-family: inherit;
          font-size: 1rem;
          color: #f8fafc;
        }
        .pro-editor-container .ql-editor {
          min-height: 250px;
          padding: 16px;
        }
        .pro-editor-container .ql-editor.ql-blank::before {
          color: #64748b;
          font-style: normal;
        }
        /* Toolbar icons coloring for dark theme */
        .pro-editor-container .ql-snow .ql-stroke {
          stroke: #cbd5e1;
        }
        .pro-editor-container .ql-snow .ql-fill, .pro-editor-container .ql-snow .ql-stroke.ql-fill {
          fill: #cbd5e1;
        }
        .pro-editor-container .ql-snow .ql-picker {
          color: #cbd5e1;
        }
        .pro-editor-container .ql-snow .ql-picker-options {
          background-color: #1e293b;
          border-color: #334155;
        }
      `}</style>
    </div>
  );
}
