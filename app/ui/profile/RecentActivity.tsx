"use client";

import Link from "next/link";
import {
  FaCodeBranch,
  FaBook,
  FaCertificate,
  FaRegClock,
  FaGithub,
  FaCommentAlt,
} from "react-icons/fa";

interface Activity {
  id: string;
  type: string; // "exercise_submission", "course_progress", "badge_earned", "comment"
  title: string;
  description: string;
  timestamp: string;
  url?: string;
  relatedId: string;
}

interface RecentActivityProps {
  activities?: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  // モックデータの活動
  const recentActivities = activities || [
    {
      id: "1",
      type: "exercise_submission",
      title: "JavaScript基礎演習を提出しました",
      description:
        "配列操作とDOMイベントを使用したJavaScriptの基礎課題を完了しました。",
      timestamp: "2023-09-15T14:32:00Z",
      url: "https://github.com/username/js-basics-exercise",
      relatedId: "ex-123",
    },
    {
      id: "2",
      type: "course_progress",
      title: "HTML/CSSコースを60%完了",
      description:
        "レスポンシブデザインのセクションまで完了しました。Flexboxとグリッドレイアウトの実践演習に取り組んでいます。",
      timestamp: "2023-09-12T09:15:00Z",
      relatedId: "course-456",
    },
    {
      id: "3",
      type: "badge_earned",
      title: "Git基礎バッジを獲得しました",
      description:
        "バージョン管理システムの基本操作とブランチ戦略の理解が認められました。",
      timestamp: "2023-09-10T16:45:00Z",
      relatedId: "badge-789",
    },
    {
      id: "4",
      type: "comment",
      title: "ディスカッションに参加しました",
      description:
        "「JavaScriptのプロミスとasync/await」のディスカッションでコメントしました。",
      timestamp: "2023-09-08T11:20:00Z",
      relatedId: "disc-101",
    },
    {
      id: "5",
      type: "exercise_submission",
      title: "Reactコンポーネント課題を提出",
      description:
        "フックを使用した状態管理とカスタムコンポーネントの作成課題を完了しました。",
      timestamp: "2023-09-05T15:10:00Z",
      url: "https://github.com/username/react-components-exercise",
      relatedId: "ex-112",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "exercise_submission":
        return <FaCodeBranch className="text-[#3D37B2]" />;
      case "course_progress":
        return <FaBook className="text-[#3D37B2]" />;
      case "badge_earned":
        return <FaCertificate className="text-[#3D37B2]" />;
      case "comment":
        return <FaCommentAlt className="text-[#3D37B2]" />;
      default:
        return <FaRegClock className="text-[#3D37B2]" />;
    }
  };

  const getActivityLink = (activity: Activity) => {
    switch (activity.type) {
      case "exercise_submission":
        return `/exercises/${activity.relatedId}`;
      case "course_progress":
        return `/courses/${activity.relatedId}`;
      case "badge_earned":
        return "#badges";
      case "comment":
        return `/discussions/${activity.relatedId}`;
      default:
        return "#";
    }
  };

  // 日付をフォーマット（モック用のシンプルな関数）
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "今日";
    if (diffDays === 1) return "昨日";
    if (diffDays < 7) return `${diffDays}日前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`;
    return `${Math.floor(diffDays / 30)}ヶ月前`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-1.5">
          <FaRegClock className="text-[#3D37B2] text-lg" />
          <h2 className="text-lg font-bold text-gray-900">最近の活動</h2>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {recentActivities.map((activity) => (
          <Link
            key={activity.id}
            href={getActivityLink(activity)}
            className="block hover:bg-gray-50 transition-colors"
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">
                      {activity.title}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {activity.description}
                  </p>

                  {activity.url && (
                    <div className="flex items-center text-sm text-gray-500 mt-2 truncate">
                      <FaGithub className="mr-1.5 text-gray-400" />
                      <span className="truncate">{activity.url}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <Link
          href="/profile/activity"
          className="text-sm text-[#3D37B2] hover:underline flex justify-center"
        >
          すべてのアクティビティを見る
        </Link>
      </div>
    </div>
  );
}
