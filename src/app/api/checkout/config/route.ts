import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.XENDIT_SECRET_KEY || "";
  const mode = key.startsWith("xnd_development_") ? "development" : "production";
  return NextResponse.json({ mode });
}
