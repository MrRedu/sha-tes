import {
  Header,
  Hero,
  Features,
  HowItWorks,
  CTA,
  Footer,
} from '@/components/landing';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground mx-auto">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
