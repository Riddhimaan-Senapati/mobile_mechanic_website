'use client'
import React from "react";
import NavBar from "../NavBar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, CalendarDays, CreditCard, Check, X } from "lucide-react";

function MessagingButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => router.push("/messaging")}
      className="flex items-center gap-2"
    >
      <MessageSquare className="w-4 h-4" /> Messages
    </Button>
  );
}

function BookingButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => router.push("/create_booking")}
      className="flex items-center gap-2"
    >
      <CalendarDays className="w-4 h-4" /> Create Appointment
    </Button>
  );
}

function BillingButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={() => router.push("/billing")}
      className="flex items-center gap-2"
    >
      <CreditCard className="w-4 h-4" /> Billing
    </Button>
  );
}

export default function Customer_Landing() {
  const [appointment, setAppointment] = React.useState<null | {
    date: string;
    time: string;
    address: string;
    make: string;
    model: string;
    year: string;
    issue: string;
  }>(null);

  const [isEditing, setIsEditing] = React.useState(false);
  const [editedAppointment, setEditedAppointment] = React.useState<typeof appointment>(null);

  // Mock appointment for demonstration
  React.useEffect(() => {
    setAppointment({
      date: "Monday, December 29, 2025",
      time: "3:00–4:00 PM",
      address: "620 Massachusetts Ave, Amherst, MA",
      make: "Toyota",
      model: "Corolla",
      year: "2010",
      issue:
        "some annoying lil kids came by on Halloween n they were dressed as Michael Meyers n they smashed my...",
    });
  }, []);

  // Handle edit mode toggle
  const handleModify = () => {
    if (appointment) {
      setEditedAppointment({ ...appointment });
      setIsEditing(true);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setEditedAppointment(null);
  };

  // Handle save
  const handleSave = () => {
    if (editedAppointment) {
      setAppointment(editedAppointment);
      setIsEditing(false);
    }
  };

  // Handle input change
  const handleChange = (field: keyof NonNullable<typeof appointment>, value: string) => {
    if (!editedAppointment) return;
    setEditedAppointment({ ...editedAppointment, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Mobile Mechanic</h1>
          <p className="text-gray-700 font-medium">John Doe</p>
        </div>

        {/* Personal Info */}
        <Card className="bg-gray-100">
          <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 gap-3">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
              <p><span className="font-medium">Name:</span> John Doe</p>
              <p><span className="font-medium">Email:</span> johndoe@gmail.com</p>
              <p><span className="font-medium">Phone Number:</span> 123-456-7890</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <MessagingButton />
              <BookingButton />
              <BillingButton />
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="bg-gray-100">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Upcoming Appointments</CardTitle>
          </CardHeader>

          <CardContent>
            {appointment ? (
              <div className="border rounded-lg bg-gray-200 p-5">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <Input
                          value={editedAppointment?.date || ""}
                          onChange={(e) => handleChange("date", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <Input
                          value={editedAppointment?.time || ""}
                          onChange={(e) => handleChange("time", e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <Input
                          value={editedAppointment?.address || ""}
                          onChange={(e) => handleChange("address", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Make</label>
                        <Input
                          value={editedAppointment?.make || ""}
                          onChange={(e) => handleChange("make", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Model</label>
                        <Input
                          value={editedAppointment?.model || ""}
                          onChange={(e) => handleChange("model", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <Input
                          value={editedAppointment?.year || ""}
                          onChange={(e) => handleChange("year", e.target.value)}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Issue</label>
                        <Input
                          value={editedAppointment?.issue || ""}
                          onChange={(e) => handleChange("issue", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" className="flex-1" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                      <Button className="flex-1" onClick={handleSave}>
                        <Check className="w-4 h-4 mr-1" /> Save Changes
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-lg mb-2">{appointment.date}</p>
                    <p><span className="font-medium">Time:</span> {appointment.time}</p>
                    <p><span className="font-medium">Address:</span> {appointment.address}</p>
                    <p><span className="font-medium">Make:</span> {appointment.make}</p>
                    <p><span className="font-medium">Model:</span> {appointment.model}</p>
                    <p><span className="font-medium">Year:</span> {appointment.year}</p>
                    <p className="truncate"><span className="font-medium">Issue:</span> {appointment.issue}</p>

                    <div className="flex gap-4 mt-4">
                      <Button variant="outline" className="flex-1">View/upload images</Button>
                      <Button variant="outline" className="flex-1" onClick={handleModify}>
                        Modify booking
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-gray-600 text-center py-6 italic">
                No upcoming appointments.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
