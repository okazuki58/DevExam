import { useState } from "react";
import Image from "next/image";
import { UserProfile } from "@/app/lib/definitions";
import {
  FaGithub,
  FaGlobe,
  FaPencilAlt,
  FaCheck,
  FaTimes,
  FaBook,
  FaCode,
  FaLaptopCode,
  FaClock,
  FaCalendarAlt,
  FaFire,
  FaQuestionCircle,
  FaAward,
} from "react-icons/fa";

interface ProfileHeaderProps {
  profileData: UserProfile;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  isCurrentUser: boolean;
  updateProfile: (data: UserProfile) => Promise<void>;
}

// 学習記録の仮データ生成
const generateLearningData = () => {
  const today = new Date();
  const data = [];

  // 過去12週間分のデータを生成
  for (let i = 0; i < 84; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // ランダムな学習時間を生成 (0〜120分)
    const learningMinutes =
      Math.random() > 0.3 ? Math.floor(Math.random() * 120) : 0;

    data.push({
      date: date.toISOString().split("T")[0],
      minutes: learningMinutes,
      lessons: learningMinutes > 0 ? Math.ceil(learningMinutes / 30) : 0,
    });
  }

  return data.reverse();
};

export default function ProfileHeader({
  profileData,
  user,
  isCurrentUser,
  updateProfile,
}: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profileData.bio || "");
  const [learningData] = useState(generateLearningData());

  // 学習アクティビティのサマリーを計算
  const totalMinutes = learningData.reduce((sum, day) => sum + day.minutes, 0);
  const totalLessons = learningData.reduce((sum, day) => sum + day.lessons, 0);
  const currentStreak = (() => {
    let streak = 0;
    for (let i = learningData.length - 1; i >= 0; i--) {
      if (learningData[i].minutes > 0) streak++;
      else break;
    }
    return streak;
  })();

  const handleSave = async () => {
    try {
      await updateProfile({ ...profileData, bio });
      setIsEditing(false);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
    }
  };

  return (
    <div className="w-full relative overflow-hidden text-white">
      {/* モダンな背景 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800">
        {/* 幾何学的パターン */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* 光の効果 */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-purple-400 opacity-10 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* コンテンツコンテナ */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end gap-8">
          {/* アバター - より大きく、高品質な表示 */}
          <div className="flex-shrink-0">
            <div className="relative h-36 w-36 rounded-xl overflow-hidden shadow-xl border-4 border-white/30 backdrop-blur-sm">
              <Image
                src="/user/user2.png"
                alt={user.name || "ユーザー"}
                fill
                className="object-cover"
              />

              {/* ハイライト効果 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20"></div>
            </div>
          </div>

          {/* ユーザー情報 - 改良されたタイポグラフィー */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Ogawa Kazuki
                </h1>

                <p className="text-lg text-indigo-200 mt-1 font-medium">
                  @{user.id || "username"}
                </p>
              </div>

              {isCurrentUser && (
                <div className="flex space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <FaTimes size={14} />
                        キャンセル
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-lg bg-white text-indigo-800 hover:bg-indigo-100 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <FaCheck size={14} />
                        保存
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm flex items-center gap-2 text-sm font-medium"
                    >
                      <FaPencilAlt size={14} />
                      プロフィールを編集
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 自己紹介 - 改良されたスタイル */}
        <div className="mt-8">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                rows={3}
                placeholder="自己紹介を入力してください"
              />
            </div>
          ) : (
            <div className="p-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
              <p className="text-indigo-100 leading-relaxed">
                {profileData.bio || "自己紹介が設定されていません。"}
              </p>
            </div>
          )}
        </div>

        {/* 学習進捗の視覚化 - スッキリ横長版 */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto py-2">
          {/* バッジ獲得数 */}
          <div className="bg-indigo-600/40 rounded-lg p-2 min-w-[90px] flex items-center gap-2 backdrop-blur-sm border border-white/10">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <FaAward size={16} />
            </div>
            <div>
              <p className="text-xs text-white/70">バッジ</p>
              <p className="text-lg font-bold text-white">12</p>
            </div>
          </div>

          {/* クイズ得点率 */}
          <div className="bg-indigo-600/40 rounded-lg p-2 min-w-[90px] flex items-center gap-2 backdrop-blur-sm border border-white/10">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <FaQuestionCircle size={16} />
            </div>
            <div>
              <p className="text-xs text-white/70">クイズ</p>
              <p className="text-lg font-bold text-white">78%</p>
            </div>
          </div>

          {/* 演習得点率 */}
          <div className="bg-indigo-600/40 rounded-lg p-2 min-w-[90px] flex items-center gap-2 backdrop-blur-sm border border-white/10">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <FaCode size={16} />
            </div>
            <div>
              <p className="text-xs text-white/70">演習</p>
              <p className="text-lg font-bold text-white">85%</p>
            </div>
          </div>

          {/* 継続学習日数 */}
          <div className="bg-indigo-600/40 rounded-lg p-2 min-w-[90px] flex items-center gap-2 backdrop-blur-sm border border-white/10 relative">
            <div className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              <FaFire size={10} />
            </div>
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <FaCalendarAlt size={16} />
            </div>
            <div>
              <p className="text-xs text-white/70">継続</p>
              <p className="text-lg font-bold text-white">{currentStreak}日</p>
            </div>
          </div>

          {/* 合計学習時間 */}
          <div className="bg-indigo-600/40 rounded-lg p-2 min-w-[90px] flex items-center gap-2 backdrop-blur-sm border border-white/10">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <FaClock size={16} />
            </div>
            <div>
              <p className="text-xs text-white/70">学習時間</p>
              <p className="text-lg font-bold text-white">{totalMinutes}分</p>
            </div>
          </div>

          {/* 学習レッスン数 */}
          <div className="bg-indigo-600/40 rounded-lg p-2 min-w-[90px] flex items-center gap-2 backdrop-blur-sm border border-white/10">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
              <FaBook size={16} />
            </div>
            <div>
              <p className="text-xs text-white/70">レッスン</p>
              <p className="text-lg font-bold text-white">{totalLessons}</p>
            </div>
          </div>
        </div>

        {/* ソーシャルリンク - GitHubとポートフォリオのみ */}
        <div className="mt-8 flex flex-wrap gap-3">
          {profileData.githubUrl && (
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-lg transition-all text-sm font-medium flex items-center gap-2 hover:scale-105"
            >
              <FaGithub size={16} />
              GitHub
            </a>
          )}

          {profileData.portfolioUrl && (
            <a
              href={profileData.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-lg transition-all text-sm font-medium flex items-center gap-2 hover:scale-105"
            >
              <FaGlobe size={16} />
              ポートフォリオ
            </a>
          )}

          <a
            href="#projects"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-lg transition-all text-sm font-medium flex items-center gap-2 hover:scale-105"
          >
            <FaCode size={16} />
            学習プロジェクト
          </a>

          <a
            href="#skills"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm text-white rounded-lg transition-all text-sm font-medium flex items-center gap-2 hover:scale-105"
          >
            <FaLaptopCode size={16} />
            習得スキル
          </a>
        </div>
      </div>
    </div>
  );
}
