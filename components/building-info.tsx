"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface BuildingInfoProps {
  buildingInfo: {
    buildingName: string
    address: string
    screenerName: string
    assessmentDate: Date
  }
  setBuildingInfo: (info: any) => void
  onNext: () => void
}

export default function BuildingInfo({ buildingInfo, setBuildingInfo, onNext }: BuildingInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBuildingInfo({ ...buildingInfo, [name]: value })
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setBuildingInfo({ ...buildingInfo, assessmentDate: date })
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Building Information</h1>

      <div className="space-y-5">
        <div>
          <Label htmlFor="buildingName" className="text-sm font-medium">
            Building Name
          </Label>
          <Input
            id="buildingName"
            name="buildingName"
            value={buildingInfo.buildingName}
            onChange={handleChange}
            placeholder="Enter building name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="address" className="text-sm font-medium">
            Address
          </Label>
          <Input
            id="address"
            name="address"
            value={buildingInfo.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="screenerName" className="text-sm font-medium">
            Name of Screener
          </Label>
          <Input
            id="screenerName"
            name="screenerName"
            value={buildingInfo.screenerName}
            onChange={handleChange}
            placeholder="Enter screener name"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Date of Assessment</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full mt-1 justify-start text-left font-normal",
                  !buildingInfo.assessmentDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {buildingInfo.assessmentDate ? format(buildingInfo.assessmentDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={buildingInfo.assessmentDate} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="pt-4">
          <Button onClick={onNext} className="w-full sm:w-auto float-right">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
