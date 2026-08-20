import { Arrow, INSTAGRAM_URL } from './shared'

const customIdeas = [
  { label: 'Yarn', text: 'Your colors, your fiber' },
  { label: 'Shape', text: 'Any size, any form' },
  { label: 'Marks', text: 'Initials or names worked in' },
  { label: 'Reason', text: 'Gifts, weddings and more' },
]

export function BespokeSection() {
  return (
    <section
      className="relative overflow-hidden bg-brand-rose px-6 py-28 text-brand-paper sm:px-10 sm:py-36 lg:px-[6vw]"
      id="bespoke"
    >
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="font-lexend text-[0.62rem] uppercase tracking-[0.18em] text-brand-paper/55">
            Made for you · 02
          </p>
          <h2 className="mt-6 font-league text-[clamp(3rem,6vw,6.5rem)] leading-[0.86] tracking-[-0.065em]">
            Anything <em className="font-display">custom</em>.<br />
            Just ask.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-brand-paper/70 sm:text-base font-league">
          Send a message with your idea. We talk colors, yarn, size, and timing, then make a piece
          that is only yours.
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden border border-brand-paper/20 bg-brand-paper/20 sm:grid-cols-2 lg:grid-cols-4">
        {customIdeas.map((idea) => (
          <div key={idea.label} className="bg-brand-paper/70 p-6">
            <p className="font-lexend text-[0.6rem] uppercase tracking-[0.18em] text-brand-rose">
              {idea.label}
            </p>
            <p className="mt-4 font-league text-2xl leading-snug text-brand-ink">{idea.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-end">

        <a
          className="inline-flex items-center gap-3 border border-brand-paper px-6 py-3 font-lexend text-xs font-medium uppercase tracking-[0.13em] transition-colors hover:bg-brand-paper hover:text-brand-ink"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
        >
          Start a custom order <Arrow />
        </a>
      </div>
    </section>
  )
}
