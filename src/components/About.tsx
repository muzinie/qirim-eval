import { motion } from 'framer-motion'
import { FileText, Link2, Mail } from 'lucide-react'
import { Mark, Ornament, Reveal } from './ui'
import site from '../data/site.json'

const LANGS = [
  { name: 'Crimean Tatar', level: 'Native', lead: true },
  { name: 'Turkish', level: 'Native level', lead: false },
  { name: 'Russian', level: 'Native level', lead: false },
  { name: 'Ukrainian', level: 'Native level', lead: false },
  { name: 'English', level: 'Fluent', lead: false },
]

const PATH = [
  { role: 'AI data specialist', where: 'Appen', text: 'Rated and categorised multilingual text for machine-learning projects.' },
  { role: 'Language instructor', where: 'Graybridge Malkam, Ottawa', text: 'Taught Turkish, Russian and Ukrainian to diplomats; built materials and proficiency assessments.' },
  { role: 'Simultaneous interpreter', where: 'Turkish Ministry of Culture and Tourism, Ukraine', text: 'Turkish–Ukrainian interpreting at official events.' },
  { role: 'PhD in Languages', where: 'Taurida V. I. Vernadsky National University', text: 'Also an MA and BA in Turkish language and literature.' },
]

export default function About() {
  const a = site.author
  const initials = a.name
    .split(' ')
    .map((p) => p[0])
    .join('')
  return (
    <section id="about" className="bg-white border-t border-paper-line">
      <Ornament className="opacity-40" />
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-24 grid lg:grid-cols-[340px_minmax(0,1fr)] gap-12">
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <motion.div whileHover={{ rotate: -2, scale: 1.02 }} className="relative h-[280px] w-full max-w-[340px] rounded-[28px] overflow-hidden bg-sky-soft grid place-items-center">
              {a.photo ? (
                <img src={a.photo} alt={a.name} className="h-full w-full object-cover" />
              ) : (
                <>
                  <div aria-hidden="true" className="absolute inset-0 grid place-items-center opacity-30">
                    <Mark size={220} />
                  </div>
                  <span className="relative font-display font-extrabold text-[72px] text-sky-deep">{initials}</span>
                </>
              )}
            </motion.div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {a.resume && (
                <a href={a.resume} className="btn-primary no-underline !min-h-[44px] !px-5 text-[14px]">
                  <FileText size={16} /> Résumé
                </a>
              )}
              <a href={a.linkedin} target="_blank" rel="noreferrer" className="btn-ghost no-underline !min-h-[44px] !px-5 text-[14px]">
                <Link2 size={16} /> LinkedIn
              </a>
              <a href={`mailto:${a.email}`} className="btn-ghost no-underline !min-h-[44px] !px-5 text-[14px]">
                <Mail size={16} /> Email
              </a>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow mb-4">About the author</p>
            <h2 className="h2">
              {a.name}, <span className="text-sky">PhD</span>
            </h2>
            <p className="mt-6 max-w-[680px] text-[18px] leading-[1.65] text-ink-soft">
              Multilingual linguist and AI language evaluator based in {a.location}. A native Crimean Tatar speaker who can hear the difference between
              Crimean Tatar, Kazan Tatar and Turkish — the exact difference language models miss.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 p-0 list-none flex flex-wrap gap-2.5">
              {LANGS.map((l) => (
                <motion.li
                  key={l.name}
                  whileHover={{ y: -3 }}
                  className={`group relative rounded-full px-4 py-2.5 text-[15px] font-medium ${l.lead ? 'bg-sky text-white' : 'bg-sky-soft text-sky-deep'}`}
                >
                  {l.name}
                  <span className={`ml-2 text-[12px] font-mono ${l.lead ? 'text-sky-light' : 'text-sky'} opacity-70 group-hover:opacity-100`}>{l.level}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <ol className="mt-12 p-0 list-none relative border-l-2 border-paper-line ml-2">
            {PATH.map((p, i) => (
              <Reveal as="li" key={p.role} delay={i * 0.06} className={`relative pl-8 ${i < PATH.length - 1 ? 'pb-9' : ''}`}>
                  <span aria-hidden="true" className="absolute -left-[7px] top-[7px] h-3 w-3 rotate-45 bg-white border-2 border-sky" />
                  <p className="m-0 font-display font-bold text-[20px]">{p.role}</p>
                  <p className="m-0 mt-0.5 text-[14px] font-medium text-sky-deep">{p.where}</p>
                  <p className="m-0 mt-2 text-[15px] leading-relaxed text-ink-muted max-w-[620px]">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
