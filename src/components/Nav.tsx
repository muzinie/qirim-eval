import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mark } from './ui'
import site from '../data/site.json'

const items = [
  { id: 'benchmark', label: 'Benchmark' },
  { id: 'rubric', label: 'Rubric' },
  { id: 'results', label: 'Results' },
  { id: 'errors', label: 'Errors' },
  { id: 'about', label: 'About' },
]

export default function Nav() {
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach((i) => {
      const el = document.getElementById(i.id)
      if (el) obs.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 border-b ${
        scrolled ? 'bg-paper/80 backdrop-blur-md border-paper-line' : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-[1200px] px-5 sm:px-6 h-[68px] flex items-center justify-between gap-4" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 text-ink no-underline">
          <Mark spin />
          <span className="font-display font-bold text-[20px] tracking-[-0.01em]">Qırım Eval</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 text-[15px]">
          {items.map((i) => (
            <li key={i.id}>
              <a href={`#${i.id}`} className="relative block px-3.5 py-2 text-ink-soft hover:text-ink no-underline">
                {active === i.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-paper-tint" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{i.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.links.huggingface ?? '#data'}
          className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-ink text-ink text-[14px] font-medium no-underline hover:bg-ink hover:text-white transition-colors"
        >
          Get the dataset
        </a>
      </nav>
    </header>
  )
}
