"use client"

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@workspace/ui/lib/utils"

const PALETTE = ["#f0883e", "#3ecf8e", "#22d3ee", "#b06bff", "#f0463a"]

export type Avatar = {
  src?: string
  name: string
}

export type AvatarGroupProps = {
  avatars: Avatar[]
  max?: number
  size?: number
  className?: string
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function AvatarGroup({
  avatars,
  max = 5,
  size = 40,
  className,
}: AvatarGroupProps) {
  const [open, setOpen] = React.useState(false)
  const shown = avatars.slice(0, max)
  const extra = avatars.length - shown.length
  const overlap = size * 0.34
  const spread = size * 0.18

  return (
    <motion.div
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      className={cn("flex items-center", className)}
    >
      {shown.map((a, i) => (
        <motion.div
          key={a.name + i}
          className="group/av relative"
          style={{ zIndex: shown.length - i }}
          initial={false}
          animate={{
            marginLeft: i === 0 ? 0 : open ? -overlap + spread : -overlap,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          whileHover={{ y: -4, zIndex: 50, transition: { duration: 0.18 } }}
        >
          <span
            className={cn(
              "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg border border-black/[0.08] px-2 py-1 whitespace-nowrap",
              "text-[12px] font-medium tracking-[-0.01em]",
              "bg-white text-neutral-900 dark:border-white/[0.08] dark:bg-[#232320] dark:text-white",
              "shadow-[0_2px_6px_-2px_rgba(27,27,25,0.16)] dark:shadow-[0_4px_10px_-4px_rgba(0,0,0,0.5)]",
              "opacity-0 transition-opacity duration-150 group-hover/av:opacity-100"
            )}
          >
            {a.name}
          </span>
          <span
            className="block overflow-hidden rounded-full ring-2 ring-white dark:ring-[#0a0a0b]"
            style={{ width: size, height: size }}
          >
            {a.src ? (
              <img
                src={a.src}
                alt={a.name}
                className="size-full object-cover"
                draggable={false}
              />
            ) : (
              <span
                className="flex size-full items-center justify-center font-semibold"
                style={{
                  background: PALETTE[hashName(a.name) % PALETTE.length],
                  color: "#141612",
                  fontSize: size * 0.36,
                }}
              >
                {initials(a.name)}
              </span>
            )}
          </span>
        </motion.div>
      ))}

      {extra > 0 && (
        <motion.span
          initial={false}
          animate={{ marginLeft: open ? -overlap + spread : -overlap }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className={cn(
            "grid place-items-center rounded-full font-semibold ring-2 ring-white dark:ring-[#0a0a0b]",
            "bg-white text-neutral-600 dark:bg-[#232320] dark:text-neutral-300"
          )}
          style={{
            width: size,
            height: size,
            fontSize: size * 0.32,
            zIndex: 0,
          }}
        >
          +{extra}
        </motion.span>
      )}
    </motion.div>
  )
}

function hashName(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0
  return Math.abs(h)
}
