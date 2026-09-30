"use client";
import { useEffect, useId, useRef, useState } from "react";

const BLANK = {
  stats: { value: "", label: "" },
  papers: { title: "", authors: "", venue: "", type: "Conference paper", year: "", month: "", pages: "", doi: "", isbn: "", url: "", tags: [] },
  courses: { year: "", semester: "1st semester", title: "", level: "", institution: "", department: "", scope: "", parts: [], status: "assigned", note: "" }
};

const FIELDS = {
  stats: [["value", "Value (e.g. 70+)"], ["label", "Label"]],
  papers: [
    ["title", "Title (never reword)", "area"], ["authors", "Authors", "area"], ["venue", "Venue / publisher"],
    ["type", "Type"], ["year", "Year"], ["month", "Month (01-12)"], ["pages", "Pages"], ["doi", "DOI (without https://doi.org/)"],
    ["isbn", "ISBN"], ["url", "Other link (https://…)"], ["tags", "Tags (comma separated)", "list"]
  ],
  courses: [
    ["year", "Academic year (e.g. 2026–2027)"], ["semester", "Semester"], ["title", "Course title"], ["level", "Level / specialty"],
    ["institution", "University"], ["department", "Department / faculty"], ["scope", "Scope (e.g. Full module, TD only)"],
    ["parts", "Parts (comma separated: Course, TD, TP, Exam)", "list"],
    ["status", "Status", "select", ["completed", "assigned", "pending"]], ["note", "Note (optional)"]
  ]
};

function Field({ def, value, onChange }) {
  const [key, label, kind, opts] = def;
  const id = useId();
  const common = { id, value: kind === "list" ? (value || []).join(", ") : value ?? "" };
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {kind === "area" ? (
        <textarea {...common} onChange={(e) => onChange(e.target.value)} />
      ) : kind === "select" ? (
        <select {...common} onChange={(e) => onChange(e.target.value)}>{opts.map((o) => <option key={o}>{o}</option>)}</select>
      ) : (
        <input {...common} onChange={(e) => onChange(kind === "list" ? e.target.value.split(",").map((s) => s.trim()).filter(Boolean) : e.target.value)} />
      )}
    </div>
  );
}

function ListEditor({ kind, items, setItems, titleOf }) {
  const upd = (i, k, v) => setItems(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  const move = (i, d) => {
    const j = i + d; if (j < 0 || j >= items.length) return;
    const n = [...items]; [n[i], n[j]] = [n[j], n[i]]; setItems(n);
  };
  return (
    <div>
      <div className="row"><button className="btn p" onClick={() => setItems([{ ...BLANK[kind] }, ...items])}>+ Add new (at top)</button></div>
      {items.map((it, i) => (
        <details key={i}>
          <summary>{titleOf(it) || "(untitled)"}</summary>
          <div className="g2">{FIELDS[kind].map((d) => (
            <div key={d[0]} style={d[2] === "area" ? { gridColumn: "1 / -1" } : undefined}>
              <Field def={d} value={it[d[0]]} onChange={(v) => upd(i, d[0], v)} />
            </div>
          ))}</div>
          <div className="row">
            <button className="btn" onClick={() => move(i, -1)}>↑ Up</button>
            <button className="btn" onClick={() => move(i, 1)}>↓ Down</button>
            <button className="btn d" onClick={() => confirm("Delete this entry?") && setItems(items.filter((_, j) => j !== i))}>Delete</button>
          </div>
        </details>
      ))}
    </div>
  );
}


function resizeImage(file, max = 1000) {
  return createImageBitmap(file).then((bmp) => {
    const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const cv = document.createElement("canvas");
    cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
    cv.getContext("2d").drawImage(bmp, 0, 0, cv.width, cv.height);
    return new Promise((res, rej) => cv.toBlob((b) => (b ? res(b) : rej(new Error("toBlob"))), "image/jpeg", 0.88));
  });
}

function FilesPanel({ c, pw, reload, setMsg }) {
  const [busy, setBusy] = useState(false);
  const photo = c.assets?.photo;
  const cv = c.assets?.cv;
  const when = (m) => new Date(m.updated).toLocaleString();

  async function send(kind, body, type, name) {
    setBusy(true); setMsg(null);
    try {
      const r = await fetch(`/api/asset/${kind}`, { method: "PUT", headers: { "x-admin-password": pw, "Content-Type": type, "x-filename": name || "" }, body });
      const j = await r.json().catch(() => ({}));
      if (r.ok) { await reload(); setMsg({ t: kind === "photo" ? "Photo updated." : "Resume updated." }); }
      else setMsg({ e: true, t: j.error || "Upload failed." });
    } catch { setMsg({ e: true, t: "Upload failed. Check your connection." }); }
    setBusy(false);
  }
  async function remove(kind) {
    if (!confirm("Remove the uploaded file and go back to the default?")) return;
    setBusy(true); setMsg(null);
    const r = await fetch(`/api/asset/${kind}`, { method: "DELETE", headers: { "x-admin-password": pw } });
    const j = await r.json().catch(() => ({}));
    if (r.ok) { await reload(); setMsg({ t: "Removed." }); } else setMsg({ e: true, t: j.error || "Could not remove." });
    setBusy(false);
  }
  async function pickPhoto(e) {
    const f = e.target.files?.[0]; e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) return setMsg({ e: true, t: "Choose an image file (JPG, PNG or WebP)." });
    try { await send("photo", await resizeImage(f), "image/jpeg"); }
    catch { setMsg({ e: true, t: "This browser could not read that image. Try a JPG or PNG." }); }
  }
  async function pickCv(e) {
    const f = e.target.files?.[0]; e.target.value = "";
    if (!f) return;
    if (!/\.pdf$/i.test(f.name)) return setMsg({ e: true, t: "The resume must be a PDF." });
    if (f.size > 4.5 * 1024 * 1024) return setMsg({ e: true, t: "PDF is over 4.5 MB. Compress it and try again." });
    await send("cv", f, "application/pdf", f.name);
  }

  return (
    <div className="g2">
      <div className="filebox">
        <h3>Photo</h3>
        <div className="ph" style={{ margin: "12px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo ? `/api/asset/photo?v=${photo.updated}` : "/photo.jpg"} alt="Current portrait" onError={(e) => (e.currentTarget.style.display = "none")} />
          <span>No photo</span>
        </div>
        <p className="meta">{photo ? `Uploaded ${when(photo)}` : "Nothing uploaded. The site uses public/photo.jpg if it exists."}</p>
        <label htmlFor="photo-in">Choose JPG, PNG or WebP (resized to 1000 px in your browser)</label>
        <input id="photo-in" type="file" accept="image/*" onChange={pickPhoto} disabled={busy} />
        {photo && <div className="row"><button className="btn d" onClick={() => remove("photo")} disabled={busy}>Remove uploaded photo</button></div>}
      </div>
      <div className="filebox">
        <h3>Resume (PDF)</h3>
        <p className="meta" style={{ margin: "12px 0" }}>
          {cv ? <>Uploaded {when(cv)} · {(cv.size / 1024).toFixed(0)} KB · <a href={`/api/asset/cv?v=${cv.updated}`} target="_blank" rel="noreferrer">Open</a></> : "Nothing uploaded. The site links to the PDF in public/ named in data/content.json."}
        </p>
        <label htmlFor="cv-in">Choose a PDF, 4.5 MB maximum</label>
        <input id="cv-in" type="file" accept="application/pdf,.pdf" onChange={pickCv} disabled={busy} />
        {cv && <div className="row"><button className="btn d" onClick={() => remove("cv")} disabled={busy}>Remove uploaded resume</button></div>}
      </div>
    </div>
  );
}

export default function Admin() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [c, setC] = useState(null);
  const [tab, setTab] = useState("stats");
  const [msg, setMsg] = useState(null);
  const [raw, setRaw] = useState("");
  const [dirty, setDirty] = useState(false);

  const dirtyRef = useRef(false);
  dirtyRef.current = dirty;

  useEffect(() => {
    const saved = sessionStorage.getItem("adm");
    if (saved) login(saved);
    const warn = (e) => { if (dirtyRef.current) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
    // eslint-disable-next-line
  }, []);
  async function login(p) {
    setMsg(null);
    const r = await fetch("/api/content", { method: "POST", headers: { "x-admin-password": p } });
    if (!r.ok) { setMsg({ e: true, t: (await r.json()).error || "Login failed." }); sessionStorage.removeItem("adm"); return; }
    sessionStorage.setItem("adm", p); setPw(p);
    setC(await (await fetch("/api/content", { cache: "no-store" })).json());
    setAuthed(true);
  }

  const edit = (k) => (items) => { setC({ ...c, [k]: items }); setDirty(true); };
  const editProfile = (k, v) => { setC({ ...c, profile: { ...c.profile, [k]: v } }); setDirty(true); };

  async function save(obj = c) {
    setMsg(null);
    const r = await fetch("/api/content", { method: "PUT", headers: { "x-admin-password": pw, "Content-Type": "application/json" }, body: JSON.stringify(obj) });
    const j = await r.json();
    if (r.ok) { setDirty(false); setMsg({ t: "Saved. The public site shows the change on next load." }); }
    else setMsg({ e: true, t: j.error || "Save failed." });
  }
  function exportJson() {
    const { assets, ...rest } = c; // eslint-disable-line no-unused-vars
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(rest, null, 2)], { type: "application/json" }));
    a.download = "content.json"; a.click();
  }
  function applyRaw() {
    try { setC(JSON.parse(raw)); setDirty(true); setMsg({ t: "JSON applied. Press Save to publish." }); }
    catch { setMsg({ e: true, t: "That is not valid JSON." }); }
  }

  if (!authed) {
    return (
      <div className="ad">
        <h1>Admin</h1>
        <p className="mute">Enter the admin password set in Netlify (ADMIN_PASSWORD).</p>
        <label htmlFor="pw">Password</label>
        <input id="pw" type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login(pw)} autoComplete="current-password" />
        <div className="row"><button className="btn p" onClick={() => login(pw)}>Sign in</button></div>
        {msg && <div className={`msg ${msg.e ? "e" : "s"}`}>{msg.t}</div>}
      </div>
    );
  }

  const tabs = [["stats", "Stats"], ["papers", "Papers"], ["courses", "Courses"], ["profile", "Text"], ["files", "Photo & resume"], ["raw", "Raw JSON"]];
  return (
    <div className="ad">
      <h1>Portfolio admin</h1>
      <p className="mute">Edit, then press Save. <a href="/" target="_blank">Open site</a></p>
      <div className="tabs" role="tablist">
        {tabs.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => { setTab(k); if (k === "raw") { const { assets, ...rest } = c; setRaw(JSON.stringify(rest, null, 2)); } }}>{l}</button>
        ))}
      </div>
      {msg && <div className={`msg ${msg.e ? "e" : "s"}`}>{msg.t}</div>}

      {tab === "stats" && <ListEditor kind="stats" items={c.stats} setItems={edit("stats")} titleOf={(s) => `${s.value} — ${s.label}`} />}
      {tab === "papers" && <ListEditor kind="papers" items={c.papers} setItems={edit("papers")} titleOf={(p) => `${p.year} · ${p.title}`} />}
      {tab === "courses" && <ListEditor kind="courses" items={c.courses} setItems={edit("courses")} titleOf={(x) => `${x.year} ${x.semester} · ${x.title}`} />}
      {tab === "profile" && (
        <div>
          {[["kicker", "Kicker line"], ["headline", "Headline", "area"], ["intro", "Intro", "area"], ["researchFocus", "Research focus", "area"], ["researchAreas", "Research areas", "area"]].map(([k, l, a]) => (
            <Field key={k} def={[k, l, a]} value={c.profile?.[k]} onChange={(v) => editProfile(k, v)} />
          ))}
          <Field def={["about", "About paragraphs (one per line)", "area"]} value={(c.profile?.aboutParagraphs || []).join("\n")} onChange={(v) => editProfile("aboutParagraphs", v.split("\n").filter(Boolean))} />
        </div>
      )}
      {tab === "files" && (
        <FilesPanel c={c} pw={pw} setMsg={setMsg}
          reload={async () => { const n = await (await fetch("/api/content", { cache: "no-store" })).json(); setC((prev) => ({ ...prev, assets: n.assets })); }} />
      )}
      {tab === "raw" && (
        <div>
          <p className="mute">Advanced: experience, CV, contact links and everything else live here.</p>
          <textarea style={{ minHeight: 420, fontFamily: "var(--mono)", fontSize: 13 }} value={raw} onChange={(e) => setRaw(e.target.value)} aria-label="Raw JSON" />
          <div className="row"><button className="btn" onClick={applyRaw}>Apply JSON</button></div>
        </div>
      )}

      <div className="bar">
        <button className="btn p" onClick={() => save()}>Save{dirty ? " *" : ""}</button>
        <button className="btn" onClick={exportJson}>Export JSON</button>
        <button className="btn d" onClick={async () => {
          if (!confirm("Discard all admin edits and return to the built-in data?")) return;
          const r = await fetch("/api/content", { method: "DELETE", headers: { "x-admin-password": pw } });
          if (r.ok) { setC(await (await fetch("/api/content", { cache: "no-store" })).json()); setDirty(false); setMsg({ t: "Reset to built-in data." }); }
          else setMsg({ e: true, t: (await r.json()).error });
        }}>Reset to built-in</button>
        <button className="btn" onClick={() => { sessionStorage.removeItem("adm"); location.reload(); }}>Sign out</button>
      </div>
    </div>
  );
}
