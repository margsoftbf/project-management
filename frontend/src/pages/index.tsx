import type { NextPage } from 'next';
import { LandingLayout } from '../components/layout/LandingLayout';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ForWhom } from '@/components/landing/ForWhom';
import { Pricing } from '@/components/landing/Pricing';
import { Contact } from '@/components/landing/Contact';

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <Hero />
      <Features />
      <HowItWorks />
      <ForWhom />
      <Pricing />
      <Contact />
    </LandingLayout>
  );
};

export default Home;
