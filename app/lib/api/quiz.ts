import { Quiz } from "../definitions";

// クイズ関連API関数
export async function fetchQuizzes() {
  try {
    const response = await fetch("/api/quizzes");
    if (!response.ok) throw new Error("クイズの取得に失敗しました");
    return response.json();
  } catch (error) {
    console.error("クイズ取得エラー:", error);
    return [];
  }
}

export async function fetchQuizById(id: string) {
  try {
    const response = await fetch(`/api/quizzes/${id}`);
    if (!response.ok) throw new Error("クイズの取得に失敗しました");
    return response.json();
  } catch (error) {
    console.error(`クイズID:${id}の取得エラー:`, error);
    return null;
  }
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

export async function fetchCategories() {
  try {
    // クイズデータから動的にカテゴリリストを生成
    const quizzes = await fetchQuizzes();

    // 重複のないカテゴリリストを抽出
    const categoryMap: Record<string, number> = {};
    quizzes.forEach((quiz: Quiz) => {
      const cat = quiz.category;
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    // QuizCategory型に変換して返す
    return Object.keys(categoryMap).map((categoryName) => ({
      id: categoryName,
      name: categoryName,
      description: "", // 必要に応じて設定
      imageUrl: "", // 必要に応じて設定
      quizCount: categoryMap[categoryName],
    }));
  } catch (error) {
    console.error("カテゴリ生成中にエラーが発生しました:", error);
    return []; // エラー時は空の配列を返す
  }
}
