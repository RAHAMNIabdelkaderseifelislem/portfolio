"use client"

import React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import citationsData from "@/data/citations"

type Citation = typeof citationsData[number]

const ResearchCitations: React.FC<{ citationsList?: Citation[]; top?: number }> = ({
  citationsList,
  top = 1,
}) => {
  const list = citationsList ?? citationsData
  const items = list.slice(0, top)

  return (
    <section id="research-citations" className="mt-10">
      <h3 className="section-subheading mb-4">Selected Research</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        {items.map((c, i) => (
          <Card key={i} className="bg-deep-indigo/50 border border-accent-lavender/20">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div>
                  <div className="text-cloud-white font-semibold">{c.title}</div>
                  <div className="text-cloud-white/70 text-sm">
                    {c.authors && <>{c.authors} • </>}
                    {c.year && <>{c.year} • </>}
                    {c.book && <>{c.book} • </>}
                    {c.pages && <>{c.pages} • </>}
                    {c.publisher && <>{c.publisher}</>}
                  </div>
                </div>

                {c.description && (
                  <div className="text-cloud-white/75 text-sm">{c.description}</div>
                )}

                <div className="mt-2">
                  {c.url ? (
                    <a
                      className="inline-block text-sm text-vibrant-teal hover:underline"
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Scholar
                    </a>
                  ) : (
                    <span className="text-sm text-cloud-white/60">No external link</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ResearchCitations
