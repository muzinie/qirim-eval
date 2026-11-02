import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Reveal } from './ui'

// Crimean Tatar Latin alphabet (to be checked by the author before publishing).
const LETTERS = ['A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'Ö', 'P', 'Q', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z']

const INFO: Record<string, { tag: string; text: string; special: boolean }> = {
  Q: { tag: 'Not in Turkish', text: 'A deep “k” made at the back of the throat. Turkish has no letter for it — exactly where a model that learned mostly Turkish can go wrong.', special: true },
  Ñ: { tag: 'Not in Turkish', text: 'The “ng” sound, as in English “sing”. The benchmark checks whether models spell it correctly.', special: true },
  Ğ: { tag: 'Same letter, different sound', text: 'Shared with Turkish, but pronounced as a real consonant rather than lengthening the vowel.', special: false },
}

export default function Alphabet() {
  const [sel, setSel] = useState('Q')
  const info = INFO[sel] ?? { tag: 'Shared with Turkish', text: 'Written the same way as in the Turkish Latin alphabet.', special: false }

  return (
    <section className="mx-auto max-w-[1200px] px-5 sm:px-6 pb-20">
      <Reveal>
        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">The alphabet</p>
              <h3 className="m-0 font-display font-bold text-[26px] tracking-[-0.01em]">Tap a letter. Two of them don’t exist in Turkish.</h3>
            </div>
            <p className="m-0 text-[14px] text-ink-muted max-w-[340px]">Crimean Tatar is written in Latin script (and also Cyrillic). The benchmark checks both.</p>
          </div>

          <div className="mt-7 grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-2" role="listbox" aria-label="Crimean Tatar Latin alphabet">
            {LETTERS.map((l) => {
              const special = INFO[l]?.special
              const on = sel === l
              return (
                <motion.button
                  key={l}
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => setSel(l)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  className={`relative h-[52px] rounded-xl font-display font-bold text-[22px] transition-colors ${
                    on ? 'bg-ink text-white' : special ? 'bg-amber-soft text-amber-text ring-1 ring-amber-bright' : 'bg-paper-tint text-ink hover:bg-sky-soft'
                  }`}
                >
                  {l}
                  {special && !on && <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-amber-bright" aria-hidden="true" />}
                </motion.button>
              )
            })}
          </div>

          <div className="mt-6 min-h-[84px] rounded-xl bg-paper px-5 py-4 flex items-start gap-5" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={sel}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-5"
              >
                <span className="font-display font-extrabold text-[48px] leading-none text-sky w-[44px] text-center">{sel}</span>
                <div>
                  <span className={`chip ${info.special ? 'bg-amber-soft text-amber-text' : 'bg-sky-soft text-sky-deep'}`}>{info.tag}</span>
                  <p className="m-0 mt-2 text-[15px] leading-relaxed text-ink-soft max-w-[720px]">{info.text}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
