"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Document } from "@/app/lib/definitions";

export default function DeleteDocumentPage() {
  const params = useParams();
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
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

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/documents/${params.documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("ドキュメントの削除に失敗しました");
      }

      router.push("/admin/documents");
    } catch (error) {
      console.error("Failed to delete document:", error);
      setError("ドキュメントの削除中にエラーが発生しました");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">ドキュメント削除</h1>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">ドキュメント削除</h1>
        <div className="bg-red-100 p-4 rounded text-red-700">
          <p>{error || "ドキュメントが見つかりません"}</p>
        </div>
        <div className="mt-4">
          <Link
            href="/admin/documents"
            className="text-blue-600 hover:underline"
          >
            ← 一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ドキュメント削除</h1>
        <Link
          href="/admin/documents"
          className="text-gray-600 hover:text-gray-900"
        >
          ← 一覧に戻る
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            削除の確認
          </h2>
          <p className="text-red-600">
            このドキュメントを削除すると、元に戻すことはできません。
            削除してもよろしいですか？
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">削除するドキュメント</h3>
          <div className="border rounded-md p-4">
            {document.headerImage && (
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={document.headerImage}
                  alt={document.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <div>
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                {document.category}
              </span>
              <h4 className="text-xl font-bold">{document.title}</h4>
              <p className="text-gray-500 text-sm mt-1">
                作成日:{" "}
                {new Date(document.createdAt).toLocaleDateString("ja-JP")}
                <br />
                更新日:{" "}
                {new Date(document.updatedAt).toLocaleDateString("ja-JP")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href="/admin/documents"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            キャンセル
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              deleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {deleting ? "削除中..." : "削除する"}
          </button>
        </div>
      </div>
    </div>
  );
}
