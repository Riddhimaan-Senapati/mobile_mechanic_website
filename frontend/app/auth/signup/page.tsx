import { useState } from "react"
import { supabase } from '@/lib/supabaseClient'; 
import AuthCard from "../components/AuthCard"
import AuthForm from "../components/AuthForm"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) setError(error.message)
    else alert("Check your email to confirm your account")
  }

  return (
    <AuthCard title="Create Account">
      <AuthForm onSubmit={handleSignup} submitLabel="Sign Up" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </AuthCard>
  )
}