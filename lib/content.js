import fallback from "../data/content.json";

const NAME = "portfolio";
const KEY = "content";

async function store() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: NAME, consistency: "strong" });
}

async function assetStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "portfolio-assets", consistency: "strong" });
}

export const ASSET_KINDS = ["photo", "cv"];

// Metadata of uploaded photo / resume ({ updated, type, size, name }), empty when nothing is uploaded
export async function getAssetMeta() {
  const out = {};
  try {
    const a = await assetStore();
    const metas = await Promise.all(ASSET_KINDS.map((k) => a.getMetadata(k)));
    ASSET_KINDS.forEach((k, i) => { if (metas[i]?.metadata) out[k] = metas[i].metadata; });
  } catch {
    /* no Netlify Blobs here (local dev) */
  }
  return out;
}

export async function putAsset(kind, data, metadata) {
  const a = await assetStore();
  await a.set(kind, data, { metadata });
}
export async function getAsset(kind) {
  const a = await assetStore();
  return a.getWithMetadata(kind, { type: "arrayBuffer" });
}
export async function deleteAsset(kind) {
  const a = await assetStore();
  await a.delete(kind);
}

export async function getContent() {
  let base = fallback;
  try {
    const s = await store();
    const saved = await s.get(KEY, { type: "json" });
    if (saved && typeof saved === "object") base = { ...fallback, ...saved };
  } catch {
    /* no Netlify Blobs here (local dev): use bundled data */
  }
  const { assets: _ignored, ...rest } = base;
  return { ...rest, assets: await getAssetMeta() };
}

export async function saveContent(obj) {
  const { assets: _ignored, ...rest } = obj; // assets are managed only by uploads
  const s = await store();
  await s.setJSON(KEY, rest);
}

export async function resetContent() {
  const s = await store();
  await s.delete(KEY);
}

export function validate(c) {
  const obj = (v) => v && typeof v === "object" && !Array.isArray(v);
  if (!obj(c)) return "Content must be an object.";
  for (const k of ["stats", "papers", "courses", "experience"]) {
    if (!Array.isArray(c[k])) return `"${k}" must be a list.`;
  }
  for (const k of ["evolution", "capabilities", "researchMap"]) {
    if (c[k] !== undefined && !Array.isArray(c[k])) return `"${k}" must be a list.`;
  }
  for (const k of ["profile", "contact", "cv"]) {
    if (c[k] !== undefined && !obj(c[k])) return `"${k}" must be an object.`;
  }
  if (c.contact) {
    for (const k of ["links", "services"]) {
      if (c.contact[k] !== undefined && !Array.isArray(c.contact[k])) return `contact.${k} must be a list.`;
    }
  }
  if (c.cv) {
    for (const k of ["experience", "education", "certifications"]) {
      if (c.cv[k] !== undefined && !Array.isArray(c.cv[k])) return `cv.${k} must be a list.`;
    }
  }
  if (c.experience.some((e) => !obj(e) || (e.lines !== undefined && !Array.isArray(e.lines)))) return "Every experience entry needs valid details.";
  if (c.papers.some((p) => !obj(p) || typeof p.title !== "string" || !p.title.trim())) return "Every paper needs a title.";
  if (c.courses.some((x) => !obj(x) || typeof x.title !== "string" || !x.title.trim())) return "Every course needs a title.";
  if (JSON.stringify(c).length > 300000) return "Content is too large.";
  return null;
}

export function safeUrl(u) {
  return typeof u === "string" && /^(https?:\/\/|mailto:|\/)/i.test(u.trim()) ? u.trim() : "#";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function fmtDate(year, month) {
  const m = MONTHS[parseInt(month, 10) - 1];
  return m ? `${m} ${year}` : `${year || ""}`;
}
