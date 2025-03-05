// 求人関連API関数
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

export async function getEligibleJobs() {
  const response = await fetch("/api/jobs/eligible");
  if (!response.ok) {
    throw new Error("応募資格のある求人の取得に失敗しました");
  }
  return response.json();
}
