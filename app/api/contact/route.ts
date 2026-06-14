import { NextResponse } from "next/server";

/**
 * Contact form endpoint (stub).
 * Wire this to an email/CRM provider (Resend, Formspree, HubSpot, etc.)
 * by replacing the console.log with a provider call.
 */
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data?.name || !data?.email || !data?.message) {
    return NextResponse.json(
      { error: "name, email and message are required" },
      { status: 400 }
    );
  }

  console.log("[contact] new inquiry:", data);

  return NextResponse.json({ ok: true });
}
