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
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
}
