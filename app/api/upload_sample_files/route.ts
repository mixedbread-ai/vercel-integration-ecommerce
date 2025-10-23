import { Mixedbread, Uploadable } from "@mixedbread/sdk";
import { type NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
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

    const files = [
        {file_path: "images.mxjson"},
    ];
    for (const file of files) {
        const filePath = path.join(process.cwd(), "public", "sample-data", file.file_path);
        const fileContent = fs.readFileSync(filePath);
        await client.stores.files.uploadAndPoll(
            process.env.MXBAI_STORE_ID,
            new File([fileContent], file.file_path, { type: "image/png" }) as unknown as Uploadable,
            {
                metadata: {},
            }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Files error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
