"use client";
import NavBar from "../NavBar";
import Calendar20 from "@/components/calendar-20";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/app/AuthContext";

export default function Create_Booking() {
  const router = useRouter();
  const { user } = useAuth();
  const [image, setImage] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string>("");
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");
  const [issue, setIssue] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!date) {
      alert("Please choose a date.");
      return;
    }

    if (!selectedTime) {
      alert("Please choose a time.");
      return;
    }

    const [timePart, ampm] = selectedTime.split(" "); // ["9:00", "AM"]
    const [hourStr, minuteStr] = timePart.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    const datetime = new Date(date);
    datetime.setHours(hour, minute, 0, 0);

    const fullAddress = `${address}, ${city}, ${zip}`;

    const payload = {
      email,
      make,
      model,
      year: year || null,
      address: fullAddress,
      description: issue,
      datetime: datetime.toISOString(),
    };

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/add-new-booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message = data?.detail || "Failed to create booking.";
        throw new Error(message);
      }

      if (user?.isMechanic) {
        router.push("/mechanic_landing");
      } else {
        router.push("/customer_landing");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message ?? "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create Booking</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Calendar20
            date={date}
            onDateChange={setDate}
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
          />

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Vehicle Information</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  placeholder="e.g., Toyota"
                  onChange={(e) => setMake(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="e.g., Camry"
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g., 2020"
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issue">Issue Description</Label>
                <Input
                  id="issue"
                  placeholder="Describe the problem"
                  onChange={(e) => setIssue(e.target.value)}
                />
              </div>

              {/* allows user to select image & preview it  */}
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file:text-muted-foreground"
                />
                {image && (
                  <div className="mt-2">
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Location</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Street address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="ZIP"
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button
            variant="outline"
            type="submit"
            onClick={() => {
              if (user?.isMechanic) {
                router.push("/mechanic_landing");
              } else {
                router.push("/customer_landing");
              }
            }}
          >
            Cancel
          </Button>
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? "Submitting..." : "Submit Booking"}
          </Button>
        </div>
      </div>
    </div>
  );
}
