"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/ui/navbar";
import { Document } from "@/app/lib/definitions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function DocumentDetailPage() {
  const params = useParams();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/documents/${params.documentId}`);
        if (!response.ok) {
          throw new Error("ドキュメントの取得に失敗しました");
        }
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        console.error("Failed to fetch document:", error);
        setError("ドキュメントの取得中にエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    if (params.documentId) {
      fetchDocument();
    }
  }, [params.documentId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded w-full mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !document) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
          <h1 className="text-3xl font-bold mb-6">
            ドキュメントが見つかりません
          </h1>
          <p className="mb-6">
            指定されたドキュメントIDが存在しないか、削除された可能性があります。
          </p>
          <Link href="/documents" className="text-blue-600 hover:underline">
            ドキュメント一覧に戻る
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/documents"
            className="text-blue-600 hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            ドキュメント一覧に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* ヘッダー画像 */}
          {document.headerImage && (
            <div
              className="relative w-full bg-gray-100 flex items-center justify-center p-4"
              style={{ aspectRatio: "6/4" }}
            >
              <Image
                src={document.headerImage}
                alt={document.title}
                fill
                className="object-contain p-2"
              />
            </div>
          )}

          <div className="p-6">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {document.category.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-bold">{document.title}</h1>
              <p className="text-gray-500 text-sm mt-2">
                最終更新:{" "}
                {new Date(document.updatedAt).toLocaleDateString("ja-JP")}
              </p>
            </div>

            {/* マークダウンコンテンツ */}
            <div className="prose prose-blue max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  h2: ({ ...props }) => (
                    <h2
                      className="pl-4 border-l-4 border-navy-600 relative"
                      style={{ borderColor: "#1e3a8a" }}
                      {...props}
                    />
                  ),
                }}
              >
                {document.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
