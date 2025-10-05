'use client'
import { use } from "react";
import NavBar from "../NavBar";
import { useRouter } from "next/navigation";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

function BookingButton(){
    const router = useRouter(); 
    const goto_booking = () => {
        router.push("/create_booking"); 
    }

    return(
        <Button variant="outline" onClick={goto_booking}>Create Booking</Button>
    );
}

function MessagingButton(){
    const router = useRouter(); 
    const goto_messaging = () => {
        router.push("/messaging"); 
    }

    return(
        <Button variant="outline" onClick={goto_messaging}>Messaging</Button>
    );
}

function BillingButton(){
    const router = useRouter(); 
    const goto_billing = () => {
        router.push("/billing"); 
    }

    return(
        <Button variant="outline" onClick={goto_billing}>Billing</Button>
    );
}

export default function Customer_Landing(){
    return(
        <div>
            <NavBar/>

            <h1 className="text-lg">Account Info</h1>

            <ButtonGroup>
                <MessagingButton />
                <BookingButton /> 
                <BillingButton /> 
            </ButtonGroup>
        </div>
    )
}