import { Mixedbread } from "@mixedbread/sdk";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 },
    );
  }

  if (!process.env.MXBAI_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  try {
    const client = new Mixedbread({
      apiKey: process.env.MXBAI_API_KEY,
    });

    const response = await client.stores.search({
      query,
      store_identifiers: ["vercel-integration-ecom"],
      top_k: 20,
      search_options: {
        return_metadata: true,
      },
    });

    return NextResponse.json({ results: response.data || [] });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}
