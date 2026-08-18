import { Eyebrow } from './shared'

export function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-brand-rose px-6 py-28 text-brand-paper sm:px-10 sm:py-36 lg:px-[15vw]" id="about">
      <div className="absolute -right-24 -top-28 size-[30rem] rounded-full border border-brand-paper/40" />
      <div className="relative max-w-5xl">
        <Eyebrow>The Aglaia way · 03</Eyebrow>
        <h2 className="mt-7 font-league text-[clamp(3.3rem,6.5vw,7rem)] leading-[0.85] tracking-[-0.07em]">
          Not mass produced.<br />Not rushed.<br /><p className="font-display font-extralight italic">Made by hand.</p>
        </h2>
        <p className="mt-9 max-w-md text-base leading-7 text-brand-paper/80">
          Each piece is crocheted individually, allowing the small, lovely differences that make it entirely its own.
        </p>
      </div>
    </section>
  )
}
