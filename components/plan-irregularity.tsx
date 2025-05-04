"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Diagram } from "@/components/ui/diagram"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { useRef, useState } from "react"

interface PlanIrregularityProps {
  planIrregularity: boolean
  setPlanIrregularity: (value: boolean) => void
  onNext: () => void
  onBack: () => void
}

export default function PlanIrregularity({
  planIrregularity,
  setPlanIrregularity,
  onNext,
  onBack,
}: PlanIrregularityProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const tabs = [
    { value: "torsion", label: "Torsion" },
    { value: "non-parallel", label: "Non-Parallel" },
    { value: "reentrant", label: "Reentrant Corner" },
    { value: "diaphragm", label: "Diaphragm" },
    { value: "out-of-plane", label: "Out of Plane" },
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
      <h1 className="text-xl font-bold text-gray-900 mb-6">Plan Irregularity</h1>

      <div className="space-y-6">
        <div className="flex items-center space-x-3 p-4 border border-red-200 bg-red-50 rounded-md">
          <Checkbox
            id="planIrregularity"
            checked={planIrregularity}
            onCheckedChange={(checked) => setPlanIrregularity(checked as boolean)}
          />
          <Label htmlFor="planIrregularity" className="font-medium text-red-700 cursor-pointer">
            Plan Irregularity
          </Label>
        </div>

        <p className="text-sm text-red-600">Check box if a type of Plan Irregularity is applicable on the building.</p>

        <Tabs defaultValue="torsion" className="mt-6">
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
            <TabsContent value="torsion" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/plan-torsion.png"
                alt="Torsion Example"
                caption="Figures (a) and (b): Eccentric stiffness in plan with solid walls on some sides and walls with openings on others."
              />
              <p className="text-sm text-gray-700">
                Apply if there is good lateral resistance in one direction, but not the other, or if there is eccentric
                stiffness in plan (as shown in Figures (a) and (b); solid walls on two or three sides with walls with
                lots of openings on the remaining sides).
              </p>
            </TabsContent>

            <TabsContent value="non-parallel" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/plan-non-parallel.png"
                alt="Non-Parallel Example"
                caption="Building sides do not form 90-degree angles."
              />
              <p className="text-sm text-gray-700">Apply if the sides of the building do not form 90-degree angles.</p>
            </TabsContent>

            <TabsContent value="reentrant" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/plan-reentrant.png"
                alt="Reentrant Corner Example"
                caption="L, U, T, or + shaped buildings with projections of more than 20 feet."
              />
              <p className="text-sm text-gray-700">
                Apply if there is a reentrant corner, i.e., the building is L, U, T, or + shaped, with projections of
                more than 20 feet. Where possible, check to see if there are seismic separations where the wings meet.
                If so, evaluate for pounding.
              </p>
            </TabsContent>

            <TabsContent value="diaphragm" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/plan-diaphragm.png"
                alt="Diaphragm Example"
                caption="Opening with width over 50% of the diaphragm width at any level."
              />
              <p className="text-sm text-gray-700">
                Apply if there is an opening that has a width of over 50% of the width of the diaphragm at any level.
              </p>
            </TabsContent>

            <TabsContent value="out-of-plane" className="p-4 space-y-4 focus:outline-none">
              <Diagram
                src="/images/plan-out-of-plane.png"
                alt="Out of Plane Example"
                caption="Exterior beams do not align with columns in plan."
              />
              <p className="text-sm text-gray-700">
                Apply if the exterior beams do not align with the columns in plan. Typically, this applies to concrete
                buildings, where the perimeter columns are outboard of the perimeter beams.
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
