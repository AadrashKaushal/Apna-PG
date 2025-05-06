"use client"
import LoginForm from "@/component/LoginForm";


export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>
    </div>
  )
}
