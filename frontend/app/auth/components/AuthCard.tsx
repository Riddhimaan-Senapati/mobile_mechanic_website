import { ReactNode } from "react";
import NavBar from "@/app/NavBar";

export default function AuthCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="max-w-md mx-auto mt-12 p-6 border rounded-md bg-white">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
