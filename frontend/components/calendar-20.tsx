"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Calendar20() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  )
  const [selectedTime, setSelectedTime] = React.useState<string | null>("10:00")
  const timeSlots = Array.from({ length: 37 }, (_, i) => {
    const totalMinutes = i * 15
    const hour = Math.floor(totalMinutes / 60) + 9
    const minute = totalMinutes % 60
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`
  })

  const bookedDates = Array.from({ length: 3 }, (_, i) => new Date(2025, 5, 17 + i))

  return (
    <Card className="gap-0 p-0">
      <CardContent className="p-0">
        <div className="flex">
          {/* Calendar Section */}
          <div className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              disabled={bookedDates}
              showOutsideDays={false}
              modifiers={{
                booked: bookedDates,
              }}
              modifiersClassNames={{
                booked: "[&>button]:line-through opacity-100",
              }}
              className="bg-transparent p-0"
              formatters={{
                formatWeekdayName: (date) =>
                  date.toLocaleString("en-US", { weekday: "short" }),
              }}
            />
          </div>

          {/* Time Selector Section */}
          <div className="flex w-40 flex-col border-l">
            <div className="h-[400px] overflow-y-scroll p-4">
              <div className="grid gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                    className="w-full shadow-none text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4 border-t px-6 !py-5 md:flex-row">
        <div className="text-sm">
          {date && selectedTime ? (
            <>
              Your appointment is booked for{" "}
              <span className="font-medium">
                {date?.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>{" "}
              at <span className="font-medium">{selectedTime}</span>.
            </>
          ) : (
            <>Select a date and time for your appointment.</>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
