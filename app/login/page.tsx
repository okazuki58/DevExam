"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Navbar from "@/app/ui/navbar";
import GoogleBtn from "../ui/google-btn";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (result?.error) {
        setError("メールアドレスまたはパスワードが正しくありません");
        setIsLoading(false);
        return;
      }

      // ログイン成功時にトースト表示
      toast.success("ログインに成功しました！", {
        duration: 3000,
      });

      router.push(callbackUrl);
    } catch {
      setError("ログイン中にエラーが発生しました");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
          {/* 左側：オリジナルのSVGイラストエリア */}
          <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center bg-gradient-to-br from-indigo-600 to-indigo-800 p-8">
            <div className="w-full max-w-md">
              <div className="text-white text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">おかえりなさい！</h1>
                <p className="text-indigo-200">
                  アカウントにログインして、学習を続けましょう
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/20 h-10 rounded-md"></div>
                  <div className="bg-white/20 h-10 rounded-md"></div>
                  <div className="bg-white/30 h-12 rounded-md mt-6"></div>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="h-1 w-16 bg-white/30 rounded-full mx-1"></div>
                  <div className="h-1 w-16 bg-white/30 rounded-full mx-1"></div>
                </div>
              </div>

              <div className="text-center mt-8 text-white/60 text-sm">
                安全なログインでデータを保護します
              </div>
            </div>
          </div>

          {/* 右側：ログインフォームエリア */}
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
              アカウントにログイン
            </p>

            {/* エラーメッセージ */}
            {error && (
              <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <GoogleBtn />

            {/* 区切り線 */}
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b lg:w-1/4"></span>
              <a
                href="#"
                className="text-xs text-center text-gray-500 uppercase hover:underline"
              >
                またはメールでログイン
              </a>
              <span className="w-1/5 border-b lg:w-1/4"></span>
            </div>

            {/* ログインフォーム */}
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600"
                  htmlFor="email-address"
                >
                  メールアドレス
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="メールアドレス"
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600"
                    htmlFor="password"
                  >
                    パスワード
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-indigo-500 hover:underline"
                  >
                    パスワードをお忘れですか？
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-indigo-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="パスワード"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50 ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "ログイン中..." : "ログイン"}
                </button>
              </div>
            </form>

            {/* 下部のリンク */}
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4"></span>
              <Link
                href="/register"
                className="text-xs text-indigo-500 uppercase hover:underline"
              >
                または 新規登録
              </Link>
              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
