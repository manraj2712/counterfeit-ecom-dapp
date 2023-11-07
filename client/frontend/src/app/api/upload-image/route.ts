import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  const { path } = await req.json();

  if (!path) {
    return NextResponse.json({ error: "No path provided" }, { status: 400 });
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      __dirname: "/ecommerce"
    };

    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
