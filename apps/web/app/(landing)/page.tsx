import Divider from "@/components/divider"
import LandingHero from "./_components/landing-hero"
import LandingNavbar from "./_components/landing-navbar"
import DottedBackground from "@/components/dotted-background"
import ResultsSection from "./_components/results-section"
import FeaturesSection from "./_components/features-section"
import { BenefitSection } from "./_components/benefit-section"
import { AudienceSection } from "./_components/audience-section"
import { PricingSection } from "./_components/pricing-section"
import { LandingCTA } from "./_components/landing-cta"

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
      <Divider />
      <AudienceSection />
      <Divider />
      <PricingSection />
      <LandingCTA />
    </>
  )
}
