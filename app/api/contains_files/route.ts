import { Mixedbread } from "@mixedbread/sdk";
import { NextResponse } from "next/server";

export async function GET() {
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

    if (!process.env.MXBAI_STORE_ID) {
      return NextResponse.json(
        { error: "Store identifier not configured" },
        { status: 500 },
      );
    }

    const response = await client.stores.files.list(
      process.env.MXBAI_STORE_ID,
      {
        limit: 1,
        include_total: false,
      },
    );

    return NextResponse.json({ containsFiles: response.data.length > 0 });
  } catch (error) {
    console.error("Files error:", error);
    return NextResponse.json({ containsFiles: false }, { status: 500 });
  }
}
