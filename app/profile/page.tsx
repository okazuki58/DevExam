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
import Footer from "../ui/footer";

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
    entityId: submission.exerciseId, // 追加
    entityTitle: submission.title || "演習提出",
    userId: user?.id || "", // 追加
    timestamp:
      submission.createdAt instanceof Date
        ? submission.createdAt.toISOString()
        : submission.createdAt || new Date().toISOString(),
    details: {
      score: submission.score ?? undefined, // nullの場合はundefinedに変換
    },
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {loading || !profileData ? (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3730A3]"></div>
          </div>
        </div>
      ) : (
        <>
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
          <div className="container mx-auto px-4 py-4 max-w-6xl">
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
                <button
                  onClick={() => setActiveTab("activity")}
                  data-tab="activity"
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "activity"
                      ? "border-[#3730A3] text-[#3730A3]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  学習履歴
                </button>
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
              {/* すべてのタブで共通のflexレイアウト */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* 左カラム: 70%の幅 - タブごとのメインコンテンツ */}
                <div className="md:w-[70%]">
                  {/* プロフィールタブ */}
                  {activeTab === "about" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <ProfileTimeline
                        profileData={profileData}
                        updateProfile={handleProfileUpdate}
                      />
                    </div>
                  )}

                  {/* 学習履歴タブ */}
                  {activeTab === "activity" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-xl font-semibold mb-4">学習の進捗</h2>
                      <ActivityHistory activities={submissionActivities} />

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-50 rounded-lg">
                          <p className="text-sm text-gray-600">合計学習時間</p>
                          <p className="text-2xl font-bold text-indigo-800">
                            {profileData.totalStudyTime || 0}時間
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">完了した演習</p>
                          <p className="text-2xl font-bold text-green-800">
                            {submissions.length}個
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 獲得バッジタブ */}
                  {activeTab === "badges" && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        獲得したバッジ
                      </h2>
                      <BadgeCollection badges={badges} />

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-gray-600">獲得バッジ数</p>
                          <p className="text-2xl font-bold text-yellow-800">
                            {badges.length}
                          </p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            次のバッジまで
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 右カラム: 30%の幅 - 共通コンポーネント */}
                <div className="md:w-[30%] space-y-6">
                  {/* 獲得バッジのプレビュー */}
                  <BadgePreview badges={badges} />

                  {/* 最近の活動 */}
                  <RecentActivity activities={submissionActivities} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
