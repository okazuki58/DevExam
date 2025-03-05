export default function Partners() {
  // パートナー企業のリスト
  const partners = [
    { name: "Google", logo: "/images/partners/google.svg" },
    { name: "Microsoft", logo: "/images/partners/microsoft.svg" },
    { name: "Amazon", logo: "/images/partners/amazon.svg" },
    { name: "Meta", logo: "/images/partners/meta.svg" },
    { name: "IBM", logo: "/images/partners/ibm.svg" },
    { name: "Apple", logo: "/images/partners/apple.svg" },
    { name: "Salesforce", logo: "/images/partners/salesforce.svg" },
    { name: "Oracle", logo: "/images/partners/oracle.svg" },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-4xl font-extrabold relative mb-4">
            提携企業
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            これらのトップ企業がDevExamを通じてエンジニア採用を行っています。
            あなたのスキルが証明されれば、これらの企業からオファーを受け取るチャンスがあります。
          </p>
        </div>

        {/* パートナーロゴグリッド */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-gray-50 rounded-xl p-6 flex items-center justify-center h-32 group hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* 実際のプロジェクトでは、Image コンポーネントと実際の画像を使用します */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* ロゴの代わりにプレースホルダーを表示 */}
                <div className="text-gray-400 font-semibold text-xl group-hover:text-gray-600 transition-colors">
                  {partner.name}
                </div>
                {/* 実際のイメージがある場合は以下のようにします
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain opacity-60 group-hover:opacity-100 transition-opacity p-4"
                />
                */}
              </div>
            </div>
          ))}
        </div>

        {/* 提携企業募集バナー */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                パートナー企業募集中
              </h3>
              <p className="text-gray-600">
                優秀なエンジニア採用にお困りですか？DevExamと提携して、スキル証明済みの人材にアクセスしましょう。
              </p>
            </div>
            <a
              href="/partners/apply"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all whitespace-nowrap"
            >
              企業パートナーになる
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
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
