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
    // it ruins tests and demos, so I (Mitchell) am taking it out for now, but it would
    //be an easier product to use witht his async function.
    // (async () => {
    //   const {
    //     data: { session },
    //   } = await supabase.auth.getSession();

    //   if (session?.user) {
    //     await redirectByRole(session.user.id, router);
    //   }
    // })();

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
   const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  console.log("Profile from Supabase:", {
    profile,
    profileError,
    role: profile?.role,
    roleType: typeof profile?.role,
  });

  // If the profile query itself failed, show the error and stop.
  if (profileError) {
    console.error("Error fetching profile:", profileError);
    setError("Error fetching profile: " + profileError.message);
    return;
  }

  // sorry the true is just not working lol
  const rawRole = profile?.role;
  const isMechanic =
    rawRole === true ||
    rawRole === "true" ||
    rawRole === 1 ||
    rawRole === "1";

  if (isMechanic) {
    console.log("Role treated as MECHANIC → /mechanic_landing");
    router.push("/mechanic_landing");
  } else {
    console.log("Role treated as CUSTOMER → /customer_landing");
    router.push("/customer_landing");
  }
}
