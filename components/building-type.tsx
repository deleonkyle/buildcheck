"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BuildingTypeProps {
  selectedBuildingType: string
  setSelectedBuildingType: (type: string) => void
  onNext: () => void
  onBack: () => void
}

export default function BuildingType({
  selectedBuildingType,
  setSelectedBuildingType,
  onNext,
  onBack,
}: BuildingTypeProps) {
  const buildingTypes = [
    { value: "W1", label: "W1 - Light wood frame single- or multiple-family dwellings" },
    { value: "W1A", label: "W1A - Light wood frame multi-unit, multi-story residential buildings" },
    { value: "W2", label: "W2 - Wood frame commercial and industrial buildings" },
    { value: "S1_MRF", label: "S1 - Steel moment-resisting frame" },
    { value: "S2_BR", label: "S2 - Braced steel frame" },
    { value: "S3_LM", label: "S3 - Light metal building" },
    { value: "S4_RCSW", label: "S4 - Steel frames with cast-in-place concrete shear walls" },
    { value: "S5_URMINF", label: "S5 - Steel frames with unreinforced masonry infill walls" },
    { value: "C1_MRF", label: "C1 - Concrete moment-resisting frames" },
    { value: "C2_SW", label: "C2 - Concrete shear wall buildings" },
    { value: "C3_URMINF", label: "C3 - Concrete frames with unreinforced masonry infill walls" },
    { value: "PC1_TU", label: "PC1 - Tilt-up buildings" },
    { value: "PC2", label: "PC2 - Precast concrete frame buildings" },
    { value: "RM1_FC", label: "RM1 - Reinforced masonry buildings with flexible diaphragms" },
    { value: "RM2_RD", label: "RM2 - Reinforced masonry buildings with rigid diaphragms" },
    { value: "URM", label: "URM - Unreinforced masonry buildings" },
    { value: "MH", label: "MH - Manufactured housing" },
  ]

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6">Select Building Type</h1>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <Label className="text-sm font-medium mb-2 block">Building Type</Label>
          <RadioGroup value={selectedBuildingType} onValueChange={setSelectedBuildingType} className="space-y-2">
            {buildingTypes.map((type) => (
              <div
                key={type.value}
                className="flex items-start space-x-2 border border-gray-200 rounded-md p-2 sm:p-3 hover:bg-gray-50"
              >
                <RadioGroupItem value={type.value} id={type.value} className="mt-0.5" />
                <Label htmlFor={type.value} className="text-xs sm:text-sm leading-tight cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 sm:p-4 mt-4 sm:mt-6">
          <h3 className="font-medium text-xs sm:text-sm mb-2">Building Type Descriptions</h3>
          <ScrollArea className="h-36 sm:h-48 pr-4">
            <div className="space-y-2 sm:space-y-3 text-xs">
              <p>
                <strong>W1</strong> - Light wood frame single- or multiple-family dwellings of one or more stories in
                height
              </p>
              <p>
                <strong>W1A</strong> - Light wood frame multi-unit, multi-story residential buildings with plan areas on
                each floor of greater than 3,000 square feet
              </p>
              <p>
                <strong>W2</strong> - Wood frame commercial and industrial buildings with a floor area larger than 5,000
                square feet
              </p>
              <p>
                <strong>S1</strong> - Steel moment-resisting frame
              </p>
              <p>
                <strong>S2</strong> - Braced steel frame
              </p>
              <p>
                <strong>S3</strong> - Light metal building
              </p>
              <p>
                <strong>S4</strong> - Steel frames with cast-in-place concrete shear walls
              </p>
              <p>
                <strong>S5</strong> - Steel frames with unreinforced masonry infill walls
              </p>
              <p>
                <strong>C1</strong> - Concrete moment-resisting frames
              </p>
              <p>
                <strong>C2</strong> - Concrete shear wall buildings
              </p>
              <p>
                <strong>C3</strong> - Concrete frames with unreinforced masonry infill walls
              </p>
              <p>
                <strong>PC1</strong> - Tilt-up buildings
              </p>
              <p>
                <strong>PC2</strong> - Precast concrete frame buildings
              </p>
              <p>
                <strong>RM1</strong> - Reinforced masonry buildings with flexible diaphragms
              </p>
              <p>
                <strong>RM2</strong> - Reinforced masonry buildings with rigid diaphragms
              </p>
              <p>
                <strong>URM</strong> - Unreinforced masonry buildings
              </p>
              <p>
                <strong>MH</strong> - Manufactured housing
              </p>
            </div>
          </ScrollArea>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} disabled={!selectedBuildingType}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
