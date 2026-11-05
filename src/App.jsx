import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu as MenuIcon, X, Flame, Instagram, Facebook } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import ExplodingBurger from "./sections/ExplodingBurger";
import Menu from "./sections/Menu";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import SafeImage from "./components/SafeImage";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { Analytics } from "@vercel/analytics/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const images = {
  hero: "/images/hero/hero-burger.jpg",
  signature: "/images/burgers/dark-hero-burger.jpg",
  story: "/images/story/story-flame.jpg"
};

function Navbar({ lenis }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "Our story", href: "#story" },
    { label: "The menu", href: "#menu" },
    { label: "Contact", href: "#contact" }
  ];

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.4,
        offset: -76,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (window.__lenis) {
      window.__lenis.scrollTo(target, {
        duration: 1.4,
        offset: -76,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar">
      <a className="brand" href="#home" onClick={(e) => handleNav(e, "#home")} aria-label="Flame and Fuel home">
        <span className="brand-mark"><Flame size={22} fill="currentColor" /></span>
        <span>FLAME <i>&</i> FUEL</span>
      </a>
      <nav className={open ? "nav-links nav-open" : "nav-links"}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a className="nav-order" href="#menu" onClick={(e) => handleNav(e, "#menu")}>
          Explore menu <ArrowUpRight size={15} />
        </a>
      </nav>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X /> : <MenuIcon />}
      </button>
    </header>
  );
}

function Preloader({ onComplete }) {
  useEffect(() => {
    const tl = gsap.timeline({ onComplete });
    tl.to(".loader-word", { y: 0, duration: 0.75, stagger: 0.08, ease: "power4.out" })
      .to(".loader-line", { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, "-=0.25")
      .to(".preloader", { yPercent: -100, duration: 1, ease: "power4.inOut", delay: 0.25 });
    return () => tl.kill();
  }, [onComplete]);
  return (
    <div className="preloader">
      <div className="loader-inner">
        <div className="loader-icon"><Flame fill="currentColor" size={30} /></div>
        <div className="loader-title"><span className="loader-word">FLAME</span><span className="loader-word">& FUEL</span></div>
        <div className="loader-line" />
        <p>BUILT ON FIRE. SERVED WITH ATTITUDE.</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} />
      <div className="hero-shade" />
      <div className="hero-topline"><span>EST. 2026 — THE GOOD STUFF</span><span>HANDCRAFTED / NEVER COMPROMISED</span></div>
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow"><span /> NOT YOUR EVERYDAY BURGER</p>
        <h1 className="hero-title"><span>BUILT</span><span>ON <em>FIRE.</em></span></h1>
        <div className="hero-bottom">
          <p>Big flavour. Real ingredients.<br />No apologies. Just great burgers.</p>
        </div>
      </div>

      {/* Centered Circular Get Hungry Button */}
      <div className="hero-center-cta">
        <a href="#menu" className="round-link hero-hungry-btn" aria-label="Explore menu">
          <span className="btn-glow-ring" />
          <span className="btn-rotating-text">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_12s_linear_infinite]">
              <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
              <text className="text-[7.5px] font-mono tracking-[0.24em] uppercase fill-[#f4f0e9]/75 font-semibold">
                <textPath href="#circlePath">
                  · EXPLORE THE CRAFT · GET HUNGRY
                </textPath>
              </text>
            </svg>
          </span>
          <div className="btn-center-content">
            <span className="btn-label">GET<br/>HUNGRY</span>
            <span className="btn-arrow-icon"><ArrowDown size={16} /></span>
          </div>
        </a>
      </div>
      <div className="hero-index">01 <span>—</span> 06</div>
      <div className="hero-vertical">FRESH OFF THE GRILL · FRESH OFF THE GRILL ·</div>
    </section>
  );
}

function Marquee() {
  return <div className="marquee"><div className="marquee-track">{Array.from({length: 4}).map((_, i) => <span key={i}>GOOD FOOD. NO SHORTCUTS. <b>✳</b> BIG ENERGY. BIGGER BURGERS. <b>✳</b></span>)}</div></div>;
}

function Signature() {
  const section = useRef(null);
  useGSAP(() => {
    gsap.from(".signature-photo", { y: 100, rotate: -5, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 72%" } });
    gsap.from(".signature-copy > *", { y: 45, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 70%" } });
  }, { scope: section });
  return (
    <section className="signature section-pad" ref={section}>
      <div className="section-kicker"><span>01 / THE HEADLINER</span><span>MADE TO BE REMEMBERED</span></div>
      <div className="signature-grid">
        <div className="signature-photo-wrap"><SafeImage className="signature-photo" src={images.signature} alt="Signature double cheeseburger" width={1200} height={900}/><span className="photo-stamp">100%<br/>GOOD<br/>MOOD</span></div>
        <div className="signature-copy">
          <p className="eyebrow"><span /> MEET YOUR NEW OBSESSION</p>
          <h2>THE<br/><em>HOT</em><br/>MESS.</h2>
          <p className="body-copy">Golden buttermilk crispy fried chicken, molten cheddar, habanero hot honey glaze and fresh purple slaw.</p>
          <div className="signature-meta"><span>CRISPY CHICKEN / HOT HONEY</span><strong>₹279</strong></div>
          <a href="#menu" className="text-link">FIND YOUR FAVOURITE <ArrowUpRight size={17}/></a>
        </div>
      </div>
    </section>
  );
}

function Ingredients() {
  const ref = useRef(null);
  useGSAP(() => {
    gsap.from(".ingredient-word", { x: -100, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    gsap.from(".ingredient-card", { y: 80, opacity: 0, stagger: 0.16, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 65%" } });
  }, { scope: ref });
  const ingredients = [
    ["01", "THE GOOD STUFF", "Fresh, honest ingredients. Every single time."],
    ["02", "NO SHORTCUTS", "Made fresh, smashed hot, served right."],
    ["03", "ALL THE FLAVOUR", "Big, bold combinations worth coming back for."]
  ];
  return (
    <section className="ingredients section-pad" ref={ref}>
      <div className="section-kicker"><span>02 / OUR PROMISE</span><span>QUALITY IS NOT OPTIONAL</span></div>
      <h2 className="ingredient-word">LESS TALK.<br/><em>MORE</em> TASTE.</h2>
      <div className="ingredient-cards">{ingredients.map(([n,t,d]) => <article className="ingredient-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>
  );
}





function CTA() {
  return <section className="cta section-pad"><p className="eyebrow"><span/> YOUR NEXT GREAT BITE IS CALLING</p><h2>COME<br/><em>HUNGRY.</em></h2><a href="#contact" className="cta-button">FIND A TABLE <ArrowUpRight size={19}/></a><p className="cta-note">GOOD TIMES ARE ALWAYS ON THE MENU.</p></section>;
}



export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [lenis, setLenis] = useState(null);
  const complete = () => setLoaded(true);
  useEffect(() => {
    // Ensure scroll is at the very top immediately upon initialization
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const instance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      smoothWheel: true,
      wheelMultiplier: 0.95
    });

    // Reset Lenis instance immediately to top
    instance.scrollTo(0, { immediate: true });

    setLenis(instance);
    window.__lenis = instance;

    // Intercept all internal anchor link clicks (#home, #story, #menu, #contact, etc.)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const hash = target.getAttribute("href");
        if (hash && hash !== "#") {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            // Smoothly glide to the target section with navbar offset (-76px)
            instance.scrollTo(targetEl, {
              duration: 1.4,
              offset: -76,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    let rafId;
    const raf = (time) => { instance.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      instance.destroy();
    };
  }, []);
  useEffect(() => {
    if (!loaded) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();
    gsap.from(".hero-eyebrow, .hero-title span, .hero-bottom", { y: 70, opacity: 0, stagger: 0.12, duration: 1, ease: "power4.out", delay: 0.1 });
  }, [loaded, lenis]);
  return <>
    {!loaded && <Preloader onComplete={complete}/>}
    <ScrollProgressBar/>
    <Navbar lenis={lenis}/>
    <main><Hero/><Marquee/><Signature/><ExplodingBurger/><Menu/><About/><Ingredients/><CTA/><Contact/></main>
    <Footer lenisInstance={lenis}/>
    <Analytics />
  </>;
}
