import Hero from '@/components/home/Hero';
import RecentEvents from '@/components/home/RecentEvents';
import ContactCTA from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <RecentEvents />
      <ContactCTA />
    </main>
  )
}
