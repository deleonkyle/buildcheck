"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Diagram } from "@/components/ui/diagram"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useRef, useState } from "react"

interface ModerateVerticalIrregularityProps {
  moderateVerticalIrregularity: boolean
  setModerateVerticalIrregularity: (value: boolean) => void
  onNext: () => void
  onBack: () => void
}

export default function ModerateVerticalIrregularity({
  moderateVerticalIrregularity,
  setModerateVerticalIrregularity,
  onNext,
  onBack,
}: ModerateVerticalIrregularityProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const tabs = [
    { value: "split-level", label: "Split Level" },
    { value: "out-of-plane", label: "Sloping Site" },
    { value: "in-plane", label: "In Plane Offset" },
    { value: "cripple-wall", label: "Cripple Wall" },
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
      <h1 className="text-xl font-bold text-gray-900 mb-6">Moderate Vertical Irregularity</h1>

      <div className="space-y-6">
        <div className="flex items-center space-x-3 p-4 border border-red-200 bg-red-50 rounded-md">
          <Checkbox
            id="moderateVerticalIrregularity"
            checked={moderateVerticalIrregularity}
            onCheckedChange={(checked) => setModerateVerticalIrregularity(checked as boolean)}
          />
          <Label htmlFor="moderateVerticalIrregularity" className="font-medium text-red-700 cursor-pointer">
            Moderate Vertical Irregularity
          </Label>
        </div>

        <p className="text-sm text-red-600">
          Check box if a type of Moderate Vertical Irregularity is applicable on the building.
        </p>

        <Tabs defaultValue="split-level" className="mt-6">
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
            <TabsContent value="split-level" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/moderate-split-level.png"
                alt="Split Level Example"
                caption="One-story slope from one side of the building to the other."
              />
              <p className="text-sm text-gray-700">
                Apply if there is more than a one-story slope from one side of the building to the other. Evaluate as
                Severe for W1 buildings as shown in Figure (a) evaluate as Moderate for all other building types as
                shown in Figure (b).
              </p>
            </TabsContent>

            <TabsContent value="out-of-plane" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/severe and moderate-sloping site.png"
                alt="Sloping Site Example"
                caption="Floors do not align or there is a step in the roof level."
              />
              <p className="text-sm text-gray-700">
                Apply if the floors of the building do not align or if there is a step in the roof level.
              </p>
            </TabsContent>

            <TabsContent value="in-plane" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/moderate-inplane-setback.png"
                alt="In Plane Offset Example"
                caption="Figure (a): In-plane offset in braced frame. Figure (b): In-plane offset in shear wall buildings."
              />
              <p className="text-sm text-gray-700">
                Apply if there is an in-plane offset of the lateral system. Usually, these are observable in braced
                frame (Figure (a)) and shear wall buildings (Figure (b)).
              </p>
            </TabsContent>

            <TabsContent value="cripple-wall" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/moderate-cripple-wall.png"
                alt="Cripple Wall Example"
                caption="Unbraced cripple walls in the crawlspace of W1 buildings."
              />
              <p className="text-sm text-gray-700">
                Apply if unbraced cripple walls are observed in the crawlspace of the building. This applies to W1
                buildings. If the basement is occupied, consider this condition as a soft story.
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
