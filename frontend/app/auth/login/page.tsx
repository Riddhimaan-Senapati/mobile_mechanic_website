"use client"

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient'; 
import AuthCard from "../components/AuthCard";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    console.log("Entering handle login function")
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) setError(error.message)
  
    else window.location.href = "/customer_landing"  // redirect after login
  }

  return (
    <AuthCard title="Log In">
      <AuthForm onSubmit={handleLogin} submitLabel="Log In" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          {' '}
          <Link 
            href="/auth/signup" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthCard>
  )
}