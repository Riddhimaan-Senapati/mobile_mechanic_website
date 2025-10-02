'use client'
import { use } from "react";
import NavBar from "../NavBar";
import { useRouter } from "next/navigation";

function BookingButton(){
    const router = useRouter(); 
    const goto_booking = () => {
        router.push("/create_booking"); 
    }

    return(
        <button onClick={goto_booking}>Create Booking</button>
    );
}

function MessagingButton(){
    const router = useRouter(); 
    const goto_messaging = () => {
        router.push("/messaging"); 
    }

    return(
        <button onClick={goto_messaging}>Messaging</button>
    );
}

function BillingButton(){
    const router = useRouter(); 
    const goto_billing = () => {
        router.push("/billing"); 
    }

    return(
        <button onClick={goto_billing}>Billing</button>
    );
}

export default function Customer_Landing(){
    return(
        <div>
            <NavBar/>

            <h1> Customer Landing Page</h1>
            <MessagingButton />
            <BookingButton />
            <BillingButton />
        </div>
    )
}