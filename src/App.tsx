import { BespokeSection } from '@/components/aglaia/bespoke-section'
import { CollectionSection } from '@/components/aglaia/collection-section'
import { Footer } from '@/components/aglaia/footer'
import { HeroSection } from '@/components/aglaia/hero-section'
import { ManifestoSection } from '@/components/aglaia/manifesto-section'
import { Navigation } from '@/components/aglaia/navigation'

function App() {
  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <BespokeSection />
      <CollectionSection />
      <ManifestoSection />
      <Footer />
    </main>
  )
}

export default App
