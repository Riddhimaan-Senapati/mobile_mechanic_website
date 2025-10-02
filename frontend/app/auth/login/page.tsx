import { useState } from 'react';
//import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; 
import AuthCard from "../components/AuthCard";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) setError(error.message)
    else window.location.href = "/"  // redirect after login
  }

  return (
    <AuthCard title="Log In">
      <AuthForm onSubmit={handleLogin} submitLabel="Log In" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </AuthCard>
  )
}