'use client'

import { useState, useRef, useEffect } from "react";
import NavBar from "./NavBar"; 
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Footer from "./Footer";

// svg icons for services 
import { Droplets, Fuel, BatteryCharging, SquareActivity, PlugZap, Sparkle, Car, Route, RefreshCcwDot, ThermometerSnowflake, Wrench, Cog, Search, UnfoldVertical } from "lucide-react";

const services: { name: string; icon: (p?: any) => JSX.Element }[] = [
                { name: "Oil change", icon: (p) => <Fuel {...p} /> },
                { name: "Battery replacement", icon: (p) => <BatteryCharging {...p} /> },
                { name: "Brake service", icon: (p) => <Car {...p} /> },
                { name: "Tire change/rotation", icon: (p) => <RefreshCcwDot {...p} /> },
                { name: "Engine repair", icon: (p) => <Wrench {...p} /> }, 
                { name: "Diagnostics", icon: (p) => <SquareActivity {...p} /> },
                { name: "AC recharge", icon: (p) => <ThermometerSnowflake {...p} /> },
                { name: "Coolant & fluids", icon: (p) => <Droplets {...p} /> },
                { name: "Belts & hoses", icon: (p) => <Route {...p} /> },
                { name: "Starter/alternator", icon: (p) => <Sparkle {...p} /> },
                { name: "Spark plugs", icon: (p) => <PlugZap {...p} /> },
                { name: "Scheduled maintenance", icon: (p) => <Cog {...p} /> }, 
                { name: "State inspection", icon: (p) => <Search {...p} /> },
                { name: "Suspension", icon: (p) => <UnfoldVertical {...p} /> }
];

export default function Home() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => { // change arrows if reached end 
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 1);
    setCanRight(el.scrollLeft < maxScroll - 1);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const getChipStep = () => { // how much to move by each time arrow is pressed 
    const el = trackRef.current;
    if (!el) return 120;
    const firstChip = el.querySelector('.chip') as HTMLElement | null;
    const gapStr = (getComputedStyle(el).columnGap || getComputedStyle(el).gap || '0');
    const gap = parseFloat(gapStr) || 0;
    const chipW = firstChip?.getBoundingClientRect().width ?? 112;
    return chipW + gap;
  };

  const scrollByCards = (dir: -1 | 1) => { // left | right 
    const el = trackRef.current;
    if (!el) return;
    const amount = dir * getChipStep() * 3; // goes 3 at a time 
    el.scrollBy({ left: amount, behavior: "smooth" });
    requestAnimationFrame(() => setTimeout(updateArrows, 180));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    }
  };

  return (
    <div>
      <main> 
        <NavBar />
        {/* Section asking for zipcode*/}
        <section className="mx-auto max-w-8xl p-4 h-1/2">
          <div className="relative h-[50vh] w-full overflow-hidden rounded-md">
            {/* Background map*/}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35085.79036317081!2d-72.51981542640324!3d42.378278809643675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1760367519940!5m2!1sen!2sus" 
              className="h-full w-full border rounded-md"
              title="Map of Amherst"
            />

            {/* Sets card to the bottom of the map*/}
            <div className="absolute inset-x-0 bottom-0 z-10 p-2">
              {/* Glass effect card*/}
              <Card className="mx-auto max-w-lg border-white/30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/50 flex items-center">
                <CardContent>
                  <h1 className="text-xl mb-3 text-center"> Are we in your area? </h1>

                  {/* Zip code entry*/}
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

        {/* List of services*/}
        <section className="mx-auto max-w-8xl p-4">

          <div className="relative overflow-hidden border rounded-md">
            {/* Car background photo*/}
            <img
              src="/car.jpg"
              alt="Mobile Mechanic background"
              className="absolute inset-0 h-[50vh] md:h-[60vh] w-full object-cover"
            />
       
            {/* Sets card height & sets carousel to bottom*/}
            <div className="relative flex h-[50vh] md:h-[60vh] items-end">
              <div className="w-full px-4 pb-4">
                <h1 className="mb-3 text-xl text-white drop-shadow">Our Services</h1>

                <div className="flex items-center gap-4">
                  {/* Left arrow*/}
                  <button
                    type="button"
                    aria-label="Scroll left"
                    onClick={() => scrollByCards(-1)}
                    disabled={!canLeft}
                    className="flex-none rounded-full border border-white/30 bg-white/80 p-1.5 sm:p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/50 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>

                  {/* List*/}
                  <div
                    ref={trackRef}
                    onKeyDown={onKeyDown}
                    tabIndex={0}
                    aria-label="Available services"
                    role="listbox"
                    className="flex-1 min-w-0 flex snap-x snap-mandatory gap-2 sm:gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] focus:outline-none scroll-smooth">
                    <style jsx>{`
                      div::-webkit-scrollbar { display: none; }
                    `}</style>
                    {services.map((s) => (
                      <div key={s.name} className="snap-start">
                        <div className="chip flex h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 flex-col items-center justify-center rounded-full border border-white/30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/50 shadow-lg">
                          {s.icon({ className: "h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-foreground" })}
                          <span className="mt-2 px-2 text-center text-[10px] sm:text-xs lg:text-sm font-medium text-foreground/90">{s.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right arrow*/}
                  <button
                    type="button"
                    aria-label="Scroll right"
                    onClick={() => scrollByCards(1)}
                    disabled={!canRight}
                    className="flex-none rounded-full border border-white/30 bg-white/80 p-1.5 sm:p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-white/50 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer/>
    </div>
  );
}