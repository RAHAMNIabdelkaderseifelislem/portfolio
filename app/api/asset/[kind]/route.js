import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { ASSET_KINDS, putAsset, getAsset, deleteAsset } from "../../../../lib/content";

export const dynamic = "force-dynamic";

const LIMITS = { photo: 3 * 1024 * 1024, cv: 4.5 * 1024 * 1024 }; // Netlify functions accept ~6 MB bodies

function authState(req) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return "unset";
  const got = req.headers.get("x-admin-password") || "";
  const a = crypto.createHash("sha256").update(got).digest();
  const b = crypto.createHash("sha256").update(pw).digest();
  return crypto.timingSafeEqual(a, b) ? "ok" : "bad";
}
const deny = (s) =>
  s === "unset"
    ? NextResponse.json({ error: "ADMIN_PASSWORD is not set on the server." }, { status: 503 })
    : NextResponse.json({ error: "Wrong password." }, { status: 401 });

// Decide the file type from its bytes, never from what the browser claims
function sniff(buf, kind) {
  const b = new Uint8Array(buf.slice(0, 12));
  const is = (...sig) => sig.every((v, i) => b[i] === v);
  if (kind === "cv") return is(0x25, 0x50, 0x44, 0x46) ? "application/pdf" : null; // %PDF
  if (is(0xff, 0xd8, 0xff)) return "image/jpeg";
  if (is(0x89, 0x50, 0x4e, 0x47)) return "image/png";
  if (is(0x52, 0x49, 0x46, 0x46) && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return "image/webp";
  return null;
}

export async function GET(req, { params }) {
  const { kind } = await params;
  if (!ASSET_KINDS.includes(kind)) return new NextResponse("Not found", { status: 404 });
  try {
    const r = await getAsset(kind);
    if (!r || !r.data) return new NextResponse("Not found", { status: 404 });
    const m = r.metadata || {};
    const versioned = new URL(req.url).searchParams.has("v");
    const headers = {
      "Content-Type": m.type || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": versioned ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate"
    };
    if (kind === "cv") headers["Content-Disposition"] = `inline; filename="${m.name || "CV.pdf"}"`;
    return new NextResponse(r.data, { headers });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}

export async function PUT(req, { params }) {
  const s = authState(req);
  if (s !== "ok") return deny(s);
  const { kind } = await params;
  if (!ASSET_KINDS.includes(kind)) return NextResponse.json({ error: "Unknown file type." }, { status: 404 });

  const buf = await req.arrayBuffer();
  if (!buf.byteLength) return NextResponse.json({ error: "Empty file." }, { status: 400 });
  if (buf.byteLength > LIMITS[kind]) {
    return NextResponse.json({ error: `File too large (max ${(LIMITS[kind] / 1048576).toFixed(1)} MB).` }, { status: 413 });
  }
  const type = sniff(buf, kind);
  if (!type) {
    return NextResponse.json({ error: kind === "cv" ? "That is not a PDF." : "That is not a JPG, PNG or WebP image." }, { status: 400 });
  }
  let name = String(req.headers.get("x-filename") || "").replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 100);
  if (kind === "cv" && !/\.pdf$/i.test(name)) name = "CV.pdf";

  const meta = { type, size: buf.byteLength, updated: Date.now(), name };
  try {
    await putAsset(kind, buf, meta);
  } catch {
    return NextResponse.json({ error: "Storage is only available on Netlify. Deploy first, then upload from /admin." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, ...meta });
}

export async function DELETE(req, { params }) {
  const s = authState(req);
  if (s !== "ok") return deny(s);
  const { kind } = await params;
  if (!ASSET_KINDS.includes(kind)) return NextResponse.json({ error: "Unknown file type." }, { status: 404 });
  try {
    await deleteAsset(kind);
  } catch {
    return NextResponse.json({ error: "Storage is only available on Netlify." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
