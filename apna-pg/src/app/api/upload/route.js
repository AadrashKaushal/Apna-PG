import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file") ;
  const userID = formData.get('userID');
  const type = formData.get('type');

  if (!file) {
    return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name); 
  const fileName = `${type}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", userID);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ success: true, url: `/${userID}/${fileName}`,type:type });
}