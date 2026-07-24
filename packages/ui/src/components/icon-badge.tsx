import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"
import type { LucideIcon } from "lucide-react"

type Color =
  "blue" | "orange" | "red" | "purple" | "green" | "yellow" | "gray" | "indigo"

const palette: Record<
  Color,
  { top: string; bottom: string; inner: string; shadow: string }
> = {
  blue: {
    top: "#6BA6FF",
    bottom: "#1E6BFF",
    inner: "#4A90FF",
    shadow: "30,107,255",
  },
  orange: {
    top: "#FFA24A",
    bottom: "#F26A11",
    inner: "#FF8A2B",
    shadow: "242,106,17",
  },
  red: {
    top: "#F26A6A",
    bottom: "#E23434",
    inner: "#EE4B4B",
    shadow: "226,52,52",
  },
  purple: {
    top: "#B58BFF",
    bottom: "#7A3CF0",
    inner: "#9E6BFF",
    shadow: "122,60,240",
  },
  indigo: {
    top: "#8A8AFF",
    bottom: "#4B4BF5",
    inner: "#6E6EFF",
    shadow: "75,75,245",
  },
  green: {
    top: "#3ED869",
    bottom: "#12A93E",
    inner: "#22C255",
    shadow: "18,169,62",
  },
  yellow: {
    top: "#F4C43A",
    bottom: "#D99A0B",
    inner: "#E8B41F",
    shadow: "217,154,11",
  },
  gray: {
    top: "#8A8A8A",
    bottom: "#4A4A4A",
    inner: "#6E6E6E",
    shadow: "60,60,60",
  },
}

const sizes = {
  xs: { box: 32, radius: 8, pad: 3, icon: 14 },
  sm: { box: 40, radius: 10, pad: 4, icon: 16 },
  md: { box: 88, radius: 22, pad: 8, icon: 40 },
  lg: { box: 140, radius: 34, pad: 12, icon: 64 },
  xl: { box: 220, radius: 52, pad: 18, icon: 104 },
}

export interface IconBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  color?: Color
  size?: keyof typeof sizes
}

export function IconBadge({
  icon: Icon,
  color = "blue",
  size = "md",
  className,
  style,
  ...rest
}: IconBadgeProps) {
  const c = palette[color]
  const s = sizes[size]

  return (
    <div
      className={cn("relative inline-block align-middle", className)}
      style={{ width: s.box, height: s.box, ...style }}
      {...rest}
    >
      {/* ground shadow — absolute, overflows downward, doesn't affect layout */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: -Math.round(s.box * 0.08),
          width: s.box * 0.9,
          height: s.box * 0.22,
          background: `radial-gradient(ellipse at center, rgba(${c.shadow},0.35) 0%, rgba(${c.shadow},0.15) 40%, rgba(${c.shadow},0) 70%)`,
          filter: "blur(6px)",
        }}
      />

      {/* outer squircle */}
      <div
        className="relative"
        style={{
          width: s.box,
          height: s.box,
          borderRadius: s.radius,
          background: `linear-gradient(180deg, ${c.top} 0%, ${c.bottom} 100%)`,
          boxShadow: [
            `0 ${Math.round(s.box * 0.14)}px ${Math.round(s.box * 0.28)}px -${Math.round(s.box * 0.06)}px rgba(${c.shadow},0.45)`,
            `inset 0 1px 0 rgba(255,255,255,0.45)`,
            `inset 0 -1px 0 rgba(0,0,0,0.08)`,
          ].join(", "),
          padding: s.pad,
        }}
      >
        {/* inner concentric frame */}
        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{
            borderRadius: s.radius - s.pad,
            background: `linear-gradient(180deg, ${c.top} 0%, ${c.inner} 60%, ${c.bottom} 100%)`,
            boxShadow: [
              `inset 0 1px 0 rgba(255,255,255,0.55)`,
              `inset 0 -1px 0 rgba(0,0,0,0.12)`,
              `inset 0 0 0 1px rgba(255,255,255,0.10)`,
            ].join(", "),
          }}
        >
          <Icon
            style={{ width: s.icon, height: s.icon }}
            color="white"
            strokeWidth={2.5}
            absoluteStrokeWidth
          />
        </div>
      </div>
    </div>
  )
}

export default IconBadge
