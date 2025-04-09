import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { ForWhom } from '@/components/ForWhom';
import { Pricing } from '@/components/Pricing';
import { Contact } from '@/components/Contact';

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <ForWhom />
      <Pricing />
      <Contact />
    </Layout>
  );
};

export default Home;
