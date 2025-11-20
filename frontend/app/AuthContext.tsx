"use client";

import React, { createContext, useContext, useState } from "react";

type AuthUser = {
  id: string;
  email: string | null;
  isMechanic: boolean;
} | null;

type AuthContextValue = {
  user: AuthUser;
  setUser: React.Dispatch<React.SetStateAction<AuthUser>>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
