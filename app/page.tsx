import Effects from "@/components/Effects";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AiSection from "@/components/AiSection";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import HireBot from "@/components/HireBot";

export default function Home() {
  return (
    <>
      <Effects />
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <AiSection />
        <Services />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Laxman Poddar · AI Solution Architect</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
      <HireBot />
    </>
  );
}
