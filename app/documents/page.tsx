"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/ui/navbar";
import { Document } from "@/app/lib/definitions";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("/api/documents");
        const data = await response.json();
        setDocuments(data);

        const allTags = data.map((doc: Document) =>
          doc.category.split(",")[0].trim()
        );

        const uniqueCategories: string[] = Array.from(new Set(allTags));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // カテゴリでフィルタリングされたドキュメント
  const filteredDocuments = selectedCategory
    ? documents.filter(
        (doc) => doc.category.split(",")[0].trim() === selectedCategory
      )
    : documents;

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">ドキュメント</h1>

        {/* カテゴリフィルター */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              すべて
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ドキュメント一覧 */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">ドキュメントが見つかりませんでした</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Link
                href={`/documents/${doc.id}`}
                key={doc.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="relative w-full bg-gray-100 flex items-center justify-center p-4"
                  style={{ aspectRatio: "6/4" }}
                >
                  {doc.headerImage ? (
                    <Image
                      src={doc.headerImage}
                      alt={doc.title}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {doc.category.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {new Date(doc.updatedAt).toLocaleDateString("ja-JP")} 更新
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
