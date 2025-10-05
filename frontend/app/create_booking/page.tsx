'use client' 
import NavBar from "../NavBar"; 
import Calendar20 from "@/components/calendar-20";
import React from "react";

export default function Create_Booking() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return(
        <div>
            <NavBar /> 

            <h1 className="text-lg">
                Create Booking
            </h1>

            <Calendar20
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
            />

        </div> 
    );
}