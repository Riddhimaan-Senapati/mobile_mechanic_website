import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function AuthForm({
  onSubmit,
  submitLabel,
}: {
  onSubmit: (email: string, password: string) => void;
  submitLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(email, password);
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded-md"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded-md"
          required
        />
        <Button type="submit" className="rounded-md text-base">
          {submitLabel}
        </Button>
      </form>
    </div>
  );
}
