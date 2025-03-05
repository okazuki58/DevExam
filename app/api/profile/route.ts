import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// プロフィール情報を取得
// プロフィール情報を取得
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  try {
    // ユーザーとその関連データを取得
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
        badges: true, // バッジを明示的に含める
        quizResults: {
          include: {
            quiz: true,
          },
          orderBy: {
            completedAt: "desc",
          },
        },
      },
    });

    // バッジデータを変換
    const badges = user?.badges.map((badge) => ({
      id: badge.id,
      name: badge.name,
      description: badge.description,
      imageUrl: badge.imageUrl,
      achievedAt: badge.achievedAt,
    }));

    return NextResponse.json({
      ...user?.profile,
      badges, // 整形したバッジデータをレスポンスに含める
      submissions: user?.quizResults,
    });
  } catch (error) {
    console.error("プロフィール取得エラー:", error);
    return NextResponse.json(
      { error: "プロフィール取得に失敗しました" },
      { status: 500 }
    );
  }
}

// プロフィール情報を更新
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  try {
    const data = await req.json();

    // バリデーション（簡易版）
    const {
      bio,
      motivation,
      githubUrl,
      twitterUrl,
      linkedinUrl,
      skills,
      education,
      occupation,
      portfolioUrl,
      desiredRole,
    } = data;

    // URLのバリデーション
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

    if (githubUrl && !urlPattern.test(githubUrl)) {
      return NextResponse.json(
        { error: "GitHubのURLが無効です" },
        { status: 400 }
      );
    }

    if (twitterUrl && !urlPattern.test(twitterUrl)) {
      return NextResponse.json(
        { error: "TwitterのURLが無効です" },
        { status: 400 }
      );
    }

    if (linkedinUrl && !urlPattern.test(linkedinUrl)) {
      return NextResponse.json(
        { error: "LinkedInのURLが無効です" },
        { status: 400 }
      );
    }

    if (portfolioUrl && !urlPattern.test(portfolioUrl)) {
      return NextResponse.json(
        { error: "ポートフォリオのURLが無効です" },
        { status: 400 }
      );
    }

    // ユーザーを取得
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // UserProfileをupsert（更新または作成）
    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {
        bio,
        motivation,
        githubUrl,
        twitterUrl,
        linkedinUrl,
        skills,
        education,
        occupation,
        portfolioUrl,
        desiredRole,
      },
      create: {
        userId: user.id,
        bio: bio || "",
        motivation: motivation || "",
        githubUrl: githubUrl || "",
        twitterUrl: twitterUrl || "",
        linkedinUrl: linkedinUrl || "",
        skills: skills || "",
        education: education || "",
        occupation: occupation || "",
        portfolioUrl: portfolioUrl || "",
        desiredRole: desiredRole || "",
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("プロフィール更新エラー:", error);
    return NextResponse.json(
      { error: "プロフィール更新に失敗しました" },
      { status: 500 }
    );
  }
}
