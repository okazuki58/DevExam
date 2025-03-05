"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserProfile, ExerciseSubmission, Badge } from "@/app/lib/definitions";
import { fetchUserProfileById, updateUserProfile } from "@/app/lib/data";
import Navbar from "@/app/ui/navbar";
import Link from "next/link";

// コンポーネントのインポート
import ProfileHeader from "@/app/ui/profile/ProfileHeader";
import ProfileTimeline from "@/app/ui/profile/ProfileTimeline";
import ActivityHistory from "@/app/ui/profile/ActivityHistory";
import BadgeCollection from "@/app/ui/profile/BadgeCollection";
import RecentActivity from "@/app/ui/profile/RecentActivity";
import BadgePreview from "@/app/ui/profile/BadgePreview";
import Footer from "../../ui/footer";

export default function UserProfilePage() {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("about");
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [submissions, setSubmissions] = useState<ExerciseSubmission[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = session?.user;
  const isCurrentUser = user?.id === userId;

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        // 特定ユーザーのプロフィールデータの取得
        const data = await fetchUserProfileById(userId);
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
        setError("プロフィールが見つからないか、取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [userId]);

  // プロフィール更新処理
  const handleProfileUpdate = async (data: UserProfile) => {
    if (!isCurrentUser) return Promise.reject("編集権限がありません");

    try {
      await updateUserProfile(userId, data);
      setProfileData(data);
      return Promise.resolve();
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
      return Promise.reject(error);
    }
  };

  // プロフィールデータのロード中
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3730A3]"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // エラーが発生した場合
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              エラーが発生しました
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#3730A3] text-white rounded-lg hover:bg-[#2c2582] transition-colors"
            >
              再読み込み
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              プロフィールが見つかりません
            </h1>
            <p className="text-gray-600 mb-6">
              指定されたユーザーのプロフィールは存在しないか、削除された可能性があります。
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-[#3730A3] text-white rounded-lg hover:bg-[#2c2582] transition-colors"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 最近の提出物（最新5件）
  const recentSubmissions = submissions.slice(0, 5);

  // 提出物をActivity形式に変換
  const submissionActivities = recentSubmissions.map((submission) => ({
    id: submission.id,
    type: "exercise_submission",
    entityId: submission.exerciseId,
    entityTitle: submission.title || "演習提出",
    userId: userId,
    timestamp:
      submission.createdAt instanceof Date
        ? submission.createdAt.toISOString()
        : submission.createdAt || new Date().toISOString(),
    details: {
      score: submission.score ?? undefined,
    },
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <>
        {/* フルワイドのプロフィールヘッダー - コンテナの外に配置 */}
        <ProfileHeader
          profileData={profileData}
          user={{
            id: userId,
            // ユーザー情報をAPI応答から別途取得するか、デフォルト値を使用
            name: "", // APIレスポンスに含まれている場合は (profileData as any).name || ""
            email: "", // APIレスポンスに含まれている場合は (profileData as any).email || ""
            image: "", // APIレスポンスに含まれている場合は (profileData as any).image || ""
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
                      isReadOnly={!isCurrentUser}
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
                        <p className="text-sm text-gray-600">次のバッジまで</p>
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

      <Footer />
    </div>
  );
}
