"use client"

import * as React from "react"
import { animate, motion, MotionConfig, useReducedMotion } from "motion/react"
import { Check, Loader2 } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

type ButtonState = "idle" | "submitting"
type ViewKind = "form" | "success"

interface ViewItem {
  id: number
  kind: ViewKind
}

const FIELDS = [
  { id: "name", label: "Full name", value: "Ashish Jha" },
  { id: "email", label: "Email address", value: "support@listform.in" },
  { id: "company", label: "Company", value: "Listform Labs LLC" },
] as const

const MESSAGE = "Type your message here"

// Timing (ms / s). Tuned to read as a real request/response, not a toy.
const SUBMIT_DELAY = 5 // simulated API round-trip, button reads "Sending…"
const SUCCESS_HOLD = 2800 // how long the success state stays up
const FOLD_DURATION = 0.9 // seconds, the bottom-fold transition itself
const FOLD_EASE: [number, number, number, number] = [0.83, 0, 0.17, 1]

// The card never grows or shrinks — every view is laid out to fit this box.
const CONTENT_HEIGHT = 440

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.7,
} as const

export function HeroFormPreview({ className }: { className?: string }) {
  const [items, setItems] = React.useState<ViewItem[]>([
    { id: 0, kind: "form" },
  ])
  const [buttonState, setButtonState] = React.useState<ButtonState>("idle")
  const nextId = React.useRef(1)

  const startTransitionTo = React.useCallback((kind: ViewKind) => {
    setItems((prev) =>
      prev.length > 1 ? prev : [...prev, { id: nextId.current++, kind }]
    )
  }, [])

  const handleSubmit = React.useCallback(() => {
    setItems((prevItems) => {
      if (prevItems.length > 1) return prevItems
      setButtonState((current) => (current === "idle" ? "submitting" : current))
      return prevItems
    })
  }, [])

  const handleFoldDone = React.useCallback((settled: ViewItem) => {
    setItems([settled])
    if (settled.kind === "form") setButtonState("idle")
  }, [])

  // Only a real click starts this — nothing auto-submits on its own.
  React.useEffect(() => {
    if (buttonState !== "submitting") return
    const t = setTimeout(() => startTransitionTo("success"), SUBMIT_DELAY)
    return () => clearTimeout(t)
  }, [buttonState, startTransitionTo])

  // After the success view has had its moment, fold back to the form.
  React.useEffect(() => {
    if (items.length !== 1 || items[0].kind !== "success") return
    const t = setTimeout(() => startTransitionTo("form"), SUCCESS_HOLD)
    return () => clearTimeout(t)
  }, [items, startTransitionTo])

  const renderContent = React.useCallback(
    (kind: ViewKind) =>
      kind === "form" ? (
        <FormView
          submitting={buttonState === "submitting"}
          onSubmit={handleSubmit}
        />
      ) : (
        <SuccessView />
      ),
    [buttonState, handleSubmit]
  )

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={cn("w-[380px] sm:w-[400px]", className)}
      >
        {/* Decorative product mockup — not a real, submittable form. */}
        <div
          aria-hidden="true"
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_1px_rgba(0,0,0,0.03),0_24px_48px_-20px_rgba(0,0,0,0.22)]"
        >
          <WindowChrome />
          <FoldStage
            items={items}
            onDone={handleFoldDone}
            renderContent={renderContent}
          />
        </div>
      </motion.div>
    </MotionConfig>
  )
}

// ---------------------------------------------------------------------------
// Organic bottom-fold transition
//
// The card is treated as a fixed-size box (CONTENT_HEIGHT, full width) that
// never resizes. Two content layers sit stacked inside it — the view we're
// leaving and the view we're arriving at — each clipped by an SVG path built
// fresh every frame. The clip shapes always meet at a shared "waist" so the
// silhouette reads as one continuous sheet pinching shut and reopening,
// never two independent panels.
// ---------------------------------------------------------------------------

const LOBE_SAMPLES = 20
const NECK_OVERLAP = 0.015 // fractional height; keeps the two lobes seamed with no gap

function foldEdgeInset(
  y: number,
  waistY: number,
  pinch: number,
  spread: number,
  maxInset: number
) {
  const dist = Math.min(Math.abs(y - waistY) / spread, 1)
  const bump = Math.cos((dist * Math.PI) / 2) ** 2
  return maxInset * pinch * bump
}

function buildLobePath(
  yStart: number,
  yEnd: number,
  waistY: number,
  pinch: number,
  spread: number,
  maxInset: number
): string {
  const points: [number, number][] = []
  for (let i = 0; i <= LOBE_SAMPLES; i++) {
    const y = yStart + ((yEnd - yStart) * i) / LOBE_SAMPLES
    points.push([foldEdgeInset(y, waistY, pinch, spread, maxInset), y])
  }
  for (let i = LOBE_SAMPLES; i >= 0; i--) {
    const y = yStart + ((yEnd - yStart) * i) / LOBE_SAMPLES
    points.push([1 - foldEdgeInset(y, waistY, pinch, spread, maxInset), y])
  }
  return smoothClosedPath(points)
}

function smoothClosedPath(points: [number, number][]): string {
  const n = points.length
  if (n < 3) return ""
  const mid = (a: [number, number], b: [number, number]): [number, number] => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
  ]
  const start = mid(points[n - 1], points[0])
  let d = `M ${start[0].toFixed(4)} ${start[1].toFixed(4)} `
  for (let i = 0; i < n; i++) {
    const cur = points[i]
    const next = points[(i + 1) % n]
    const m = mid(cur, next)
    d += `Q ${cur[0].toFixed(4)} ${cur[1].toFixed(4)} ${m[0].toFixed(4)} ${m[1].toFixed(4)} `
  }
  return d + "Z"
}

function computeFoldShapes(t: number) {
  // waistY: the pinch point, travels bottom → top as t goes 0 → 1.
  const waistY = 1 - t
  // pinch: 0 at both ends, 1 at the midpoint — the "hourglass neck" moment.
  const pinch = Math.min(1, 4 * t * (1 - t))
  const spread = 0.22 + 0.24 * pinch
  const maxInset = 0.46 // leaves a thin "flexible neck" rather than a hard zero
  const oldYEnd = Math.min(1, waistY + NECK_OVERLAP)
  const newYStart = Math.max(0, waistY - NECK_OVERLAP)
  return {
    oldD: buildLobePath(0, oldYEnd, waistY, pinch, spread, maxInset),
    newD: buildLobePath(newYStart, 1, waistY, pinch, spread, maxInset),
  }
}

function FoldStage({
  items,
  onDone,
  renderContent,
}: {
  items: ViewItem[]
  onDone: (settled: ViewItem) => void
  renderContent: (kind: ViewKind) => React.ReactNode
}) {
  const oldPathRef = React.useRef<SVGPathElement>(null)
  const newPathRef = React.useRef<SVGPathElement>(null)
  const reduceMotion = useReducedMotion()
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const transitioning = items.length > 1

  React.useLayoutEffect(() => {
    if (!transitioning) return
    const incoming = items[1]

    const initial = computeFoldShapes(0)
    oldPathRef.current?.setAttribute("d", initial.oldD)
    newPathRef.current?.setAttribute("d", initial.newD)

    if (reduceMotion) {
      const final = computeFoldShapes(1)
      oldPathRef.current?.setAttribute("d", final.oldD)
      newPathRef.current?.setAttribute("d", final.newD)
      const t = setTimeout(() => onDone(incoming), 180)
      return () => clearTimeout(t)
    }

    const controls = animate(0, 1, {
      duration: FOLD_DURATION,
      ease: FOLD_EASE,
      onUpdate: (progress: number) => {
        const shapes = computeFoldShapes(progress)
        oldPathRef.current?.setAttribute("d", shapes.oldD)
        newPathRef.current?.setAttribute("d", shapes.newD)
      },
      onComplete: () => onDone(incoming),
    })

    return () => controls.stop()
  }, [items, transitioning, reduceMotion, onDone])

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: CONTENT_HEIGHT }}
    >
      <svg
        width="0"
        height="0"
        className="absolute"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={`fold-old-${uid}`} clipPathUnits="objectBoundingBox">
            <path ref={oldPathRef} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
          <clipPath id={`fold-new-${uid}`} clipPathUnits="objectBoundingBox">
            <path ref={newPathRef} d="M 0 0 L 1 0 L 1 1 L 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      {items.map((item, idx) => (
        <div
          key={item.id}
          className="absolute inset-0"
          style={
            transitioning
              ? {
                  clipPath:
                    idx === 0
                      ? `url(#fold-old-${uid})`
                      : `url(#fold-new-${uid})`,
                }
              : undefined
          }
        >
          {renderContent(item.kind)}
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Chrome — untouched
// ---------------------------------------------------------------------------

function WindowChrome() {
  return (
    <div className="flex items-center gap-3 border-b border-border/70 bg-muted/40 px-4 py-3">
      <div className="group flex shrink-0 items-center gap-[7px]">
        <TrafficLight
          fill="#ff5f57"
          stroke="#e0443e"
          icon="close"
          label="Close"
        />
        <TrafficLight
          fill="#ffbd2e"
          stroke="#dea123"
          icon="minimize"
          label="Minimize"
        />
        <TrafficLight
          fill="#28c840"
          stroke="#1aab29"
          icon="maximize"
          label="Maximize"
        />
      </div>
      <span className="flex-1 truncate text-center text-[11px] font-medium text-muted-foreground/60">
        feedback.listform.in
      </span>
      <div className="w-[50px] shrink-0" />
    </div>
  )
}

function TrafficLight({
  fill,
  stroke,
  icon,
  label,
}: {
  fill: string
  stroke: string
  icon: "close" | "minimize" | "maximize"
  label: string
}) {
  return (
    <span
      title={label}
      className="relative flex size-3 items-center justify-center rounded-full"
      style={{
        backgroundColor: fill,
        boxShadow: `inset 0 0 0 0.5px ${stroke}`,
      }}
    >
      <svg
        viewBox="0 0 8 8"
        className="size-[7px] text-black/50 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      >
        {icon === "close" && (
          <path
            d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        )}
        {icon === "minimize" && (
          <path
            d="M1.3 4H6.7"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        )}
        {icon === "maximize" && (
          <path
            d="M1.3 5.3L3.4 3.2M3.4 3.2H1.7M3.4 3.2V4.9M6.7 2.7L4.6 4.8M4.6 4.8H6.3M4.6 4.8V3.1"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </span>
  )
}

// ---------------------------------------------------------------------------
// Form view
// ---------------------------------------------------------------------------

const fieldVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring, delay: 0.05 + i * 0.045 },
  }),
}

function FormView({
  submitting,
  onSubmit,
}: {
  submitting: boolean
  onSubmit: () => void
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-3.5 px-6">
      <motion.div
        custom={0}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
      >
        <h3 className="text-[13px] leading-snug font-semibold text-foreground">
          Please share your questions with us
        </h3>
      </motion.div>

      {FIELDS.map((field, i) => (
        <motion.div
          key={field.id}
          custom={i + 1}
          variants={fieldVariants}
          initial="hidden"
          animate="show"
          className="space-y-1.5"
        >
          <span className="text-xs font-medium text-foreground/70">
            {field.label}
          </span>
          <PreviewField value={field.value} />
        </motion.div>
      ))}

      <motion.div
        custom={FIELDS.length + 1}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
        className="space-y-1.5"
      >
        <span className="text-xs font-medium text-foreground/70">Message</span>
        <PreviewField as="textarea" value={MESSAGE} />
      </motion.div>

      <motion.div
        custom={FIELDS.length + 2}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
      >
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          whileTap={submitting ? undefined : { scale: 0.97 }}
          className={cn(
            "flex h-8 w-full items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors duration-300",
            submitting
              ? "cursor-not-allowed bg-primary/35 text-primary-foreground/70"
              : "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80"
          )}
        >
          {submitting ? (
            <>
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Submit"
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

function PreviewField({
  value,
  as = "input",
}: {
  value: string
  as?: "input" | "textarea"
}) {
  const shared = {
    value,
    readOnly: true,
    tabIndex: -1,
    onMouseDown: (e: React.MouseEvent) => e.preventDefault(),
    className: "cursor-not-allowed select-none",
  }

  return as === "textarea" ? (
    <Textarea rows={2} {...shared} />
  ) : (
    <Input {...shared} />
  )
}

// ---------------------------------------------------------------------------
// Success view — split top/bottom, green, ring pulses continuously
// ---------------------------------------------------------------------------

function SuccessIcon() {
  return (
    <div className="relative flex size-14 items-center justify-center">
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full bg-emerald-400"
          initial={{ opacity: 0.35, scale: 1 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.9,
          }}
        />
      ))}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ ...spring, delay: 0.05 }}
        className="relative flex size-14 items-center justify-center rounded-full bg-emerald-500 shadow-[0_2px_14px_rgba(16,185,129,0.4)]"
      >
        <Check className="size-6 text-white" strokeWidth={2.75} />
      </motion.div>
    </div>
  )
}

function SuccessView() {
  return (
    <div className="grid h-full grid-rows-2">
      <div className="flex items-center justify-center bg-emerald-500/10">
        <SuccessIcon />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 px-6 text-center">
        <p className="text-sm font-semibold text-foreground">Message sent</p>
        <p className="text-xs text-muted-foreground">
          We usually reply within a few hours.
        </p>
      </div>
    </div>
  )
}
