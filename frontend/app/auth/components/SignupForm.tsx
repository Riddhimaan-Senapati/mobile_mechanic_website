import { useState } from "react"

import { Button } from "@/components/ui/button"

// Interface for signup data
interface SignupData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phoneNumber: string
}
export default function SignupForm({
  onSubmit,
  submitLabel
}: {
  onSubmit: (data: SignupData) => void
  submitLabel: string
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    onSubmit({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNumber
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="p-2 border rounded-md"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="p-2 border rounded-md"
          required
        />
      </div>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border rounded-md"
        required
      />
      
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
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
      
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="p-2 border rounded-md"
        required
      />
      
      <Button type="submit" className="rounded-md w-full text-base">
        {submitLabel}
      </Button>
    </form>
  )
}


