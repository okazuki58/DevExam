"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { ExerciseSubmission } from "@/app/lib/definitions";

interface ActivityHistoryProps {
  submissions: ExerciseSubmission[];
}

export default function ActivityHistory({ submissions }: ActivityHistoryProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "inProgress">(
    "all"
  );

  // フィルタリングされた提出物
  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === "all") return true;
    if (filter === "completed") return submission.status === "completed";
    if (filter === "inProgress") return submission.status === "in_progress";
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">学習履歴</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === "all"
                ? "bg-blue-100 text-blue-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === "completed"
                ? "bg-green-100 text-green-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            完了
          </button>
          <button
            onClick={() => setFilter("inProgress")}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === "inProgress"
                ? "bg-yellow-100 text-yellow-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            進行中
          </button>
        </div>
      </div>

      {filteredSubmissions.length > 0 ? (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <Link
              key={submission.id}
              href={`/exercises/${submission.exerciseId}/submissions/${submission.id}`}
              className="block"
            >
              <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {`演習 ${submission.exerciseId.substring(0, 8)}`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(submission.updatedAt), {
                        addSuffix: true,
                        locale: ja,
                      })}
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 text-xs rounded-full ${
                      submission.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {submission.status === "completed" ? "完了" : "進行中"}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {submission.repositoryUrl || "No repository URL"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">該当する学習履歴はありません</p>
        </div>
      )}
    </div>
  );
}
