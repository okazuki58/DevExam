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
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">獲得バッジ</h3>
        <Link
          href="#badges"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector('[data-tab="badges"]')
              ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          }}
          className="text-sm text-[#3D37B2] hover:text-[#2B2A7D]"
        >
          すべて見る
        </Link>
      </div>

      {previewBadges.length === 0 ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400"
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
          <p className="text-gray-600 text-sm">まだバッジを獲得していません</p>
        </div>
      ) : (
        <div className="flex flex-wrap -m-1.5">
          {previewBadges.map((badge) => (
            <div key={badge.id} className="p-1.5">
              <div
                className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                title={badge.name} // バッジ名はツールチップとして表示
              >
                {badge.imageUrl ? (
                  <Image
                    src={badge.imageUrl}
                    alt={badge.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#3D37B2]"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
