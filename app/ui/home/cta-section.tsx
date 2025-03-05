import { useRouter } from "next/navigation";

interface CtaSectionProps {
  router: ReturnType<typeof useRouter>;
}

export default function CtaSection({ router }: CtaSectionProps) {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* メインCTAカード */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* グラデーション背景 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800"></div>

          {/* 装飾的なパターン */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${Math.random() * 300 + 50}px`,
                    height: `${Math.random() * 300 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.3,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* コンテンツ */}
          <div className="relative z-10 py-16 px-8 md:px-16 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-10 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                  今すぐ始めて、
                  <br />
                  あなたのキャリアを加速させましょう
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                  DevExamは完全無料です。数分でアカウントを作成し、テストに挑戦して、あなたのスキルを証明しましょう。
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => router.push("/register")}
                    className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg text-lg"
                  >
                    無料でアカウント作成
                  </button>
                  <button
                    onClick={() => router.push("/quizzes")}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:bg-opacity-10 transition-all text-lg"
                  >
                    テストを見てみる
                  </button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64">
                  {/* 3D立体的な矢印またはグラフィック要素 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-indigo-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 10l7-7m0 0l7 7m-7-7v18"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all">
            <div className="text-4xl font-extrabold text-indigo-700 mb-2">
              10,000+
            </div>
            <div className="text-gray-600 font-medium">登録ユーザー</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all">
            <div className="text-4xl font-extrabold text-indigo-700 mb-2">
              500+
            </div>
            <div className="text-gray-600 font-medium">テスト・演習問題</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all">
            <div className="text-4xl font-extrabold text-indigo-700 mb-2">
              98%
            </div>
            <div className="text-gray-600 font-medium">ユーザー満足度</div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center">よくある質問</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "DevExamは本当に無料ですか？",
                answer:
                  "はい、DevExamの基本機能はすべて無料でご利用いただけます。テストの受験、スキル証明書の発行、企業からのオファー受信まで、すべて無料です。",
              },
              {
                question: "どのようなスキルをテストできますか？",
                answer:
                  "プログラミング言語（JavaScript、Python、Javaなど）、フレームワーク（React、Vue、Djangoなど）、インフラ技術（AWS、Docker）など、幅広い技術スキルをテストできます。",
              },
              {
                question: "テストの難易度はどれくらいですか？",
                answer:
                  "テストは初級、中級、上級の3レベルに分かれています。実際の業務で必要とされるスキルを測定できるよう設計されています。",
              },
              {
                question: "企業とのマッチングはどのように行われますか？",
                answer:
                  "あなたのテスト結果とプロフィール情報をもとに、AIがマッチング度の高い企業を推薦します。企業からは直接オファーが届くこともあります。",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <h4 className="font-bold text-lg mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/faq"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
            >
              すべてのFAQを見る
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
