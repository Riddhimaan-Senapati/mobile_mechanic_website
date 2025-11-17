"use client";

import React from "react";
import NavBar from "../NavBar";
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
import {
  Calendar as CalendarIcon,
  CirclePlus,
  X,
  Check,
  Pencil,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectContent,
} from "@/components/ui/select";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type Day = (typeof DAYS)[number];

type AvailabilitySlot = {
  id: string;
  day: Day;
  from: string; // "HH:MM"
  to: string; // "HH:MM"
};

type ExceptionSlot = {
  id: string;
  date: Date | null;
  from: string; // "HH:MM"
  to: string; // "HH:MM"
};

// ids for appointments/exceptions
function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

export default function Mechanic_Availability() {
  const [availabilityCommitted, setAvailabilityCommitted] = React.useState<
    AvailabilitySlot[]
  >([]);
  const [availabilityDraft, setAvailabilityDraft] = React.useState<
    AvailabilitySlot[] | null
  >(null);
  const [isEditingAvailability, setIsEditingAvailability] =
    React.useState(false);

  const [exceptionsCommitted, setExceptionsCommitted] = React.useState<
    ExceptionSlot[]
  >([]);
  const [exceptionsDraft, setExceptionsDraft] = React.useState<
    ExceptionSlot[] | null
  >(null);
  const [isEditingExceptions, setIsEditingExceptions] = React.useState(false);

  const startAvailabilityEditIfNeeded = () => {
    if (!isEditingAvailability) {
      setAvailabilityDraft([...availabilityCommitted]);
      setIsEditingAvailability(true);
    }
  };

  const startExceptionsEditIfNeeded = () => {
    if (!isEditingExceptions) {
      setExceptionsDraft([...exceptionsCommitted]);
      setIsEditingExceptions(true);
    }
  };

  const addAvailabilityRow = () => {
    startAvailabilityEditIfNeeded();
    setAvailabilityDraft((prev) => {
      const base = prev ?? availabilityCommitted;
      return [
        ...base,
        {
          id: makeId(),
          day: "Monday",
          from: "09:00",
          to: "17:00",
        },
      ];
    });
  };

  const updateAvailabilityRow = (
    id: string,
    patch: Partial<AvailabilitySlot>
  ) => {
    if (!isEditingAvailability || !availabilityDraft) return;
    setAvailabilityDraft(
      availabilityDraft.map((row) =>
        row.id === id ? { ...row, ...patch } : row
      )
    );
  };

  const cancelAvailabilityChanges = () => {
    setAvailabilityDraft(null);
    setIsEditingAvailability(false);
  };

  const saveAvailabilityChanges = () => {
    if (!availabilityDraft) {
      setIsEditingAvailability(false);
      return;
    }
    setAvailabilityCommitted(availabilityDraft);
    setAvailabilityDraft(null);
    setIsEditingAvailability(false);
  };

  const availabilityRows =
    (isEditingAvailability ? availabilityDraft : availabilityCommitted) ?? [];

  const addExceptionRow = () => {
    startExceptionsEditIfNeeded();
    setExceptionsDraft((prev) => {
      const base = prev ?? exceptionsCommitted;
      return [
        ...base,
        {
          id: makeId(),
          date: new Date(),
          from: "09:00",
          to: "17:00",
        },
      ];
    });
  };

  const updateExceptionRow = (id: string, patch: Partial<ExceptionSlot>) => {
    if (!isEditingExceptions || !exceptionsDraft) return;
    setExceptionsDraft(
      exceptionsDraft.map((row) => (row.id === id ? { ...row, ...patch } : row))
    );
  };

  const cancelExceptionsChanges = () => {
    setExceptionsDraft(null);
    setIsEditingExceptions(false);
  };

  const saveExceptionsChanges = () => {
    if (!exceptionsDraft) {
      setIsEditingExceptions(false);
      return;
    }
    setExceptionsCommitted(exceptionsDraft);
    setExceptionsDraft(null);
    setIsEditingExceptions(false);
  };

  const exceptionRows =
    (isEditingExceptions ? exceptionsDraft : exceptionsCommitted) ?? [];

  return (
    // Whole Page
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {/* Container for Availability & Exceptions cards */}
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Availability Card */}
        <Card className="bg-white p-6 rounded-md">
          <h2 className="text-2xl font-semibold">Set Weekly Availability</h2>

          {/* Show current availability settings */}
          {availabilityRows.length > 0 && (
            <div className="space-y-3">
              {availabilityRows.map((row) => (
                <div
                  key={row.id}
                  className="bg-gray-50 flex flex-col sm:flex-row gap-3 p-4 rounded-md border"
                >
                  <div className="flex flex-col gap-3">
                    <Label className="px-1">Select day</Label>
                    <Select
                      disabled={!isEditingAvailability}
                      value={row.day}
                      onValueChange={(val) =>
                        updateAvailabilityRow(row.id, {
                          day: val as Day,
                        })
                      }
                    >
                      <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Days</SelectLabel>
                          {DAYS.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col gap-3">
                      <Label className="px-1">From</Label>
                      <Input
                        type="time"
                        value={row.from}
                        disabled={!isEditingAvailability}
                        onChange={(e) =>
                          updateAvailabilityRow(row.id, {
                            from: e.target.value,
                          })
                        }
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label className="px-1">To</Label>
                      <Input
                        type="time"
                        value={row.to}
                        disabled={!isEditingAvailability}
                        onChange={(e) =>
                          updateAvailabilityRow(row.id, {
                            to: e.target.value,
                          })
                        }
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save/Cancel Availability Buttons */}
          {isEditingAvailability && (
            <div className="grid justify-stretch grid-cols-[auto_auto] gap-4">
              <Button variant="secondary" onClick={cancelAvailabilityChanges}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={saveAvailabilityChanges}>
                <Check className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          )}

          {/* Edit Availability Hours Button, only shown if hours already set */}
          {!isEditingAvailability && availabilityRows.length > 0 && (
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={startAvailabilityEditIfNeeded}
            >
              <Pencil className="w-4 h-4 m-1" />
              Edit Hours
            </Button>
          )}

          {/* Add Availability Hours Button */}
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={addAvailabilityRow}
          >
            <CirclePlus className="w-4 h-4 m-1" /> Add Hours
          </Button>
        </Card>

        {/* Exceptions Card */}
        <Card className="bg-white p-6 rounded-md">
          <h2 className="text-2xl font-semibold">Set Exceptions</h2>

          {/* Show current exceptions */}
          {exceptionRows.length > 0 && (
            <div className="space-y-3">
              {exceptionRows.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-gray-50 flex flex-col sm:flex-row gap-3 p-4 rounded-md border"
                >
                  <div className="flex flex-col gap-3">
                    <Label className="px-1">Date</Label>
                    {/* Date Picker */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={!isEditingExceptions}
                          className="w-[220px] justify-start bg-white"
                        >
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {ex.date
                            ? ex.date.toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={ex.date ?? undefined}
                          onSelect={(date) =>
                            updateExceptionRow(ex.id, { date: date ?? null })
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col gap-3">
                      <Label className="px-1">From</Label>
                      <Input
                        type="time"
                        value={ex.from}
                        disabled={!isEditingExceptions}
                        onChange={(e) =>
                          updateExceptionRow(ex.id, { from: e.target.value })
                        }
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label className="px-1">To</Label>
                      <Input
                        type="time"
                        value={ex.to}
                        disabled={!isEditingExceptions}
                        onChange={(e) =>
                          updateExceptionRow(ex.id, { to: e.target.value })
                        }
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save/Cancel Exceptions Buttons */}
          {isEditingExceptions && (
            <div className="grid justify-stretch grid-cols-[auto_auto] gap-4">
              <Button variant="secondary" onClick={cancelExceptionsChanges}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button onClick={saveExceptionsChanges}>
                <Check className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          )}

          {/* Edit Exceptions Button, only shows if exceptions already created */}
          {!isEditingExceptions && exceptionRows.length > 0 && (
            <Button
              variant="outline"
              className="w-full justify-center"
              onClick={startExceptionsEditIfNeeded}
            >
              <Pencil className="w-4 h-4 m-1" />
              Edit Exceptions
            </Button>
          )}

          {/* Add Exception Button */}
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={addExceptionRow}
          >
            <CirclePlus className="w-4 h-4 m-1" /> Add Exception
          </Button>
        </Card>
      </div>
    </div>
  );
}
