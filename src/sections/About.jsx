import React, { useRef } from "react";
import { ArrowUpRight, Flame, Sparkles, UtensilsCrossed, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SafeImage from "../components/SafeImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Curated high-res dark cinematic food photography assets
const storyGallery = [
  {
    title: "FIRE & CAST IRON",
    subtitle: "500°F CRUST LOCK",
    tag: "THE SEAR",
    image: "/images/story/story-flame.jpg",
    desc: "Whole-muscle prime chuck smashed on ripping iron to achieve maximum Maillard reaction.",
  },
  {
    title: "MOLTEN CHEDDAR",
    subtitle: "SLOW-MELT CASCADE",
    tag: "THE MELT",
    image: "/images/story/story-cheese.jpg",
    desc: "Aged sharp cheddar steamed under cloches directly over sizzling smash patties.",
  },
  {
    title: "RAW CRUNCH & GREENS",
    subtitle: "CRISP VINE PICKED",
    tag: "FRESH PREP",
    image: "/images/story/story-greens.jpg",
    desc: "Hydroponic leaf lettuce and vine-ripened Roma tomatoes prepped fresh every four hours.",
  },
  {
    title: "THE CHEF'S TOUCH",
    subtitle: "HANDCRAFTED STACK",
    tag: "THE CRAFT",
    image: "/images/story/story-chef.jpg",
    desc: "Every burger built to order with precise sauce distribution and toasted brioche caps.",
  },
];

export default function About() {
  const containerRef = useRef(null);
  const headlineMaskRef = useRef(null);
  const galleryRef = useRef(null);
  const philosophyRef = useRef(null);
  const closingRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.from(".story-reveal", {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        });
        return;
      }

      // 1. OPENING SECTION: GSAP Mask text reveals
      const openingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headlineMaskRef.current,
          start: "top 75%",
        },
      });

      openingTl
        .from(".headline-word-inner", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.14,
          ease: "power4.out",
        })
        .from(
          ".story-opening-desc",
          {
            y: 40,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".story-tag-pill",
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.7"
        );

      // 2. CINEMATIC IMAGE SHOWCASE: Slow zoom + Parallax on scroll
      const galleryCards = gsap.utils.toArray(".gallery-card");
      galleryCards.forEach((card) => {
        const img = card.querySelector(".gallery-img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.25, yPercent: -12 },
            {
              scale: 1,
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      });

      // 3. BRAND PHILOSOPHY: Editorial blocks staggered entrance
      gsap.from(".philosophy-card", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: "top 75%",
        },
      });

      // Subtle horizontal movement on philosophy kicker
      gsap.from(".philosophy-track", {
        x: -50,
        ease: "none",
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 4. CLOSING STATEMENT: Large typography & Button reveal
      const closingTl = gsap.timeline({
        scrollTrigger: {
          trigger: closingRef.current,
          start: "top 75%",
        },
      });

      closingTl
        .from(".closing-word-inner", {
          yPercent: 115,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        })
        .from(
          ".closing-cta-btn",
          {
            scale: 0.9,
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "back.out(1.6)",
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative w-full bg-[#10100e] text-[#f4f0e9] overflow-hidden select-none border-t border-[rgba(244,240,233,0.12)]"
    >
      {/* Subtle Atmospheric Background Glow */}
      <div
        className="pointer-events-none absolute top-1/3 -left-[15%] w-[700px] h-[700px] rounded-full opacity-25 blur-[160px]"
        style={{
          background: "radial-gradient(circle, #f45b25 0%, rgba(16,16,14,0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-[15%] w-[600px] h-[600px] rounded-full opacity-20 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #ffa710 0%, rgba(16,16,14,0) 70%)",
        }}
      />

      {/* ============================================================
          1. OPENING SECTION: "WE DON'T DO ORDINARY."
      ============================================================ */}
      <div
        ref={headlineMaskRef}
        className="pt-28 pb-20 px-[5.2vw] max-w-[1400px] mx-auto relative z-10"
      >
        {/* Section Top Header Info */}
        <div className="flex justify-between items-center border-b border-[rgba(244,240,233,0.15)] pb-4 mb-16 text-[9px] tracking-[0.2em] font-mono text-[#a5a198]">
          <span className="flex items-center gap-2">
            <Flame size={14} className="text-[#f45b25]" />
            04 // THE BRAND PHILOSOPHY
          </span>
          <span className="hidden sm:inline font-mono">BORN IN FIRE · EST. 2026</span>
        </div>

        {/* Oversized Masked Typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#f45b25] flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-[#f45b25] inline-block" />
              THE MANIFESTO
            </p>
            <h2 className="font-['Space_Grotesk'] font-bold uppercase tracking-[-0.09em] text-[13vw] sm:text-[10vw] lg:text-[7.5rem] leading-[0.8]">
              <span className="block overflow-hidden">
                <span className="headline-word-inner block">WE DON'T</span>
              </span>
              <span className="block overflow-hidden">
                <span className="headline-word-inner block text-[#736f66]">DO</span>
              </span>
              <span className="block overflow-hidden">
                <span className="headline-word-inner block text-[#f45b25]">ORDINARY.</span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end pb-2">
            <div className="story-tag-pill inline-flex items-center gap-2 px-3 py-1 bg-[#1a1915] border border-[#f45b25]/40 rounded-full w-max text-[9px] font-mono tracking-widest text-[#f45b25] mb-5">
              <Sparkles size={11} />
              NO COMPROMISES EVER
            </div>
            <p className="story-opening-desc text-[#ded9cf] text-[15px] sm:text-[16px] leading-[1.8] font-normal border-l border-[#f45b25] pl-5">
              "We believe great burgers aren't made by shortcuts. They're made with passion, fire and ingredients that speak for themselves."
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================
          2. CINEMATIC IMAGE SHOWCASE: 4 High-Resolution Photo Cards
      ============================================================ */}
      <div
        ref={galleryRef}
        className="py-12 px-[5.2vw] max-w-[1550px] mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storyGallery.map((item, idx) => (
            <article
              key={idx}
              className="gallery-card group relative h-[440px] sm:h-[480px] lg:h-[540px] rounded-sm overflow-hidden bg-[#181815] border border-[rgba(244,240,233,0.12)] transition-all duration-500 hover:border-[#f45b25]/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
            >
              {/* Parallax Image Layer */}
              <div className="absolute inset-0 overflow-hidden">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={1000}
                  height={750}
                  className="gallery-img w-full h-[125%] object-cover object-center filter brightness-105 contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient overlay for bottom text readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#10100e] via-[#10100e]/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />

              {/* Card Corner Tag Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#10100e]/85 backdrop-blur-md text-[#f4f0e9] border border-white/10 font-mono text-[8px] tracking-[0.16em] uppercase px-3 py-1.5 rounded-sm">
                  {item.tag}
                </span>
              </div>

              {/* Card Bottom Editorial Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                <span className="text-[8px] font-mono tracking-widest uppercase text-[#f45b25] mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-['Space_Grotesk'] font-bold text-[22px] sm:text-[24px] text-[#f4f0e9] leading-tight mb-2 group-hover:text-[#f45b25] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[12px] text-[#aaa69d] leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ============================================================
          3. BRAND PHILOSOPHY: 3 Editorial Content Blocks
      ============================================================ */}
      <div
        ref={philosophyRef}
        className="py-28 px-[5.2vw] max-w-[1400px] mx-auto relative z-10"
      >
        <div className="philosophy-track flex items-center gap-3 text-[10px] font-mono tracking-[0.22em] text-[#736f66] uppercase mb-14">
          <span className="w-8 h-[1px] bg-[#f45b25]" />
          <span>OUR THREE PILLARS OF CRAFT</span>
          <span className="w-8 h-[1px] bg-[#f45b25]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 border-t border-[rgba(244,240,233,0.15)] pt-12">
          {/* Pillar 01 */}
          <article className="philosophy-card group relative p-8 sm:p-10 bg-[#141411] border border-[rgba(244,240,233,0.1)] rounded-sm hover:border-[#f45b25]/50 transition-colors duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[32px] font-['Space_Grotesk'] font-bold text-[#f45b25]">
                  01
                </span>
                <ShieldCheck size={22} className="text-[#a5a198] group-hover:text-[#f45b25] transition-colors" />
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-[24px] sm:text-[28px] uppercase tracking-tight text-[#f4f0e9] mb-4">
                QUALITY FIRST
              </h3>
              <p className="text-[#a5a198] text-[13px] sm:text-[14px] leading-relaxed">
                Fresh ingredients. No compromises. We work exclusively with certified farms that deliver fresh cuts and produce every dawn.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[9px] tracking-widest text-[#736f66] uppercase">
              // ZERO FROZEN PATTIES
            </div>
          </article>

          {/* Pillar 02 */}
          <article className="philosophy-card group relative p-8 sm:p-10 bg-[#141411] border border-[rgba(244,240,233,0.1)] rounded-sm hover:border-[#f45b25]/50 transition-colors duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[32px] font-['Space_Grotesk'] font-bold text-[#f45b25]">
                  02
                </span>
                <Flame size={22} className="text-[#a5a198] group-hover:text-[#f45b25] transition-colors" />
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-[24px] sm:text-[28px] uppercase tracking-tight text-[#f4f0e9] mb-4">
                MADE WITH FIRE
              </h3>
              <p className="text-[#a5a198] text-[13px] sm:text-[14px] leading-relaxed">
                Every burger is grilled and crafted with care. Searing iron creates a lacy caramelized edge that locks in juices that steam can never match.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[9px] tracking-widest text-[#736f66] uppercase">
              // CAST IRON SMASH TECHNIQUE
            </div>
          </article>

          {/* Pillar 03 */}
          <article className="philosophy-card group relative p-8 sm:p-10 bg-[#141411] border border-[rgba(244,240,233,0.1)] rounded-sm hover:border-[#f45b25]/50 transition-colors duration-300 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-[32px] font-['Space_Grotesk'] font-bold text-[#f45b25]">
                  03
                </span>
                <UtensilsCrossed size={22} className="text-[#a5a198] group-hover:text-[#f45b25] transition-colors" />
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-[24px] sm:text-[28px] uppercase tracking-tight text-[#f4f0e9] mb-4">
                BIG ON FLAVOUR
              </h3>
              <p className="text-[#a5a198] text-[13px] sm:text-[14px] leading-relaxed">
                Bold combinations that make every bite memorable. From fermented hot honey to smoked bacon jam, every layer is designed to hit hard.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[9px] tracking-widest text-[#736f66] uppercase">
              // CHEF-CRAFTED CONDIMENTS
            </div>
          </article>
        </div>
      </div>

      {/* ============================================================
          4. CLOSING STATEMENT: "GOOD FOOD. GOOD MOOD. NO RULES."
      ============================================================ */}
      <div
        ref={closingRef}
        className="py-28 px-[5.2vw] border-t border-[rgba(244,240,233,0.12)] text-center relative z-10 flex flex-col items-center justify-center bg-[#0d0d0b]"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#a5a198] uppercase mb-8 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#f45b25] inline-flex items-center justify-center text-black text-[10px] font-bold">
            ✳
          </span>
          THE UNCOMPROMISING CODE
        </span>

        <h3 className="font-['Space_Grotesk'] font-bold uppercase tracking-[-0.09em] text-[12vw] sm:text-[9.5vw] lg:text-[7.5rem] leading-[0.82] max-w-[1200px] mb-12">
          <span className="block overflow-hidden">
            <span className="closing-word-inner block">
              GOOD <span className="text-[#f45b25]">FOOD.</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="closing-word-inner block">
              GOOD <span className="text-[#f45b25]">MOOD.</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="closing-word-inner block text-[#ded9cf]">
              NO <span className="text-[#f45b25]">RULES.</span>
            </span>
          </span>
        </h3>

        {/* Animated Interactive Button linking to #menu */}
        <a
          href="#menu"
          className="closing-cta-btn group relative inline-flex items-center gap-4 bg-[#f45b25] text-[#17130f] px-9 py-5 rounded-full font-mono font-bold text-[11px] sm:text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#ff7038] hover:shadow-[0_0_35px_rgba(244,91,37,0.55)] hover:scale-105"
        >
          <span>EXPLORE OUR MENU</span>
          <span className="w-6 h-6 rounded-full bg-[#17130f] text-[#f45b25] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight size={14} />
          </span>
        </a>
      </div>
    </section>
  );
}
