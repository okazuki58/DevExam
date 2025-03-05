import { ExtendedUser } from "@/app/lib/definitions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  router: ReturnType<typeof useRouter>;
  user: ExtendedUser | null;
}

export default function HeroSection({ router, user }: HeroSectionProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // スクロールが少しでも発生したら非表示
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 pt-16 pb-16 min-h-screen flex items-start">
      {/* 装飾的な背景要素 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute top-[60%] -right-[5%] w-[35%] h-[40%] rounded-full bg-purple-200 blur-3xl"></div>
        <div className="absolute -bottom-[10%] left-[30%] w-[40%] h-[40%] rounded-full bg-cyan-200 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 z-10">
            <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-6 py-3 rounded-full mb-8 animate-pulse shadow-lg">
              <span className="mr-2">✨</span>
              <span>すべてのテスト・演習が完全無料</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
              あなたの
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                技術力
              </span>
              を証明して
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                キャリア
              </span>
              を加速させよう
            </h1>
            <p className="text-xl text-gray-700 mb-10 max-w-lg leading-relaxed">
              DevExamは、実務レベルの演習とスキルテストを通じて、あなたの本当の実力を企業にアピールできるプラットフォームです。
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => router.push("/quizzes")}
                className="btn btn-primary px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg text-lg font-bold"
              >
                テストに挑戦する
              </button>

              {!user ? (
                <Link
                  href="/login"
                  className="group btn btn-outline px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 text-lg font-bold flex items-center justify-center"
                >
                  ログイン
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="group btn btn-outline px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 text-lg font-bold flex items-center justify-center"
                >
                  マイダッシュボード
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center z-10">
            <div className="relative w-full max-w-lg group">
              {/* メインカード */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white transform transition-transform group-hover:scale-[1.02] duration-300">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="bg-white/20 p-2 rounded-lg mr-3">📊</span>
                  DevExamの実績
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xl font-bold">
                        月間5,000人以上
                      </span>
                      <span className="text-blue-100">のエンジニアが利用</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xl font-bold">
                        提携企業100社以上
                      </span>
                      <span className="text-blue-100">
                        あなたを待っています
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white/20 p-2 rounded-lg mr-3 mt-1">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-xl font-bold">
                        年間転職成功者500名以上
                      </span>
                      <span className="text-blue-100">
                        のキャリア形成をサポート
                      </span>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <button
                    onClick={() => router.push("/about")}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center font-medium transition-all"
                  >
                    詳細を見る
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* 装飾的な要素 */}
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl -z-10 opacity-70 blur-sm group-hover:blur-md transition-all"></div>
              <div className="absolute -top-3 -left-3 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl -z-20 opacity-60 blur-sm group-hover:blur-md transition-all"></div>
            </div>
          </div>
        </div>

        {/* スクロールを促す要素 - 画面下部に固定 & スクロール時に非表示 */}
        {showScrollIndicator && (
          <div className="fixed bottom-6 left-0 right-0 mx-auto w-max z-20 flex flex-col items-center">
            <span className="text-xs font-light text-gray-500 tracking-wider uppercase mb-1">
              スクロール
            </span>
            <div className="h-10 flex flex-col items-center justify-center overflow-hidden">
              <svg
                className="w-6 h-6 text-blue-600 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
