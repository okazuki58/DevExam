import { useState } from "react";
import { UserProfile } from "@/app/lib/definitions";
import {
  FaGraduationCap,
  FaBriefcase,
  FaLightbulb,
  FaRocket,
  FaLaptop,
  FaHeart,
  FaCheck,
  FaTimes,
  FaGithub,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

interface ProfileTimelineProps {
  profileData: UserProfile;
  updateProfile: (data: UserProfile) => Promise<void>;
}

// 学歴や前職の項目を定義
interface EducationItem {
  id: string;
  text: string;
}

interface JobItem {
  id: string;
  text: string;
}

export default function ProfileTimeline({
  profileData,
  updateProfile,
}: ProfileTimelineProps) {
  // 項目ごとの編集状態を管理
  const [editingField, setEditingField] = useState<string | null>(null);

  // 学歴と前職を配列として管理
  const [educationItems, setEducationItems] = useState<EducationItem[]>(
    profileData.educationItems || [
      { id: "1", text: "〇〇大学 情報工学部 2023年卒業" },
    ]
  );

  const [jobItems, setJobItems] = useState<JobItem[]>(
    profileData.jobItems || [
      { id: "1", text: "株式会社〇〇 営業部 (2020年7月～2023年3月)" },
    ]
  );

  // 新しい項目用のステート
  const [newEducation, setNewEducation] = useState("");
  const [newJob, setNewJob] = useState("");

  // 編集中の項目
  const [editingItem, setEditingItem] = useState<{
    id: string;
    text: string;
  } | null>(null);

  // 各フィールドの初期表示値（未設定の場合の具体例）
  const placeholders = {
    education: "〇〇大学 情報工学部 2023年卒業",
    previousJob: "株式会社〇〇 営業部 (2020年7月～2023年3月)",
    careerChange:
      "前職では営業として活躍していましたが、Web技術に興味を持ち、独学でプログラミングを学び始めました。特にフロントエンド開発に情熱を感じ、キャリアチェンジを決意しました。",
    goals:
      "入社後半年以内にチームの主要プロジェクトに貢献し、1年以内に独自の機能開発を担当できるようになりたいです。将来的にはフルスタック開発者として成長したいと考えています。",
    portfolio:
      "個人開発: Reactを使用したタスク管理アプリ\nチーム開発: オンライン学習プラットフォームのUI改善",
    portfolioUrl: "https://github.com/username/portfolio",
    hobbies: "写真撮影（風景・ポートレート）、登山、読書（技術書・SF小説）",
  };

  const [formData, setFormData] = useState({
    careerChange: profileData.careerChange || "",
    goals: profileData.goals || "",
    portfolio: profileData.portfolio || "",
    portfolioUrl: profileData.portfolioUrl || "",
    hobbies: profileData.hobbies || "",
  });

  // 項目追加ハンドラー
  const addEducation = async () => {
    if (!newEducation.trim()) return;

    const newItems = [
      ...educationItems,
      { id: Date.now().toString(), text: newEducation },
    ];
    setEducationItems(newItems);
    setNewEducation("");
    setEditingField(null);

    try {
      await updateProfile({
        ...profileData,
        educationItems: newItems,
      } as UserProfile);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
    }
  };

  const addJob = async () => {
    if (!newJob.trim()) return;

    const newItems = [...jobItems, { id: Date.now().toString(), text: newJob }];
    setJobItems(newItems);
    setNewJob("");
    setEditingField(null);

    try {
      await updateProfile({
        ...profileData,
        jobItems: newItems,
      } as UserProfile);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
    }
  };

  // 項目削除ハンドラー
  const removeEducation = async (id: string) => {
    const newItems = educationItems.filter((item) => item.id !== id);
    setEducationItems(newItems);

    try {
      await updateProfile({
        ...profileData,
        educationItems: newItems,
      } as UserProfile);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
    }
  };

  const removeJob = async (id: string) => {
    const newItems = jobItems.filter((item) => item.id !== id);
    setJobItems(newItems);

    try {
      await updateProfile({
        ...profileData,
        jobItems: newItems,
      } as UserProfile);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
    }
  };

  // 項目編集ハンドラー
  const saveEditingItem = async () => {
    if (!editingItem) return;

    if (editingField?.startsWith("education-")) {
      const newItems = educationItems.map((item) =>
        item.id === editingItem.id ? editingItem : item
      );
      setEducationItems(newItems);

      try {
        await updateProfile({
          ...profileData,
          educationItems: newItems,
        } as UserProfile);
      } catch (error) {
        console.error("プロフィール更新エラー:", error);
      }
    } else if (editingField?.startsWith("job-")) {
      const newItems = jobItems.map((item) =>
        item.id === editingItem.id ? editingItem : item
      );
      setJobItems(newItems);

      try {
        await updateProfile({
          ...profileData,
          jobItems: newItems,
        } as UserProfile);
      } catch (error) {
        console.error("プロフィール更新エラー:", error);
      }
    }

    setEditingItem(null);
    setEditingField(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    if (editingItem) {
      setEditingItem({ ...editingItem, text: value });
    }
  };

  const handleSave = async (field: string) => {
    try {
      const updatedData = {
        ...profileData,
        [field]: formData[field as keyof typeof formData],
      };

      await updateProfile(updatedData as UserProfile);
      setEditingField(null);
    } catch (error) {
      console.error("プロフィール更新エラー:", error);
    }
  };

  const handleCancel = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: profileData[field as keyof typeof profileData] || "",
    }));
    setEditingField(null);
    setEditingItem(null);
  };

  const renderEditButtons = (field: string) => (
    <div className="flex space-x-2 mt-2">
      <button
        onClick={() => handleCancel(field)}
        className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm flex items-center gap-1"
      >
        <FaTimes size={12} />
        <span>キャンセル</span>
      </button>
      <button
        onClick={() => handleSave(field)}
        className="px-3 py-1.5 bg-[#2B2A7D] hover:bg-[#3D37B2] text-white rounded-lg transition-colors text-sm flex items-center gap-1"
      >
        <FaCheck size={12} />
        <span>保存</span>
      </button>
    </div>
  );

  const renderItemEditButtons = () => (
    <div className="flex space-x-2 mt-2">
      <button
        onClick={() => {
          setEditingItem(null);
          setEditingField(null);
        }}
        className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm flex items-center gap-1"
      >
        <FaTimes size={12} />
        <span>キャンセル</span>
      </button>
      <button
        onClick={saveEditingItem}
        className="px-3 py-1.5 bg-[#2B2A7D] hover:bg-[#3D37B2] text-white rounded-lg transition-colors text-sm flex items-center gap-1"
      >
        <FaCheck size={12} />
        <span>保存</span>
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-10">
          プロフィール情報
        </h2>

        <ol className="relative border-l border-gray-200 space-y-12">
          {/* 学歴（複数） */}
          <li className="ml-6 pb-2">
            <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 bg-gray-100">
              <FaGraduationCap className="text-[#3D37B2]" />
            </span>
            <div className="pl-3 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">学歴</h3>

              {/* 学歴一覧 */}
              <div className="space-y-3">
                {educationItems.map((item) => (
                  <div key={item.id} className="group relative">
                    {editingField === `education-${item.id}` ? (
                      <div>
                        <input
                          type="text"
                          value={editingItem?.text || ""}
                          onChange={handleEditItemChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                          placeholder={placeholders.education}
                        />
                        {renderItemEditButtons()}
                      </div>
                    ) : (
                      <div className="flex items-start">
                        <p
                          className="flex-1 text-base font-normal text-gray-700 cursor-pointer hover:bg-gray-50 p-3 rounded-md"
                          onClick={() => {
                            setEditingField(`education-${item.id}`);
                            setEditingItem(item);
                          }}
                        >
                          {item.text}
                        </p>
                        <button
                          onClick={() => removeEducation(item.id)}
                          className="ml-2 text-gray-400 hover:text-red-500 hidden group-hover:block"
                          title="削除"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 学歴追加 */}
              {editingField === "add-education" ? (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <input
                    type="text"
                    value={newEducation}
                    onChange={(e) => setNewEducation(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                    placeholder="例: 〇〇大学 情報工学部 2023年卒業"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => {
                        setNewEducation("");
                        setEditingField(null);
                      }}
                      className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm flex items-center gap-1"
                    >
                      <FaTimes size={12} />
                      <span>キャンセル</span>
                    </button>
                    <button
                      onClick={addEducation}
                      className="px-3 py-1.5 bg-[#2B2A7D] hover:bg-[#3D37B2] text-white rounded-lg transition-colors text-sm flex items-center gap-1"
                    >
                      <FaPlus size={12} />
                      <span>追加</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setEditingField("add-education")}
                  className="mt-3 text-[#3D37B2] hover:text-[#2B2A7D] flex items-center gap-1 text-sm font-medium"
                >
                  <FaPlus size={12} />
                  <span>学歴を追加</span>
                </button>
              )}
            </div>
          </li>

          {/* 前職（複数） */}
          <li className="ml-6 pb-2">
            <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 bg-gray-100">
              <FaBriefcase className="text-[#3D37B2]" />
            </span>
            <div className="pl-3 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">前職</h3>

              {/* 前職一覧 */}
              <div className="space-y-3">
                {jobItems.map((item) => (
                  <div key={item.id} className="group relative">
                    {editingField === `job-${item.id}` ? (
                      <div>
                        <input
                          type="text"
                          value={editingItem?.text || ""}
                          onChange={handleEditItemChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                          placeholder={placeholders.previousJob}
                        />
                        {renderItemEditButtons()}
                      </div>
                    ) : (
                      <div className="flex items-start">
                        <p
                          className="flex-1 text-base font-normal text-gray-700 cursor-pointer hover:bg-gray-50 p-3 rounded-md"
                          onClick={() => {
                            setEditingField(`job-${item.id}`);
                            setEditingItem(item);
                          }}
                        >
                          {item.text}
                        </p>
                        <button
                          onClick={() => removeJob(item.id)}
                          className="ml-2 text-gray-400 hover:text-red-500 hidden group-hover:block"
                          title="削除"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 前職追加 */}
              {editingField === "add-job" ? (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <input
                    type="text"
                    value={newJob}
                    onChange={(e) => setNewJob(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                    placeholder="例: 株式会社〇〇 営業部 (2020年7月～2023年3月)"
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => {
                        setNewJob("");
                        setEditingField(null);
                      }}
                      className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-sm flex items-center gap-1"
                    >
                      <FaTimes size={12} />
                      <span>キャンセル</span>
                    </button>
                    <button
                      onClick={addJob}
                      className="px-3 py-1.5 bg-[#2B2A7D] hover:bg-[#3D37B2] text-white rounded-lg transition-colors text-sm flex items-center gap-1"
                    >
                      <FaPlus size={12} />
                      <span>追加</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setEditingField("add-job")}
                  className="mt-3 text-[#3D37B2] hover:text-[#2B2A7D] flex items-center gap-1 text-sm font-medium"
                >
                  <FaPlus size={12} />
                  <span>前職を追加</span>
                </button>
              )}
            </div>
          </li>

          {/* キャリアチェンジの理由 */}
          <li className="ml-6 pb-2">
            <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 bg-gray-100">
              <FaLightbulb className="text-[#3D37B2]" />
            </span>
            <div className="pl-3 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                キャリアチェンジの理由
              </h3>
              {editingField === "careerChange" ? (
                <div>
                  <textarea
                    name="careerChange"
                    value={formData.careerChange}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                    placeholder={placeholders.careerChange}
                  />
                  {renderEditButtons("careerChange")}
                </div>
              ) : (
                <p
                  className="text-base font-normal text-gray-700 mt-1 cursor-pointer hover:bg-gray-50 p-3 rounded-md"
                  onClick={() => setEditingField("careerChange")}
                >
                  {profileData.careerChange || placeholders.careerChange}
                </p>
              )}
            </div>
          </li>

          {/* 入社後の目標 */}
          <li className="ml-6 pb-2">
            <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 bg-gray-100">
              <FaRocket className="text-[#3D37B2]" />
            </span>
            <div className="pl-3 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                入社後の目標
              </h3>
              {editingField === "goals" ? (
                <div>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                    placeholder={placeholders.goals}
                  />
                  {renderEditButtons("goals")}
                </div>
              ) : (
                <p
                  className="text-base font-normal text-gray-700 mt-1 cursor-pointer hover:bg-gray-50 p-3 rounded-md"
                  onClick={() => setEditingField("goals")}
                >
                  {profileData.goals || placeholders.goals}
                </p>
              )}
            </div>
          </li>

          {/* ポートフォリオ情報 */}
          <li className="ml-6 pb-2">
            <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 bg-gray-100">
              <FaLaptop className="text-[#3D37B2]" />
            </span>
            <div className="pl-3 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ポートフォリオ
              </h3>
              {editingField === "portfolio" ? (
                <div>
                  <textarea
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                    placeholder={placeholders.portfolio}
                  />
                  <div className="mt-3">
                    <label
                      htmlFor="portfolioUrl"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ポートフォリオURL
                    </label>
                    <input
                      type="url"
                      id="portfolioUrl"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                      placeholder={placeholders.portfolioUrl}
                    />
                  </div>
                  {renderEditButtons("portfolio")}
                </div>
              ) : (
                <div
                  className="text-base font-normal text-gray-700 mt-1 cursor-pointer hover:bg-gray-50 p-3 rounded-md"
                  onClick={() => setEditingField("portfolio")}
                >
                  <p className="whitespace-pre-line mb-3">
                    {profileData.portfolio || placeholders.portfolio}
                  </p>
                  {(profileData.portfolioUrl || placeholders.portfolioUrl) && (
                    <div className="flex items-center mt-2 text-sm">
                      <FaGithub className="mr-1.5 text-gray-500" />
                      <a
                        href={
                          profileData.portfolioUrl || placeholders.portfolioUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3D37B2] hover:underline truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {profileData.portfolioUrl || placeholders.portfolioUrl}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </li>

          {/* 趣味・特技 */}
          <li className="ml-6 pb-2">
            <span className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 bg-gray-100">
              <FaHeart className="text-[#3D37B2]" />
            </span>
            <div className="pl-3 pt-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                趣味・特技
              </h3>
              {editingField === "hobbies" ? (
                <div>
                  <input
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3D37B2] focus:border-[#3D37B2] bg-white"
                    placeholder={placeholders.hobbies}
                  />
                  {renderEditButtons("hobbies")}
                </div>
              ) : (
                <p
                  className="text-base font-normal text-gray-700 mt-1 cursor-pointer hover:bg-gray-50 p-3 rounded-md"
                  onClick={() => setEditingField("hobbies")}
                >
                  {profileData.hobbies || placeholders.hobbies}
                </p>
              )}
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
