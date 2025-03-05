import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "ユーザーIDが指定されていません" },
        { status: 400 }
      );
    }

    // ユーザーを取得
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // ユーザープロフィールを取得
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
    });

    // バッジを取得
    const badges = await prisma.badge.findMany({
      where: { userId },
    });

    // 演習提出を取得
    const submissions = await prisma.exerciseSubmission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // 結合したプロフィールデータを返す
    return NextResponse.json({
      ...userProfile,
      name: user.name,
      email: user.email,
      image: user.image,
      badges,
      submissions,
    });
  } catch (error) {
    console.error("プロフィール取得エラー:", error);
    return NextResponse.json(
      { error: "プロフィール取得に失敗しました" },
      { status: 500 }
    );
  }
}
