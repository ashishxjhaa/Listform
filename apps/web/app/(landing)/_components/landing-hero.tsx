import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { AvatarGroup } from "@workspace/ui/components/avatar-group"
import { ChevronRight, Rocket } from "lucide-react"
import { HeroFormPreview } from "./hero-form-preview"
import { IconBadge } from "@workspace/ui/components/icon-badge"

const benefits = [
  "Up to 7x more responses than traditional surveys.",
  "Collect feedback in under 2 minutes - no coding required.",
  "Increase response rates by upto 35% with beautiful widgets",
]

const PEOPLE = [
  { name: "Marcus Reyes", src: "https://i.pravatar.cc/64?img=12" },
  { name: "Sarah Chen", src: "https://i.pravatar.cc/64?img=47" },
  { name: "Priya Nair", src: "https://i.pravatar.cc/64?img=32" },
  { name: "Olivia Carter", src: "https://i.pravatar.cc/64?img=5" },
  { name: "Daniel Kim", src: "https://i.pravatar.cc/64?img=15" },
]

const LandingHero = () => {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-start justify-between gap-20 px-6 py-20">
      <div className="max-w-xl">
        <div className="mb-3 hidden items-center gap-2 rounded-full border bg-background px-1 py-1.25 sm:inline-flex">
          <AvatarGroup avatars={PEOPLE} max={5} size={26} />
          <span className="flex items-center gap-1 text-sm font-medium tracking-tighter text-muted-foreground">
            Trusted by 800+ founders <ChevronRight size={18} />
          </span>
        </div>

        <h1 className="text-3xl leading-tight font-bold tracking-tight text-primary/80 sm:text-5xl">
          The simplest way to collect feedback.
        </h1>

        <ul className="mt-8 space-y-4">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-4">
              <IconBadge icon={Rocket} color="green" size="xs" />
              <span className="text-base text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>

        <p className="text-md mt-6 text-pretty text-muted-foreground italic sm:text-lg">
          Your customers already know what&apos;s next. You just need to listen.
        </p>

        <Button
          nativeButton={false}
          className="mt-8 px-6 py-5 text-base"
          render={<Link href="/login">Quick start</Link>}
        />
      </div>

      <HeroFormPreview className="hidden lg:block" />
    </section>
  )
}

export default LandingHero
