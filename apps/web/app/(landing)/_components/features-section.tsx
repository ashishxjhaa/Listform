import { MessageSquare, Bug, BarChart3, Rocket } from "lucide-react"
import { IconBadge } from "@workspace/ui/components/icon-badge"

const features = [
  {
    icon: MessageSquare,
    color: "blue",
    title: "Feedback",
    description:
      "Collect feedback your users actually want to leave with beautifully designed, distraction-free widgets.",
  },
  {
    icon: Bug,
    color: "red",
    title: "Bug Reports",
    description:
      "Let users report bugs in seconds so you can identify issues before they become support tickets.",
  },
  {
    icon: BarChart3,
    color: "purple",
    title: "Surveys & NPS",
    description:
      "Measure customer satisfaction, validate ideas, and understand what your users really think.",
  },
  {
    icon: Rocket,
    color: "orange",
    title: "Waitlists",
    description:
      "Launch faster with customizable waitlist forms that help you capture interest before your product goes live.",
  },
] as const

const FeaturesSection = () => {
  return (
    <section className="w-full py-15 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-primary/80 md:text-5xl">
          Every click has something to say
        </h2>

        <div className="mt-16 grid gap-8 sm:gap-12 md:grid-cols-2">
          {features.map(({ icon, color, title, description }) => (
            <div key={title} className="flex flex-col items-start gap-4">
              <IconBadge icon={icon} color={color} size="sm" />
              <h3 className="text-2xl font-semibold text-foreground">
                {title}
              </h3>
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
