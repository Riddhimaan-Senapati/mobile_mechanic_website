"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function LoginButton() {
  const router = useRouter();
  const goto_login = () => {
    router.push("/customer_landing");
  };

  return (
    <Button variant="ghost" className="object-right" onClick={goto_login}>
      John Doe
    </Button>
  );
}

function HomeButton() {
  const router = useRouter();
  const goto_home = () => {
    router.push("/");
  };

  return (
    <Button variant="ghost" className="object-left" onClick={goto_home}>
      Mobile Mechanic
    </Button>
  );
}

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between px-4 pt-4">
      <HomeButton />
      <LoginButton />
    </nav>
  );
}
