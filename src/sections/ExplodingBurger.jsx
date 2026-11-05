import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  TopBun,
  CrispLettuce,
  TomatoSlices,
  MeltedCheese,
  PattyUpper,
  SpecialSauce,
  PattyLower,
  BottomBun,
} from "../components/BurgerLayers";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExplodingBurger() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const burgerStageRef = useRef(null);

  // Ingredient layer refs
  const topBunRef = useRef(null);
  const lettuceRef = useRef(null);
  const tomatoRef = useRef(null);
  const cheeseRef = useRef(null);
  const patty1Ref = useRef(null);
  const sauceRef = useRef(null);
  const patty2Ref = useRef(null);
  const bottomBunRef = useRef(null);

  // Labels refs
  const labelTopBunRef = useRef(null);
  const labelLettuceRef = useRef(null);
  const labelTomatoRef = useRef(null);
  const labelCheeseRef = useRef(null);
  const labelPatty1Ref = useRef(null);
  const labelSauceRef = useRef(null);
  const labelPatty2Ref = useRef(null);
  const labelBottomBunRef = useRef(null);

  // Background elements refs
  const headlineLeftRef = useRef(null);
  const headlineRightRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const burgerShadowRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
      const vh = window.innerHeight;

      if (prefersReducedMotion) {
        gsap.from([burgerStageRef.current, headlineLeftRef.current, headlineRightRef.current], {
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
        return;
      }

      // Subtle idle breathing when burger is assembled
      const idleFloat = gsap.to(burgerStageRef.current, {
        y: -4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // EXACT VIEWPORT CLAMPING:
      // Stage center is at 50% viewport height.
      // Available safe zone between top bar and bottom bar is ~vh - 120px.
      // Safe top margin = ~vh * 0.21.
      // Safe bottom margin = ~vh * 0.22.
      // Top Bun travels UP (negative), Bottom Bun travels DOWN (positive).
      // This strictly guarantees that NO ingredient ever clips or crosses the header or footer.
      const dist = isMobile
        ? {
            topBun: -110,
            lettuce: -78,
            tomato: -48,
            cheese: -18,
            patty1: 14,
            sauce: 42,
            patty2: 72,
            bottomBun: 105,
          }
        : isTablet
        ? {
            topBun: -135,
            lettuce: -96,
            tomato: -60,
            cheese: -22,
            patty1: 18,
            sauce: 52,
            patty2: 90,
            bottomBun: 130,
          }
        : {
            topBun: Math.min(150, Math.floor(vh * 0.20)) * -1,
            lettuce: Math.min(108, Math.floor(vh * 0.145)) * -1,
            tomato: Math.min(68, Math.floor(vh * 0.092)) * -1,
            cheese: Math.min(25, Math.floor(vh * 0.034)) * -1,
            patty1: Math.min(20, Math.floor(vh * 0.027)),
            sauce: Math.min(60, Math.floor(vh * 0.08)),
            patty2: Math.min(102, Math.floor(vh * 0.138)),
            bottomBun: Math.min(148, Math.floor(vh * 0.198)),
          };

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=1100" : "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress > 0.02) {
              idleFloat.pause();
            } else {
              idleFloat.play();
            }
          },
        },
      });

      // 1. TOP BUN (Moves upward safely, never clipping the top banner)
      scrollTl.to(
        topBunRef.current,
        {
          y: dist.topBun,
          scale: 1.01,
          rotateZ: -1.2,
          rotateX: 3,
          ease: "power2.out",
        },
        0
      );

      // 2. CRISP LETTUCE
      scrollTl.to(
        lettuceRef.current,
        {
          y: dist.lettuce,
          scale: 1.005,
          rotateZ: 1.5,
          rotateX: 2.5,
          ease: "power2.out",
        },
        0.04
      );

      // 3. TOMATO SLICES
      scrollTl.to(
        tomatoRef.current,
        {
          y: dist.tomato,
          scale: 1.005,
          rotateZ: -1.4,
          rotateX: 2,
          ease: "power2.out",
        },
        0.08
      );

      // 4. MELTED CHEESE
      scrollTl.to(
        cheeseRef.current,
        {
          y: dist.cheese,
          scale: 1.005,
          rotateZ: 1,
          rotateX: 1.5,
          ease: "power2.out",
        },
        0.12
      );

      // 5. FIRST SMASH PATTY
      scrollTl.to(
        patty1Ref.current,
        {
          y: dist.patty1,
          scale: 1.005,
          rotateZ: -0.6,
          rotateX: -1.5,
          ease: "power2.out",
        },
        0.16
      );

      // 6. SPECIAL SAUCE
      scrollTl.to(
        sauceRef.current,
        {
          y: dist.sauce,
          scale: 1.01,
          rotateZ: 1.2,
          rotateX: -2,
          ease: "power2.out",
        },
        0.2
      );

      // 7. SECOND SMASH PATTY
      scrollTl.to(
        patty2Ref.current,
        {
          y: dist.patty2,
          scale: 1.005,
          rotateZ: -1,
          rotateX: -3,
          ease: "power2.out",
        },
        0.24
      );

      // 8. BOTTOM BUN (Moves downward safely, never clipping the bottom text)
      scrollTl.to(
        bottomBunRef.current,
        {
          y: dist.bottomBun,
          scale: 0.995,
          rotateZ: 0.8,
          rotateX: -3.5,
          ease: "power2.out",
        },
        0.28
      );

      // BURGER GROUND SHADOW
      scrollTl.to(
        burgerShadowRef.current,
        {
          scaleX: 1.2,
          scaleY: 1.1,
          opacity: 0.35,
          ease: "power1.out",
        },
        0
      );

      // AMBIENT BACKLIGHT GLOW
      scrollTl.to(
        ambientGlowRef.current,
        {
          scale: 1.25,
          opacity: 0.7,
          ease: "power1.out",
        },
        0.08
      );

      // Progressive reveal of ingredient callout cards
      const labelItems = [
        { el: labelTopBunRef.current, time: 0.32 },
        { el: labelLettuceRef.current, time: 0.37 },
        { el: labelTomatoRef.current, time: 0.42 },
        { el: labelCheeseRef.current, time: 0.47 },
        { el: labelPatty1Ref.current, time: 0.52 },
        { el: labelSauceRef.current, time: 0.57 },
        { el: labelPatty2Ref.current, time: 0.62 },
        { el: labelBottomBunRef.current, time: 0.67 },
      ];

      labelItems.forEach(({ el, time }) => {
        if (el) {
          scrollTl.fromTo(
            el,
            { opacity: 0, x: el.dataset.side === "right" ? 14 : -14 },
            { opacity: 1, x: 0, duration: 0.2, ease: "power2.out" },
            time
          );
        }
      });

      // Background Large Typography Parallax
      scrollTl.fromTo(
        headlineLeftRef.current,
        { opacity: 0.08, x: -20 },
        { opacity: 0.22, x: 0, ease: "power2.out" },
        0.12
      );
      scrollTl.fromTo(
        headlineRightRef.current,
        { opacity: 0.08, x: 20 },
        { opacity: 0.22, x: 0, ease: "power2.out" },
        0.12
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="anatomy"
      className="exploding-burger-section relative w-full h-[100svh] min-h-[580px] max-h-[1050px] overflow-hidden bg-[#10100e] text-[#f4f0e9] flex flex-col justify-between select-none"
      style={{ perspective: "1000px" }}
    >
      {/* Top Header Banner Info */}
      <div className="relative z-20 w-full pt-4 sm:pt-5 px-[5.2vw] flex justify-between items-center text-[8px] sm:text-[9px] tracking-[0.2em] text-[#a5a198] border-b border-[rgba(244,240,233,0.12)] pb-2.5">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f45b25] inline-block animate-pulse" />
          INTERACTIVE EXPLODED VIEW — SCROLL TO DISSECT
        </span>
        <span className="hidden sm:inline font-mono">08 ARTISAN LAYERS · 100% FLAME FUELLED</span>
      </div>

      {/* Dramatic Ambient Background Lighting & Fire Glow */}
      <div
        ref={ambientGlowRef}
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[600px] md:h-[600px] rounded-full opacity-35 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,91,37,0.45) 0%, rgba(200,60,15,0.18) 45%, rgba(16,16,14,0) 75%)",
        }}
      />

      {/* Large Typography Behind Burger */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-between px-[3vw] md:px-[5vw] font-['Space_Grotesk'] font-bold uppercase tracking-[-0.08em] select-none">
        <div
          ref={headlineLeftRef}
          className="text-left text-[12vw] md:text-[9.5vw] lg:text-[8.5vw] leading-[0.8] text-[#f4f0e9] opacity-12"
        >
          NOTHING
          <br />
          BUT THE
        </div>
        <div
          ref={headlineRightRef}
          className="text-right text-[12vw] md:text-[9.5vw] lg:text-[8.5vw] leading-[0.8] text-[#f45b25] opacity-16"
        >
          GOOD
          <br />
          STUFF.
        </div>
      </div>

      {/* CENTER BURGER STAGE CONTAINER */}
      <div
        ref={containerRef}
        className="relative z-10 flex-1 flex items-center justify-center w-full max-w-[1200px] mx-auto px-4"
      >
        {/* Burger Contact Shadow */}
        <div
          ref={burgerShadowRef}
          className="pointer-events-none absolute top-[62%] left-1/2 -translate-x-1/2 w-[260px] sm:w-[320px] md:w-[360px] h-[26px] md:h-[34px] rounded-[100%] bg-black/85 blur-[16px]"
        />

        {/* Scaled Proportional Burger Stack Wrapper */}
        <div
          ref={burgerStageRef}
          className="relative w-[250px] sm:w-[300px] md:w-[350px] lg:w-[370px] h-[220px] flex items-center justify-center transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* ============================================================
              LAYER 1: TOP SESAME BRIOCHE BUN
          ============================================================ */}
          <div
            ref={topBunRef}
            className="burger-layer absolute inset-x-0 -top-[36px] z-[80] flex justify-center will-change-transform"
          >
            <TopBun className="w-full drop-shadow-[0_12px_18px_rgba(0,0,0,0.6)]" />
            <div
              ref={labelTopBunRef}
              data-side="right"
              className="layer-tag absolute left-[100%] top-[25%] hidden sm:flex items-center gap-2.5 opacity-0 whitespace-nowrap pointer-events-none"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[#f45b25]/70 border-b border-dashed border-[#f45b25]" />
              <div className="tag-card bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.18)] px-2.5 py-1 rounded-sm">
                <span className="block text-[7.5px] font-mono tracking-widest text-[#f45b25]">01 // BUN</span>
                <span className="block text-[10px] font-['Space_Grotesk'] font-bold text-[#f4f0e9]">
                  GLAZED BRIOCHE & SESAME
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================
              LAYER 2: CRISP ICEBERG LETTUCE
          ============================================================ */}
          <div
            ref={lettuceRef}
            className="burger-layer absolute inset-x-0 -top-[12px] z-[70] flex justify-center will-change-transform"
          >
            <CrispLettuce className="w-full" />
            <div
              ref={labelLettuceRef}
              data-side="left"
              className="layer-tag absolute right-[100%] top-[30%] hidden sm:flex flex-row-reverse items-center gap-2.5 opacity-0 whitespace-nowrap pointer-events-none"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[#60be29]/80 border-b border-dashed border-[#60be29]" />
              <div className="tag-card text-right bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.18)] px-2.5 py-1 rounded-sm">
                <span className="block text-[7.5px] font-mono tracking-widest text-[#60be29]">02 // GREENS</span>
                <span className="block text-[10px] font-['Space_Grotesk'] font-bold text-[#f4f0e9]">
                  CRISP HAND-TORN ICEBERG
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================
              LAYER 3: VINE-RIPENED TOMATO SLICES
          ============================================================ */}
          <div
            ref={tomatoRef}
            className="burger-layer absolute inset-x-0 top-[4px] z-[60] flex justify-center will-change-transform"
          >
            <TomatoSlices className="w-full" />
            <div
              ref={labelTomatoRef}
              data-side="right"
              className="layer-tag absolute left-[100%] top-[30%] hidden sm:flex items-center gap-2.5 opacity-0 whitespace-nowrap pointer-events-none"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[#ff4538]/80 border-b border-dashed border-[#ff4538]" />
              <div className="tag-card bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.18)] px-2.5 py-1 rounded-sm">
                <span className="block text-[7.5px] font-mono tracking-widest text-[#ff4538]">03 // ACIDITY</span>
                <span className="block text-[10px] font-['Space_Grotesk'] font-bold text-[#f4f0e9]">
                  VINE-RIPENED ROMA SLICES
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================
              LAYER 4: MELTED CHEDDAR CHEESE
          ============================================================ */}
          <div
            ref={cheeseRef}
            className="burger-layer absolute inset-x-0 top-[18px] z-[50] flex justify-center will-change-transform"
          >
            <MeltedCheese className="w-full" />
            <div
              ref={labelCheeseRef}
              data-side="left"
              className="layer-tag absolute right-[100%] top-[35%] hidden sm:flex flex-row-reverse items-center gap-2.5 opacity-0 whitespace-nowrap pointer-events-none"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[#ffa710]/80 border-b border-dashed border-[#ffa710]" />
              <div className="tag-card text-right bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.18)] px-2.5 py-1 rounded-sm">
                <span className="block text-[7.5px] font-mono tracking-widest text-[#ffa710]">04 // CHEESE</span>
                <span className="block text-[10px] font-['Space_Grotesk'] font-bold text-[#f4f0e9]">
                  MELTED AGED CHEDDAR
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================
              LAYER 5: UPPER CRISPY CHICKEN / VEG SMASH PATTY
          ============================================================ */}
          <div
            ref={patty1Ref}
            className="burger-layer absolute inset-x-0 top-[34px] z-[40] flex justify-center will-change-transform"
          >
            <PattyUpper className="w-full" />
            <div
              ref={labelPatty1Ref}
              data-side="right"
              className="layer-tag absolute left-[100%] top-[35%] hidden sm:flex items-center gap-2.5 opacity-0 whitespace-nowrap pointer-events-none"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[#f45b25]/80 border-b border-dashed border-[#f45b25]" />
              <div className="tag-card bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.18)] px-2.5 py-1 rounded-sm">
                <span className="block text-[7.5px] font-mono tracking-widest text-[#f45b25]">05 // SMASH I</span>
                <span className="block text-[10px] font-['Space_Grotesk'] font-bold text-[#f4f0e9]">
                  CRISP CHICKEN & SMASH PATTY
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================
              LAYER 6: SPECIAL RELISH SAUCE
          ============================================================ */}
          <div
            ref={sauceRef}
            className="burger-layer absolute inset-x-0 top-[50px] z-[30] flex justify-center will-change-transform"
          >
            <SpecialSauce className="w-full" />
            <div
              ref={labelSauceRef}
              data-side="left"
              className="layer-tag absolute right-[100%] top-[35%] hidden sm:flex flex-row-reverse items-center gap-2.5 opacity-0 whitespace-nowrap pointer-events-none"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[#f45b25] border-b border-dashed border-[#f45b25]" />
              <div className="tag-card text-right bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.18)] px-2.5 py-1 rounded-sm">
                <span className="block text-[7.5px] font-mono tracking-widest text-[#f45b25]">06 // SECRET SAUCE</span>
                <span className="block text-[10px] font-['Space_Grotesk'] font-bold text-[#f4f0e9]">
                  FLAME & FUEL HOUSE SAUCE
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================
              LAYER 7: LOWER DOUBLE CRUST PATTY
          ============================================================ */}
          <div
            ref={patty2Ref}
            className="burger-layer absolute inset-x-0 top-[64px] z-[20] flex justify-center will-change-transform"
          >
            <PattyLower className="w-full" />
            <div
              ref={labelPatty2Ref}
              data-side="right"
              className="layer-tag absolute left-[100%] top-[35%] hidden sm:flex items-center gap-2.5 opacity-0 whitespace-nowrap pointer-events-none"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[#f45b25]/80 border-b border-dashed border-[#f45b25]" />
              <div className="tag-card bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.18)] px-2.5 py-1 rounded-sm">
                <span className="block text-[7.5px] font-mono tracking-widest text-[#f45b25]">07 // SMASH II</span>
                <span className="block text-[10px] font-['Space_Grotesk'] font-bold text-[#f4f0e9]">
                  CHARRED GOLDEN CRUST LAYER
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================
              LAYER 8: BUTTER-TOASTED BOTTOM BUN
          ============================================================ */}
          <div
            ref={bottomBunRef}
            className="burger-layer absolute inset-x-0 top-[80px] z-[10] flex justify-center will-change-transform"
          >
            <BottomBun className="w-full drop-shadow-[0_16px_22px_rgba(0,0,0,0.85)]" />
            <div
              ref={labelBottomBunRef}
              data-side="left"
              className="layer-tag absolute right-[100%] top-[35%] hidden sm:flex flex-row-reverse items-center gap-2.5 opacity-0 whitespace-nowrap pointer-events-none"
            >
              <span className="w-6 md:w-8 h-[1px] bg-[#d97524]/80 border-b border-dashed border-[#d97524]" />
              <div className="tag-card text-right bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.18)] px-2.5 py-1 rounded-sm">
                <span className="block text-[7.5px] font-mono tracking-widest text-[#d97524]">08 // HEEL</span>
                <span className="block text-[10px] font-['Space_Grotesk'] font-bold text-[#f4f0e9]">
                  TOASTED BRIOCHE BASE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Callout & Scroll Indicator */}
      <div className="relative z-20 w-full pb-4 sm:pb-5 px-[5.2vw] flex justify-between items-end border-t border-[rgba(244,240,233,0.12)] pt-2.5">
        <div>
          <p className="text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase font-mono text-[#a5a198]">
            ANATOMY OF A LEGEND
          </p>
          <p className="text-[10.5px] sm:text-[11.5px] text-[#f4f0e9] font-['Space_Grotesk'] font-bold mt-0.5">
            EVERY INGREDIENT SOURCED FRESH. SMASHED WITH FIRE.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[8px] sm:text-[8.5px] tracking-[0.18em] uppercase font-mono text-[#f45b25]">
          <span>SCROLL DOWN TO DISSECT / REVERSE</span>
          <span className="inline-block animate-bounce text-xs">↓</span>
        </div>
      </div>
    </section>
  );
}
