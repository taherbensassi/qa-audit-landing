import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, company } = body;

  if (!name || !email || !company) {
    return NextResponse.json(
      { error: "Name, email, and company are required." },
      { status: 400 }
    );
  }

  // Log the demo request (replace with Resend / email service later)
  console.log("[demo-request]", { name, email, company, message: body.message });

  return NextResponse.json({ success: true });
}
