import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { AvatarGroup } from "@workspace/ui/components/avatar-group"
import { ChevronRight } from "lucide-react"

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
    <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-between gap-20 px-6 sm:py-20">
      <div className="max-w-xl">
        <div className="group mb-3 hidden cursor-progress items-center gap-2 rounded-full border bg-background px-1 py-1.25 sm:inline-flex">
          <AvatarGroup avatars={PEOPLE} max={5} size={26} />
          <span className="flex items-center gap-1 text-sm font-medium tracking-tighter text-muted-foreground">
            Trusted by 800+ founders{" "}
            <ChevronRight
              size={18}
              className="transition-all group-hover:-translate-x-0.5"
            />
          </span>
        </div>

        <h1 className="text-3xl leading-tight font-bold tracking-tight text-primary/80 sm:text-5xl">
          The simplest way to collect feedback.
        </h1>

        <ul className="mt-6 space-y-2.5">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-3 text-sm text-primary"
            >
              &#x2705;
              <span>{benefit}</span>
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

      <div className="hidden lg:block">Right section</div>
    </section>
  )
}

export default LandingHero
