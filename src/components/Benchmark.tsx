import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Reveal, SectionHead, Spotlight } from './ui'
import progress from '../data/progress.json'
import categories from '../data/categories.json'

const PHASES = [
  { key: 'pilot', label: 'Phase 1 · Pilot', big: '100 items', sub: '× 3 models = 300 ratings', note: 'ratings done', status: 'In progress' },
  { key: 'aya', label: 'Phase 2 · Aya scale', big: '250 items', sub: '750 ratings · second rater on 50 items', note: 'ratings done', status: 'Planned' },
  { key: 'belebele', label: 'Phase 3 · Belebele-crh', big: '900 questions', sub: 'First Crimean Tatar reading-comprehension test', note: 'questions translated', status: 'Planned' },
] as const

function Bar({ done, total }: { done: number; total: number }) {
  const pct = total ? Math.max(done / total, done > 0 ? 0.02 : 0) : 0
  return (
    <div className="mt-6 h-2 rounded-full bg-paper-tint overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-sky"
        initial={{ width: 0 }}
        whileInView={{ width: `${pct * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

function Explorer() {
  const [sel, setSel] = useState(categories[1].id)
  const [copied, setCopied] = useState(false)
  const cat = categories.find((c) => c.id === sel)!

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cat.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <div className="mt-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-5">
      <Reveal>
        <h3 className="m-0 font-display font-bold text-[24px]">Ten skill areas, ten items each</h3>
        <p className="mt-2 mb-6 text-[15px] text-ink-muted">Pick one to see a real prompt from the set.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-1.5" role="tablist" aria-label="Skill areas">
          {categories.map((c) => {
            const on = c.id === sel
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setSel(c.id)}
                className={`relative text-left min-h-[48px] px-4 rounded-xl flex items-center gap-3 text-[15px] transition-colors ${
                  on ? 'text-white' : 'text-ink hover:bg-paper-tint'
                }`}
              >
                {on && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-xl bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className={`relative font-mono text-[13px] ${on ? 'text-sky-light' : 'text-sky'}`}>{c.id}</span>
                <span className="relative">{c.name}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Spotlight className="card p-7 sm:p-8 lg:sticky lg:top-24">
          <AnimatePresence mode="wait">
            <motion.div key={cat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[13px] px-2.5 py-1 rounded-lg bg-ink text-white">{cat.sample}</span>
                <span className="chip bg-sky-soft text-sky-deep">
                  {cat.id} · {cat.name}
                </span>
              </div>
              <p className="mt-7 mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-muted">Prompt given to every model</p>
              <p className="m-0 text-[19px] leading-[1.55] font-medium">{cat.prompt}</p>
              <p className="mt-7 mb-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-muted">What it tests</p>
              <p className="m-0 text-[16px] leading-relaxed text-ink-soft">{cat.tests}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" onClick={copy} className="btn-ghost !min-h-[44px] !px-4 text-[14px]">
                  {copied ? <Check size={16} className="text-sky" /> : <Copy size={16} />}
                  {copied ? 'Copied' : 'Copy prompt'}
                </button>
                <span className="text-[13px] text-ink-muted">Reference answers are written by a native speaker.</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </Spotlight>
      </Reveal>
    </div>
  )
}

export default function Benchmark() {
  return (
    <section id="benchmark" className="mx-auto max-w-[1200px] px-5 sm:px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead eyebrow="The benchmark" title="1,150 items, written from scratch by a native speaker." />
        <Reveal delay={0.1}>
          <p className="m-0 max-w-[380px] text-[16px] leading-relaxed text-ink-muted">
            No machine translation. Every prompt and reference answer is written by hand, scored on a public rubric, with a second rater on 20%.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {PHASES.map((p, i) => {
          const d = progress[p.key]
          return (
            <Reveal key={p.key} delay={i * 0.08}>
              <Spotlight className="card h-full p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[13px] text-ink-muted">{p.label}</span>
                  <span className={`chip font-semibold text-[12px] ${p.status === 'In progress' ? 'bg-sky-soft text-sky-deep' : 'bg-paper-tint text-ink-soft'}`}>
                    {p.status === 'In progress' && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-sky animate-pulse" />}
                    {p.status}
                  </span>
                </div>
                <p className="mt-6 mb-0 font-display font-bold text-[40px] leading-none tracking-[-0.02em]">{p.big}</p>
                <p className="mt-3 mb-0 text-[15px] text-ink-muted">{p.sub}</p>
                <Bar done={d.done} total={d.total} />
                <p className="mt-3 mb-0 font-mono text-[12px] text-ink-muted">
                  {d.done.toLocaleString('en-US')} / {d.total.toLocaleString('en-US')} {p.note}
                </p>
              </Spotlight>
            </Reveal>
          )
        })}
      </div>

      <Explorer />
    </section>
  )
}
