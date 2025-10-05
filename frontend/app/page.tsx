'use client'

import Image from "next/image";
import NavBar from "./NavBar"; 
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

//checking branch if it's working

export default function Home() {
  return (
    <div>
      <NavBar />

      <div>
        <h1 className="text-lg"> Are we in your area? </h1>
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input type="text" pattern="[0-9]{5}" id="zipcode" placeholder="Five-digit zip code" />
          <Button type="submit" variant="outline">
            Go
          </Button>
        </div>
      </div>
      
    </div>
  );
}