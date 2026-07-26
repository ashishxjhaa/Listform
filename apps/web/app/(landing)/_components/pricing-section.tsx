import { Button } from "@workspace/ui/components/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Pro",
    price: "$10",
    interval: "/month",
    cta: "Get started",
    features: [
      "Unlimited feedback widgets",
      "Unlimited projects",
      "Unlimited submissions",
      "Collect visitor details",
      "Embed on any website",
      "2-minute setup",
      "Priority support",
      "Free future updates",
    ],
  },
] as const

export function PricingSection() {
  return (
    <section className="w-full py-15 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold tracking-tight text-primary/80 sm:text-center sm:text-5xl">
          Simple, honest pricing.
        </h2>
        <p className="text-md mx-auto mt-4 max-w-lg text-muted-foreground italic sm:text-lg">
          One plan. Everything included. No tiers to compare, no features locked
          behind an upsell.
        </p>

        <div className="mt-16 grid justify-center gap-8 sm:grid-cols-[repeat(auto-fit,minmax(320px,400px))]">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="w-full max-w-md rounded-2xl border p-8 sm:p-10"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight text-primary/80">
                  {plan.price}
                </span>
                <span className="pb-1.5 text-base text-muted-foreground">
                  {plan.interval}
                </span>
              </div>
              <Button size="lg" className="mt-8 w-full cursor-pointer">
                {plan.cta}
              </Button>
              <ul className="mt-8 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-base leading-relaxed text-muted-foreground"
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="mt-1 shrink-0 text-foreground/60"
                    />
                    <span>{feature}</span>
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
