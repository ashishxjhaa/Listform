import { cn } from "@workspace/ui/lib/utils"

interface DottedBackgroundProps {
  children: React.ReactNode
  className?: string
  fade?: boolean
}

const DottedBackground = ({
  children,
  className,
  fade = true,
}: DottedBackgroundProps) => {
  return (
    <div className={cn("relative isolate mx-auto max-w-6xl", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklch, var(--foreground) 22%, transparent) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          maskImage: fade
            ? "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)"
            : undefined,
          WebkitMaskImage: fade
            ? "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)"
            : undefined,
        }}
      />
      {children}
    </div>
  )
}

export default DottedBackground
