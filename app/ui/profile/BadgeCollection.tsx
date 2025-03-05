import Image from "next/image";
import { Badge } from "@/app/lib/definitions";

interface BadgeCollectionProps {
  badges: Badge[];
}

export default function BadgeCollection({ badges }: BadgeCollectionProps) {
  if (badges.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          バッジがありません
        </h2>
        <p className="text-gray-600">
          クイズや演習に取り組んでバッジを獲得しましょう！
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">獲得バッジ</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-blue-100"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                {badge.imageUrl ? (
                  <Image
                    src={badge.imageUrl}
                    alt={badge.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {badge.name}
              </h3>

              <p className="text-gray-600 text-sm text-center mt-2">
                {badge.description}
              </p>

              {badge.achievedAt && (
                <div className="mt-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {new Date(badge.achievedAt).toLocaleDateString("ja-JP")}に獲得
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
