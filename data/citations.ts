export type Citation = {
  title: string
  authors?: string
  year?: number
  source?: string
  book?: string
  pages?: string
  publisher?: string
  description?: string
  url?: string
  citations?: number
}

// Initial citation list. You provided the details for one paper — it's added below.
const citations: Citation[] = [
  {
    title:
      "Retention-Augmented Voice Assistant: A Lightweight Architecture for Stateful Interaction with Comprehensive Evaluation and Privacy-Preserving Design",
    authors: "Abdelkader Seif El Islem Rahmani, Yasser Yahiaoui, Abdelghani Bouziane",
    year: 2025,
    book: "International Conference on Speech and Computer",
    pages: "157-169",
    publisher: "Springer Nature Switzerland",
    description:
      "Today’s voice assistants remain fundamentally constrained by their stateless architecture, where each exchange is treated as an isolated incident, precluding meaningful long-term personalization. This paper introduces an architectural blueprint for a lightweight, retention-augmented voice assistant that prioritizes user privacy and transparency through on-device ASR (Whisper) and a human-readable file-based memory system. The work also proposes the Personalization Success Rate (PSR) as a novel evaluation metric and reports a comprehensive evaluation across 150 scripted scenarios.",
    url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=ZxpseiwAAAAJ&citation_for_view=ZxpseiwAAAAJ:u5HHmVD_uO8C",
    citations: 0,
  },
]

export default citations
