import {
  Header,
  Hero,
  Features,
  HowItWorks,
  // CTA,
  Footer,
  Pricing,
} from '@/app/_components';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground mx-auto flex flex-col items-center w-full">
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
