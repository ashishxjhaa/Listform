import Divider from "@/components/divider"
import LandingHero from "./_components/landing-hero"
import LandingNavbar from "./_components/landing-navbar"
import DottedBackground from "@/components/dotted-background"
import ResultsSection from "./_components/results-section"

export default function Page() {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <Divider />
      <DottedBackground>
        <ResultsSection />
      </DottedBackground>
    </>
  )
}
