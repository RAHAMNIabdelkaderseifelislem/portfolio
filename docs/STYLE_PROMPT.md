# Styling + data prompt (reuse with any coding assistant)

Paste everything below the line.

---

You are updating a Next.js (App Router, plain JavaScript) portfolio for AbdElKader Seif El Islem Rahmani: PhD candidate on autonomous and self-improving LLM agents, Lead AI Engineer for a French client, and university lecturer in Algeria.

## Style (zellij style board)
- Direction: a working lab with Tlemcen tilework geometry in the bones. Calm and precise, not a startup landing page. No purple gradients, no neon, no stock "AI brain" imagery.
- Palette (light): plaster #F1F3EF, card #FFFFFF, ink #131B22, muted #55616B, lines #D5DAD3, zellij teal #0B6B68 (primary, research), lapis #233F8C (engineering), saffron #D99A1E (one highlight per screen, graphics only; use #8A5A00 for saffron text). Dark: bg #0F161B, card #172027, ink #E8ECE9, teal #3FB8B0, lapis #8FA6F0, saffron #EDB543. Follow the system setting with a manual toggle.
- Type: Bricolage Grotesque (headings, buttons, 500/700), Newsreader (reading text, 18px, 1.6), IBM Plex Mono (dates, venues, status, 12-13px), IBM Plex Sans Arabic for Arabic. Body lines max 62 characters. No all-caps labels.
- Hero: the thesis topic drawn as a slowly turning loop (propose, act, reflect, revise) with a saffron dot, beside the headline. The portrait is small and lives in About. Two buttons only: "Read the research" and "Work with me".
- Logo mark: two overlapping squares (one saffron, one teal, rotated 45 degrees), the eight-point zellij star.
- Cards: 10px radius, 1px border, no shadows. Publications have a 5px teal left bar, engineering a 5px lapis left bar. Status and tags are rounded pills.
- Motion: only the hero loop; respect prefers-reduced-motion.
- Quality floor: responsive down to 360px, visible keyboard focus, AA contrast, no horizontal scroll.

## Content rules
- Never invent publications, metrics, employers, degrees or links. Anything unverified gets [NEEDS VERIFICATION] in drafts.
- Paper titles are never reworded. Show only published papers (none "in progress" or "planned").
- Teaching entries show: academic year, semester, course, level, university, department, scope (full module, TD only, TPs for some groups), parts (Course / TD / TP / Exam), status (completed / assigned / charge pending).

## Data (single source: data/content.json)
Top-level keys: profile, stats[{value,label}], papers[{title,authors,venue,type,year,month,pages,doi,isbn,url,tags[]}], evolution[{date,text}], courses[{year,semester,title,level,institution,department,scope,parts[],status,note}], experience, capabilities, cv, contact.

Teaching history:
- 2025-26, 1st semester: Data Analysis, Master 1 Information Systems, University of Naama (CS dept), full charge (course, TD, exam).
- 2025-26, 2nd semester: Mathematical Logic, 1st year CS, University of Naama, TD only. Language Theory, 2nd year CS, University of Saida, TPs only, some groups. Computer Tools, 2nd year licence Biology, University of Naama (biology dept), full course.
- 2026-27, 1st semester: Computer Architectures, L2 CS, University of Naama, full module (course, TD, TP, exam). Applications of Deep Learning in Finance, Master 1, University of Saida economics faculty (specialty to be confirmed), course and TDs. Introduction-to-AI TPs, L2, University of Saida CS dept (load not finalized).

Published papers (six): SN Computer Science vol. 7 survey (DOI 10.1007/s42979-026-05333-6); SPECOM book chapter (DOI 10.1007/978-3-032-07956-5_11, pp. 157-169); NCMAI'26 stochastic self-improvement paper; NCIIT26: MIND-META, plus two co-authored Arabic NLP reviews (Semantic Annotation of Arabic Text; Arabic Dialect Identification on Social Media).
