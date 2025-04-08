import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { ForWhom } from '@/components/ForWhom';

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <HowItWorks />
      <ForWhom />
    </Layout>
  );
};

export default Home;
