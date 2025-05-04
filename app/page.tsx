"use client"

import { useState } from "react"
import BuildingInfo from "@/components/building-info"
import BuildingType from "@/components/building-type"
import SevereVerticalIrregularity from "@/components/severe-vertical-irregularity"
import ModerateVerticalIrregularity from "@/components/moderate-vertical-irregularity"
import PlanIrregularity from "@/components/plan-irregularity"
import BuildingAge from "@/components/building-age"
import SoilType from "@/components/soil-type"
import Results from "@/components/results"
import Summary from "@/components/summary"
import Introduction from "@/components/introduction"
import { BuildingData } from "@/lib/building-data"

type BuildingTypeKey = keyof typeof BuildingData

export default function Home() {
  const [currentPanel, setCurrentPanel] = useState(0)
  const [buildingInfo, setBuildingInfo] = useState({
    buildingName: "",
    address: "",
    screenerName: "",
    assessmentDate: new Date(),
  })
  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingTypeKey | "">("")
  const [severeVerticalIrregularity, setSevereVerticalIrregularity] = useState(false)
  const [moderateVerticalIrregularity, setModerateVerticalIrregularity] = useState(false)
  const [planIrregularity, setPlanIrregularity] = useState(false)
  const [yearConstructed, setYearConstructed] = useState("Before 1972")
  const [soilType, setSoilType] = useState("Soil Type A")
  const [soilTypeEStories, setSoilTypeEStories] = useState("1-3 stories")
  const [score, setScore] = useState(0)
  const [recommendation, setRecommendation] = useState("")

  const panels = [
    "Introduction",
    "BuildingInfo",
    "BuildingType",
    "SevereVerticalIrregularity",
    "ModerateVerticalIrregularity",
    "PlanIrregularity",
    "BuildingAge",
    "SoilType",
    "Results",
    "Summary",
  ]

  const calculateScore = () => {
    if (!selectedBuildingType || !BuildingData[selectedBuildingType]) {
      return 0
    }

    const currentBuilding = BuildingData[selectedBuildingType]
    let calculatedScore = currentBuilding.BasicScore

    if (severeVerticalIrregularity) {
      calculatedScore += currentBuilding.SevereVertical
    }

    if (moderateVerticalIrregularity) {
      calculatedScore += currentBuilding.ModerateVertical
    }

    if (planIrregularity) {
      calculatedScore += currentBuilding.PlanIrregularity
    }

    switch (yearConstructed) {
      case "Before 1972":
        if (currentBuilding.Precode) {
          calculatedScore += currentBuilding.Precode
        }
        break
      case "After 1992":
        if (currentBuilding.PostBenchmark) {
          calculatedScore += currentBuilding.PostBenchmark
        }
        break
    }

    switch (soilType) {
      case "Soil Type A":
      case "Soil Type B":
        if (currentBuilding.SoilAB) {
          calculatedScore += currentBuilding.SoilAB
        }
        break
      case "Soil Type E":
        if (soilTypeEStories === "1-3 stories" && currentBuilding.SoilE_1to3) {
          calculatedScore += currentBuilding.SoilE_1to3
        } else if (soilTypeEStories === ">3 stories" && currentBuilding.SoilE_Over3) {
          calculatedScore += currentBuilding.SoilE_Over3
        }
        break
    }

    // Apply minimum score
    calculatedScore = Math.max(calculatedScore, currentBuilding.MinScore)

    return Number.parseFloat(calculatedScore.toFixed(1))
  }

  const handleNext = () => {
    if (currentPanel < panels.length - 1) {
      setCurrentPanel(currentPanel + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleCalculateResults = () => {
    const calculatedScore = calculateScore()
    setScore(calculatedScore)

    if (calculatedScore > 2) {
      setRecommendation("")
    } else {
      setRecommendation(
        "Proceed to Level 2 Assessment and consult a licensed structural engineer for detailed evaluation.",
      )
    }

    handleNext()
  }

  const handleStartOver = () => {
    setBuildingInfo({
      buildingName: "",
      address: "",
      screenerName: "",
      assessmentDate: new Date(),
    })
    setSelectedBuildingType("")
    setSevereVerticalIrregularity(false)
    setModerateVerticalIrregularity(false)
    setPlanIrregularity(false)
    setYearConstructed("Before 1972")
    setSoilType("Soil Type A")
    setSoilTypeEStories("1-3 stories")
    setScore(0)
    setRecommendation("")
    setCurrentPanel(1) // Go to building info panel
    window.scrollTo(0, 0)
  }

  const renderPanel = () => {
    switch (panels[currentPanel]) {
      case "Introduction":
        return <Introduction onNext={handleNext} />
      case "BuildingInfo":
        return <BuildingInfo buildingInfo={buildingInfo} setBuildingInfo={setBuildingInfo} onNext={handleNext} />
      case "BuildingType":
        return (
          <BuildingType
            selectedBuildingType={selectedBuildingType}
            setSelectedBuildingType={setSelectedBuildingType}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "SevereVerticalIrregularity":
        return (
          <SevereVerticalIrregularity
            severeVerticalIrregularity={severeVerticalIrregularity}
            setSevereVerticalIrregularity={setSevereVerticalIrregularity}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "ModerateVerticalIrregularity":
        return (
          <ModerateVerticalIrregularity
            moderateVerticalIrregularity={moderateVerticalIrregularity}
            setModerateVerticalIrregularity={setModerateVerticalIrregularity}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "PlanIrregularity":
        return (
          <PlanIrregularity
            planIrregularity={planIrregularity}
            setPlanIrregularity={setPlanIrregularity}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "BuildingAge":
        return (
          <BuildingAge
            yearConstructed={yearConstructed}
            setYearConstructed={setYearConstructed}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "SoilType":
        return (
          <SoilType
            soilType={soilType}
            setSoilType={setSoilType}
            soilTypeEStories={soilTypeEStories}
            setSoilTypeEStories={setSoilTypeEStories}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "Results":
        return (
          <Results
            score={score}
            recommendation={recommendation}
            onCalculate={handleCalculateResults}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case "Summary":
        return (
          <Summary
            buildingInfo={buildingInfo}
            selectedBuildingType={selectedBuildingType}
            severeVerticalIrregularity={severeVerticalIrregularity}
            moderateVerticalIrregularity={moderateVerticalIrregularity}
            planIrregularity={planIrregularity}
            yearConstructed={yearConstructed}
            soilType={soilType}
            soilTypeEStories={soilTypeEStories}
            score={score}
            onBack={handleBack}
            onStartOver={handleStartOver}
          />
        )
      default:
        return <div>Unknown panel</div>
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:px-6 sm:py-6">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          <div className="h-2 bg-blue-500"></div>
          {renderPanel()}
        </div>
      </div>
    </main>
  )
}
