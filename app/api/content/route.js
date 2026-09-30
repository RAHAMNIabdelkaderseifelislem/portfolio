import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { getContent, saveContent, resetContent, validate } from "../../../lib/content";

export const dynamic = "force-dynamic";

function check(req) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return "unset";
  const got = req.headers.get("x-admin-password") || "";
  const a = crypto.createHash("sha256").update(got).digest();
  const b = crypto.createHash("sha256").update(pw).digest();
  return crypto.timingSafeEqual(a, b) ? "ok" : "bad";
}

function deny(state) {
  return state === "unset"
    ? NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 503 })
    : NextResponse.json({ error: "Wrong password." }, { status: 401 });
}

export async function GET() {
  return NextResponse.json(await getContent(), { headers: { "Cache-Control": "no-store" } });
}

// Password check only (used by the admin login screen)
export async function POST(req) {
  const s = check(req);
  return s === "ok" ? NextResponse.json({ ok: true }) : deny(s);
}

export async function PUT(req) {
  const s = check(req);
  if (s !== "ok") return deny(s);
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const err = validate(body);
  if (err) return NextResponse.json({ error: err }, { status: 400 });
  try {
    await saveContent(body);
  } catch {
    return NextResponse.json(
      { error: "Storage is only available on Netlify. Use Export JSON and replace data/content.json instead." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req) {
  const s = check(req);
  if (s !== "ok") return deny(s);
  try { await resetContent(); } catch {
    return NextResponse.json({ error: "Storage is only available on Netlify." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
