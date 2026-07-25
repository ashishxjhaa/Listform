import {
  Clock,
  LayoutDashboard,
  Layers,
  Rocket,
  Smile,
  TrendingUp,
} from "lucide-react"

import { IconBadge } from "@workspace/ui/components/icon-badge"

const highlights = [
  {
    icon: TrendingUp,
    color: "blue",
    stat: "Up to 7x more responses",
    description:
      "Embeddable widgets outperform cold emails and traditional survey links.",
  },
  {
    icon: Clock,
    color: "purple",
    stat: "Live in under 2 minutes",
    description:
      "Pick your fields, copy one script tag, and you're collecting feedback.",
  },
  {
    icon: Smile,
    color: "yellow",
    stat: "+35% response rate",
    description:
      "Widgets that match your brand get more people to actually respond.",
  },
  {
    icon: Layers,
    color: "green",
    stat: "One builder, five widgets",
    description:
      "Feedback, bug reports, surveys, NPS, and waitlists from a single place.",
  },
  {
    icon: LayoutDashboard,
    color: "red",
    stat: "Everything in one dashboard",
    description:
      "See every submission and reply to users without leaving Listform.",
  },
  {
    icon: Rocket,
    color: "orange",
    stat: "Ready on day one",
    description:
      "Ready-made templates so early-stage teams can ship without a designer.",
  },
] as const

const ResultsSection = () => {
  return (
    <section className="py-15 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-left sm:text-center">
          <p className="text-lg text-muted-foreground italic sm:text-xl">
            Collecting user feedback is one of the most important things <br />{" "}
            you can do while building a product.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon, color, stat, description }) => (
            <div key={stat} className="rounded-lg bg-white p-8">
              <IconBadge icon={icon} color={color} size="sm" />
              <h3 className="mt-6 text-xl font-semibold">{stat}</h3>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResultsSection
