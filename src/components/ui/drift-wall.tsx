import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

export type DriftWallItem = {
  image: string
  title: string
  href?: string
}

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1
  return 1 + variance * pseudo
}

type DriftWallProps = {
  items: DriftWallItem[]
  columns?: number
  tileWidth?: number
  tileHeight?: number
  gap?: number
  radius?: number
  tilt?: number
  turn?: number
  roll?: number
  perspective?: number
  depth?: number
  speed?: number
  direction?: 'up' | 'down'
  variance?: number
  parallax?: number
  pauseOnHover?: boolean
  lift?: number
  fade?: number
  dim?: number
  grayscale?: boolean
  overlayColor?: string
}

export function DriftWall({
  items,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#382925',
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const tracksRef = useRef<Array<HTMLDivElement | null>>([])
  const offsetsRef = useRef<number[]>([])
  const speedsRef = useRef<number[]>([])
  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const hoverColumnRef = useRef(-1)
  const wallHoveredRef = useRef(false)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [height, setHeight] = useState(600)
  const [activeTile, setActiveTile] = useState<string | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  const shuffledItems = useMemo(() => {
    const shuffled = [...items]
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1))
      const current = shuffled[index]
      shuffled[index] = shuffled[swapIndex]
      shuffled[swapIndex] = current
    }
    return shuffled
  }, [items])

  const columnsOfItems = useMemo(() => {
    if (!shuffledItems.length) return []

    return Array.from({ length: columns }, () => {
      const column = [...shuffledItems]
      for (let index = column.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1))
        const current = column[index]
        column[index] = column[swapIndex]
        column[swapIndex] = current
      }
      return column
    })
  }, [columns, shuffledItems])

  const metadata = useMemo(() => columnsOfItems.map((column) => {
    const copyHeight = Math.max(tileHeight + gap, column.length * (tileHeight + gap))
    return {
      copyHeight,
      copies: Math.max(2, Math.ceil((height * 1.6) / copyHeight) + 1),
    }
  }), [columnsOfItems, gap, height, tileHeight])

  useLayoutEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height || 600))
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    offsetsRef.current = metadata.map((item, index) => item.copyHeight * ((index * 0.37) % 1))
    speedsRef.current = columnsOfItems.map(() => 0)
  }, [columnsOfItems, metadata])

  const updatePlane = useCallback(() => {
    if (!planeRef.current) return
    planeRef.current.style.transform =
      'translate(-50%, -50%) scale(1.18) rotateX(' + (tilt - pointerRef.current.y * parallax * 8) +
      'deg) rotateY(' + (turn + pointerRef.current.x * parallax * 8) + 'deg) rotateZ(' + roll + 'deg) translateZ(' + -depth + 'px)'
  }, [depth, parallax, roll, tilt, turn])

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time
      const delta = Math.min(0.05, (time - lastTimeRef.current) / 1000)
      lastTimeRef.current = time
      updatePlane()

      tracksRef.current.forEach((track, index) => {
        const meta = metadata[index]
        if (!track || !meta) return
        if (!reduceMotion) {
          const alternateDirection = index % 2 === 0 ? 1 : -1
          const directionSign = direction === 'down' ? -1 : 1
          const columnVariance = columnFactor(index, variance)
          const paused = pauseOnHover && wallHoveredRef.current
          const targetSpeed = paused || hoverColumnRef.current === index
            ? 0
            : speed * directionSign * alternateDirection * columnVariance
          speedsRef.current[index] += (targetSpeed - speedsRef.current[index]) * (1 - Math.exp(-delta / 0.24))
          offsetsRef.current[index] = ((offsetsRef.current[index] + speedsRef.current[index] * delta) % meta.copyHeight + meta.copyHeight) % meta.copyHeight
        }
        track.style.transform = 'translate3d(0, ' + -offsetsRef.current[index] + 'px, 0)'
      })

      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      lastTimeRef.current = null
    }
  }, [direction, metadata, pauseOnHover, reduceMotion, speed, updatePlane, variance])

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = containerRef.current?.getBoundingClientRect()
    if (!bounds) return
    pointerRef.current = {
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    }
    const tile = (event.target as HTMLElement).closest<HTMLElement>('[data-drift-tile]')
    if (!tile) return
    hoverColumnRef.current = Number(tile.dataset.column)
    setActiveTile(tile.dataset.driftTile ?? null)
  }

  const resetHover = () => {
    pointerRef.current = { x: 0, y: 0 }
    hoverColumnRef.current = -1
    setActiveTile(null)
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        perspective: perspective + 'px',
        maskImage: 'radial-gradient(ellipse 78% 82% at 50% 46%, #000 ' + ((1 - fade) * 100) + '%, transparent 100%), linear-gradient(to top, #000 ' + ((1 - fade) * 100) + '%, transparent 100%)',
      }}
      onPointerMove={onPointerMove}
      onPointerEnter={() => { wallHoveredRef.current = true }}
      onPointerLeave={() => { wallHoveredRef.current = false; resetHover() }}
      role="group"
      aria-label="Drifting collection wall"
    >
      <div ref={planeRef} className="absolute left-1/2 top-1/2 flex [transform-style:preserve-3d] will-change-transform">
        {columnsOfItems.map((column, columnIndex) => (
          <div className="relative [transform-style:preserve-3d]" key={columnIndex} style={{ width: tileWidth + gap }}>
            <div className="flex flex-col [transform-style:preserve-3d] will-change-transform" ref={(element) => { tracksRef.current[columnIndex] = element }}>
              {Array.from({ length: metadata[columnIndex].copies }).flatMap((_, copyIndex) =>
                column.map((item, itemIndex) => {
                  const id = columnIndex + '-' + copyIndex + '-' + itemIndex
                  const active = activeTile === id
                  const content = (
                    <span
                      className="absolute overflow-hidden bg-black transition-[transform,opacity,box-shadow] duration-500 ease-out"
                      style={{
                        inset: gap / 2,
                        borderRadius: radius,
                        opacity: active ? 1 : dim,
                        transform: active ? 'translateZ(' + lift + 'px)' : undefined,
                        boxShadow: active ? '0 24px 60px -18px rgb(0 0 0 / 0.7)' : undefined,
                      }}
                    >
                      <img className="h-full w-full select-none object-cover" style={{ filter: grayscale && !active ? 'grayscale(1)' : 'grayscale(0)' }} src={item.image} alt={item.title} draggable={false} loading="lazy" />
                      <span className="absolute inset-0 transition-opacity duration-500" style={{ backgroundColor: overlayColor, opacity: active ? 0 : 0.42 }} />
                    </span>
                  )
                  const className = "relative block flex-none outline-none [transform-style:preserve-3d]"
                  const tileStyle = { width: tileWidth, height: tileHeight + gap }
                  return item.href ? (
                    <a className={className} data-column={columnIndex} data-drift-tile={id} href={item.href} key={id} rel="noreferrer" style={tileStyle} target="_blank">
                      {content}
                    </a>
                  ) : (
                    <div className={className} data-column={columnIndex} data-drift-tile={id} key={id} style={tileStyle}>
                      {content}
                    </div>
                  )
                }),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
