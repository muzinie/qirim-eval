import { motion, useInView, useReducedMotion, animate } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'

/** Fades and lifts children in when they scroll into view. */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const reduce = useReducedMotion()
  const M = as === 'li' ? motion.li : motion.div
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

/** Card whose soft highlight follows the pointer. */
export function Spotlight({ children, className = '', as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'article' | 'section' }) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </Tag>
  )
}

/** Counts up to a number when it enters the viewport. */
export function CountUp({ to, className = '' }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to, reduce])
  return (
    <span ref={ref} className={className}>
      {v.toLocaleString('en-US')}
    </span>
  )
}

/** The Qırım Eval mark: a diamond inside a diamond, like an embroidery motif. */
export function Mark({ size = 28, color = '#0B6FA4', spin = false }: { size?: number; color?: string; spin?: boolean }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      aria-hidden="true"
      whileHover={spin ? { rotate: 90 } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 14 }}
    >
      <rect x="4" y="4" width="20" height="20" rx="2" transform="rotate(45 14 14)" fill="none" stroke={color} strokeWidth="2" />
      <rect x="10" y="10" width="8" height="8" transform="rotate(45 14 14)" fill={color} />
    </motion.svg>
  )
}

/** A thin band of repeating diamonds. */
export function Ornament({ color = '#0B6FA4', className = '' }: { color?: string; className?: string }) {
  return (
    <svg aria-hidden="true" width="100%" height="18" className={`block ${className}`}>
      <defs>
        <pattern id={`orn-${color.slice(1)}`} width="36" height="18" patternUnits="userSpaceOnUse">
          <path d="M18 1 L27 9 L18 17 L9 9 Z" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M0 9 H9 M27 9 H36" stroke={color} strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill={`url(#orn-${color.slice(1)})`} />
    </svg>
  )
}

export function SectionHead({ eyebrow, title, lead, dark = false }: { eyebrow: string; title: ReactNode; lead?: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <p className={`eyebrow mb-4 ${dark ? '!text-sky-light' : ''}`}>{eyebrow}</p>
      <h2 className="h2 max-w-[820px]">{title}</h2>
      {lead && <p className={`mt-5 max-w-[640px] text-[17px] leading-relaxed ${dark ? 'text-[#D5DEE3]' : 'text-ink-muted'}`}>{lead}</p>}
    </Reveal>
  )
}
