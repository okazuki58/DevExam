"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

// マークダウンエディタをクライアントサイドのみでロード
const MarkdownEditor = dynamic(() => import("@/app/ui/document-editor"), {
  ssr: false,
});

export default function NewDocumentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [headerImage, setHeaderImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setLoading(true);
    setError(null);

    try {
      // 1. 画像がある場合はアップロード
      let headerImageUrl = null;
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

      // 2. ドキュメントを作成
      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          headerImage: headerImageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("ドキュメントの作成に失敗しました");
      }

      // 成功したら一覧ページに戻る
      router.push("/admin/documents");
    } catch (err) {
      console.error("Failed to create document:", err);
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">新規ドキュメント作成</h1>
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
                画像を選択
              </button>
              {headerImage && (
                <span className="ml-3 text-sm text-gray-500">
                  {headerImage.name}
                </span>
              )}
            </div>
            {imagePreview && (
              <div className="mt-2 relative h-48 w-full">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-auto object-cover rounded"
                />
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
              disabled={loading}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
