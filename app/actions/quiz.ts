"use server";

import { prisma } from "../lib/prisma";
import { Quiz, QuizResult, Badge } from "../lib/definitions";

// すべてのクイズを取得
export async function getQuizzes(): Promise<Quiz[]> {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        badge: true,
        questions: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return quizzes as unknown as Quiz[];
  } catch (error) {
    console.error("クイズの取得に失敗しました:", error);
    throw new Error("クイズの取得に失敗しました");
  }
}

// IDでクイズを取得
export async function getQuizById(id: string): Promise<Quiz | null> {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        badge: true,
        questions: true,
      },
    });

    return quiz as unknown as Quiz | null;
  } catch (error) {
    console.error(`ID: ${id} のクイズの取得に失敗しました:`, error);
    throw new Error("クイズの取得に失敗しました");
  }
}

// テスト結果の保存とバッジ獲得処理
export async function saveQuizResult(
  userId: string,
  quizId: string,
  score: number,
  maxScore: number
): Promise<{ quizResult: QuizResult; newBadge: Badge | null }> {
  try {
    // クイズが存在するか確認
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { badge: true },
    });

    if (!quiz) {
      throw new Error("テストが見つかりません");
    }

    // 結果を作成
    const quizResult = await prisma.quizResult.create({
      data: {
        quizId,
        userId,
        score,
        maxScore,
        completedAt: new Date(),
      },
    });

    // バッジ処理
    let newBadge: Badge | null = null;
    const scorePercentage = (score / maxScore) * 100;

    // すでにバッジを持っているか確認
    const existingBadge = await prisma.badge.findFirst({
      where: {
        userId,
        quizId,
      },
    });

    // バッジ獲得条件（クイズIDによって異なる）
    if (!existingBadge && quiz.badge) {
      let badgeEarned = false;

      if (quizId === "quiz-001" && scorePercentage >= 80) {
        badgeEarned = true;
      } else if (quizId === "quiz-002" && scorePercentage === 100) {
        badgeEarned = true;
      } else if (scorePercentage >= 80) {
        // その他のクイズは80%以上で獲得
        badgeEarned = true;
      }

      // バッジを獲得した場合、DBに保存
      if (badgeEarned) {
        newBadge = await prisma.badge.create({
          data: {
            userId,
            quizId,
            name: quiz.badge.name,
            description: quiz.badge.description,
            imageUrl: quiz.badge.imageUrl,
            achievedAt: new Date(),
          },
        });
      }
    }

    return {
      quizResult: {
        ...quizResult,
        quizName: quiz.name,
      } as unknown as QuizResult,
      newBadge,
    };
  } catch (error) {
    console.error("テスト結果の保存に失敗しました:", error);
    throw new Error("テスト結果の保存に失敗しました");
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    
    return categories;
  } catch (error) {
    console.error("カテゴリの取得に失敗しました:", error);
    throw new Error("カテゴリの取得に失敗しました");
  }
}