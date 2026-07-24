import { cn } from "@workspace/ui/lib/utils"

interface DividerProps {
  className?: string
  fade?: boolean
}

const Divider = ({ className, fade = true }: DividerProps) => {
  return (
    <div role="separator" aria-hidden className={cn(className)}>
      <div
        className="mx-auto h-px max-w-6xl"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, black 0 6px, transparent 6px 12px)",
          maskImage: fade
            ? "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            : undefined,
          WebkitMaskImage: fade
            ? "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
            : undefined,
        }}
      />
    </div>
  )
}

export default Divider
