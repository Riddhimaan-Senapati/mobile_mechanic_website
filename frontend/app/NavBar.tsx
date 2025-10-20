"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function LoginButton() {
  const router = useRouter();
  const goto_login = () => {
    router.push("/customer_landing");
  };

  return (
    <Button
      variant="ghost"
      className="object-right text-md"
      onClick={goto_login}
    >
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
    <Button variant="ghost" className="object-left text-md" onClick={goto_home}>
      <img src="logotrans.png" className="w-8 h-8"></img>
      Mobile Mechanic
    </Button>
  );
}

export default function NavBar() {
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between px-4 pt-4 pb-4 mx-auto max-w-5xl">
        <HomeButton />
        <LoginButton />
      </div>

      <Separator />
    </nav>
  );
}
