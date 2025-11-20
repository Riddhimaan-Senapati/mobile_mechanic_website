"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/app/AuthContext";
import { supabase } from "@/lib/supabaseClient";

import { User } from "lucide-react";

function LoginButton() {
  const router = useRouter();
  const goto_login = () => {
    router.push("/auth/login"); // temp login page
  };

  return (
    <Button
      className="object-right text-md"
      onClick={goto_login}
    >
      Log In
    </Button>
  );
}

function HomeButton() {
  const router = useRouter();
  const goto_home = () => {
    router.push("/");
  };

  return (
    <Button variant="ghost" className="object-left text-md" onClick={goto_home}>
      <img src="/logotrans.png" className="w-8 h-8" />
      Mobile Mechanic
    </Button>
  );
}

function ProfileButton() {
  const router = useRouter();
  const { user } = useAuth(); // {} or null 

  const goto_profile = () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (user.isMechanic) {
      router.push("/mechanic_landing");
    } else {
      router.push("/customer_landing");
    }
  };

  return (
    <Button
      variant="outline"
      className="object-right text-md"
      onClick={goto_profile}
    >
      <User className="w-4 h-4" /> Account
    </Button>
  );
}

function LogoutButton() {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut({ scope: "local" });
    router.push("/");
  }

  return (
    <Button className="object-right text-md" onClick={signOut}>
      Sign Out
    </Button>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isLoggedIn = !!user;
  const notLoggingIn = pathname !== "/auth/login" && pathname !== "/auth/signup"

  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between px-4 pt-4 pb-4 mx-auto max-w-5xl">
        <HomeButton />
        <div className="flex space-x-4">
          {!isLoggedIn && notLoggingIn && <LoginButton />}
          {isLoggedIn && <ProfileButton />}
          {isLoggedIn && <LogoutButton />}
        </div>
      </div>

      <Separator />
    </nav>
  );
}
