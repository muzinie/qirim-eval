import { motion } from 'framer-motion'
import { Reveal, SectionHead, Spotlight } from './ui'
import resultsRaw from '../data/results.json'
import errorsRaw from '../data/errors.json'

type ModelResult = {
  name: string
  version: string
  date: string
  total: number // 2–10
  meaning: number // 1–5
  fluency: number // 1–5
  answeredInCrh: number // 0–1
  turkish: number // share of answers with Turkish mixed in, 0–1
  other: number // any other language, e.g. Ukrainian or English
  russian: number
}
type Results = { updated: string | null; ratings: number; models: ModelResult[] }
type ErrorExample = { type: 'turkish' | 'russian' | 'other' | 'invented'; item: string; model: string; output: string; highlight: string[]; correct: string; why: string }

const results = resultsRaw as Results
const errors = errorsRaw as ErrorExample[]
const PLACEHOLDER_MODELS = ['ChatGPT', 'Claude', 'Gemini']

const pct = (x: number) => `${Math.round(x * 100)}%`

function DriftBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="grid grid-cols-[92px_1fr_44px] items-center gap-3 text-[13px]">
      <span className="text-ink-muted">{label}</span>
      <div className="h-2.5 rounded-full bg-paper-tint overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: pct(value) }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="font-mono text-right">{pct(value)}</span>
    </div>
  )
}

function ModelCard({ r }: { r: ModelResult }) {
  return (
    <Spotlight className="card p-7 h-full">
      <p className="m-0 font-semibold text-[17px]">{r.name}</p>
      <p className="mt-1 mb-0 font-mono text-[12px] text-ink-muted">
        {r.version} · {r.date}
      </p>
      <div className="mt-6 flex items-baseline justify-between">
        <span className="text-[14px] text-ink-muted">Average score</span>
        <span className="font-display font-extrabold text-[44px] leading-none">
          {r.total.toFixed(1)}
          <span className="text-[18px] text-ink-muted"> / 10</span>
        </span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-paper-tint overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-sky"
          initial={{ width: 0 }}
          whileInView={{ width: `${((r.total - 2) / 8) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-6 mb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-muted">Answers with another language mixed in</p>
      <div className="grid gap-2.5">
        <DriftBar label="Turkish" value={r.turkish} color="#C98A1B" />
        <DriftBar label="Russian" value={r.russian} color="#2F4F68" />
        <DriftBar label="Other" value={r.other} color="#6E5AA8" />
      </div>
    </Spotlight>
  )
}

function EmptyCard({ name }: { name: string }) {
  return (
    <div className="card p-7 h-full">
      <p className="m-0 font-semibold text-[17px]">{name}</p>
      <p className="mt-1 mb-0 font-mono text-[12px] text-ink-muted">Waiting for pilot ratings</p>
      <div className="mt-6 flex items-baseline justify-between">
        <span className="text-[14px] text-ink-muted">Average score</span>
        <span className="font-display font-extrabold text-[44px] leading-none text-[#B9C4CA]">—</span>
      </div>
      <div className="mt-2 h-2 rounded-full skeleton" />
      <p className="mt-6 mb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-muted">Answers with another language mixed in</p>
      <div className="grid gap-3">
        {['Turkish', 'Russian', 'Other'].map((l) => (
          <div key={l} className="grid grid-cols-[92px_1fr] items-center gap-3 text-[13px]">
            <span className="text-ink-muted">{l}</span>
            <div className="h-2.5 rounded-full skeleton" />
          </div>
        ))}
      </div>
    </div>
  )
}

const ERR_STYLE: Record<ErrorExample['type'], { label: string; chip: string; mark: string }> = {
  turkish: { label: 'Turkish interference', chip: 'bg-amber-soft text-amber-text', mark: 'bg-amber-mark text-[#5C3A00]' },
  russian: { label: 'Russian word', chip: 'bg-sky-soft text-sky-deep', mark: 'bg-[#DDE8F0] text-[#1D3A52]' },
  other: { label: 'Other-language word', chip: 'bg-plum-soft text-plum-text', mark: 'bg-plum-mark text-[#3A2C63]' },
  invented: { label: 'Invented fact', chip: 'bg-rust-soft text-rust-text', mark: 'bg-rust-soft text-rust-text' },
}

function Highlighted({ text, words, mark }: { text: string; words: string[]; mark: string }) {
  if (!words.length) return <>{text}</>
  const esc = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const parts = text.split(new RegExp(`(${esc.join('|')})`, 'g'))
  return (
    <>
      {parts.map((p, i) =>
        words.includes(p) ? (
          <mark key={i} className={`${mark} px-1 rounded`}>
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

function Errors() {
  const ghosts: ErrorExample['type'][] = ['turkish', 'russian', 'invented']
  return (
    <section id="errors" className="mx-auto max-w-[1200px] px-5 sm:px-6 py-24">
      <SectionHead
        eyebrow="Error gallery"
        title="The mistakes, explained by a linguist."
        lead="Each example shows what the model wrote, what a native speaker would write, and why the difference matters."
      />
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {errors.length
          ? errors.map((e, i) => {
              const s = ERR_STYLE[e.type]
              return (
                <Reveal key={`${e.item}-${i}`} delay={(i % 3) * 0.08}>
                  <Spotlight as="article" className="card p-6 h-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`chip font-semibold text-[12px] ${s.chip}`}>{s.label}</span>
                      <span className="font-mono text-[12px] text-ink-muted">
                        {e.item} · {e.model}
                      </span>
                    </div>
                    <p className="mt-5 mb-0 text-[16px] leading-[1.75]">
                      <Highlighted text={e.output} words={e.highlight} mark={s.mark} />
                    </p>
                    <p className="mt-4 mb-0 text-[16px] leading-relaxed text-sky-deep">✓ {e.correct}</p>
                    <p className="mt-4 mb-0 text-[14px] leading-relaxed text-ink-muted">{e.why}</p>
                  </Spotlight>
                </Reveal>
              )
            })
          : ghosts.map((t, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <article className="rounded-2xl border border-dashed border-[#B9C4CA] p-6 h-full">
                  <span className={`chip font-semibold text-[12px] ${ERR_STYLE[t].chip}`}>{ERR_STYLE[t].label}</span>
                  <div className="mt-6 grid gap-2.5" aria-hidden="true">
                    <div className="h-3 w-[92%] rounded-full skeleton" />
                    <div className="h-3 w-[70%] rounded-full skeleton" />
                    <div className="h-3 w-[80%] rounded-full skeleton" />
                  </div>
                  <p className="mt-6 mb-0 text-[14px] text-ink-muted">First examples arrive with the pilot results.</p>
                </article>
              </Reveal>
            ))}
      </div>
    </section>
  )
}

export default function ResultsSection() {
  const has = results.models.length > 0
  return (
    <>
      <section id="results" className="bg-white border-y border-paper-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Results" title="Where each model gets Crimean Tatar wrong." />
            <Reveal delay={0.1}>
              <div className={`rounded-xl px-4 py-3 text-[14px] ${has ? 'bg-paper-tint text-ink-soft' : 'bg-sky-soft text-sky-deep'}`}>
                {has ? (
                  <span>
                    {results.ratings.toLocaleString('en-US')} ratings · updated {results.updated}
                  </span>
                ) : (
                  <span>
                    <strong>Pilot in progress.</strong> Numbers appear as ratings are saved.
                  </span>
                )}
              </div>
            </Reveal>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {has
              ? results.models.map((r, i) => (
                  <Reveal key={r.name} delay={i * 0.08}>
                    <ModelCard r={r} />
                  </Reveal>
                ))
              : PLACEHOLDER_MODELS.map((n, i) => (
                  <Reveal key={n} delay={i * 0.08}>
                    <EmptyCard name={n} />
                  </Reveal>
                ))}
          </div>
        </div>
      </section>
      <Errors />
    </>
  )
}
