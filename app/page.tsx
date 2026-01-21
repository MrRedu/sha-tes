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
    <div className="min-h-screen bg-background text-foreground mx-auto flex flex-col items-center w-full ">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        {/* <CTA /> */}
      </main>
      <Footer />
    </div>
  );
}
