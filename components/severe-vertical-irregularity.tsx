"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Diagram } from "@/components/ui/diagram"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useRef, useState } from "react"

interface SevereVerticalIrregularityProps {
  severeVerticalIrregularity: boolean
  setSevereVerticalIrregularity: (value: boolean) => void
  onNext: () => void
  onBack: () => void
}

export default function SevereVerticalIrregularity({
  severeVerticalIrregularity,
  setSevereVerticalIrregularity,
  onNext,
  onBack,
}: SevereVerticalIrregularityProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const tabs = [
    { value: "soft-story", label: "Soft Story" },
    { value: "setback", label: "Setback" },
    { value: "short-column", label: "Short Column" },
    { value: "split-level", label: "Split Level" },
  ]

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollTabs = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 150
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Severe Vertical Irregularity</h1>

      <div className="space-y-6">
        <div className="flex items-center space-x-3 p-4 border border-red-200 bg-red-50 rounded-md">
          <Checkbox
            id="severeVerticalIrregularity"
            checked={severeVerticalIrregularity}
            onCheckedChange={(checked) => setSevereVerticalIrregularity(checked as boolean)}
          />
          <Label htmlFor="severeVerticalIrregularity" className="font-medium text-red-700 cursor-pointer">
            Severe Vertical Irregularity
          </Label>
        </div>

        <p className="text-sm text-red-600">
          Check box if a type of Severe Vertical Irregularity is applicable on the building.
        </p>

        <Tabs defaultValue="soft-story" className="mt-6">
          <div className="relative mb-4">
            {showLeftArrow && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white/80 shadow-sm"
                onClick={() => scrollTabs("left")}
                aria-label="Scroll tabs left"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
            )}

            <div className="overflow-hidden relative">
              <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide py-1" onScroll={handleScroll}>
                <TabsList className="inline-flex w-max border-b border-b-transparent">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="text-sm whitespace-nowrap px-4 py-2 min-w-[100px]"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {showRightArrow && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white/80 shadow-sm"
                onClick={() => scrollTabs("right")}
                aria-label="Scroll tabs right"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="border border-gray-200 rounded-md">
            <TabsContent value="soft-story" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/severe-soft-story.png"
                alt="Soft Story Example"
                caption="Figure (a): W1 house with garage. Figure (b): W1A building with open front. Figure (c): Story with fewer columns. Figure (d): Taller bottom story."
              />
              <p className="text-sm text-gray-700">
                Apply: Soft Story (c) (d) Figure (a): For a W1 house with occupied space over a garage with limited or
                short wall lengths on both sides of the garage opening. Figure (b): For a W1A building with an open
                front at the ground story (such as for parking). Figure (c): When one of the stories has less wall or
                fewer columns than the others (usually the bottom story). Figure (d): When one of the stories is taller
                than the others (usually the bottom story).
              </p>
            </TabsContent>

            <TabsContent value="setback" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/severe-setback.png"
                alt="Setback Example"
                caption="Figure (a): Upper levels outboard of lower levels. Figure (b): Non-stacking walls."
              />
              <p className="text-sm text-gray-700">
                Apply if the walls of the building do not stack vertically in plan. This irregularity is most severe
                when the vertical elements of the lateral system at the upper levels are outboard of those at the lower
                levels. The condition in Figure (b) also triggers this irregularity. If nonstacking walls are known to
                be non-structural, this irregularity does not apply. Apply the setback if greater than or equal to 2
                feet.
              </p>
            </TabsContent>

            <TabsContent value="short-column" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/severe-short-column.png"
                alt="Short Column Example"
                caption="Figure (a): Short columns in line. Figure (b): Narrow columns with deep beams. Figure (c): Infill walls shortening column height."
              />
              <p className="text-sm text-gray-700">
                Apply if: Figure (a): Some columns/piers are much shorter than the typical columns/piers in the same
                line. Figure (b): The columns/piers are narrow compared to the depth of the beams. Figure (c): There are
                infill walls that shorten the clear height of the column. Note this deficiency is typically seen in
                older concrete and steel building types.
              </p>
            </TabsContent>

            <TabsContent value="split-level" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/severe-split-level.png"
                alt="Split Level Example"
                caption="Figure (a): Severe for W1 buildings. Figure (b): Moderate for other building types."
              />
              <p className="text-sm text-gray-700">
                Apply if there is more than a one-story slope from one side of the building to the other. Evaluate as
                Severe for W1 buildings as shown in Figure (a); evaluate as Moderate for all other building types as
                shown in Figure (b).
              </p>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </div>
  )
}
