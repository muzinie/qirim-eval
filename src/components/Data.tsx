import { motion } from 'framer-motion'
import { ArrowUpRight, Database, FileSpreadsheet, GitBranch, Globe, PenLine } from 'lucide-react'
import { Reveal, SectionHead } from './ui'
import site from '../data/site.json'

const STEPS = [
  { icon: PenLine, title: 'Written', text: 'Prompts and reference answers written from scratch in Crimean Tatar.' },
  { icon: FileSpreadsheet, title: 'Scored', text: 'Every answer rated on the public rubric. 20% re-scored by a second speaker.' },
  { icon: Database, title: 'Published', text: 'Versioned dataset with a full dataset card on Hugging Face.' },
  { icon: GitBranch, title: 'Reproducible', text: 'Scripts and run logs on GitHub, so anyone can re-test new models.' },
  { icon: Globe, title: 'Shown', text: 'This site reads the latest results.' },
]

const RULES = [
  'No machine translation, no AI-generated items',
  'Model name, version and date recorded for every run',
  'No political or personal content in public items',
  'Rater agreement reported with each release',
]

export default function Data() {
  const hf = site.links.huggingface
  const gh = site.links.github
  return (
    <section id="data" className="mx-auto max-w-[1200px] px-5 sm:px-6 pb-24">
      <SectionHead eyebrow="How the data is made" title="Human-written, openly scored, easy to re-run." />

      <div className="relative mt-14">
        {/* animated connector (desktop) */}
        <svg aria-hidden="true" className="hidden lg:block absolute left-[10%] right-[10%] top-[34px] w-[80%] h-[4px] overflow-visible">
          <line x1="0" y1="2" x2="100%" y2="2" stroke="#B9C4CA" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
        </svg>
        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-5 list-none p-0 m-0">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.07} className="flex lg:flex-col items-start lg:items-center gap-4 lg:text-center">
                <motion.span
                  whileHover={{ rotate: 45 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  className="shrink-0 h-[68px] w-[68px] grid place-items-center rounded-2xl bg-white border border-paper-line shadow-sm"
                >
                  <s.icon size={26} className="text-sky" />
                </motion.span>
                <div>
                  <p className="m-0 font-mono text-[12px] text-ink-muted">0{i + 1}</p>
                  <p className="m-0 mt-1 font-display font-bold text-[20px]">{s.title}</p>
                  <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-ink-muted">{s.text}</p>
                </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mt-14 grid md:grid-cols-[1.2fr_1fr] gap-5">
        <Reveal>
          <div className="card p-7 h-full">
            <h3 className="m-0 font-display font-bold text-[22px]">Rules every item follows</h3>
            <ul className="mt-5 mb-0 p-0 list-none grid gap-3">
              {RULES.map((r) => (
                <li key={r} className="flex gap-3 text-[15px] text-ink-soft">
                  <span aria-hidden="true" className="mt-[7px] h-2 w-2 rotate-45 bg-sky shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded-2xl bg-ink text-paper p-7 h-full flex flex-col">
            <h3 className="m-0 font-display font-bold text-[22px]">Get the data</h3>
            <p className="mt-2 text-[15px] text-[#D5DEE3]">Licence: {site.datasetLicense}</p>
            <div className="mt-auto pt-6 flex flex-wrap gap-3">
              <a
                href={hf ?? undefined}
                aria-disabled={!hf}
                className={`btn no-underline ${hf ? 'bg-amber-bright text-ink hover:bg-white' : 'bg-ink-line text-[#A9B8C1] cursor-not-allowed'}`}
              >
                Hugging Face {hf ? <ArrowUpRight size={16} /> : '· soon'}
              </a>
              <a
                href={gh ?? undefined}
                aria-disabled={!gh}
                className={`btn no-underline ${gh ? 'border border-[#4A5D6B] text-white hover:bg-white hover:text-ink' : 'bg-ink-line text-[#A9B8C1] cursor-not-allowed'}`}
              >
                GitHub {gh ? <ArrowUpRight size={16} /> : '· soon'}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
