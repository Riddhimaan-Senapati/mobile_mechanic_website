"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function LoginButton() {
  const router = useRouter();
  const goto_login = () => {
    router.push("/auth/login"); // temp login page
  };

  return (
    <Button
      className="object-right text-md bg-blue-600 text-white hover:bg-blue-700"
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
      <img src="logotrans.png" className="w-8 h-8" />
      Mobile Mechanic
    </Button>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const showLoginButton = pathname === "/"; // only on root homepage

  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between px-4 pt-4 pb-4 mx-auto max-w-5xl">
        <HomeButton />
        {showLoginButton && <LoginButton />}
      </div>

      <Separator />
    </nav>
  );
}
