import React, { useEffect, useRef } from "react";
import { Flame } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  const badgeTextRef = useRef(null);
  const flameIconRef = useRef(null);

  useEffect(() => {
    let animId;

    const updateBar = () => {
      const scrollY = window.__lenis ? window.__lenis.scroll : window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
        if (barRef.current) {
          // Direct instantaneous transform without CSS transition latency
          barRef.current.style.transform = `scaleX(${ratio})`;
        }
        if (badgeTextRef.current) {
          badgeTextRef.current.textContent = `${Math.round(ratio * 100)}%`;
        }
        if (flameIconRef.current) {
          flameIconRef.current.style.color = ratio > 0.01 ? "#f45b25" : "#736f66";
        }
      }
    };

    // 1. Hook directly into Lenis on scroll if available
    if (window.__lenis) {
      window.__lenis.on("scroll", updateBar);
    }

    // 2. Hook directly into window scroll and ScrollTrigger
    window.addEventListener("scroll", updateBar, { passive: true });
    ScrollTrigger.addEventListener("scrollEnd", updateBar);

    // Initial check
    updateBar();

    return () => {
      if (window.__lenis) {
        window.__lenis.off("scroll", updateBar);
      }
      window.removeEventListener("scroll", updateBar);
      ScrollTrigger.removeEventListener("scrollEnd", updateBar);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Top thin progress line with hardware-accelerated scaleX and zero delay */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-transparent overflow-hidden">
        <div
          ref={barRef}
          className="h-full w-full bg-gradient-to-r from-[#d97524] via-[#f45b25] to-[#ff7d3b] shadow-[0_0_14px_rgba(244,91,37,0.9)] origin-left will-change-transform"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Realtime numeric scroll indicator badge */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 bg-[#141411]/90 backdrop-blur-md border border-[rgba(244,240,233,0.14)] px-3 py-1.5 rounded-full pointer-events-none text-[9px] font-mono tracking-widest text-[#a5a198] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <span ref={flameIconRef} className="text-[#736f66] transition-colors duration-150">
          <Flame size={12} fill="currentColor" />
        </span>
        <span ref={badgeTextRef} className="text-[#f4f0e9] font-bold">
          0%
        </span>
      </div>
    </>
  );
}
