import Logo from "@/components/logo"
import Link from "next/link"

const productLinks = [
  { label: "Feedback", href: "#" },
  { label: "Bug Reports", href: "#" },
  { label: "Surveys", href: "#" },
  { label: "Waitlists", href: "#" },
  { label: "Pricing", href: "#pricing" },
]

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Roadmap", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Contact", href: "#" },
]

const companyLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
]

export function FooterSection() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <Link href="/#home" aria-label="Listform">
              <Logo className="h-10 w-auto" />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">
              Collect feedback, understand your users, and build products people
              actually want.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
              Product
            </h3>

            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Listform. All rights reserved.</p>

          <p>Built for teams who listen.</p>
        </div>
      </div>
    </footer>
  )
}
