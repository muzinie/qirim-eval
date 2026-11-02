import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Reveal, SectionHead } from './ui'

const MEANING = [
  'Unrelated or completely wrong.',
  'Meaning mostly wrong.',
  'Main idea right, one important error.',
  'A small shift in meaning.',
  'Meaning fully correct.',
]
const FLUENCY = [
  'Not really Crimean Tatar.',
  'Many errors.',
  'Understandable, but unnatural or a few errors.',
  'Natural, one small error.',
  'Reads as if a native speaker wrote it.',
]
const DRIFT = ['No words from another language.', 'One or two Turkish, Russian or other foreign words.', 'A large part of the answer is in another language.']

// abstract "sentence": word widths in px; which words turn amber at each drift level
const WORDS = [64, 38, 92, 52, 70, 44, 86, 58, 40]
const DRIFTED = [[], [3], [1, 3, 4, 6, 7]]

function Scale({ label, value, set, max, min = 1 }: { label: string; value: number; set: (n: number) => void; max: number; min?: number }) {
  const opts = Array.from({ length: max - min + 1 }, (_, i) => i + min)
  return (
    <div>
      <p className="m-0 mb-2.5 text-[14px] font-semibold">{label}</p>
      <div className="flex gap-1.5" role="radiogroup" aria-label={label}>
        {opts.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => set(n)}
            className={`relative h-12 flex-1 min-w-[44px] rounded-xl font-display font-bold text-[18px] transition-colors ${
              value === n ? 'text-white' : 'bg-paper-tint text-ink hover:bg-sky-soft'
            }`}
          >
            {value === n && <motion.span layoutId={`sel-${label}`} className="absolute inset-0 rounded-xl bg-sky" transition={{ type: 'spring', stiffness: 500, damping: 34 }} />}
            <span className="relative">{n}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Rubric() {
  const [m, setM] = useState(4)
  const [f, setF] = useState(3)
  const [d, setD] = useState(1)
  const total = m + f

  return (
    <section id="rubric" className="mx-auto max-w-[1200px] px-5 sm:px-6 pb-24">
      <SectionHead
        eyebrow="The rubric"
        title="Every answer is scored the same way."
        lead="This is the scoring sheet the benchmark uses. Try it: each choice shows what the score means."
      />
      <Reveal delay={0.1}>
        <div className="mt-12 card p-6 sm:p-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10">
          <div className="flex flex-col gap-7">
            <Scale label="Meaning accuracy" value={m} set={setM} max={5} />
            <Scale label="Grammar and fluency" value={f} set={setF} max={5} />
            <Scale label="Language drift" value={d} set={setD} max={2} min={0} />
            <p className="m-0 text-[13px] text-ink-muted">Also recorded: answered in Crimean Tatar? correct script? any invented facts?</p>
          </div>

          <div className="rounded-2xl bg-paper p-6 sm:p-7 flex flex-col">
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] text-ink-muted">Total score</span>
              <span className="font-display font-extrabold text-[56px] leading-none tabular-nums">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span key={total} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="inline-block">
                    {total}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[24px] text-ink-muted font-bold"> / 10</span>
              </span>
            </div>
            <dl className="mt-6 grid gap-4 text-[15px]">
              <div>
                <dt className="font-semibold">Meaning {m}</dt>
                <dd className="m-0 text-ink-soft">{MEANING[m - 1]}</dd>
              </div>
              <div>
                <dt className="font-semibold">Fluency {f}</dt>
                <dd className="m-0 text-ink-soft">{FLUENCY[f - 1]}</dd>
              </div>
              <div>
                <dt className="font-semibold">Drift {d}</dt>
                <dd className="m-0 text-ink-soft">{DRIFT[d]}</dd>
              </div>
            </dl>
            <div className="mt-auto pt-7" aria-hidden="true">
              <p className="m-0 mb-3 font-mono text-[12px] text-ink-muted">An answer, word by word</p>
              <div className="flex flex-wrap gap-1.5">
                {WORDS.map((w, i) => {
                  const drift = (DRIFTED[d] as number[]).includes(i)
                  return (
                    <motion.span
                      key={i}
                      animate={{ backgroundColor: drift ? '#F2C46D' : '#DCE2E5', y: drift ? -2 : 0 }}
                      transition={{ duration: 0.35, delay: drift ? i * 0.03 : 0 }}
                      className="h-3 rounded-full"
                      style={{ width: w }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
