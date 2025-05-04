"use client"

import { Button } from "@/components/ui/button"

interface IntroductionProps {
  onNext: () => void
}

export default function Introduction({ onNext }: IntroductionProps) {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <img src="/images/building-icon.png" alt="Building Icon" className="h-16 w-16" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to BUILDCHECK!</h1>
        <p className="text-gray-500 mt-1">Seismic Screening Tool</p>
      </div>

      <div className="space-y-6">
        <p className="text-gray-700">
          BUILDCHECK is a user-friendly tool designed to help engineers, building inspectors, and building owners assess
          the structural integrity of buildings using FEMA P-154 guidelines.
        </p>

        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-blue-800 mb-2">Reminders:</h3>
          <ul className="text-sm space-y-1 list-disc pl-5 text-blue-800">
            <li>Double-check all inputs before proceeding to the next step.</li>
            <li>This tool is not a substitute for professional structural analysis.</li>
            <li>BUILDCHECK provides preliminary screening only.</li>
            <li>It does not consider material deterioration, construction quality, or detailed seismic performance.</li>
            <li>Based on the FEMA P-154 High Seismicity Screening Form.</li>
          </ul>
        </div>

        <div className="flex justify-end mt-8">
          <Button onClick={onNext} size="lg">
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  )
}
