import { AglaiaLogo } from './aglaia-logo'
import { Arrow, INSTAGRAM_URL } from './shared'

export function Footer() {
  return (
    <footer className="bg-brand-ink px-6 pb-6 pt-16 text-brand-paper sm:px-10 sm:pb-8 sm:pt-20 lg:px-[6vw]">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr_0.7fr] lg:gap-16">
        <div>
          <a className="inline-block transition-opacity hover:opacity-70" href="#top" aria-label="Back to top">
            <AglaiaLogo className="h-14 w-auto" aria-hidden="true" />
          </a>
          <p className="mt-7 max-w-sm font-lexend text-sm leading-6 text-brand-paper/70">
            Handmade crochet pieces, made slowly in Cyprus and meant to be carried for years.
          </p>
        </div>

        <div className="font-lexend text-sm">
          <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-brand-paper/50">Explore</p>
          <div className="flex flex-col items-start gap-3">
            <a className="transition-colors hover:text-brand-rose" href="#collection">Collection</a>
            <a className="transition-colors hover:text-brand-rose" href="#about">The Aglaia way</a>
            <a className="transition-colors hover:text-brand-rose" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        <div className="lg:justify-self-end">
          <p className="max-w-xs font-lexend text-sm leading-6 text-brand-paper/70">For a piece made just for you, send a message.</p>
          <a className="mt-5 inline-flex items-center gap-3 border border-brand-paper px-5 py-3 font-lexend text-xs font-medium uppercase tracking-[0.13em] transition-colors hover:bg-brand-paper hover:text-brand-ink" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Start an order <Arrow />
          </a>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-brand-paper/20 pt-5 font-lexend text-[0.65rem] uppercase tracking-[0.14em] text-brand-paper/50 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Aglaia’s Crochet</p>
        <p>Made by hand · Cyprus</p>
      </div>
    </footer>
  )
}
