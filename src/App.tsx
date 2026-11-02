import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Alphabet from './components/Alphabet'
import Gap from './components/Gap'
import Benchmark from './components/Benchmark'
import Rubric from './components/Rubric'
import ResultsSection from './components/Results'
import Data from './components/Data'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Alphabet />
        <Gap />
        <Benchmark />
        <Rubric />
        <ResultsSection />
        <Data />
        <About />
      </main>
      <Footer />
    </MotionConfig>
  )
}
