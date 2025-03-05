"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { UserProfile, ExerciseSubmission, Badge } from "@/app/lib/definitions";
import { fetchUserProfile, updateUserProfile } from "@/app/lib/data";
import Navbar from "@/app/ui/navbar";

// コンポーネントのインポート
import ProfileHeader from "@/app/ui/profile/ProfileHeader";
import ProfileTimeline from "@/app/ui/profile/ProfileTimeline";
import ActivityHistory from "@/app/ui/profile/ActivityHistory";
import BadgeCollection from "@/app/ui/profile/BadgeCollection";
import RecentActivity from "@/app/ui/profile/RecentActivity";
import BadgePreview from "@/app/ui/profile/BadgePreview";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("about");
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [submissions, setSubmissions] = useState<ExerciseSubmission[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  const user = session?.user;
  const isCurrentUser = true; // 現在のユーザーのプロフィールを表示している場合

  useEffect(() => {
    const loadProfileData = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          // プロフィールデータの取得
          const data = await fetchUserProfile();
          setProfileData(data);

          // APIからバッジとサブミッションも取得する
          if (data.badges) {
            console.log("バッジデータ:", data.badges);
            setBadges(data.badges);
          }

          if (data.submissions) {
            console.log("サブミッションデータ:", data.submissions);
            setSubmissions(data.submissions);
          }
        } catch (error) {
          console.error("プロフィールデータ取得エラー:", error);
          toast.error("プロフィールデータの取得に失敗しました");
        } finally {
          setLoading(false);
        }
      }
    };

    loadProfileData();
  }, [user?.id]);

  // プロフィール更新処理
  const handleProfileUpdate = async (data: UserProfile) => {
    if (!user?.id) return;

    try {
      await updateUserProfile(user.id, data);
      setProfileData(data);
      return Promise.resolve();
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
      return Promise.reject(error);
    }
  };

  if (loading || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3730A3]"></div>
          </div>
        </div>
      </div>
    );
  }

  // 最近の提出物（最新5件）
  const recentSubmissions = submissions.slice(0, 5);

  // 提出物をActivity形式に変換
  const submissionActivities = recentSubmissions.map((submission) => ({
    id: submission.id,
    type: "exercise_submission",
    title: submission.title || "演習提出",
    description: `${submission.score}点を獲得しました`,
    timestamp:
      submission.createdAt instanceof Date
        ? submission.createdAt.toISOString()
        : submission.createdAt || new Date().toISOString(),
    url: `/exercises/${submission.exerciseId}`,
    relatedId: submission.exerciseId,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* フルワイドのプロフィールヘッダー - コンテナの外に配置 */}
      <ProfileHeader
        profileData={profileData}
        user={{
          id: user?.id || "",
          name: user?.name || "",
          email: user?.email || "",
          image: user?.image || "",
        }}
        isCurrentUser={isCurrentUser}
        updateProfile={handleProfileUpdate}
      />

      {/* この下のコンテンツはコンテナ内に配置 */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* タブナビゲーション */}
        <div className="mt-2 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("about")}
              data-tab="about"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "about"
                  ? "border-[#3730A3] text-[#3730A3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              プロフィール
            </button>
            {/* <button
              onClick={() => setActiveTab("activity")}
              data-tab="activity"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "activity"
                  ? "border-[#3730A3] text-[#3730A3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              学習履歴
            </button> */}
            <button
              onClick={() => setActiveTab("badges")}
              data-tab="badges"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "badges"
                  ? "border-[#3730A3] text-[#3730A3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              獲得バッジ
            </button>
          </nav>
        </div>

        {/* タブコンテンツ */}
        <div className="mt-6">
          {/* プロフィールタブ */}
          {activeTab === "about" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左カラム: タイムライン形式のプロフィール */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  {/* タイムライン */}
                  <ProfileTimeline
                    profileData={profileData}
                    updateProfile={handleProfileUpdate}
                  />
                </div>
              </div>

              {/* 右カラム: 最近の活動 */}
              <div className="space-y-6">
                {/* 最近の活動 */}
                <RecentActivity activities={submissionActivities} />

                {/* 獲得バッジのプレビュー */}
                <BadgePreview badges={badges} />
              </div>
            </div>
          )}

          {/* 学習履歴タブ */}
          {activeTab === "activity" && (
            <ActivityHistory submissions={submissions} />
          )}

          {/* 獲得バッジタブ */}
          {activeTab === "badges" && <BadgeCollection badges={badges} />}
        </div>
      </div>
    </div>
  );
}
