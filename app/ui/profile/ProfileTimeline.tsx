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
  FaEdit,
  FaPencilAlt,
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
  isReadOnly = false,
}: ProfileTimelineProps & { isReadOnly?: boolean }) {
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

  const handleStartEditing = (field: string) => {
    setEditingField(field);
  };

  const renderEditButton = (field: string) => {
    if (isReadOnly) return null;

    return (
      <button
        onClick={() => handleStartEditing(field)}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
      >
        <FaPencilAlt className="mr-1" size={12} />
        編集
      </button>
    );
  };

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
        className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-lg transition-colors text-sm flex items-center gap-1 shadow-sm"
      >
        <FaCheck size={12} />
        <span>保存</span>
      </button>
    </div>
  );

  // セクションの共通スタイル
  const sectionStyle = (
    icon: React.ReactNode,
    title: string,
    iconGradient: string
  ) => (
    <div className="relative mb-4 flex items-center">
      {/* アイコン背景円 - top位置を削除し、センタリングされるようにしました */}
      <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 bg-gradient-to-br from-white to-indigo-50/80 border border-indigo-100/50 shadow-sm">
        {/* アイコン自体 */}
        <div
          className="flex items-center justify-center w-7 h-7 rounded-full"
          style={{ background: iconGradient }}
        >
          {icon}
        </div>
      </div>

      {/* セクションタイトル - パディングを調整 */}
      <h3 className="text-lg font-bold pl-7 bg-gradient-to-r from-indigo-800 to-purple-700 text-transparent bg-clip-text">
        {title}
      </h3>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-indigo-900 to-indigo-600 bg-clip-text text-transparent">
        プロフィール情報
      </h2>

      <ol className="relative border-l border-indigo-100 space-y-12 pl-1">
        {/* 学歴（複数） */}
        <li className="ml-6 pb-2 relative">
          {sectionStyle(
            <FaGraduationCap className="text-indigo-600" />,
            "学歴",
            "bg-gradient-to-b from-indigo-600 to-indigo-400"
          )}

          {/* 学歴一覧 */}
          <div className="space-y-3">
            {educationItems.map((item) => (
              <div key={item.id} className="group relative">
                {editingField === `education-${item.id}` ? (
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-100 shadow-sm">
                    <input
                      type="text"
                      value={editingItem?.text || ""}
                      onChange={handleEditItemChange}
                      className="w-full p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
                      placeholder={placeholders.education}
                    />
                    {renderItemEditButtons()}
                  </div>
                ) : (
                  <div className="flex items-start group">
                    <div className="flex-1 bg-gradient-to-r from-white to-indigo-50/30 p-4 rounded-lg border border-indigo-100/50 shadow-sm hover:shadow transition-all duration-200 group-hover:-translate-y-0.5">
                      <div className="flex items-start justify-between">
                        <p className="flex-1 text-base font-medium text-gray-700">
                          {item.text}
                        </p>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => {
                              setEditingField(`education-${item.id}`);
                              setEditingItem(item);
                            }}
                            className="text-indigo-500 hover:text-indigo-700 transition-colors"
                            title="編集"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => removeEducation(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="削除"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 学歴追加 */}
          {editingField === "add-education" ? (
            <div className="mt-3 p-4 bg-gradient-to-r from-white to-indigo-50/30 rounded-lg border border-dashed border-indigo-200 shadow-sm">
              <input
                type="text"
                value={newEducation}
                onChange={(e) => setNewEducation(e.target.value)}
                className="w-full p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
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
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-lg transition-colors text-sm flex items-center gap-1 shadow-sm"
                >
                  <FaPlus size={12} />
                  <span>追加</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setEditingField("add-education")}
              className="mt-3 w-full p-2 flex items-center justify-center text-indigo-600 hover:text-indigo-800 bg-indigo-50/50 hover:bg-indigo-100/50 border border-dashed border-indigo-200 rounded-lg transition-colors group"
            >
              <FaPlus
                size={12}
                className="mr-2 group-hover:scale-110 transition-transform"
              />
              <span>学歴を追加</span>
            </button>
          )}
        </li>

        {/* 職歴（複数） */}
        <li className="ml-6 pb-2 relative">
          {sectionStyle(
            <FaBriefcase className="text-indigo-600" />,
            "職歴",
            "bg-gradient-to-b from-indigo-600 to-indigo-400"
          )}

          {/* 職歴一覧 */}
          <div className="space-y-3">
            {jobItems.map((item) => (
              <div key={item.id} className="group relative">
                {editingField === `job-${item.id}` ? (
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-100 shadow-sm">
                    <input
                      type="text"
                      value={editingItem?.text || ""}
                      onChange={handleEditItemChange}
                      className="w-full p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
                      placeholder={placeholders.previousJob}
                    />
                    {renderItemEditButtons()}
                  </div>
                ) : (
                  <div className="flex items-start group">
                    <div className="flex-1 bg-gradient-to-r from-white to-indigo-50/30 p-4 rounded-lg border border-indigo-100/50 shadow-sm hover:shadow transition-all duration-200 group-hover:-translate-y-0.5">
                      <div className="flex items-start justify-between">
                        <p className="flex-1 text-base font-medium text-gray-700">
                          {item.text}
                        </p>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => {
                              setEditingField(`job-${item.id}`);
                              setEditingItem(item);
                            }}
                            className="text-indigo-500 hover:text-indigo-700 transition-colors"
                            title="編集"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => removeJob(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="削除"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 職歴追加 */}
          {editingField === "add-job" ? (
            <div className="mt-3 p-4 bg-gradient-to-r from-white to-indigo-50/30 rounded-lg border border-dashed border-indigo-200 shadow-sm">
              <input
                type="text"
                value={newJob}
                onChange={(e) => setNewJob(e.target.value)}
                className="w-full p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
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
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-lg transition-colors text-sm flex items-center gap-1 shadow-sm"
                >
                  <FaPlus size={12} />
                  <span>追加</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setEditingField("add-job")}
              className="mt-3 w-full p-2 flex items-center justify-center text-indigo-600 hover:text-indigo-800 bg-indigo-50/50 hover:bg-indigo-100/50 border border-dashed border-indigo-200 rounded-lg transition-colors group"
            >
              <FaPlus
                size={12}
                className="mr-2 group-hover:scale-110 transition-transform"
              />
              <span>職歴を追加</span>
            </button>
          )}
        </li>

        {/* キャリアチェンジの理由 */}
        <li className="ml-6 pb-2 relative">
          {sectionStyle(
            <FaLightbulb className="text-indigo-600" />,
            "キャリアチェンジの理由",
            "bg-gradient-to-b from-indigo-600 to-indigo-400"
          )}

          {editingField === "careerChange" ? (
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-100 shadow-sm">
              <textarea
                name="careerChange"
                value={formData.careerChange}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
                placeholder={placeholders.careerChange}
              />
              {renderEditButton("careerChange")}
            </div>
          ) : (
            <div
              onClick={() => setEditingField("careerChange")}
              className="bg-gradient-to-r from-white to-indigo-50/30 p-4 rounded-lg border border-indigo-100/50 shadow-sm cursor-pointer hover:shadow transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="flex justify-between items-start">
                <p className="text-base text-gray-700 whitespace-pre-line">
                  {formData.careerChange || (
                    <span className="text-gray-400 italic">
                      キャリアチェンジの理由を入力してください
                    </span>
                  )}
                </p>
                <FaEdit
                  size={16}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-1"
                />
              </div>
            </div>
          )}
        </li>

        {/* 目標 */}
        <li className="ml-6 pb-2 relative">
          {sectionStyle(
            <FaRocket className="text-indigo-600" />,
            "目標",
            "bg-gradient-to-b from-indigo-600 to-indigo-400"
          )}

          {editingField === "goals" ? (
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-100 shadow-sm">
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
                placeholder={placeholders.goals}
              />
              {renderEditButton("goals")}
            </div>
          ) : (
            <div
              onClick={() => setEditingField("goals")}
              className="bg-gradient-to-r from-white to-indigo-50/30 p-4 rounded-lg border border-indigo-100/50 shadow-sm cursor-pointer hover:shadow transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="flex justify-between items-start">
                <p className="text-base text-gray-700 whitespace-pre-line">
                  {formData.goals || (
                    <span className="text-gray-400 italic">
                      目標を入力してください
                    </span>
                  )}
                </p>
                <FaEdit
                  size={16}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-1"
                />
              </div>
            </div>
          )}
        </li>

        {/* ポートフォリオ */}
        <li className="ml-6 pb-2 relative">
          {sectionStyle(
            <FaLaptop className="text-indigo-600" />,
            "ポートフォリオ",
            "bg-gradient-to-b from-indigo-600 to-indigo-400"
          )}

          <div className="space-y-4">
            {/* ポートフォリオの内容 */}
            {editingField === "portfolio" ? (
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-100 shadow-sm">
                <textarea
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
                  placeholder={placeholders.portfolio}
                />
                {renderEditButton("portfolio")}
              </div>
            ) : (
              <div
                onClick={() => setEditingField("portfolio")}
                className="bg-gradient-to-r from-white to-indigo-50/30 p-4 rounded-lg border border-indigo-100/50 shadow-sm cursor-pointer hover:shadow transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-start">
                  <p className="text-base text-gray-700 whitespace-pre-line">
                    {formData.portfolio || (
                      <span className="text-gray-400 italic">
                        ポートフォリオ情報を入力してください
                      </span>
                    )}
                  </p>
                  <FaEdit
                    size={16}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-1"
                  />
                </div>
              </div>
            )}

            {/* ポートフォリオURL */}
            {editingField === "portfolioUrl" ? (
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-100 shadow-sm">
                <div className="flex items-center">
                  <div className="bg-indigo-100/50 p-2 rounded-l-md border border-indigo-200">
                    <FaGithub size={20} className="text-indigo-700" />
                  </div>
                  <input
                    type="text"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    className="w-full p-2 border-y border-r border-indigo-200 rounded-r-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
                    placeholder={placeholders.portfolioUrl}
                  />
                </div>
                {renderEditButton("portfolioUrl")}
              </div>
            ) : (
              <div
                onClick={() => setEditingField("portfolioUrl")}
                className="bg-gradient-to-r from-white to-indigo-50/30 p-4 rounded-lg border border-indigo-100/50 shadow-sm cursor-pointer hover:shadow transition-all duration-200 hover:-translate-y-0.5 group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FaGithub size={20} className="text-indigo-600 mr-2" />
                    <span className="text-base text-gray-700">
                      {formData.portfolioUrl || (
                        <span className="text-gray-400 italic">
                          ポートフォリオのURLを入力してください
                        </span>
                      )}
                    </span>
                  </div>
                  <FaEdit
                    size={16}
                    className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                  />
                </div>
              </div>
            )}
          </div>
        </li>

        {/* 趣味 */}
        <li className="ml-6 pb-2 relative">
          {sectionStyle(
            <FaHeart className="text-indigo-600" />,
            "趣味・特技",
            "bg-gradient-to-b from-indigo-600 to-indigo-400"
          )}

          {editingField === "hobbies" ? (
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-100 shadow-sm">
              <textarea
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all"
                placeholder={placeholders.hobbies}
              />
              {renderEditButton("hobbies")}
            </div>
          ) : (
            <div
              onClick={() => setEditingField("hobbies")}
              className="bg-gradient-to-r from-white to-indigo-50/30 p-4 rounded-lg border border-indigo-100/50 shadow-sm cursor-pointer hover:shadow transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div className="flex justify-between items-start">
                <p className="text-base text-gray-700 whitespace-pre-line">
                  {formData.hobbies || (
                    <span className="text-gray-400 italic">
                      趣味・特技を入力してください
                    </span>
                  )}
                </p>
                <FaEdit
                  size={16}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-1"
                />
              </div>
            </div>
          )}
        </li>
      </ol>
    </div>
  );
}
