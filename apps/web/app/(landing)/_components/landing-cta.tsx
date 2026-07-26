import { Button } from "@workspace/ui/components/button"

export function LandingCTA() {
  return (
    <section className="w-full pb-10 sm:pb-15">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-primary/80 sm:text-4xl">
          Feedback Flywheel.
        </h2>

        <Button size="lg" className="mt-4 cursor-pointer sm:mt-8">
          Quick start
        </Button>
      </div>
    </section>
  )
}
