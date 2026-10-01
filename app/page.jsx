import { getContent, safeUrl, fmtDate } from "../lib/content";
import { ThemeToggle, Portrait } from "../components/Client";

export const dynamic = "force-dynamic";

function Star({ className = "star" }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="8" y="8" width="24" height="24" fill="none" stroke="var(--saffron)" strokeWidth="2.5" />
      <rect x="8" y="8" width="24" height="24" fill="none" stroke="var(--acc)" strokeWidth="2.5" transform="rotate(45 20 20)" />
    </svg>
  );
}

function LoopDiagram() {
  return (
    <svg className="lp" viewBox="0 0 340 340" role="img" aria-label="The self-improvement loop: propose, act, reflect, revise">
      <circle className="ring" cx="170" cy="170" r="110" />
      <g className="spin"><circle cx="170" cy="60" r="8" fill="var(--saffron)" stroke="var(--card)" strokeWidth="2" /></g>
      <circle className="node" cx="170" cy="60" r="34" /><text x="170" y="64" textAnchor="middle">propose</text>
      <circle className="node" cx="280" cy="170" r="34" /><text x="280" y="174" textAnchor="middle">act</text>
      <circle className="node" cx="170" cy="280" r="34" /><text x="170" y="284" textAnchor="middle">reflect</text>
      <circle className="node" cx="60" cy="170" r="34" /><text x="60" y="174" textAnchor="middle">revise</text>
    </svg>
  );
}

const STATUS = { completed: ["Completed", "ok"], assigned: ["Assigned", "up"], pending: ["Charge pending", ""] };

function groupCourses(courses) {
  const years = [];
  for (const c of courses) {
    let y = years.find((x) => x.year === c.year);
    if (!y) years.push((y = { year: c.year, sems: [] }));
    let s = y.sems.find((x) => x.name === c.semester);
    if (!s) y.sems.push((s = { name: c.semester, items: [] }));
    s.items.push(c);
  }
  return years.sort((a, b) => String(b.year).localeCompare(String(a.year)));
}

const dateKey = (p) => `${p.year || "0000"}-${String(p.month || "00").padStart(2, "0")}`;

export default async function Home() {
  const c = await getContent();
  const p = c.profile || {};
  const papers = [...c.papers].sort((a, b) => dateKey(b).localeCompare(dateKey(a)));
  const years = groupCourses(c.courses);
  const ct = c.contact || {};
  const photoSrc = c.assets?.photo ? `/api/asset/photo?v=${c.assets.photo.updated}` : "/photo.jpg";
  const cvHref = c.assets?.cv ? `/api/asset/cv?v=${c.assets.cv.updated}` : `/${c.cv?.file}`;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: p.name,
        jobTitle: "Lead AI Engineer; PhD candidate in Computer Science (Artificial Intelligence); University lecturer",
        email: `mailto:${ct.professionalEmail}`,
        knowsAbout: ["Autonomous AI agents", "Self-improving agents", "Large language models", "Multi-agent systems", "Retrieval-augmented generation"],
        sameAs: (ct.links || []).map((l) => l[1]),
        affiliation: [{ "@type": "Organization", name: "University Centre of Naama" }, { "@type": "Organization", name: "University of Saida" }]
      },
      ...papers.map((x) => ({
        "@type": "ScholarlyArticle",
        name: x.title,
        datePublished: x.month ? `${x.year}-${x.month}` : x.year,
        ...(x.doi ? { sameAs: `https://doi.org/${x.doi}` } : {}),
        author: String(x.authors).split(",").map((n) => ({ "@type": "Person", name: n.trim() }))
      }))
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <header>
        <nav aria-label="Main">
          <b><Star />{p.shortName}</b>
          {["home", "research", "publications", "teaching", "engineering", "resume", "about", "contact"].map((s) => (
            <a key={s} href={`#${s}`}>{s[0].toUpperCase() + s.slice(1)}</a>
          ))}
          <ThemeToggle />
        </nav>
      </header>
      <main>
        <section id="home" style={{ paddingTop: 56 }}>
          <div className="w">
            <div className="hero">
              <div>
                <p className="k">{p.kicker}</p>
                <h1>{p.headline}</h1>
                <p className="mute lead">{p.name} — {p.intro}</p>
                <div className="btns">
                  <a className="b p" href="#research">Read the research</a>
                  <a className="b" href="#contact">Work with me</a>
                </div>
                <p className="links">
                  {(ct.links || []).map((l, i) => (
                    <span key={l[0]}>{i ? " · " : ""}<a href={safeUrl(l[1])}>{l[0]}</a></span>
                  ))}
                </p>
              </div>
              <LoopDiagram />
            </div>
            {c.stats?.length > 0 && (
              <div className="stats">
                {c.stats.map((s, i) => (<div key={i}><b>{s.value}</b><span>{s.label}</span></div>))}
              </div>
            )}
          </div>
        </section>

        <section id="research">
          <div className="w">
            <h2>Autonomous, self-improving agents</h2>
            <div className="two">
              <div>
                <p><b>Focus.</b> {p.researchFocus}</p>
                <p><b>Areas.</b> {p.researchAreas}</p>
              </div>
              <div className="map" role="img" aria-label="Research map">
                <div><i className="r">{p.researchRoot || "Intelligent agents"}</i></div>
                {(c.researchMap || []).map((m, i) => (
                  <div key={i}>→ <i>{m.label}</i> <span className="mute">{m.note}</span></div>
                ))}
              </div>
            </div>
            <h3 style={{ margin: "36px 0 16px" }}>Research evolution</h3>
            <ol className="tl">
              {(c.evolution || []).map((e, i) => (
                <li key={i}><span className="d">{e.date}</span><br />{e.text}</li>
              ))}
            </ol>
          </div>
        </section>

        <section id="publications">
          <div className="w">
            <h2>Published work</h2>
            <p className="mute">Published papers, book chapters and conference contributions. DOIs are linked where assigned.</p>
            {papers.map((x, i) => (
              <article className="pub" key={i}>
                <div className="st">● Published<br /><span className="meta">{fmtDate(x.year, x.month)}</span></div>
                <div>
                  <h3>{x.title}</h3>
                  <div className="meta">
                    {x.authors}<br />
                    {[x.venue, x.type, x.pages && `pp. ${x.pages}`, x.isbn && `ISBN ${x.isbn}`].filter(Boolean).join(" · ")}
                    {x.doi && <> · <a href={`https://doi.org/${encodeURIComponent(x.doi).replace(/%2F/g, "/")}`}>DOI {x.doi}</a></>}
                    {x.url && <> · <a href={safeUrl(x.url)}>Link</a></>}
                  </div>
                  {(x.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="teaching">
          <div className="w">
            <h2>University teaching</h2>
            <p className="mute">Courses, tutorials (TD) and practical work (TP) at the universities of Naama and Saida.</p>
            {years.map((y) => (
              <div key={y.year}>
                <p className="yr">{y.year}</p>
                {y.sems.map((s) => (
                  <div key={s.name}>
                    <p className="sem">{s.name}</p>
                    {s.items.map((x, i) => {
                      const [label, cls] = STATUS[x.status] || STATUS.completed;
                      return (
                        <article className="course" key={i}>
                          <div>
                            <h3>{x.title}</h3>
                            <div className="meta">{x.level} · {x.institution}{x.department ? `, ${x.department}` : ""}</div>
                            <div className="meta">{x.scope}{x.parts?.length ? ` (${x.parts.join(" + ")})` : ""}{x.note ? ` · ${x.note}` : ""}</div>
                          </div>
                          <span className={`badge ${cls}`}>{label}</span>
                        </article>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="engineering">
          <div className="w">
            <h2>What gets built and shipped</h2>
            <div className="grid">
              {c.experience.map((e, i) => (
                <div key={i}>
                  <h3>{e.org}</h3>
                  <p className="meta">{e.role} · {e.period}</p>
                  <p>
                    {(e.lines || []).map((l, j) => (<span key={j}><b>{l[0]}.</b> {l[1]}<br /></span>))}
                  </p>
                  {e.footnote && <p className="meta">{e.footnote}</p>}
                </div>
              ))}
            </div>
            <h3 style={{ margin: "36px 0 14px" }}>Capabilities</h3>
            <dl>
              {(c.capabilities || []).map((r, i) => (<span key={i}><dt>{r[0]}</dt><dd>{r[1]}</dd></span>))}
            </dl>
            <h3 style={{ margin: "36px 0 14px" }}>Research ↔ engineering</h3>
            <p>Research asks what agents can become. Engineering finds out what survives contact with production.</p>
            <div className="loop">
              {["Research", "Architecture", "Implementation", "Experiment", "Deployment", "Improvement"].map((x) => <span key={x}>{x}</span>)}
            </div>
          </div>
        </section>

        <section id="resume">
          <div className="w">
            <h2>Curriculum vitae</h2>
            <div className="btns" style={{ marginTop: 0 }}>
              <a className="b p" href={cvHref} download={c.cv?.file}>Download Resume / CV (PDF)</a>
            </div>
            <div className="cv" style={{ marginTop: 22 }}>
              <h3 style={{ marginTop: 0 }}>{p.name}</h3>
              <div className="meta">{c.cv?.headline}</div>
              <h3>Experience</h3><ul>{(c.cv?.experience || []).map((x, i) => <li key={i}>{x}</li>)}</ul>
              <h3>Education</h3><ul>{(c.cv?.education || []).map((x, i) => <li key={i}>{x}</li>)}</ul>
              <h3>Certifications &amp; achievements</h3><ul>{(c.cv?.certifications || []).map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="w">
            <h2>Why intelligent agents</h2>
            <div className="aboutrow">
              <div>{(p.aboutParagraphs || []).map((t, i) => <p key={i}>{t}</p>)}</div>
              <Portrait alt={`Portrait of ${p.name}`} src={photoSrc} />
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="w">
            <h2>Get in touch</h2>
            <div className="grid" style={{ marginBottom: 26 }}>
              <div><h3>Academic</h3><p>Research collaboration, supervision, reviewing.</p><a href={`mailto:${ct.academicEmail}`}>{ct.academicEmail}</a></div>
              <div><h3>Professional</h3><p>Engineering and consulting work.</p><a href={`mailto:${ct.professionalEmail}`}>{ct.professionalEmail}</a></div>
            </div>
            <h3 style={{ marginBottom: 12 }}>Start a WhatsApp conversation</h3>
            <div className="wa">
              {(ct.services || []).map((s) => (
                <a key={s[0]} className="b" target="_blank" rel="noopener noreferrer"
                   href={`https://wa.me/${String(ct.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Seif El Islem, I'm interested in your service: ${s[1]}. I'd like to discuss a potential project.`)}`}>{s[0]}</a>
              ))}
            </div>
            <h3 style={{ margin: "30px 0 12px" }}>Profiles</h3>
            <div className="grid">
              {(ct.links || []).map((l) => (
                <div key={l[0]}><h3><a href={safeUrl(l[1])}>{l[0]}</a></h3><p>{l[2]}</p></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="w">© {new Date().getFullYear()} {p.name} · This site is the canonical portfolio; Scholar, ResearchGate, LinkedIn and GitHub hold the deeper records.</div>
      </footer>
    </>
  );
}
