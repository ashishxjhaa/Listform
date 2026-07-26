import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export function LandingCTA() {
  return (
    <section className="w-full pb-10 sm:pb-15">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-primary/80 sm:text-4xl">
          Feedback Flywheel.
        </h2>

        <Button
          nativeButton={false}
          className="mt-8 px-6 py-5 text-base"
          render={<Link href="/login">Quick start</Link>}
        />
      </div>
    </section>
  )
}
