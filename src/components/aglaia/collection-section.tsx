import { DriftWall } from '@/components/ui/drift-wall'
import { Eyebrow, INSTAGRAM_URL } from './shared'

const collection = [
  { name: 'Dune · back', image: '/instagram/dune-back.jpg' },
  { name: 'Nyx · detail', image: '/instagram/nyx-detail.jpg' },
  { name: 'Nyx · flatlay', image: '/instagram/nyx-flatlay.png' },
  { name: 'Clio', image: '/instagram/clio-collection.png' },
  { name: 'Canyon · detail', image: '/instagram/canyon-2.jpg' },
  { name: 'Dune', image: '/instagram/dune-front.jpg' },
  { name: 'Eclipse', image: '/instagram/eclipse.jpg' },
  { name: 'Canyon', image: '/instagram/canyon.jpg' },
]

export function CollectionSection() {
  return (
    <section className="overflow-hidden bg-brand-paper px-6 py-24 sm:px-10 sm:py-32 lg:px-[6vw]" id="collection">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
        <div>
          <Eyebrow>The collection · 02</Eyebrow>
          <h2 className="mt-5 font-league text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.86] tracking-[-0.065em]">
            Made for <em className="font-display">the long way</em><br />around.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
          Every piece begins with soft yarn, a hook, and the pleasure of making something that lasts.
        </p>
      </div>

      <div className="mt-14 -mx-6 border-y border-brand-ink py-5 sm:-mx-10 sm:py-6 lg:mx-[-6vw]">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-brand-ink/25 px-6 pb-4 sm:px-10 lg:px-[6vw]">
          <p className="font-lexend text-[0.62rem] uppercase tracking-[0.16em]">Selected pieces</p>
          <p className="font-lexend text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">Move to explore</p>
        </div>
        <div className="h-[430px] sm:h-[540px] lg:h-[620px]">
          <DriftWall
            items={collection.map((item) => ({
              image: item.image,
              title: `${item.name} handmade crochet bag`,
              href: INSTAGRAM_URL,
            }))}
            columns={8}
            tileWidth={212}
            tileHeight={186}
            gap={18}
            radius={14}
            direction="down"
            speed={12}
            variance={1}
            tilt={22}
            turn={-25}
            roll={-4}
            perspective={1400}
            depth={290}
            parallax={0}
            lift={0}
            fade={0.15}
            dim={0.95}
            grayscale={false}
            overlayColor="#060010"
          />
        </div>
      </div>
    </section>
  )
}
