"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Document } from "@/app/lib/definitions";

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("/api/documents");
        if (!response.ok) {
          throw new Error("ドキュメントの取得に失敗しました");
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        setError("ドキュメントの取得中にエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("このドキュメントを削除してもよろしいですか？")) {
      return;
    }

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("ドキュメントの削除に失敗しました");
      }

      // 成功したら一覧から削除
      setDocuments(documents.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error("Failed to delete document:", error);
      alert("ドキュメントの削除中にエラーが発生しました");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">ドキュメント管理</h1>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">ドキュメント管理</h1>
        <div className="bg-red-100 p-4 rounded text-red-700">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ドキュメント管理</h1>
        <Link
          href="/admin/documents/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          新規作成
        </Link>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">
            ドキュメントがまだありません。「新規作成」から追加してください。
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイトル
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ヘッダー画像
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  更新日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {doc.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {doc.category.split(",").map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {doc.headerImage ? (
                      <div className="h-12 w-24 relative">
                        <Image
                          src={doc.headerImage}
                          alt={doc.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">なし</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.updatedAt).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/admin/documents/${doc.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
