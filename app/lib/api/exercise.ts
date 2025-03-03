// 演習関連API関数
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
