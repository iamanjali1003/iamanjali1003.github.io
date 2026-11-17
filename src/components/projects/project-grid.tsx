"use client"

import { useState } from "react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PROJECT_AREAS } from "@/content/types"

const ALL = "All"

// Tabs that filter the project cards by area. The cards are rendered on the
// server and passed in, so the page's HTML has every project before any
// JavaScript runs; the tabs only hide and show them.
export function ProjectGrid({ items }: { items: { area: string; card: React.ReactNode; key: string }[] }) {
  const [area, setArea] = useState<string>(ALL)
  const areas = [ALL, ...PROJECT_AREAS.filter((a) => items.some((item) => item.area === a))]

  return (
    <Tabs value={area} onValueChange={setArea} className="gap-6">
      <TabsList aria-label="Filter projects by area" className="max-w-full justify-start overflow-x-auto">
        {areas.map((a) => (
          <TabsTrigger key={a} value={a} className="flex-none px-3">
            {a}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.key} hidden={area !== ALL && item.area !== area}>
            {item.card}
          </div>
        ))}
      </div>
    </Tabs>
  )
}
