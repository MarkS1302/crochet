import { useEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { INSTAGRAM_URL } from './shared'
import { BAGS } from './bags'

const SLOT_STYLES = [
  { x: '-100%', y: '0%', scale: 0.58, z: 10 },
  { x: '0%', y: '-9%', scale: 1.2, z: 20 },
  { x: '100%', y: '0%', scale: 0.58, z: 10 },
]

export function HeroSection() {
  const [active, setActive] = useState(0)
  const dragStartX = useRef<number | null>(null)

  const showPrevious = () => { setActive((current) => (current - 1 + BAGS.length) % BAGS.length); }
  const showNext = () => { setActive((current) => (current + 1) % BAGS.length); }

  useEffect(() => {
    const timer = window.setInterval(showNext, 3600)
    return () => { window.clearInterval(timer); }
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return
    event.preventDefault()
    dragStartX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return
    const distance = event.clientX - dragStartX.current
    dragStartX.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (Math.abs(distance) < 40) return
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    distance < 0 ? showNext() : showPrevious()
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY) || Math.abs(event.deltaX) < 20) return
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.deltaX > 0 ? showNext() : showPrevious()
  }

  const current = BAGS[active]

  return (
    <section className="relative overflow-hidden pb-10 pt-8 sm:pt-12" id="top">
      <div className="relative z-10 mx-auto max-w-350 px-6 sm:px-10 lg:px-[6vw]">
        <p className="hero-rise text-center font-lexend text-[0.62rem] uppercase tracking-[0.25em] text-muted-foreground">Handmade in Cyprus · 01</p>
        <h1 className="hero-rise mt-4 text-center font-league text-[clamp(3.6rem,12vw,10.5rem)] leading-[0.82] tracking-[-0.06em] [animation-delay:120ms]">Made slowly. <em className="font-display">Carried</em> everywhere.</h1>
        <div className="hero-rise mt-6 flex justify-center sm:mt-2 sm:justify-end sm:pr-4 [animation-delay:240ms]">
        </div>
      </div>

      <div className="relative z-20 -mt-4 sm:-mt-16 lg:-mt-24">
        <div
          aria-label="Handmade bag carousel"
          aria-roledescription="carousel"
          className="relative mx-auto h-77.5 w-full max-w-280 cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-97.5 md:h-117.5 lg:h-132.5"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') showPrevious()
            if (event.key === 'ArrowRight') showNext()
          }}
          onPointerCancel={() => { dragStartX.current = null }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerEnd}
          onWheel={handleWheel}
          role="region"
          tabIndex={0}
        >
          {BAGS.map((bag, index) => {
            let offset = index - active
            if (offset > BAGS.length / 2) offset -= BAGS.length
            if (offset < -BAGS.length / 2) offset += BAGS.length

            const visible = Math.abs(offset) <= 1
            const slot = SLOT_STYLES[offset + 1] ?? { x: offset < 0 ? '-160%' : '160%', y: '0%', scale: 0.4, z: 0 }
            const center = offset === 0

            return (
              <figure aria-hidden={!center} className="absolute inset-x-0 bottom-0 mx-auto flex h-full w-[64%] flex-col justify-end transition-[transform,opacity,filter] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-[54%] md:w-[46%]" key={bag.image} style={{ filter: visible ? undefined : 'blur(4px)', opacity: visible ? 1 : 0, transform: `translate(${slot.x}, ${slot.y}) scale(${slot.scale})`, zIndex: slot.z }}>
                <div className="absolute bottom-[6%] left-1/2 h-[3%] w-[54%] -translate-x-1/2 rounded-full bg-brand-ink/30 blur-md" />
                <img alt={`${bag.name} handmade crochet bag`} className="relative h-full w-full object-contain object-bottom drop-shadow-[0_18px_16px_rgba(56,41,37,0.16)]" draggable={false} src={bag.image} />
              </figure>
            )
          })}
        </div>

        <div className="mx-auto flex max-w-280 flex-col items-center gap-5 px-6">
          <div className="hero-rise text-center" key={current.name}>
            <p className="font-league font-black text-2xl ">{current.name}</p>
            <p className="mt-1 font-lexend text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">{current.detail}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-[1400px] px-6 sm:px-10 lg:px-[6vw]">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border pt-8 font-lexend text-lg text-muted-foreground/70 sm:gap-x-12">
          <span>Slow fashion</span><span>Made by hand</span><span>One of a kind</span><a className="transition-colors hover:text-brand-ink" href={INSTAGRAM_URL} rel="noreferrer" target="_blank">@aglaias.crochet</a>
        </div>
      </div>
    </section>
  )
}
