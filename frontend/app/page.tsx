'use client'

import Image from "next/image";
import NavBar from "./NavBar"; 
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";

//checking branch if it's working

export default function Home() {
  return (
    <div>
      <NavBar />
      <section className="mx-auto max-w-8xl px-4 py-8 h-1/2">
        <div className="relative h-[50vh] w-full overflow-hidden rounded-md">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-72.69790649414064,42.27680072484333,-72.3992156982422,42.45816732375829&layer=mapnik"
            className="h-full w-full border rounded-md"
            title="Map of Amherst"
          />

          <div className="absolute inset-x-0 bottom-0 z-10 p-2">
            <Card className="mx-auto max-w-lg border-white/30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/50 flex items-center">
              <CardContent className="">
                <h1 className="text-lg text-center"> Are we in your area? </h1>

                <div className="flex w-full max-w-sm items-center gap-2">
              <Input type="text" pattern="[0-9]{5}" id="zipcode" placeholder="Five-digit zip code" />
              <Button type="submit" variant="outline">
                Go
              </Button>
                </div>
              </CardContent>
            </Card>
          </div> 

        </div>
      </section>
      
    </div>
  );
}