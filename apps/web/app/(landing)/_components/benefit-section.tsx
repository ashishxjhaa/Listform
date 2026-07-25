import {
  Clock,
  Gauge,
  Megaphone,
  RefreshCcw,
  Smile,
  TrendingDown,
} from "lucide-react"
import { IconBadge } from "@workspace/ui/components/icon-badge"

const results = [
  {
    icon: Megaphone,
    color: "orange",
    stat: "+52% feedback submissions",
    description:
      "More users contribute when voting and suggestions are visible in-product.",
  },
  {
    icon: TrendingDown,
    color: "green",
    stat: "-12% churn risk",
    description:
      "Closing the loop with roadmap and changelog updates improves retention signals.",
  },
  {
    icon: Clock,
    color: "indigo",
    stat: "6 hrs saved per week",
    description:
      "Teams spend less time triaging requests across docs, chat, and inboxes.",
  },
  {
    icon: Smile,
    color: "yellow",
    stat: "+18% user satisfaction",
    description:
      "Users rate experience higher when they can see what is planned and shipped.",
  },
  {
    icon: RefreshCcw,
    color: "purple",
    stat: "-65% duplicate requests",
    description:
      "AI clustering groups similar feedback so priorities stay clear and actionable.",
  },
  {
    icon: Gauge,
    color: "blue",
    stat: "2x faster prioritization",
    description:
      "Demand signals help teams decide what to build next with less internal debate.",
  },
] as const

export function BenefitSection() {
  return (
    <section className="w-full py-15 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <h2 className="text-left text-3xl font-bold tracking-tight text-primary/80 sm:text-5xl">
            Results teams get with Listform
          </h2>
          <p className="text-md mt-4 text-left text-muted-foreground italic sm:text-lg">
            Collect feedback in context, prioritize with real demand, and close
            the loop publicly.
          </p>
        </div>

        <div className="mt-16 grid divide-x divide-dashed divide-[#ff5800] md:grid-cols-2 md:divide-x lg:grid-cols-3">
          {results.map(({ icon, color, stat, description }) => (
            <div
              key={stat}
              className="flex flex-col items-start gap-4 border-r border-b border-dashed border-[#ff5800] px-6 py-8 first:pt-0 last:border-r-0 md:px-8 lg:last:border-r"
            >
              <IconBadge icon={icon} color={color} size="sm" />
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {stat}
                </h3>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
