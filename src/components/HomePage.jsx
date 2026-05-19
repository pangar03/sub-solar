import Navbar from './home/Navbar.jsx';
import HeroSection from './home/HeroSection.jsx';
import FeatureIntroSection from './home/FeatureIntroSection.jsx';
import HowItWorksSection from './home/HowItWorksSection.jsx';
import ConversationPanel from './home/ConversationPanel.jsx';
import BenefitsSection from './home/BenefitsSection.jsx';
import SimulatorSection from './home/SimulatorSection.jsx';
import PrioritySection from './home/PrioritySection.jsx';
import CtaSection from './home/CtaSection.jsx';
import SolarProfilesSection from './home/SolarProfilesSection.jsx';
import InteractiveSimulatorPromo from './home/InteractiveSimulatorPromo.jsx';
import ReviewsSection from './home/ReviewsSection.jsx';
import PricingSection from './home/PricingSection.jsx';
import ContactSection from './home/ContactSection.jsx';
import Footer from './home/Footer.jsx';

export default function HomePage() {
  return (
    <main id="home" className="page">
      <Navbar />
      <HeroSection />
      <FeatureIntroSection />
      <HowItWorksSection />
      <SolarProfilesSection />  
      <InteractiveSimulatorPromo />
      <ReviewsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    

    </main>
  );
}