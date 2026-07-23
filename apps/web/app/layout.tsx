import { Schibsted_Grotesk } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@workspace/ui/lib/utils"

const fontSans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Listform | Simplest way to hear from your users",
  description:
    "Listform lets you add feedback, bug report, survey, NPS, and waitlist widgets to any website in minutes — no code, beautifully designed, get started today",
  icons: {
    icon: "/listform.png",
    shortcut: "/listform.png",
    apple: "/listform.png",
  },
  openGraph: {
    title: "Listform | Simplest way to hear from your users",
    description:
      "Listform lets you add feedback, bug report, survey, NPS, and waitlist widgets to any website in minutes — no code, beautifully designed, get started today",
    url: "https://listform.in",
    siteName: "Listform",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Listform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Listform | Simplest way to hear from your users",
    description:
      "Listform lets you add feedback, bug report, survey, NPS, and waitlist widgets to any website in minutes — no code, beautifully designed, get started today",
    images: ["/og.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", fontSans.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
