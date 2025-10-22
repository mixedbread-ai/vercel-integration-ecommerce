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
        {file_path: "product-1.png", metadata: { name: "White pants", filename: "product-1.png" }},
        {file_path: "product-2.png", metadata: { name: "Blue pants", filename: "product-2.png" }},
        {file_path: "product-3.png", metadata: { name: "Bathrobe", filename: "product-3.png" }},
        {file_path: "product-4.png", metadata: { name: "Business pants", filename: "product-4.png" }},
        {file_path: "product-5.png", metadata: { name: "Gray Tank Top", filename: "product-5.png" }},
    ];
    for (const file of files) {
        const filePath = path.join(process.cwd(), "public", "sample-data", file.file_path);
        const fileContent = fs.readFileSync(filePath);
        await client.stores.files.uploadAndPoll(
            process.env.MXBAI_STORE_ID,
            new File([fileContent], file.file_path, { type: "image/png" }) as unknown as Uploadable,
            {
                metadata: file.metadata,
            }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Files error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
