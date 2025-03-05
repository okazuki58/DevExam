import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    // 管理者権限チェック
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "権限がありません" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "ファイルが不足しています" },
        { status: 400 }
      );
    }

    // ファイル名を設定
    const fileName = `document-${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    // ディレクトリを確実に作成
    const uploadDir = join(process.cwd(), "public", "images", "documents");
    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, fileName);

    // ファイルを保存
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // 公開URL
    const fileUrl = `/images/documents/${fileName}`;

    return NextResponse.json({
      fileUrl,
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "ファイルのアップロードに失敗しました" },
      { status: 500 }
    );
  }
}
