import {
  Briefcase,
  Check,
  FlaskConical,
  Headphones,
  Rocket,
  Smartphone,
  Users,
} from "lucide-react"
import { IconBadge } from "@workspace/ui/components/icon-badge"

const audiences = [
  {
    icon: FlaskConical,
    color: "purple",
    title: "Product Teams",
    points: [
      "Gather feature requests",
      "Understand user needs and use cases",
      "Identify friction in onboarding and workflows",
      "Prioritize what to build next",
      "Share a public roadmap",
    ],
  },
  {
    icon: Rocket,
    color: "orange",
    title: "Startups & Founders",
    points: [
      "Validate what problem users care about",
      "Ask early users what to build next",
      "Collect improvement ideas",
      "Understand why users churn",
      "Show what you're building now and next",
    ],
  },
  {
    icon: Headphones,
    color: "blue",
    title: "Customer Support",
    points: [
      "Measure satisfaction after interactions",
      "Identify recurring issues and blockers",
      "Collect structured customer feedback",
      "Escalate product improvement ideas",
      "Close the loop with customers",
    ],
  },
  {
    icon: Smartphone,
    color: "green",
    title: "Consumer Apps",
    points: [
      "Capture in-the-moment feedback",
      "Track sentiment after updates",
      "Identify confusing or frustrating flows",
      "Let users suggest improvements",
      "Monitor overall experience quality",
    ],
  },
  {
    icon: Users,
    color: "indigo",
    title: "Communities",
    points: [
      "Let members suggest and vote on ideas",
      "Run quick polls and decisions",
      "Take regular community pulse checks",
      "Collect open feedback",
      "Share what's coming next",
    ],
  },
  {
    icon: Briefcase,
    color: "yellow",
    title: "Agencies & Services",
    points: [
      "Collect client feedback",
      "Measure satisfaction after delivery",
      "Understand client priorities",
      "Capture improvement suggestions",
      "Share project progress and updates",
    ],
  },
] as const

export function AudienceSection() {
  return (
    <section className="w-full py-15 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-primary/80 sm:text-center sm:text-5xl">
          Built for teams like yours
        </h2>
        <p className="text-md mx-auto mt-4 max-w-xl text-muted-foreground italic sm:text-lg">
          Whether you&apos;re validating ideas, managing a community, or
          improving customer experience, Listform adapts to your workflow.
        </p>

        <div className="mt-10 grid border-x border-border md:grid-cols-2 lg:grid-cols-3">
          {audiences.map(({ icon, color, title, points }) => (
            <div
              key={title}
              className="group relative flex flex-col items-start gap-4 border-r border-b border-border bg-background px-6 py-8 transition-colors duration-300 select-none hover:bg-white md:px-8"
            >
              <IconBadge icon={icon} color={color} size="sm" />
              <div className="absolute top-[5.2rem] -left-px h-9.5 w-1.5 rounded-r-full bg-border transition-all duration-300 group-hover:h-10.5 group-hover:bg-[#ff5800]" />
              <div className="w-full transition-transform duration-300 group-hover:translate-x-3">
                <h3 className="text-2xl font-semibold text-foreground transition-transform duration-300">
                  {title}
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="mt-1 shrink-0 text-foreground/60"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
