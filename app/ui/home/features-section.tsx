export default function FeaturesSection() {
  const features = [
    {
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "実務レベルのスキル評価",
      description:
        "実際の業務を想定した実践的な演習問題で、本当の実力を測定。単なる知識だけでなく、応用力を評価します。",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "企業とのマッチング",
      description:
        "あなたのスキルプロファイルに基づいて、最適な企業からのオファーを受け取ることができます。",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
      title: "スキル証明書の発行",
      description:
        "テスト結果に基づいたスキル証明書を発行。履歴書に添付して、客観的な技術力をアピールできます。",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "完全無料で利用可能",
      description:
        "すべてのテストと演習が無料で利用可能。スキルアップと転職支援に必要なツールをコストなしで提供します。",
      color: "from-emerald-500 to-green-600",
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-4xl font-extrabold relative mb-4">
            DevExamが選ばれる理由
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
            DevExamは単なるテストプラットフォームではありません。あなたのキャリアを加速させる総合的なツールです。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-8">
                <div
                  className={`bg-gradient-to-br ${feature.color} text-white rounded-2xl p-4 inline-flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
