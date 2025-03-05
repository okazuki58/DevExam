"use client";

import React from "react";
import Navbar from "@/app/ui/navbar";
import { useAuth } from "@/app/lib/contexts/auth-context";
import { useRouter } from "next/navigation";
import GoogleBtn from "../ui/google-btn";
import Logo from "../ui/logo";

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
            <div className="w-full max-w-md">
              <div className="text-white text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">はじめまして！</h1>
                <p className="text-purple-100">
                  新しいアカウントを作成して、学習を始めましょう
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/20 h-10 rounded-md"></div>
                  <div className="bg-white/20 h-10 rounded-md"></div>
                  <div className="bg-white/20 h-10 rounded-md"></div>
                  <div className="bg-white/30 h-12 rounded-md mt-6"></div>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="h-1 w-16 bg-white/30 rounded-full mx-1"></div>
                  <div className="h-1 w-16 bg-white/30 rounded-full mx-1"></div>
                  <div className="h-1 w-16 bg-white/30 rounded-full mx-1"></div>
                </div>
              </div>

              <div className="text-center mt-8 text-white/60 text-sm">
                シンプルな手順でアカウント作成が完了します
              </div>
            </div>
          </div>

          {/* 右側：登録フォームエリア */}
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <Logo />
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
