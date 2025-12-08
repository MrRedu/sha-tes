import {
  Header,
  Hero,
  Features,
  HowItWorks,
  // CTA,
  Footer,
  Pricing,
} from '@/components/landing';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground mx-auto flex flex-col items-center">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      {/* <CTA /> */}
      <Footer />
    </main>
  );
}
