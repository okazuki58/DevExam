// クライアントサイドAPI関数

// クイズ関連
export async function fetchQuizzes() {
  const response = await fetch("/api/quizzes");
  if (!response.ok) throw new Error("クイズの取得に失敗しました");
  return response.json();
}

export async function fetchQuizById(id: string) {
  const response = await fetch(`/api/quizzes/${id}`);
  if (!response.ok) throw new Error("クイズの取得に失敗しました");
  return response.json();
}

export async function submitQuizResult(
  userId: string,
  quizId: string,
  score: number,
  maxScore: number
) {
  const response = await fetch("/api/quizzes/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, quizId, score, maxScore }),
  });

  if (!response.ok) throw new Error("テスト結果の保存に失敗しました");
  return response.json();
}

// 演習関連（client-exercises.ts から移行）
export async function getExercises() {
  const response = await fetch("/api/exercises");
  if (!response.ok) {
    throw new Error("演習の取得に失敗しました");
  }
  return response.json();
}

export async function getExerciseById(id: string) {
  const response = await fetch(`/api/exercises/${id}`);
  if (!response.ok) {
    throw new Error("演習の取得に失敗しました");
  }
  return response.json();
}

export async function getJobs(filters?: {
  category?: string;
  location?: string;
  jobType?: string;
  skill?: string[];
  minSalary?: number;
  maxSalary?: number;
  remote?: boolean;
  sortBy?: "newest" | "salary" | "relevance";
  page?: number;
  limit?: number;
}) {
  let url = "/api/jobs";

  if (filters) {
    const params = new URLSearchParams();

    if (filters.category) params.append("category", filters.category);
    if (filters.location) params.append("location", filters.location);
    if (filters.jobType) params.append("jobType", filters.jobType);
    if (filters.skill && filters.skill.length > 0) {
      filters.skill.forEach((s) => params.append("skill", s));
    }
    if (filters.minSalary)
      params.append("minSalary", filters.minSalary.toString());
    if (filters.maxSalary)
      params.append("maxSalary", filters.maxSalary.toString());
    if (filters.remote !== undefined)
      params.append("remote", filters.remote.toString());
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());

    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("求人の取得に失敗しました");
  }
  return response.json();
}

export async function getJobById(jobId: string) {
  const response = await fetch(`/api/jobs/${jobId}`);
  if (!response.ok) {
    throw new Error("求人情報の取得に失敗しました");
  }
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch("/api/categories");
  if (!response.ok) throw new Error("カテゴリの取得に失敗しました");
  return response.json();
}

// ユーザーのテスト結果に基づいて応募可能な求人を取得する関数
export async function getEligibleJobs() {
  const response = await fetch("/api/jobs/eligible");
  if (!response.ok) {
    throw new Error("応募資格のある求人の取得に失敗しました");
  }

  return response.json();
}