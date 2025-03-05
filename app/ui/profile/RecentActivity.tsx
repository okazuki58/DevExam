"use client";

import { Activity } from "@/app/lib/definitions";
import Link from "next/link";
import {
  FaCodeBranch,
  FaBook,
  FaCertificate,
  FaRegClock,
  FaGithub,
  FaCommentAlt,
} from "react-icons/fa";

interface RecentActivityProps {
  activities?: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  // モックデータの活動
  const recentActivities = activities || [
    {
      id: "1",
      type: "exercise_submission",
      entityId: "ex-123",
      entityTitle: "JavaScript基礎演習を提出しました",
      entityType: "exercise",
      userId: "user-1",
      timestamp: "2023-09-15T14:32:00Z",
      details: {
        score: 85,
        url: "https://github.com/username/js-basics-exercise",
      },
      status: "completed",
    },
    {
      id: "2",
      type: "course_progress",
      entityId: "course-456",
      entityTitle: "HTML/CSSコースを60%完了",
      entityType: "course",
      userId: "user-1",
      timestamp: "2023-09-12T09:15:00Z",
      details: {
        progress: 60,
      },
    },
    {
      id: "3",
      type: "badge_earned",
      entityId: "badge-789",
      entityTitle: "Git基礎バッジを獲得しました",
      entityType: "badge",
      userId: "user-1",
      timestamp: "2023-09-10T16:45:00Z",
    },
    {
      id: "4",
      type: "comment",
      entityId: "disc-101",
      entityTitle: "ディスカッションに参加しました",
      entityType: "discussion",
      userId: "user-1",
      timestamp: "2023-09-08T11:20:00Z",
      details: {
        content:
          "「JavaScriptのプロミスとasync/await」のディスカッションでコメントしました。",
      },
    },
    {
      id: "5",
      type: "exercise_submission",
      entityId: "ex-112",
      entityTitle: "Reactコンポーネント課題を提出",
      entityType: "exercise",
      userId: "user-1",
      timestamp: "2023-09-05T15:10:00Z",
      details: {
        score: 92,
        url: "https://github.com/username/react-components-exercise",
      },
      status: "completed",
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
        return `/exercises/${activity.entityId}`;
      case "course_progress":
        return `/courses/${activity.entityId}`;
      case "badge_earned":
        return "#badges";
      case "comment":
        return `/discussions/${activity.entityId}`;
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
                      {activity.entityTitle}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {activity.details?.score &&
                      `スコア: ${activity.details.score}`}
                    {activity.details?.progress &&
                      `進捗: ${activity.details.progress}%`}
                    {activity.details?.content && activity.details.content}
                  </p>

                  {activity.details?.url && (
                    <div className="flex items-center text-sm text-gray-500 mt-2 truncate">
                      <FaGithub className="mr-1.5 text-gray-400" />
                      <span className="truncate">{activity.details.url}</span>
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
