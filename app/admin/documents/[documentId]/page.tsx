"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Document } from "@/app/lib/definitions";

// マークダウンエディタをクライアントサイドのみでロード
const MarkdownEditor = dynamic(() => import("@/app/ui/document-editor"), {
  ssr: false,
});

export default function EditDocumentPage() {
  const params = useParams();
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/documents/${params.documentId}`);
        if (!response.ok) {
          throw new Error("ドキュメントの取得に失敗しました");
        }
        const data = await response.json();
        setDocument(data);
        setFormData({
          title: data.title,
          content: data.content,
          category: data.category,
        });
        if (data.headerImage) {
          setImagePreview(data.headerImage);
        }
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHeaderImage(file);

      // プレビュー用のURL生成
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // 1. 新しい画像がある場合はアップロード
      let headerImageUrl = document?.headerImage || null;
      if (headerImage) {
        const formData = new FormData();
        formData.append("file", headerImage);

        const uploadResponse = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("画像のアップロードに失敗しました");
        }

        const uploadData = await uploadResponse.json();
        headerImageUrl = uploadData.fileUrl;
      }

      // 2. ドキュメントを更新
      const response = await fetch(`/api/documents/${params.documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          headerImage: headerImageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("ドキュメントの更新に失敗しました");
      }

      // 成功したら一覧ページに戻る
      router.push("/admin/documents");
    } catch (err) {
      console.error("Failed to update document:", err);
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">ドキュメント編集</h1>
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
        <h1 className="text-2xl font-bold mb-6">ドキュメント編集</h1>
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ドキュメント編集</h1>
        <Link
          href="/admin/documents"
          className="text-gray-600 hover:text-gray-900"
        >
          ← 一覧に戻る
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              タイトル*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              カテゴリ*
            </label>
            <input
              type="text"
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="例: JavaScript, Git, React"
            />
          </div>

          <div>
            <label
              htmlFor="headerImage"
              className="block text-sm font-medium text-gray-700"
            >
              ヘッダー画像
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="headerImage"
                name="headerImage"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                画像を変更
              </button>
              {headerImage && (
                <span className="ml-3 text-sm text-gray-500">
                  {headerImage.name}
                </span>
              )}
            </div>
            {imagePreview && (
              <div className="mt-2">
                <div
                  className="relative w-full max-w-md mx-auto bg-gray-100 flex items-center justify-center p-4"
                  style={{ aspectRatio: "6/4" }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-contain max-w-full max-h-full p-2"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              コンテンツ (マークダウン)*
            </label>
            <MarkdownEditor
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/documents")}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
