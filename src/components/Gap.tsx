import { ArrowUpRight } from 'lucide-react'
import { CountUp, Reveal, SectionHead } from './ui'

const FACTS = [
  {
    value: 101,
    text: 'languages in Cohere’s open Aya 101 model. Crimean Tatar and Kazan Tatar are not among them.',
    source: 'https://huggingface.co/CohereForAI/aya-101',
    label: 'Aya 101 model card',
  },
  {
    value: 122,
    text: 'language variants in Meta’s Belebele reading test. There is no Crimean Tatar version yet.',
    source: 'https://huggingface.co/datasets/facebook/belebele',
    label: 'Belebele dataset card',
  },
  {
    value: 0,
    display: 'TR',
    text: 'Small open models insert Turkish vocabulary when asked to write Tatar. This benchmark measures that drift for Crimean Tatar.',
    source: 'https://aclanthology.org/2026.loresmt-1.16',
    label: 'LoResMT 2026',
  },
]

export default function Gap() {
  return (
    <section className="bg-ink text-paper relative overflow-hidden">
      <div aria-hidden="true" className="absolute -right-40 -top-40 h-[520px] w-[520px] rotate-45 rounded-[48px] border border-ink-line" />
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-[260px] w-[260px] rotate-45 rounded-[28px] border border-ink-line" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 py-24">
        <SectionHead dark eyebrow="The gap" title="Crimean Tatar is missing from the benchmarks that decide what models get good at." />
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {FACTS.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-ink-line p-7 hover:border-sky-light/60 transition-colors">
                <p className={`m-0 font-display font-extrabold text-[64px] leading-none ${f.display ? 'text-amber-bright' : 'text-sky-light'}`}>
                  {f.display ?? <CountUp to={f.value} />}
                </p>
                <p className="mt-5 mb-0 text-[16px] leading-relaxed text-[#D5DEE3]">{f.text}</p>
                <a href={f.source} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-[13px] font-mono text-sky-light hover:text-white">
                  {f.label} <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
