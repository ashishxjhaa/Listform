"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Check, Loader } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

/**
 * HeroFormPreview
 * ---------------
 * Marketing mockup of a feedback form with a physics-based "paper card flip"
 * transition between the form and its success state.
 *
 * Motion contract
 *  - Submit → success flips the *entire* card down-and-away (rotateX negative,
 *    lifting toward the viewer) while the success view enters from below with
 *    the mirrored gesture.
 *  - After a short hold, the success view flips *up*-and-away and the form
 *    returns from above — the mirrored direction so the two transitions read
 *    as distinct gestures, not a rerun of the same tween.
 *  - The card container owns `perspective`; each face animates in 3D so the
 *    fold feels physical instead of a cross-fade.
 */

type View = "form" | "success"
type Direction = 1 | -1 // 1 = down (submit), -1 = up (return)

// ---------- timing --------------------------------------------------------

const FLIP_DURATION = 0.85
const FLIP_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1]
const SUCCESS_HOLD_MS = 2200
const CARD_HEIGHT = 460

// ---------- component -----------------------------------------------------

export function HeroFormPreview({ className }: { className?: string }) {
  const [view, setView] = React.useState<View>("form")
  const [direction, setDirection] = React.useState<Direction>(1)
  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmit = React.useCallback(() => {
    if (submitting || view !== "form") return
    setSubmitting(true)
    setDirection(1)
    // Instant — no artificial round-trip.
    requestAnimationFrame(() => setView("success"))
  }, [submitting, view])

  // Auto-return to the form after the success hold, from the opposite edge.
  React.useEffect(() => {
    if (view !== "success") return
    const t = window.setTimeout(() => {
      setDirection(-1)
      setView("form")
      setSubmitting(false)
    }, SUCCESS_HOLD_MS)
    return () => window.clearTimeout(t)
  }, [view])

  return (
    <div className={cn("relative w-full max-w-[380px]", className)}>
      <CornerBrackets />
      <div
        className="relative rounded-[10px] bg-card shadow-[0_30px_80px_-30px_rgba(24,15,10,0.35),0_10px_30px_-15px_rgba(24,15,10,0.18)] ring-1 ring-black/[0.04]"
        style={{ perspective: 1400 }}
      >
        <WindowChrome />
        <FlipStage view={view} direction={direction}>
          {view === "form" ? (
            <FormView submitting={submitting} onSubmit={handleSubmit} />
          ) : (
            <SuccessView />
          )}
        </FlipStage>
      </div>
    </div>
  )
}

// ---------- flip stage ----------------------------------------------------

function FlipStage({
  view,
  direction,
  children,
}: {
  view: View
  direction: Direction
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()

  // Down submit (direction=1): outgoing tilts toward viewer & falls; incoming
  // rises from below. Up return (direction=-1): mirrored.
  const enter = {
    rotateX: -35 * direction,
    y: 80 * direction,
    scale: 0.9,
    opacity: 0,
  }
  const center = { rotateX: 0, y: 0, scale: 1, opacity: 1 }
  const exit = {
    rotateX: 35 * direction,
    y: -80 * direction,
    scale: 0.9,
    opacity: 0,
  }

  const transition = reduceMotion
    ? { duration: 0.15 }
    : { duration: FLIP_DURATION, ease: FLIP_EASE }

  return (
    <div
      className="relative overflow-hidden rounded-b-[22px]"
      style={{
        height: CARD_HEIGHT,
        transformStyle: "preserve-3d",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={view}
          initial={enter}
          animate={center}
          exit={exit}
          transition={transition}
          className="absolute inset-0 origin-center"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transformOrigin: direction === 1 ? "50% 0%" : "50% 100%",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ---------- decorative pieces --------------------------------------------

function CornerBrackets() {
  const base =
    "pointer-events-none absolute h-6 w-6 z-10 [border-color:#ff5800]"
  return (
    <>
      <span
        className={cn(
          base,
          "-top-[6px] -left-[6px] rounded-tl-[8px] border-t-2 border-l-2"
        )}
      />
      <span
        className={cn(
          base,
          "-top-[6px] -right-[6px] rounded-tr-[8px] border-t-2 border-r-2"
        )}
      />
      <span
        className={cn(
          base,
          "-bottom-[6px] -left-[6px] rounded-bl-[8px] border-b-2 border-l-2"
        )}
      />
      <span
        className={cn(
          base,
          "-right-[6px] -bottom-[6px] rounded-br-[8px] border-r-2 border-b-2"
        )}
      />
    </>
  )
}

function WindowChrome() {
  return (
    <div className="relative flex h-11 items-center rounded-t-[10px] border-b border-black/[0.06] bg-[oklch(0.97_0.006_85)] px-4">
      <div className="group/lights flex items-center gap-[7px]">
        <TrafficLight color="#ff5f57" ring="#e14640" glyph="close" />
        <TrafficLight color="#febc2e" ring="#dfa123" glyph="minimize" />
        <TrafficLight color="#57c02c" ring="#2ea043" glyph="maximize" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-medium tracking-tight text-foreground/70">
          feedback.listform.in
        </span>
      </div>
    </div>
  )
}

function TrafficLight({
  color,
  ring,
  glyph,
}: {
  color: string
  ring: string
  glyph: "close" | "minimize" | "maximize"
}) {
  return (
    <span
      className="relative flex h-[13px] w-[13px] items-center justify-center rounded-full"
      style={{ backgroundColor: color, boxShadow: `inset 0 0 0 0.5px ${ring}` }}
    >
      <svg
        viewBox="0 0 10 10"
        className="pointer-events-none h-[8px] w-[8px] opacity-0 transition-opacity duration-150 group-hover/lights:opacity-100"
        style={{ color: "rgba(0,0,0,0.65)" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        {glyph === "close" && (
          <>
            <path d="M3 3l4 4" />
            <path d="M7 3l-4 4" />
          </>
        )}
        {glyph === "minimize" && <path d="M2.5 5h5" />}
        {glyph === "maximize" && (
          <>
            <path d="M3.4 6.6V3.4h3.2" />
            <path d="M6.6 3.4v3.2H3.4" />
          </>
        )}
      </svg>
    </span>
  )
}

// ---------- form view -----------------------------------------------------

const FIELDS = [
  { id: "name", label: "Full name", value: "Ashish Jha" },
  { id: "email", label: "Email address", value: "support@listform.in" },
  { id: "company", label: "Company", value: "Listform LLC" },
] as const

function FormView({
  submitting,
  onSubmit,
}: {
  submitting: boolean
  onSubmit: () => void
}) {
  return (
    <div className="flex h-full flex-col gap-4 px-6 pt-6 pb-6">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        Please share your questions with us
      </h3>

      <div className="flex flex-col gap-3">
        {FIELDS.map((f) => (
          <PreviewField key={f.id} label={f.label} value={f.value} />
        ))}
        <PreviewField
          label="Message"
          value="Type your message here"
          as="textarea"
          placeholder
        />
      </div>

      <Button
        onClick={onSubmit}
        disabled={submitting}
        className="sm:text-md mt-4.5 cursor-pointer rounded-md p-2.5 sm:p-4.5"
      >
        {submitting ? (
          <>
            <Loader className="size-3.5 animate-spin" />
            Sending…
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  )
}

function PreviewField({
  label,
  value,
  as = "input",
  placeholder = false,
}: {
  label: string
  value: string
  as?: "input" | "textarea"
  placeholder?: boolean
}) {
  const shared = {
    readOnly: true,
    tabIndex: -1 as const,
    onMouseDown: (e: React.MouseEvent) => e.preventDefault(),
  }

  const fieldClass = cn(
    "w-full rounded-lg border border-input bg-background/60 px-3 text-[13px] text-foreground select-none",
    "hover:cursor-not-allowed focus:outline-none focus-visible:outline-none",
    placeholder && "text-muted-foreground/60 italic"
  )

  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium tracking-tight text-muted-foreground">
        {label}
      </span>
      {as === "textarea" ? (
        <textarea
          {...shared}
          value={value}
          rows={2}
          className={cn(fieldClass, "resize-none py-2 leading-snug")}
          style={{ resize: "none" }}
        />
      ) : (
        <input
          {...shared}
          value={value}
          className={cn(fieldClass, "h-9 italic")}
        />
      )}
    </label>
  )
}

// ---------- success view --------------------------------------------------

function SuccessView() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center bg-[oklch(0.96_0.05_150)]">
        <SuccessIcon />
      </div>
      <div className="flex flex-col items-center justify-center gap-1 px-6 py-8 text-center">
        <p className="text-[14px] font-semibold tracking-tight text-foreground">
          Message sent
        </p>
        <p className="text-[12px] text-muted-foreground">
          We usually reply within a few hours.
        </p>
      </div>
    </div>
  )
}

function SuccessIcon() {
  return (
    <div className="relative flex size-16 items-center justify-center">
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full bg-emerald-400/50"
          initial={{ opacity: 0.45, scale: 1 }}
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
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 0.95, 1.06, 1] }}
        transition={{
          duration: 0.9,
          times: [0, 0.35, 0.55, 0.78, 1],
          ease: "easeOut",
        }}
        className="relative flex size-14 items-center justify-center rounded-full bg-emerald-500 shadow-[0_6px_20px_-6px_rgba(16,185,129,0.55)]"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.28, ease: "easeOut" }}
        >
          <Check className="size-7 text-white" strokeWidth={3} />
        </motion.span>
      </motion.div>
    </div>
  )
}
