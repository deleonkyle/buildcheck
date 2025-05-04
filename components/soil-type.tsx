"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { Diagram } from "@/components/ui/diagram"

interface SoilTypeProps {
  soilType: string
  setSoilType: (type: string) => void
  soilTypeEStories: string
  setSoilTypeEStories: (stories: string) => void
  onNext: () => void
  onBack: () => void
}

export default function SoilType({
  soilType,
  setSoilType,
  soilTypeEStories,
  setSoilTypeEStories,
  onNext,
  onBack,
}: SoilTypeProps) {
  const soilTypes = ["Soil Type A", "Soil Type B", "Soil Type C", "Soil Type D", "Soil Type E", "Soil Type F"]

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Soil Type</h1>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Soil Type</Label>
          <RadioGroup value={soilType} onValueChange={setSoilType} className="space-y-2">
            {soilTypes.map((type) => (
              <div
                key={type}
                className="flex items-center space-x-3 border border-gray-200 rounded-md p-3 hover:bg-gray-50"
              >
                <RadioGroupItem value={type} id={type.replace(/\s+/g, "")} />
                <Label htmlFor={type.replace(/\s+/g, "")} className="text-sm cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {soilType === "Soil Type E" && (
          <div className="mt-4">
            <Label className="text-sm font-medium mb-3 block">For Soil Type E</Label>
            <RadioGroup value={soilTypeEStories} onValueChange={setSoilTypeEStories} className="space-y-2">
              <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                <RadioGroupItem value="1-3 stories" id="1-3stories" />
                <Label htmlFor="1-3stories" className="text-sm cursor-pointer">
                  1-3 stories
                </Label>
              </div>
              <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                <RadioGroupItem value=">3 stories" id="over3stories" />
                <Label htmlFor="over3stories" className="text-sm cursor-pointer">
                  &gt;3 stories
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <Alert className="bg-yellow-50 border-yellow-200">
          <InfoIcon className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-sm text-yellow-800">
            Reminder: If there is no basis for classifying the soil type, Soil Type D should be assumed.
          </AlertDescription>
        </Alert>

        <Diagram
          src="/images/soil-type-chart.png"
          alt="Soil Type Classification"
          caption="FEMA P-154 Soil Type Classification Chart"
          className="mt-4"
        />

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
