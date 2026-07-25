import Divider from "@/components/divider"
import LandingHero from "./_components/landing-hero"
import LandingNavbar from "./_components/landing-navbar"
import DottedBackground from "@/components/dotted-background"
import ResultsSection from "./_components/results-section"
import FeaturesSection from "./_components/features-section"
import { BenefitSection } from "./_components/benefit-section"

export default function Page() {
  return (
    <>
      <LandingNavbar />
      <LandingHero />
      <Divider />
      <DottedBackground>
        <ResultsSection />
      </DottedBackground>
      <Divider />
      <FeaturesSection />
      <Divider />
      <DottedBackground>
        <BenefitSection />
      </DottedBackground>
    </>
  )
}
