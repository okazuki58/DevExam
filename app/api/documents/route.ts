import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/db";

// GET: ドキュメント一覧を取得
export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("ドキュメント一覧取得エラー:", error);
    return NextResponse.json(
      { error: "ドキュメント一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// POST: 新規ドキュメントを作成
export async function POST(request: NextRequest) {
  try {
    // 管理者権限チェック
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "権限がありません" }, { status: 403 });
    }

    const data = await request.json();

    // バリデーション
    if (!data.title || !data.content || !data.category) {
      return NextResponse.json(
        { error: "必須項目が不足しています" },
        { status: 400 }
      );
    }

    // ドキュメント作成
    const document = await prisma.document.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        headerImage: data.headerImage || null,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("ドキュメント作成エラー:", error);
    return NextResponse.json(
      { error: "ドキュメントの作成に失敗しました" },
      { status: 500 }
    );
  }
}
