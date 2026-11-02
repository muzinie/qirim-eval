import { Mark } from './ui'
import site from '../data/site.json'

export default function Footer() {
  return (
    <footer className="bg-ink text-[#A9B8C1]">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 py-10 flex flex-wrap items-center justify-between gap-6 text-[14px]">
        <div className="flex items-center gap-2.5">
          <Mark size={22} color="#7CC4EA" />
          <span className="font-display font-bold text-white text-[16px]">Qırım Eval</span>
          <span>· {site.author.location}</span>
        </div>
        <div className="flex flex-wrap gap-5">
          <a href="#benchmark" className="hover:text-white">Benchmark</a>
          <a href="#results" className="hover:text-white">Results</a>
          <a href="#data" className="hover:text-white">Data</a>
          <a href={`mailto:${site.author.email}`} className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  )
}
