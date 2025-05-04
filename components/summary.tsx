"use client"

import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { PrinterIcon } from "lucide-react"

interface SummaryProps {
  buildingInfo: {
    buildingName: string
    address: string
    screenerName: string
    assessmentDate: Date
  }
  selectedBuildingType: string
  severeVerticalIrregularity: boolean
  moderateVerticalIrregularity: boolean
  planIrregularity: boolean
  yearConstructed: string
  soilType: string
  soilTypeEStories: string
  score: number
  onBack: () => void
  onStartOver: () => void
}

export default function Summary({
  buildingInfo,
  selectedBuildingType,
  severeVerticalIrregularity,
  moderateVerticalIrregularity,
  planIrregularity,
  yearConstructed,
  soilType,
  soilTypeEStories,
  score,
  onBack,
  onStartOver,
}: SummaryProps) {
  const isPassed = score > 2

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Assessment Summary</h1>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-700">Building Information</h2>
          </div>
          <div className="p-4 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Building Name</p>
                <p className="font-medium">{buildingInfo.buildingName || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{buildingInfo.address || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Screener</p>
                <p className="font-medium">{buildingInfo.screenerName || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Assessment Date</p>
                <p className="font-medium">{format(buildingInfo.assessmentDate, "PPP")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-700">Building Characteristics</h2>
          </div>
          <div className="p-4 space-y-3">
            <p>
              <span className="text-gray-500">Building Type:</span>{" "}
              <span className="font-medium">{selectedBuildingType}</span>
            </p>
            <p>
              <span className="text-gray-500">Year Constructed:</span>{" "}
              <span className="font-medium">{yearConstructed}</span>
            </p>
            <p>
              <span className="text-gray-500">Soil Type:</span>{" "}
              <span className="font-medium">
                {soilType} {soilType === "Soil Type E" ? `(${soilTypeEStories})` : ""}
              </span>
            </p>

            <div className="pt-2">
              <p className="text-gray-500 mb-1">Irregularities:</p>
              <ul className="list-disc pl-5 space-y-1">
                {severeVerticalIrregularity && <li>Severe Vertical Irregularity</li>}
                {moderateVerticalIrregularity && <li>Moderate Vertical Irregularity</li>}
                {planIrregularity && <li>Plan Irregularity</li>}
                {!severeVerticalIrregularity && !moderateVerticalIrregularity && !planIrregularity && <li>None</li>}
              </ul>
            </div>
          </div>
        </div>

        <div className={`border rounded-lg overflow-hidden ${isPassed ? "border-green-200" : "border-red-200"}`}>
          <div className={`p-4 ${isPassed ? "bg-green-50" : "bg-red-50"}`}>
            <h2 className="font-bold text-xl text-center">FINAL SCORE: {score.toFixed(1)}</h2>
            <p className={`text-lg font-bold text-center ${isPassed ? "text-green-600" : "text-red-600"}`}>
              RESULT: LEVEL 1 {isPassed ? "PASSED" : "FAILED"}
            </p>

            {!isPassed && (
              <p className="mt-2 text-red-600 text-center">
                Proceed to Level 2 Assessment and consult a licensed structural engineer for detailed evaluation.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack} className="flex-1 sm:flex-none">
              Back
            </Button>
            <Button variant="outline" onClick={onStartOver} className="flex-1 sm:flex-none">
              Start Over
            </Button>
          </div>
          <Button variant="default" onClick={() => window.print()} className="flex items-center justify-center gap-2">
            <PrinterIcon className="h-4 w-4" />
            Print Report
          </Button>
        </div>
      </div>
    </div>
  )
}
