"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import LoginPage from "./auth/login/page";
import NavBar from "./NavBar";
import Footer from "./Footer";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Droplets,
  Fuel,
  BatteryCharging,
  SquareActivity,
  PlugZap,
  Sparkle,
  Car,
  Route,
  RefreshCcwDot,
  ThermometerSnowflake,
  Wrench,
  Cog,
  MapPin,
  CircleDollarSign,
  Users,
  Award,
  Clock,
  ShieldCheck,
} from "lucide-react";

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
];

const reasons = [
  { title: "Family-owned & operated", icon: (p?: any) => <Users {...p} /> },
  { title: "25+ years of experience", icon: (p?: any) => <Award {...p} /> },
  {
    title: "Fair & transparent prices",
    icon: (p?: any) => <CircleDollarSign {...p} />,
  },
  { title: "Weekend & same-day service", icon: (p?: any) => <Clock {...p} /> },
  {
    title: "ASE-certified technicians",
    icon: (p?: any) => <ShieldCheck {...p} />,
  },
  { title: "We come to you", icon: (p?: any) => <MapPin {...p} /> },
];

export default function Home() {
  const [zipcode, setZipcode] = useState("");
  const [message, setMessage] = useState("");

  const zipChecker = () => {
    const zip = parseInt(zipcode);
    if (zip >= 998 && zip <= 1008) {
      window.location.href = "/customer_landing";
    } else {
      setMessage(
        "Sorry, we don't currently service your area. We serve zip codes 00998-01008."
      );
    }
  };

  function ServiceIcon({ children }: { children: JSX.Element }) {
    return (
      <div className="mb-1 flex-none shrink-0 items-center justify-center size-10 sm:size-10 lg:size-12 aspect-square overflow-hidden">
        <div className="size-[88%]">{children}</div>
      </div>
    );
  }

  function ReasonIcon({ children }: { children: JSX.Element }) {
    return (
      <div className="flex-none shrink-0 items-center justify-center size-8 sm:size-9 lg:size-10 aspect-square overflow-hidden">
        <div className="size-[88%]">{children}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <NavBar />

      {/* "Are we in your area?" section  */}
      <section className="mx-auto max-w-5xl p-4 pt-8">
        <Card className="rounded-md pb-6 pt-5 px-6">
          <CardContent className="p-5">
            <h1 className="text-2xl font-semibold text-center pb-4">
              Are we in your area?
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
              <Input
                type="text"
                pattern="^[0-9]{5}$"
                maxLength={5}
                id="zipcode"
                placeholder="Five-digit zip code"
                className="h-10 text-base placeholder:text-base"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                // currently nonfunctional, figure that out later
                onSubmit={zipChecker}
                required
              />
              <Button
                type="submit"
                className="h-10 bg-black text-white hover:bg-black/90 text-base transition-transform duration-150 active:scale-95"
                onClick={zipChecker}
              >
                Go
              </Button>
            </div>
            {message && <p className="text-base text-red-600 mt-2 text-center">{message}</p>}
          </CardContent>
        </Card>
      </section>

      {/* Services section */}
      <section className="mx-auto max-w-5xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-3 items-stretch">
          {/* Image on left */}
          <Card className="overflow-hidden rounded-md p-0">
            <div className="relative h-64 md:h-full">
              <img
                src="/mechanic_working.jpg"
                alt="Mechanic changing a tire"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Card>

          {/* Grid of services on right */}
          <Card className="rounded-md bg-white p-0">
            <CardContent className="py-5 px-7">
              <h2 className="text-2xl font-semibold mb-5">Our Services</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 sm:gap-x-2 md:gap-x-3 gap-y-4 sm:gap-y-5 md:gap-y-6">
                {services.map((s) => (
                  <div
                    key={s.name}
                    className="flex flex-col items-center text-center"
                  >
                    <ServiceIcon>
                      {s.icon({ className: "block w-full h-full" })}
                    </ServiceIcon>
                    <span className="mt-1 text-base text-black">{s.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us section */}
      <section className="mx-auto max-w-5xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_40%] gap-3 items-stretch">
          {/* Image on right/on top when narrow */}
          <Card className="order-1 md:order-2 overflow-hidden rounded-md p-0">
            <div className="relative h-64 md:h-full">
              <img
                src="/mechanic_smiling.jpg"
                alt="Mechanic smiling at camera, holding up car hood"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </Card>

          {/* Reasons grid on left/on bottom when narrow */}
          <Card className="order-2 md:order-1 rounded-md bg-white p-0">
            <CardContent className="p-5">
              <h2 className="text-2xl font-semibold mb-3">Why Choose Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {reasons.map((r) => (
                  <div
                    key={r.title}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/70 p-3"
                  >
                    <ReasonIcon>
                      {r.icon({ className: "block w-full h-full" })}
                    </ReasonIcon>
                    <div className="text-base text-black">{r.title}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <LoginPage />
      <Footer />
    </div>
  );
}
