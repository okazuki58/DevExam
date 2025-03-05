"use client";

import React from "react";
import Navbar from "@/app/ui/navbar";
import { useAuth } from "@/app/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import GoogleBtn from "../ui/google-btn";

export default function RegisterPage() {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
          {/* 左側：オリジナルのSVGイラストエリア - デベロッパー試験アプリのイメージ */}
          <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 p-8">
            {/* カスタムイラスト - プログラミングとテストのコンセプト */}
            <svg
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto max-w-md"
              fill="none"
            >
              {/* 背景の要素（円と波形） */}
              <circle cx="200" cy="200" r="160" fill="rgba(255,255,255,0.05)" />
              <circle cx="200" cy="200" r="120" fill="rgba(255,255,255,0.07)" />

              {/* コードエディタのフレーム */}
              <rect
                x="100"
                y="120"
                width="200"
                height="160"
                rx="8"
                fill="#ffffff"
              />

              {/* エディタのトップバー */}
              <rect
                x="100"
                y="120"
                width="200"
                height="20"
                rx="8"
                fill="#f3f4f6"
              />
              <circle cx="112" cy="130" r="4" fill="#fc8181" />
              <circle cx="128" cy="130" r="4" fill="#fbd38d" />
              <circle cx="144" cy="130" r="4" fill="#9ae6b4" />

              {/* コードの行 */}
              <rect
                x="110"
                y="150"
                width="180"
                height="6"
                rx="3"
                fill="#e5e7eb"
              />
              <rect
                x="110"
                y="165"
                width="140"
                height="6"
                rx="3"
                fill="#e5e7eb"
              />
              <rect
                x="110"
                y="180"
                width="160"
                height="6"
                rx="3"
                fill="#e5e7eb"
              />
              <rect
                x="110"
                y="195"
                width="120"
                height="6"
                rx="3"
                fill="#e5e7eb"
              />
              <rect
                x="110"
                y="210"
                width="170"
                height="6"
                rx="3"
                fill="#e5e7eb"
              />
              <rect
                x="110"
                y="225"
                width="130"
                height="6"
                rx="3"
                fill="#e5e7eb"
              />
              <rect
                x="110"
                y="240"
                width="150"
                height="6"
                rx="3"
                fill="#e5e7eb"
              />
              <rect
                x="110"
                y="255"
                width="100"
                height="6"
                rx="3"
                fill="#e5e7eb"
              />

              {/* チェックマーク・テストのシンボル */}
              <circle cx="280" cy="100" r="30" fill="rgba(255,255,255,0.2)" />
              <path
                d="M265 100L275 110L295 90"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* タグ・括弧のシンボル */}
              <path
                d="M80 180L60 200L80 220"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M320 180L340 200L320 220"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 電球（アイデア・学習のシンボル） */}
              <circle cx="200" cy="60" r="25" fill="rgba(255,255,255,0.15)" />
              <path
                d="M200 40 L200 55"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M180 60 L190 60"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M210 60 L220 60"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M185 45 L195 55"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M215 45 L205 55"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* 下部の要素 */}
              <rect
                x="140"
                y="300"
                width="120"
                height="8"
                rx="4"
                fill="rgba(255,255,255,0.2)"
              />
              <rect
                x="160"
                y="315"
                width="80"
                height="8"
                rx="4"
                fill="rgba(255,255,255,0.15)"
              />
            </svg>
          </div>

          {/* 右側：登録フォームエリア */}
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <svg
                className="w-auto h-7 sm:h-8 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 8L12 12L20 8L12 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12L12 16L20 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 16L12 20L20 16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mt-3 text-xl text-center text-gray-600">
              アカウント作成
            </p>

            {/* Google登録ボタン */}
            <GoogleBtn />

            {/* 区切り線 */}
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase hover:underline"
              >
                またはメールで登録
              </a>
              <span className="w-1/5 border-b lg:w-1/4"></span>
            </div>

            {/* 登録フォーム - ここはサンプルの入力フィールドを再現 */}
            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                メールアドレス
              </label>
              <input
                id="email"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                type="email"
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                パスワード
              </label>
              <input
                id="password"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                type="password"
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="confirmPassword"
              >
                パスワード（確認）
              </label>
              <input
                id="confirmPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                type="password"
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
                アカウント作成
              </button>
            </div>

            {/* 下部のリンク */}
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4"></span>
              <a
                href="/login"
                className="text-xs text-indigo-500 uppercase hover:underline"
              >
                または ログイン
              </a>
              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
