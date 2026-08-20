import { Arrow, INSTAGRAM_URL } from './shared'
import { AglaiaLogo } from './aglaia-logo'

export function Navigation() {
  return (
    <nav
      className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-[6vw]"
      aria-label="Main navigation"
    >
        <AglaiaLogo className="h-16 w-auto p-1" aria-hidden="true" alt="Aglaia's Crochet logo" />

      <div className="flex items-center gap-4 text-xs tracking-[0.04em] sm:gap-7 sm:text-sm">
        <a className="hidden transition-opacity hover:opacity-55 sm:block" href="#collection">Collection</a>
        <a className="hidden transition-opacity hover:opacity-55 sm:block" href="#about">About</a>
        <a className="hidden transition-opacity hover:opacity-55 sm:block" href="#bespoke">Custom</a>
        <a className="hidden transition-opacity hover:opacity-55 md:block" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
        <a
          className="inline-flex items-center gap-2 border border-brand-ink px-3 py-2 transition-colors hover:bg-brand-ink hover:text-brand-paper sm:px-4"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
        >
          Order <Arrow />
        </a>
      </div>
    </nav>
  )
}
