"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/ui/navbar";
import Footer from "../ui/footer";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // 認証状態を確認してリダイレクト
    if (status === "authenticated" && session?.user?.id) {
      router.push(`/profile/${session.user.id}`);
    }
  }, [status, session, router]);

  // 認証されていない場合
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              プロフィールの表示にはログインが必要です
            </h1>
            <p className="text-gray-600 mb-6">
              自分のプロフィールを表示するにはログインするか、特定のユーザーのプロフィールを直接閲覧してください。
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/login"
                className="px-6 py-3 bg-[#3730A3] text-white rounded-lg hover:bg-[#2c2582] transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 border border-[#3730A3] text-[#3730A3] rounded-lg hover:bg-indigo-50 transition-colors"
              >
                新規登録
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ロード中の表示
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3730A3]"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
