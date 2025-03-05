import { useRouter } from "next/navigation";

interface HowItWorksProps {
  router: ReturnType<typeof useRouter>;
}

export default function HowItWorks({ router }: HowItWorksProps) {
  const steps = [
    {
      number: 1,
      title: "アカウント作成",
      description: "無料でアカウントを作成して、プロフィールを設定します。",
      imagePlaceholder: "アカウント作成の画像",
    },
    {
      number: 2,
      title: "テストに挑戦",
      description: "あなたのスキルセットに合わせたテストや演習に挑戦します。",
      imagePlaceholder: "テスト画面の画像",
    },
    {
      number: 3,
      title: "スキルの証明",
      description:
        "結果に基づいたスキル証明書を獲得し、プロフィールに表示します。",
      imagePlaceholder: "スキル証明書の画像",
    },
    {
      number: 4,
      title: "企業からのオファー",
      description:
        "あなたのスキルに興味を持った企業からオファーを受け取ります。",
      imagePlaceholder: "オファー受信の画像",
    },
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          <span className="relative inline-block">
            DevExamの使い方
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
          </span>
        </h2>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-16">
          わずか数ステップであなたのキャリアを次のレベルへ
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              {/* 連結線 - 最後の要素以外に表示 */}
              {step.number < 4 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+2rem)] right-0 h-0.5 bg-gradient-to-r from-blue-400 to-transparent z-0"></div>
              )}

              <div className="text-center relative z-10">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <div className="rounded-xl overflow-hidden mb-6 w-full h-48 relative bg-white shadow-lg group hover:shadow-xl transition-all">
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 group-hover:bg-gray-100 transition-colors">
                    {step.imagePlaceholder}
                  </div>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/register")}
            className="btn btn-primary px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg text-lg font-bold"
          >
            今すぐ始める
          </button>
        </div>
      </div>
    </div>
  );
}
