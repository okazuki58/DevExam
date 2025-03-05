import { UserProfile } from "@/app/lib/definitions";

// プロフィール取得関数
export async function fetchUserProfile() {
  try {
    // userId は使用せず、単純に /api/profile にリクエスト
    const response = await fetch("/api/profile");

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API エラー詳細:", errorData);
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("プロフィール取得エラー詳細:", error);
    throw new Error("Failed to fetch profile");
  }
}

// プロフィール更新関数
export async function updateUserProfile(userId: string, data: UserProfile) {
  const response = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
}
