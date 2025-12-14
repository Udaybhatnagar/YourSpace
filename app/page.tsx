"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Lock, Wifi, Zap, Cloud } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-4 inset-x-0 mx-auto w-[94%] max-w-7xl z-50 
        bg-black/50 backdrop-blur-xl border border-white/10 
        rounded-full px-6 py-3 shadow-lg flex items-center justify-between">
        
        <span className="text-xl font-semibold tracking-tight">
          Your<span className="text-teal-400">Space</span>
        </span>

        <Button
          className="rounded-full px-6 bg-white text-black hover:bg-white/90"
          onClick={() => router.push("/dashboard")}
        >
          Get Started
        </Button>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Background Image */}
        <Image
          src="/image.png"
          alt="Background"
          fill
          priority
          quality={100}
          className="object-cover scale-105"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b 
          from-black/70 via-black/40 to-black/80" />

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="max-w-3xl text-center space-y-10">
            
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
              Your <span className="text-teal-400">Private</span><br />
              Writing Space
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-xl mx-auto">
              Take notes that stay completely yours.
              <span className="font-medium text-white">
                {" "}No accounts. No servers. No tracking.
              </span>
            </p>

            <button
              className="px-8 py-4 text-lg font-medium rounded-full 
              bg-white text-black hover:bg-white/90 
              shadow-xl hover:shadow-2xl transition-all active:scale-95"
              onClick={() => router.push("/dashboard")}
            >
              Start Taking Notes →
            </button>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-28 px-6 bg-gradient-to-b from-black to-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Privacy That Actually Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Built from the ground up with privacy at its core.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Lock />,
                title: "100% Private",
                desc: "Your notes never leave your device."
              },
              {
                icon: <Wifi />,
                title: "Works Offline",
                desc: "No internet connection required."
              },
              {
                icon: <Zap />,
                title: "Lightning Fast",
                desc: "Instant response, zero delays."
              },
              {
                icon: <Cloud />,
                title: "Browser Based",
                desc: "No installs, works everywhere."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-white/5 backdrop-blur 
                rounded-2xl border border-white/10
                shadow-md hover:shadow-2xl hover:-translate-y-1 
                transition-all duration-300"
              >
                <div className="mb-5 w-12 h-12 flex items-center justify-center 
                  rounded-xl bg-white/10 text-teal-400">
                  {item.icon}
                </div>

                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-28 px-6 bg-gradient-to-br from-teal-400 to-teal-200 text-black rounded-[2.5rem] mx-4 my-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Take back your digital privacy
          </h2>

          <p className="text-lg mb-12 opacity-80">
            Free. Private. Offline. Your notes belong to you.
          </p>

          <button
            className="px-8 py-4 text-lg font-medium rounded-full 
            bg-black text-white hover:bg-black/90 
            shadow-xl hover:shadow-2xl transition-all active:scale-95"
            onClick={() => router.push("/dashboard")}
          >
            Start Taking Notes →
          </button>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row 
          justify-between items-center gap-4 text-slate-400">
          
          <p className="text-sm">© 2025 YourSpace</p>

          <p className="text-sm">
            Built with ❤️ by{" "}
            <a
              href="https://github.com/Udaybhatnagar"
              target="_blank"
              className="text-white hover:text-teal-400 transition"
            >
              Uday Bhatnagar
            </a>
          </p>
        </div>
      </footer>

    </main>
  )
}
