"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/lib/contexts/auth-context";
import { getJobs, getEligibleJobs } from "@/app/lib/jobs";
import { Job } from "@/app/lib/definitions";
import Navbar from "@/app/ui/navbar";
import JobCard from "@/app/ui/company/job-card";

type SalaryRange = {
  min: number;
  max: number;
  currency: string;
};

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<
    { id: string; name: string; logoUrl: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [salaryRange, setSalaryRange] = useState<{
    min?: number;
    max?: number;
  }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState({
    experienceLevel: "",
    employmentType: "",
    showEligibleOnly: false,
  });
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [experienceLevels, setExperienceLevels] = useState<string[]>([]);

  const toggleEmploymentType = (type: string) => {
    setEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleExperienceLevel = (level: string) => {
    setExperienceLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSalaryRange({});
    setEmploymentTypes([]);
    setExperienceLevels([]);
    setFilters({
      experienceLevel: "",
      employmentType: "",
      showEligibleOnly: false,
    });
  };

  // applyFilters関数をuseCallbackでメモ化
  const applyFilters = useCallback(
    (jobList: Job[]) => {
      let result = [...jobList];

      // 検索語句でフィルタリング
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        result = result.filter(
          (job) =>
            job.title.toLowerCase().includes(searchLower) ||
            job.description.toLowerCase().includes(searchLower) ||
            job.preferredSkills.some((skill) =>
              skill.toLowerCase().includes(searchLower)
            ) ||
            job.requirements.some((req) =>
              req.toLowerCase().includes(searchLower)
            )
        );
      }

      // 給与範囲でフィルタリング
      if (salaryRange.min) {
        result = result.filter(
          (job) => (job.salary as SalaryRange).min >= salaryRange.min!
        );
      }
      if (salaryRange.max) {
        result = result.filter(
          (job) => (job.salary as SalaryRange).max <= salaryRange.max!
        );
      }

      // 雇用形態でフィルタリング
      if (employmentTypes.length > 0) {
        result = result.filter((job) =>
          employmentTypes.includes(job.employmentType)
        );
      }

      // 経験レベルでフィルタリング
      if (experienceLevels.length > 0) {
        result = result.filter((job) =>
          experienceLevels.includes(job.experienceLevel)
        );
      }

      setFilteredJobs(result);
    },
    [searchTerm, salaryRange, employmentTypes, experienceLevels]
  );

  // 会社情報を取得する関数
  const fetchCompanies = async () => {
    try {
      const response = await fetch("/api/companies");
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error("会社情報の取得に失敗しました:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 全ての求人を取得
        const allJobs = await getJobs();
        setJobs(allJobs);

        // 会社情報を取得
        await fetchCompanies();

        // 初期表示用にフィルタリングを適用
        applyFilters(allJobs);
      } catch (error) {
        console.error("求人情報の取得に失敗しました:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [applyFilters]);

  // フィルターの変更時に求人を再フィルタリング
  useEffect(() => {
    applyFilters(jobs);
  }, [
    searchTerm,
    salaryRange,
    employmentTypes,
    experienceLevels,
    jobs,
    applyFilters,
  ]);

  // 応募資格のある求人のみを表示する関数
  const fetchEligibleJobs = async () => {
    if (!user?.quizResults) return;

    try {
      setIsLoading(true);
      const eligibleJobs = await getEligibleJobs();
      setFilteredJobs(eligibleJobs);
    } catch (error) {
      console.error("応募資格のある求人の取得に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 応募資格のある求人のみ表示の切り替え
  const handleEligibleToggle = (checked: boolean) => {
    setFilters((prev) => ({ ...prev, showEligibleOnly: checked }));

    if (checked) {
      fetchEligibleJobs();
    } else {
      applyFilters(jobs);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">求人一覧</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* 左側の絞り込みパネル */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h2 className="font-semibold text-lg mb-4">絞り込み検索</h2>

              {/* キーワード検索 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  キーワード
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="職種、スキルなど"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* 雇用形態 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  雇用形態
                </label>
                <div className="space-y-2">
                  {["full-time", "part-time", "contract", "internship"].map(
                    (type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600"
                          checked={employmentTypes.includes(type)}
                          onChange={() => toggleEmploymentType(type)}
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {type === "full-time"
                            ? "正社員"
                            : type === "part-time"
                            ? "パートタイム"
                            : type === "contract"
                            ? "契約社員"
                            : "インターンシップ"}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* 経験レベル */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  経験レベル
                </label>
                <div className="space-y-2">
                  {["entry", "mid", "senior"].map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600"
                        checked={experienceLevels.includes(level)}
                        onChange={() => toggleExperienceLevel(level)}
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {level === "entry"
                          ? "未経験・エントリー"
                          : level === "mid"
                          ? "中級者"
                          : "シニア"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 給与範囲 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  給与範囲（万円/年）
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="最小"
                    value={salaryRange.min || ""}
                    onChange={(e) =>
                      setSalaryRange({
                        ...salaryRange,
                        min: Number(e.target.value),
                      })
                    }
                  />
                  <span>〜</span>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="最大"
                    value={salaryRange.max || ""}
                    onChange={(e) =>
                      setSalaryRange({
                        ...salaryRange,
                        max: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* 応募資格のある求人のみ表示 */}
              {user && (
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600"
                      checked={filters.showEligibleOnly}
                      onChange={(e) => handleEligibleToggle(e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      応募資格のある求人のみ表示
                    </span>
                  </label>
                </div>
              )}

              {/* リセットボタン */}
              <button
                onClick={resetFilters}
                className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 mt-2"
              >
                絞り込みをリセット
              </button>
            </div>
          </div>

          {/* 右側の求人カード一覧 */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    company={companies.find((c) => c.id === job.companyId)}
                    userQuizResults={user?.quizResults}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">
                  条件に一致する求人が見つかりませんでした。
                </p>
                <p className="text-gray-500 mt-2">
                  検索条件を変更してお試しください。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
