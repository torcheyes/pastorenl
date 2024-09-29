import { NextRequest, NextResponse } from "next/server";
import { getProductsByCategory } from "@controllers/product.controller";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { category?: string } },
) {
  try {
    const category = params.category || "All";
    const products = await getProductsByCategory(category);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return NextResponse.json(
      { error: "Failed to fetch products by category" },
      { status: 500 },
    );
  }
}

// path: src/app/api/products/category/category/route.ts
