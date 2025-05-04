"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface BuildingAgeProps {
  yearConstructed: string
  setYearConstructed: (year: string) => void
  onNext: () => void
  onBack: () => void
}

export default function BuildingAge({ yearConstructed, setYearConstructed, onNext, onBack }: BuildingAgeProps) {
  const getAlertColor = () => {
    switch (yearConstructed) {
      case "Before 1972":
        return "bg-red-100 text-red-800 border-red-200"
      case "1972 - 1992":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "After 1992":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return ""
    }
  }

  const getAlertText = () => {
    switch (yearConstructed) {
      case "Before 1972":
        return "PRE-CODE"
      case "1972 - 1992":
        return "TRANSITION"
      case "After 1992":
        return "POST-BENCHMARK"
      default:
        return ""
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Building Age</h1>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-3 block">Year Constructed</Label>
          <RadioGroup value={yearConstructed} onValueChange={setYearConstructed} className="space-y-3">
            <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
              <RadioGroupItem value="Before 1972" id="before1972" />
              <Label htmlFor="before1972" className="text-sm cursor-pointer">
                Before 1972
              </Label>
            </div>
            <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
              <RadioGroupItem value="1972 - 1992" id="1972to1992" />
              <Label htmlFor="1972to1992" className="text-sm cursor-pointer">
                1972 - 1992
              </Label>
            </div>
            <div className="flex items-center space-x-3 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
              <RadioGroupItem value="After 1992" id="after1992" />
              <Label htmlFor="after1992" className="text-sm cursor-pointer">
                After 1992
              </Label>
            </div>
          </RadioGroup>
        </div>

        {yearConstructed && (
          <Alert className={`border ${getAlertColor()}`}>
            <AlertDescription className="font-bold text-center">{getAlertText()}</AlertDescription>
          </Alert>
        )}

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
