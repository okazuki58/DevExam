import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Activity } from "@/app/lib/definitions";

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  // 5件までに制限
  const recentActivities = activities.slice(0, 5);

  // アクティビティの種類に応じたアイコンとカラーを取得
  const getActivityStyleInfo = (type: string) => {
    switch (type) {
      case "submission_created":
        return {
          icon: (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 17H13V11H11V17ZM12 9C12.55 9 13 8.55 13 8C13 7.45 12.55 7 12 7C11.45 7 11 7.45 11 8C11 8.55 11.45 9 12 9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="currentColor"
              />
            </svg>
          ),
          bgColor: "bg-blue-500/10",
          textColor: "text-blue-600",
          borderColor: "border-blue-200/50",
        };
      case "submission_completed":
        return {
          icon: (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16.17L5.53 12.7C5.14 12.31 4.51 12.31 4.12 12.7C3.73 13.09 3.73 13.72 4.12 14.11L8.3 18.29C8.69 18.68 9.32 18.68 9.71 18.29L20.29 7.71C20.68 7.32 20.68 6.69 20.29 6.3C19.9 5.91 19.27 5.91 18.88 6.3L9 16.17Z"
                fill="currentColor"
              />
            </svg>
          ),
          bgColor: "bg-green-500/10",
          textColor: "text-green-600",
          borderColor: "border-green-200/50",
        };
      case "badge_earned":
        return {
          icon: (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15C8.7 15 6 12.3 6 9C6 5.7 8.7 3 12 3C15.3 3 18 5.7 18 9C18 12.3 15.3 15 12 15ZM12 5C9.8 5 8 6.8 8 9C8 11.2 9.8 13 12 13C14.2 13 16 11.2 16 9C16 6.8 14.2 5 12 5Z"
                fill="currentColor"
              />
              <path
                d="M12 15C13.1 15 14.1 14.8 15 14.5V19L12 17.5L9 19V14.5C9.9 14.8 10.9 15 12 15Z"
                fill="currentColor"
              />
              <path
                d="M17 15.4C18.2 14.2 19 12.7 19 11C19 9.3 18.2 7.8 17 6.6C18.2 7 19 8.4 19 10C19 11.6 18.2 13 17 15.4Z"
                fill="currentColor"
              />
              <path
                d="M7 15.4C5.8 14.2 5 12.7 5 11C5 9.3 5.8 7.8 7 6.6C5.8 7 5 8.4 5 10C5 11.6 5.8 13 7 15.4Z"
                fill="currentColor"
              />
            </svg>
          ),
          bgColor: "bg-yellow-500/10",
          textColor: "text-yellow-600",
          borderColor: "border-yellow-200/50",
        };
      default:
        return {
          icon: (
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="currentColor"
              />
              <path
                d="M12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
                fill="currentColor"
              />
              <path
                d="M12 7C10.9 7 10 7.9 10 9V11C10 12.1 10.9 13 12 13C13.1 13 14 12.1 14 11V9C14 7.9 13.1 7 12 7Z"
                fill="currentColor"
              />
            </svg>
          ),
          bgColor: "bg-purple-500/10",
          textColor: "text-purple-600",
          borderColor: "border-purple-200/50",
        };
    }
  };

  // アクティビティの種類に応じたテキストを取得
  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "submission_created":
        return "演習に取り組み始めました";
      case "submission_completed":
        return "演習を完了しました";
      case "badge_earned":
        return "バッジを獲得しました";
      default:
        return "アクティビティがありました";
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl shadow-md p-6 border border-blue-100/50">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-blue-600 to-indigo-700 rounded-full block"></span>
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-800 to-indigo-700 text-transparent bg-clip-text">
            最近の活動
          </h3>
        </div>
        <Link
          href="#activity"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector('[data-tab="activity"]')
              ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          }}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center group"
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

      {recentActivities.length === 0 ? (
        <div className="text-center py-8 bg-white/70 rounded-lg">
          <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">まだ活動履歴がありません</p>
          <p className="text-gray-400 text-sm mt-1">
            課題に取り組んで学習を始めましょう！
          </p>
        </div>
      ) : (
        <div className="space-y-3 relative">
          {/* タイムラインの中央線 */}
          <div className="absolute left-3.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-500/30 rounded-full"></div>

          {recentActivities.map((activity) => {
            const { icon, bgColor, textColor, borderColor } =
              getActivityStyleInfo(activity.type);

            return (
              <div
                key={activity.id}
                className="relative flex items-start gap-4 pl-1 group"
              >
                {/* アイコン円 */}
                <div
                  className={`relative z-10 w-7 h-7 rounded-full ${bgColor} ${textColor} border ${borderColor} flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                >
                  {icon}
                </div>

                {/* 内容 */}
                <div
                  className={`bg-white/60 backdrop-blur-sm rounded-lg p-3 w-full border ${borderColor} transform transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-sm`}
                >
                  <div className="text-sm font-medium text-gray-900 mb-0.5">
                    {getActivityText(activity)}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 truncate max-w-[70%]">
                      {activity.entityTitle}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                        locale: ja,
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
