import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight, Pause, Play } from 'lucide-react'
import site from '../data/site.json'

type Lang = { code: string; name: string; word: string; turkic: boolean; note: string }

// The word "language" in each language. Turkic forms are compared letter by letter with Turkish.
const LANGS: Lang[] = [
  { code: 'TR', name: 'Turkish', word: 'dil', turkic: true, note: 'The form models know best — and drift back to.' },
  { code: 'QT', name: 'Crimean Tatar', word: 'til', turkic: true, note: 'One letter away from Turkish: d → t.' },
  { code: 'TT', name: 'Kazan Tatar', word: 'tel', turkic: true, note: 'A different Tatar language: d → t, i → e.' },
  { code: 'RU', name: 'Russian', word: 'язык', turkic: false, note: 'A Slavic language many Crimean Tatars also speak.' },
  { code: 'UK', name: 'Ukrainian', word: 'мова', turkic: false, note: 'Another neighbour in the same region.' },
  { code: 'EN', name: 'English', word: 'language', turkic: false, note: 'The language most benchmarks are written in.' },
]
const BASE = LANGS[0].word

function WordLab() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = useState(1)
  const [playing, setPlaying] = useState(!reduce)
  const lang = LANGS[idx]

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setIdx((i) => (i + 1) % LANGS.length), 2600)
    return () => clearTimeout(t)
  }, [idx, playing])

  const letters = lang.word.split('')

  return (
    <figure className="m-0 card p-6 sm:p-7 shadow-[0_1px_2px_rgba(15,30,42,0.06),0_24px_48px_-24px_rgba(15,30,42,0.18)]">
      <div className="flex items-center justify-between gap-3">
        <figcaption className="font-mono text-[12px] text-ink-muted">One word · six languages</figcaption>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause the word cycle' : 'Play the word cycle'}
          className="h-9 w-9 grid place-items-center rounded-full border border-paper-line text-ink-soft hover:bg-paper-tint"
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Choose a language">
        {LANGS.map((l, i) => (
          <button
            key={l.code}
            role="tab"
            aria-selected={i === idx}
            type="button"
            onClick={() => {
              setIdx(i)
              setPlaying(false)
            }}
            className={`relative overflow-hidden min-h-[36px] px-3 rounded-full text-[13px] font-medium transition-colors ${
              i === idx ? 'bg-ink text-white' : 'bg-paper-tint text-ink-soft hover:text-ink'
            }`}
          >
            {i === idx && playing && (
              <motion.span
                key={`bar-${idx}`}
                className="absolute bottom-0 left-0 h-[2px] bg-sky-light"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.6, ease: 'linear' }}
              />
            )}
            <span className="relative">{l.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 h-[124px] sm:h-[148px] flex items-end" aria-live="polite">
        <span className="sr-only">
          {lang.name}: {lang.word}
        </span>
        <div
          aria-hidden="true"
          className={`flex items-end font-display font-extrabold leading-none tracking-[-0.03em] transition-[font-size] duration-300 ${
            letters.length > 5 ? 'text-[56px] sm:text-[80px]' : 'text-[96px] sm:text-[128px]'
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {letters.map((ch, i) => {
              const changed = lang.turkic && lang.code !== 'TR' && BASE[i] !== ch
              return (
                <motion.span
                  key={`${lang.code}-${i}`}
                  initial={reduce ? false : { y: 40, opacity: 0, rotateX: -70 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={reduce ? undefined : { y: -40, opacity: 0, rotateX: 70 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block ${changed ? 'text-sky' : 'text-ink'}`}
                  style={{ transformOrigin: '50% 100%' }}
                >
                  {ch}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: changed ? 1 : 0 }}
                    transition={{ delay: 0.35 + i * 0.05, type: 'spring', stiffness: 400, damping: 18 }}
                    className="block mx-auto mt-2 h-[7px] w-[7px] rounded-full bg-amber-bright"
                  />
                </motion.span>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={lang.code}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-6 pt-5 border-t border-paper-tint text-[15px] leading-relaxed text-ink-soft min-h-[56px]"
        >
          <strong className="text-ink">{lang.name}.</strong> {lang.note}
        </motion.p>
      </AnimatePresence>
    </figure>
  )
}

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1200px] px-5 sm:px-6 pt-14 sm:pt-20 pb-20 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
      <div>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="eyebrow mb-5">
          Crimean Tatar · LLM evaluation · open data
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 font-display font-bold text-[clamp(44px,6.4vw,82px)] leading-[1.0] tracking-[-0.03em]"
        >
          How well does AI speak{' '}
          <span className="relative whitespace-nowrap text-sky">
            Crimean Tatar
            <motion.svg
              aria-hidden="true"
              viewBox="0 0 300 14"
              preserveAspectRatio="none"
              className="absolute left-0 -bottom-2 w-full h-[12px]"
            >
              <motion.path
                d="M2 9 C 60 2, 120 13, 180 6 S 270 4, 298 8"
                fill="none"
                stroke="#F2C46D"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: 'easeInOut' }}
              />
            </motion.svg>
          </span>
          ?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 max-w-[580px] text-[19px] leading-[1.6] text-ink-soft"
        >
          An open, human-written benchmark by a native-speaker linguist. It tests ChatGPT, Claude and Gemini on translation, grammar, script and culture —
          and shows exactly where they slip into Turkish or Russian.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-9 flex flex-wrap gap-3">
          <a href="#results" className="btn-primary no-underline group">
            Explore the results <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#data" className="btn-ghost no-underline">
            How the data is made
          </a>
        </motion.div>
        <p className="mt-8 text-[14px] text-ink-muted">
          By{' '}
          <a href="#about" className="font-semibold text-sky hover:text-sky-deep">
            {site.author.name}
          </a>
          , {site.author.title} · {site.author.location}
        </p>
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <WordLab />
      </motion.div>
    </section>
  )
}
