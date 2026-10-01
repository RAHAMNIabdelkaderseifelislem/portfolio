"use client";
import { useEffect, useId, useRef, useState } from "react";

/* ---------- what a new entry looks like ---------- */
const BLANK = {
  stats: { value: "", label: "" },
  papers: { title: "", authors: "", venue: "", type: "Conference paper", year: "", month: "", pages: "", doi: "", isbn: "", url: "", tags: [] },
  courses: { year: "", semester: "1st semester", title: "", level: "", institution: "", department: "", scope: "", parts: [], status: "assigned", note: "" },
  experience: { org: "", role: "", period: "", lines: [["Problem", ""], ["System", ""], ["Result", ""]], footnote: "" },
  evolution: { date: "", text: "" },
  researchMap: { label: "", note: "" }
};

/* ---------- which inputs each kind of entry has ---------- */
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
  ],
  experience: [
    ["org", "Organization"], ["role", "Role"], ["period", "Period and place (e.g. 06/2025 – present · Remote)"],
    ["lines", "Details", "tuples", { labels: ["Label", "Text"], noun: "detail" }], ["footnote", "Footnote (optional)"]
  ],
  evolution: [["date", "Date and venue (e.g. Sep 2026 · SN Computer Science)"], ["text", "What happened", "area"]],
  researchMap: [["label", "Branch"], ["note", "Short note (papers, topics)"]]
};

const TITLE = {
  stats: (s) => `${s.value} — ${s.label}`,
  papers: (p) => `${p.year} · ${p.title}`,
  courses: (x) => `${x.year} ${x.semester} · ${x.title}`,
  experience: (e) => `${e.org} — ${e.role}`,
  evolution: (e) => `${e.date}`,
  researchMap: (m) => m.label
};

const moveIn = (arr, i, d) => {
  const j = i + d; if (j < 0 || j >= arr.length) return arr;
  const n = [...arr]; [n[i], n[j]] = [n[j], n[i]]; return n;
};

/* ---------- inputs ---------- */
function Field({ def, value, onChange }) {
  const [key, label, kind, extra] = def;
  const id = useId();
  if (kind === "tuples") return (<div><p className="sub">{label}</p><TupleList items={value || []} onChange={onChange} {...extra} /></div>);
  if (kind === "strings") return (<div><p className="sub">{label}</p><StringList items={value || []} onChange={onChange} {...extra} /></div>);
  const common = { id, value: kind === "list" ? (value || []).join(", ") : value ?? "" };
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {kind === "area" ? (
        <textarea {...common} onChange={(e) => onChange(e.target.value)} />
      ) : kind === "select" ? (
        <select {...common} onChange={(e) => onChange(e.target.value)}>{extra.map((o) => <option key={o}>{o}</option>)}</select>
      ) : (
        <input {...common} onChange={(e) => onChange(kind === "list" ? e.target.value.split(",").map((s) => s.trim()).filter(Boolean) : e.target.value)} />
      )}
    </div>
  );
}

function RowButtons({ i, items, onChange }) {
  return (
    <>
      <button className="btn" aria-label="Move up" onClick={() => onChange(moveIn(items, i, -1))}>↑</button>
      <button className="btn" aria-label="Move down" onClick={() => onChange(moveIn(items, i, 1))}>↓</button>
      <button className="btn d" aria-label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button>
    </>
  );
}

// list of plain strings (certifications, CV lines, about paragraphs)
function StringList({ items, onChange, noun = "item", area = false }) {
  return (
    <div>
      {items.map((t, i) => (
        <div className="srow" key={i}>
          {area ? <textarea aria-label={noun} value={t} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
                : <input aria-label={noun} value={t} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />}
          <RowButtons i={i} items={items} onChange={onChange} />
        </div>
      ))}
      <div className="row"><button className="btn" onClick={() => onChange([...items, ""])}>+ Add {noun}</button></div>
    </div>
  );
}

// list of small records like [label, text] or [name, url, description]
function TupleList({ items, onChange, labels, noun = "row", area = true }) {
  const upd = (i, j, v) => onChange(items.map((t, a) => (a === i ? labels.map((_, b) => (b === j ? v : t[b] ?? "")) : t)));
  return (
    <div>
      {items.map((t, i) => (
        <div className="tuple" key={i}>
          <div className="g2">
            {labels.map((l, j) => {
              const last = j === labels.length - 1 && area;
              return (
                <div key={j} style={last && labels.length > 2 ? { gridColumn: "1 / -1" } : undefined}>
                  <Field def={[String(j), l, last ? "area" : "text"]} value={t[j]} onChange={(v) => upd(i, j, v)} />
                </div>
              );
            })}
          </div>
          <div className="row"><RowButtons i={i} items={items} onChange={onChange} /></div>
        </div>
      ))}
      <div className="row"><button className="btn" onClick={() => onChange([...items, labels.map(() => "")])}>+ Add {noun}</button></div>
    </div>
  );
}

// list of full entries (papers, courses, experience ...)
function ObjList({ kind, items, onChange }) {
  const upd = (i, k, v) => onChange(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  return (
    <div>
      <div className="row"><button className="btn p" onClick={() => onChange([structuredClone(BLANK[kind]), ...items])}>+ Add new (at top)</button></div>
      {items.map((it, i) => (
        <details key={i}>
          <summary>{TITLE[kind](it) || "(untitled)"}</summary>
          <div className="g2">
            {FIELDS[kind].map((d) => (
              <div key={d[0]} style={d[2] === "area" || d[2] === "tuples" ? { gridColumn: "1 / -1" } : undefined}>
                <Field def={d} value={it[d[0]]} onChange={(v) => upd(i, d[0], v)} />
              </div>
            ))}
          </div>
          <div className="row">
            <RowButtons i={i} items={items} onChange={onChange} />
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


const TABS = [
  ["overview", "Overview"], ["stats", "Stats"], ["papers", "Papers"], ["courses", "Courses"], ["experience", "Experience"],
  ["cv", "CV lists"], ["skills", "Skills"], ["research", "Research"], ["text", "Headline & about"], ["contact", "Contact"],
  ["files", "Photo & resume"], ["raw", "Raw JSON"]
];
const DRAFT = "adm-draft";
const strip = (c) => { const { assets, ...rest } = c; return rest; }; // eslint-disable-line no-unused-vars

export default function Admin() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [c, setC] = useState(null);
  const [tab, setTab] = useState("overview");
  const [msg, setMsg] = useState(null);
  const [raw, setRaw] = useState("");
  const [dirty, setDirty] = useState(false);
  const [draft, setDraft] = useState(null);
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

  // keep unsaved work in this browser so a refresh or crash never loses it
  useEffect(() => { if (dirty && c) localStorage.setItem(DRAFT, JSON.stringify(strip(c))); }, [dirty, c]);

  async function login(p) {
    setMsg(null);
    const r = await fetch("/api/content", { method: "POST", headers: { "x-admin-password": p } });
    if (!r.ok) { setMsg({ e: true, t: (await r.json()).error || "Login failed." }); sessionStorage.removeItem("adm"); return; }
    sessionStorage.setItem("adm", p); setPw(p);
    setC(await (await fetch("/api/content", { cache: "no-store" })).json());
    try { const d = localStorage.getItem(DRAFT); if (d) setDraft(JSON.parse(d)); } catch {}
    setAuthed(true);
  }

  const set = (k) => (v) => { setC((p) => ({ ...p, [k]: v })); setDirty(true); };
  const setIn = (k, sub) => (v) => { setC((p) => ({ ...p, [k]: { ...(p[k] || {}), [sub]: v } })); setDirty(true); };

  async function save(obj = c) {
    setMsg(null);
    const r = await fetch("/api/content", { method: "PUT", headers: { "x-admin-password": pw, "Content-Type": "application/json" }, body: JSON.stringify(strip(obj)) });
    const j = await r.json();
    if (r.ok) { setDirty(false); localStorage.removeItem(DRAFT); setMsg({ t: "Saved. The public site shows the change on next load." }); }
    else setMsg({ e: true, t: j.error || "Save failed." });
  }
  function exportJson() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(strip(c), null, 2)], { type: "application/json" }));
    a.download = "content.json"; a.click();
  }
  function applyRaw() {
    try { setC((p) => ({ ...JSON.parse(raw), assets: p.assets })); setDirty(true); setMsg({ t: "JSON applied. Press Save to publish." }); }
    catch { setMsg({ e: true, t: "That is not valid JSON." }); }
  }
  function syncStats() {
    const next = c.stats.map((s) => /paper/i.test(s.label) ? { ...s, value: String(c.papers.length) } : /teaching|course/i.test(s.label) ? { ...s, value: String(c.courses.length) } : s);
    set("stats")(next); setMsg({ t: "Updated the paper and teaching counts from your lists. Press Save to publish." });
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

  const cv = c.cv || {};
  const ct = c.contact || {};
  const pr = c.profile || {};
  const counts = [
    ["papers", c.papers.length, "Papers"], ["courses", c.courses.length, "Courses"], ["experience", c.experience.length, "Experience"],
    ["cv", (cv.certifications || []).length, "Certifications"], ["skills", (c.capabilities || []).length, "Skill areas"],
    ["research", (c.evolution || []).length, "Timeline entries"], ["stats", c.stats.length, "Stats"], ["contact", (ct.links || []).length, "Profile links"]
  ];

  return (
    <div className="ad">
      <h1>Portfolio dashboard</h1>
      <p className="mute">Edit anything, then press Save. <a href="/" target="_blank" rel="noreferrer">Open site</a></p>
      {draft && (
        <div className="msg">
          Unsaved edits from an earlier session were found in this browser.{" "}
          <button className="btn" onClick={() => { setC((p) => ({ ...draft, assets: p.assets })); setDirty(true); setDraft(null); }}>Restore</button>{" "}
          <button className="btn" onClick={() => { localStorage.removeItem(DRAFT); setDraft(null); }}>Discard</button>
        </div>
      )}
      <div className="tabs" role="tablist">
        {TABS.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => { setTab(k); if (k === "raw") setRaw(JSON.stringify(strip(c), null, 2)); }}>{l}</button>
        ))}
      </div>
      {msg && <div className={`msg ${msg.e ? "e" : "s"}`}>{msg.t}</div>}

      {tab === "overview" && (
        <div>
          <p className="mute">What is on your site right now. Click a card to edit it. New paper, course, job or certificate? Open its tab, add it, press Save.</p>
          <div className="grid">{counts.map(([k, n, l]) => (<button key={l} className="ovc" onClick={() => setTab(k)}><b>{n}</b>{l}</button>))}</div>
        </div>
      )}
      {tab === "stats" && (
        <div>
          <div className="row"><button className="btn" onClick={syncStats}>Set paper and teaching counts from my lists</button></div>
          <ObjList kind="stats" items={c.stats} onChange={set("stats")} />
        </div>
      )}
      {tab === "papers" && <ObjList kind="papers" items={c.papers} onChange={set("papers")} />}
      {tab === "courses" && <ObjList kind="courses" items={c.courses} onChange={set("courses")} />}
      {tab === "experience" && <ObjList kind="experience" items={c.experience} onChange={set("experience")} />}
      {tab === "cv" && (
        <div>
          <Field def={["h", "CV headline"]} value={cv.headline} onChange={setIn("cv", "headline")} />
          <Field def={["e", "Experience lines", "strings", { noun: "line" }]} value={cv.experience} onChange={setIn("cv", "experience")} />
          <Field def={["d", "Education", "strings", { noun: "degree" }]} value={cv.education} onChange={setIn("cv", "education")} />
          <Field def={["c", "Certifications & achievements", "strings", { noun: "certification" }]} value={cv.certifications} onChange={setIn("cv", "certifications")} />
          <Field def={["f", "Fallback PDF file name in public/ (only used if no resume is uploaded)"]} value={cv.file} onChange={setIn("cv", "file")} />
        </div>
      )}
      {tab === "skills" && <TupleList items={c.capabilities || []} onChange={set("capabilities")} labels={["Area", "Skills (comma separated text)"]} noun="skill area" />}
      {tab === "research" && (
        <div>
          <Field def={["a", "Research focus", "area"]} value={pr.researchFocus} onChange={setIn("profile", "researchFocus")} />
          <Field def={["b", "Research areas", "area"]} value={pr.researchAreas} onChange={setIn("profile", "researchAreas")} />
          <p className="sub">Research map</p>
          <Field def={["r", "Center of the map"]} value={pr.researchRoot} onChange={setIn("profile", "researchRoot")} />
          <ObjList kind="researchMap" items={c.researchMap || []} onChange={set("researchMap")} />
          <p className="sub">Research evolution (timeline)</p>
          <ObjList kind="evolution" items={c.evolution || []} onChange={set("evolution")} />
        </div>
      )}
      {tab === "text" && (
        <div>
          <div className="g2">
            <Field def={["n", "Full name"]} value={pr.name} onChange={setIn("profile", "name")} />
            <Field def={["s", "Short name (navigation bar)"]} value={pr.shortName} onChange={setIn("profile", "shortName")} />
          </div>
          <Field def={["k", "Line above the headline"]} value={pr.kicker} onChange={setIn("profile", "kicker")} />
          <Field def={["h", "Headline", "area"]} value={pr.headline} onChange={setIn("profile", "headline")} />
          <Field def={["i", "Intro", "area"]} value={pr.intro} onChange={setIn("profile", "intro")} />
          <Field def={["p", "About paragraphs", "strings", { noun: "paragraph", area: true }]} value={pr.aboutParagraphs} onChange={setIn("profile", "aboutParagraphs")} />
        </div>
      )}
      {tab === "contact" && (
        <div>
          <div className="g2">
            <Field def={["a", "Academic email"]} value={ct.academicEmail} onChange={setIn("contact", "academicEmail")} />
            <Field def={["p", "Professional email"]} value={ct.professionalEmail} onChange={setIn("contact", "professionalEmail")} />
            <Field def={["w", "WhatsApp number (digits, with country code)"]} value={ct.whatsapp} onChange={setIn("contact", "whatsapp")} />
          </div>
          <p className="sub">Profile links</p>
          <TupleList items={ct.links || []} onChange={setIn("contact", "links")} labels={["Name", "URL (https://…)", "Short description"]} noun="link" />
          <p className="sub">WhatsApp buttons</p>
          <TupleList items={ct.services || []} onChange={setIn("contact", "services")} labels={["Button text", "Phrase in the message (…interested in your service: X)"]} noun="button" area={false} />
        </div>
      )}
      {tab === "files" && (
        <FilesPanel c={c} pw={pw} setMsg={setMsg}
          reload={async () => { const n = await (await fetch("/api/content", { cache: "no-store" })).json(); setC((prev) => ({ ...prev, assets: n.assets })); }} />
      )}
      {tab === "raw" && (
        <div>
          <p className="mute">Advanced: the whole site as JSON.</p>
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
          if (r.ok) { setC(await (await fetch("/api/content", { cache: "no-store" })).json()); setDirty(false); localStorage.removeItem(DRAFT); setMsg({ t: "Reset to built-in data." }); }
          else setMsg({ e: true, t: (await r.json()).error });
        }}>Reset to built-in</button>
        <button className="btn" onClick={() => { sessionStorage.removeItem("adm"); location.reload(); }}>Sign out</button>
      </div>
    </div>
  );
}
