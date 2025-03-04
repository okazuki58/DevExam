"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="flex border-b">
        <button
          type="button"
          onClick={() => setIsPreview(false)}
          className={`px-4 py-2 text-sm font-medium ${
            !isPreview
              ? "bg-gray-100 text-gray-900"
              : "bg-white text-gray-500 hover:text-gray-700"
          }`}
        >
          編集
        </button>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
          className={`px-4 py-2 text-sm font-medium ${
            isPreview
              ? "bg-gray-100 text-gray-900"
              : "bg-white text-gray-500 hover:text-gray-700"
          }`}
        >
          プレビュー
        </button>
      </div>

      {isPreview ? (
        <div className="p-4 min-h-[400px] max-h-[600px] overflow-y-auto prose prose-blue max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
          >
            {value}
          </ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[400px] p-4 focus:outline-none focus:ring-0 border-0"
          placeholder="マークダウン形式で入力してください..."
        />
      )}

      {!isPreview && (
        <div className="bg-gray-50 p-2 border-t text-xs text-gray-500">
          マークダウン記法が使用できます。#
          見出し、**太字**、*斜体*、[リンク](URL)、`コード`、```コードブロック```など
        </div>
      )}
    </div>
  );
}
