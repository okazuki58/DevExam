import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/db";

// GET: 特定のドキュメントを取得
export async function GET(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    const document = await prisma.document.findUnique({
      where: {
        id: params.documentId,
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "ドキュメントが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error("ドキュメント取得エラー:", error);
    return NextResponse.json(
      { error: "ドキュメントの取得に失敗しました" },
      { status: 500 }
    );
  }
}

// PUT: ドキュメントを更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
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

    // ドキュメント更新
    const document = await prisma.document.update({
      where: {
        id: params.documentId,
      },
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        headerImage: data.headerImage,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("ドキュメント更新エラー:", error);
    return NextResponse.json(
      { error: "ドキュメントの更新に失敗しました" },
      { status: 500 }
    );
  }
}

// DELETE: ドキュメントを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { documentId: string } }
) {
  try {
    // 管理者権限チェック
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "権限がありません" }, { status: 403 });
    }

    // ドキュメント削除
    await prisma.document.delete({
      where: {
        id: params.documentId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ドキュメント削除エラー:", error);
    return NextResponse.json(
      { error: "ドキュメントの削除に失敗しました" },
      { status: 500 }
    );
  }
}
