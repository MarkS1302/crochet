import { ArrowUpRight } from 'lucide-react'

export const INSTAGRAM_URL = 'https://www.instagram.com/aglaias.crochet/'

export function Arrow() {
  return <ArrowUpRight aria-hidden="true" size={16}  />
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-lexend text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  )
}
