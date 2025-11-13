"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // update adjust path to client

// update line below before push
const MECHANIC_LANDING_PATH = "/mechanic_landing"; 

export default function AuthListener() {
  const router = useRouter();

  useEffect(() => {
    //Handles logged in users like when refreshing
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await redirectByRole(session.user.id, router);
      }
    })();

    // listening for login or log out
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          await redirectByRole(session.user.id, router);
        }

        if (event === "SIGNED_OUT") {
          router.push("/"); 
        }
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [router]);

  return null;
}


 // fetches profile.role from Supabase
 // select role true is our mechanic
async function redirectByRole(userId, router) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role") 
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile for redirect:", error);
    return;
  }

  if (profile?.role === true) {
    router.push(MECHANIC_LANDING_PATH);
  } else {
    router.push("/customer_landing");
  }
}
