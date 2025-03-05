"use server";

import { prisma } from "../lib/prisma";

// ユーザーの統計情報を取得
export async function getUserStats(userId: string) {
  try {
    // ユーザーのクイズ結果を取得
    const quizResults = await prisma.quizResult.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
    });

    // クイズ名を追加
    const quizResultsWithNames = await Promise.all(
      quizResults.map(async (result) => {
        const quiz = await prisma.quiz.findUnique({
          where: { id: result.quizId },
          select: { name: true },
        });

        return {
          ...result,
          quizName: quiz ? quiz.name : "不明なテスト",
        };
      })
    );

    // ユーザーのバッジを取得
    const badges = await prisma.badge.findMany({
      where: { userId },
    });

    return { quizResults: quizResultsWithNames, badges };
  } catch (error) {
    console.error("ユーザー統計情報の取得に失敗しました:", error);
    throw new Error("ユーザー統計情報の取得に失敗しました");
  }
}
