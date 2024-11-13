import About from '@/components/landing-page/about'
import CommitmentSection from '@/components/landing-page/commitment-section'
import HeroSection from '@/components/landing-page/hero'
import HowItWorks from '@/components/landing-page/how-it-works'
import JoinUsNow from '@/components/landing-page/join-us'
import JoinWaitList from '@/components/landing-page/join-waitlist'
import Plans from '@/components/landing-page/plans'
import Services from '@/components/landing-page/services'

const HomeClient = () => {
  return (
    <>
      <HeroSection />
      <About />
      <Services/>
      <HowItWorks/>
      <CommitmentSection />
      <Plans/>
      <JoinUsNow />
      <JoinWaitList/>
    </>
  )
}

export default HomeClient