import { ReactNode } from "react"

export default function AuthCard({ title, children }: { title: string, children: ReactNode }) {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  )
}