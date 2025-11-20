"use client";
import { useState } from "react";
import Link from "next/link";

import { supabase } from "@/lib/supabaseClient";

import AuthCard from "../components/AuthCard";
import SignupForm from "../components/SignupForm";

import NavBar from "@/app/NavBar";
import { Button } from "@/components/ui/button";

// Interface matching the one in SignupForm
interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Failed to sign up with Google. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignup = async (data: SignupData) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone_number: data.phoneNumber,
            full_name: `${data.firstName} ${data.lastName}`,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        alert("Check your email to confirm your account!");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <AuthCard title="Create Account">
        <SignupForm
          onSubmit={handleSignup}
          submitLabel={loading ? "Loading" : "Sign Up"}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Google Sign Up Button */}
        <Button
          variant="outline"
          onClick={handleGoogleSignup}
          className="text-base w-full rounded-md mt-4"
        >
          {googleLoading ? "Signing up with Google..." : "Sign Up with Google"}
        </Button>

        <div className="mt-4 text-center w-full">
          <p className="text-black">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold underline text-black"
            >
              Log in here
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}
