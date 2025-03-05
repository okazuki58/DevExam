import { NextResponse } from "next/server";
import { getCategories } from "@/app/actions/quiz";

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("カテゴリの取得に失敗しました:", error);
    return NextResponse.json(
      { error: "カテゴリの取得に失敗しました" },
      { status: 500 }
    );
  }
}
