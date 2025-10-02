import { useState } from "react"

export default function AuthForm({
  onSubmit,
  submitLabel
}: {
  onSubmit: (email: string, password: string) => void
  submitLabel: string
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(email, password)
      }}
      className="flex flex-col gap-4"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        {submitLabel}
      </button>
    </form>
  )
}