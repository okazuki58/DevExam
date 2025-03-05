export default function SuccessStories() {
  const stories = [
    {
      name: "田中 健太",
      role: "フロントエンドエンジニア",
      company: "株式会社テック",
      image: "/images/success/person1.jpg",
      quote:
        "DevExamでReactのスキルを証明したところ、複数の大手企業からオファーを受け、年収が50%アップしました。実力を客観的に示せる点が採用担当者に好評でした。",
      rating: 5,
    },
    {
      name: "佐藤 美咲",
      role: "バックエンドエンジニア",
      company: "グローバルテクノロジー株式会社",
      image: "/images/success/person2.jpg",
      quote:
        "長い間転職活動をしていましたが、DevExamでPythonとAWSのスキルを証明してから、わずか2週間で理想の企業からオファーを受けました。スキルテストの結果が履歴書よりも雄弁に語ってくれました。",
      rating: 5,
    },
    {
      name: "鈴木 大輔",
      role: "フルスタックエンジニア",
      company: "イノベートシステムズ",
      image: "/images/success/person3.jpg",
      quote:
        "DevExamのテストは実践的で難しかったですが、それを乗り越えたことで自信がつきました。証明書を取得後、複数の面接で好印象を与えることができ、理想の職場に転職できました。",
      rating: 4,
    },
  ];

  return (
    <div className="py-24 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="inline-block text-4xl font-extrabold relative mb-4">
            成功事例
            <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            DevExamを通じてキャリアアップに成功した多くのエンジニアの声をご紹介します。
            あなたも彼らのように、次のステップに進みましょう。
          </p>
        </div>

        {/* 成功事例カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-100">
                    {/* 実際のプロジェクトでは、実際の画像を使用します */}
                    <div className="absolute inset-0 bg-blue-100 flex items-center justify-center text-blue-500">
                      {story.name.charAt(0)}
                    </div>
                    {/* 実際の画像がある場合
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                    */}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{story.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {story.role} - {story.company}
                    </p>
                  </div>
                </div>

                {/* 引用符アイコン */}
                <div className="text-blue-100 mb-4">
                  <svg
                    className="w-10 h-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <p className="text-gray-700 mb-6 italic">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* 評価 */}
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < story.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    DevExam満足度: {story.rating}/5
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* もっと見るボタン */}
        <div className="mt-12 text-center">
          <a
            href="/success-stories"
            className="inline-flex items-center px-6 py-3 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
          >
            もっと成功事例を見る
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
  );
}
