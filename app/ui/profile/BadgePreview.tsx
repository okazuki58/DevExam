import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/app/lib/definitions";

interface BadgePreviewProps {
  badges: Badge[];
}

export default function BadgePreview({ badges }: BadgePreviewProps) {
  // 表示数を12個のまま
  const previewBadges = badges.slice(0, 12);

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl shadow-md p-6 border border-indigo-100/50">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-purple-600 to-indigo-700 rounded-full block"></span>
          <h3 className="text-lg font-bold bg-gradient-to-r from-indigo-800 to-purple-700 text-transparent bg-clip-text">
            獲得バッジ
          </h3>
        </div>
        <Link
          href="#badges"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector('[data-tab="badges"]')
              ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          }}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center group"
        >
          <span>すべて見る</span>
          <svg
            className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {previewBadges.length === 0 ? (
        <div className="text-center py-8 bg-white/70 rounded-lg">
          <div className="w-20 h-20 mx-auto mb-4 bg-indigo-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-indigo-300"
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
          <p className="text-gray-500 font-medium">
            まだバッジを獲得していません
          </p>
          <p className="text-gray-400 text-sm mt-1">
            課題をクリアしてバッジを集めよう！
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap -m-1">
            {previewBadges.map((badge) => (
              <div key={badge.id} className="p-1 w-1/4">
                <div className="relative group" title={badge.name}>
                  <div
                    className="w-full aspect-square rounded-full overflow-hidden transform transition-all duration-300 
                                group-hover:scale-105 group-hover:-translate-y-1 
                                bg-gradient-to-br from-indigo-50 to-white
                                flex items-center justify-center
                                shadow-sm group-hover:shadow-md border border-indigo-100/80"
                  >
                    {badge.imageUrl ? (
                      <Image
                        src={badge.imageUrl}
                        alt={badge.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 20vw"
                        className="object-contain p-1.5"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-indigo-500"
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

                  {/* バッジの名前をホバー時に表示 */}
                  <div
                    className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-max bg-indigo-800 text-white text-xs px-2 py-1 rounded opacity-0 
                              group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-lg"
                  >
                    {badge.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-indigo-100">
            <div className="flex justify-between items-center mb-1.5 text-sm">
              <span className="text-gray-600">次のバッジまであと3つ</span>
              <span className="font-semibold text-indigo-700">
                {badges.length}/20
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-600 to-purple-500 h-full rounded-full"
                style={{ width: `${(badges.length / 20) * 100}%` }}
              ></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
