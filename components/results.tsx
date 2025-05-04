"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ResultsProps {
  score: number
  recommendation: string
  onCalculate: () => void
  onNext: () => void
  onBack: () => void
}

export default function Results({ score, recommendation, onCalculate, onNext, onBack }: ResultsProps) {
  const isPassed = score > 2

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Results</h1>

      <div className="space-y-6">
        <div className="flex justify-center mb-4">
          <Button onClick={onCalculate} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Calculate Results
          </Button>
        </div>

        {score > 0 && (
          <div className="space-y-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-2xl font-bold mb-2">FINAL SCORE: {score.toFixed(1)}</h3>
              <p className={`text-xl font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
                RESULT: LEVEL 1 {isPassed ? "PASSED" : "FAILED"}
              </p>
            </div>

            {!isPassed && (
              <div className="space-y-2">
                <Label htmlFor="recommendation" className="text-sm font-medium">
                  Recommendation
                </Label>
                <Textarea
                  id="recommendation"
                  value={recommendation}
                  readOnly
                  className="h-24 bg-red-50 border-red-200 text-red-800"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={score === 0}>
            View Summary
          </Button>
        </div>
      </div>
    </div>
  )
}
