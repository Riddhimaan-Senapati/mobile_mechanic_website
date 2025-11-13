"use client";
import NavBar from "../NavBar";
import Calendar20 from "@/components/calendar-20";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { type DateRange } from "react-day-picker";
import { ChevronDownIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Create_Booking() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [range, setRange] = React.useState<DateRange | undefined>(undefined);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Card className="max-w-5xl mx-auto p-6 mt-8">
        <div className="flex flex-col gap-3">
          <Label htmlFor="dates" className="px-1">
            Select dates
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="dates"
                className="w-56 justify-between font-normal"
              >
                {range?.from && range?.to
                  ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="range"
                selected={range}
                captionLayout="dropdown"
                onSelect={(range) => {
                  setRange(range);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="time-from" className="px-1">
              From
            </Label>
            <Input
              type="time"
              id="time-from"
              step="1"
              defaultValue="10:30:00"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="time-to" className="px-1">
              To
            </Label>
            <Input
              type="time"
              id="time-to"
              step="1"
              defaultValue="12:30:00"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="repeat-times" />
          <Label htmlFor="repeat-times">Repeat weekly?</Label>
        </div>
      </Card>
    </div>
  );
}
