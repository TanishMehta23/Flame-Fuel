import React, { useRef, useState } from "react";
import {
  Flame,
  ArrowUp,
  ArrowUpRight,
  Instagram,
  Facebook,
  Youtube,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { restaurantConfig } from "../data/restaurant";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer({ lenisInstance }) {
  const footerRef = useRef(null);
  const headlineMaskRef = useRef(null);
  const linksColRef = useRef(null);
  const newsletterRef = useRef(null);
  const backToTopBtnRef = useRef(null);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter an email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Demo success state (explicitly labeled demo-only in UI)
    setStatus("success");
    setErrorMessage("");
    setEmail("");
  };

  const handleBackToTop = (e) => {
    e.preventDefault();
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { duration: 1.5, immediate: false });
    } else if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5, immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNav = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = lenisInstance || window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 1.4,
        offset: -76,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.from(".footer-reveal", {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        });
        return;
      }

      // 1. Oversized Footer Heading: "STAY HUNGRY."
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headlineMaskRef.current,
          start: "top 82%",
        },
      });

      headingTl
        .from(".footer-word-inner", {
          yPercent: 110,
          duration: 1.15,
          stagger: 0.14,
          ease: "power4.out",
        })
        .from(
          ".footer-sub-lead",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // 2. Navigation & Brand Column Staggered Entrance
      gsap.from(".footer-col-item", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: linksColRef.current,
          start: "top 85%",
        },
      });

      // 3. Newsletter UI Entrance
      gsap.from(newsletterRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: "top 88%",
        },
      });

      // 4. Circular Back-to-Top Button Entrance
      gsap.from(backToTopBtnRef.current, {
        scale: 0.7,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: backToTopBtnRef.current,
          start: "top 95%",
        },
      });
    },
    { scope: footerRef }
  );

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#story" },
    { label: "Menu", href: "#menu" },
    { label: "Contact", href: "#contact" },
  ];

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case "instagram":
        return <Instagram size={17} />;
      case "facebook":
        return <Facebook size={17} />;
      case "youtube":
        return <Youtube size={17} />;
      default:
        return <Flame size={17} />;
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#10100e] text-[#f4f0e9] pt-28 pb-12 px-[5.2vw] border-t border-[rgba(244,240,233,0.14)] overflow-hidden select-none"
    >
      {/* Background Ambient Warm Glow */}
      <div
        className="pointer-events-none absolute -bottom-[15%] left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full opacity-18 blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,91,37,0.5) 0%, rgba(200,60,15,0.2) 50%, rgba(16,16,14,0) 80%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* ============================================================
            1. MAIN OVERSIZED FOOTER HEADING: "STAY HUNGRY."
        ============================================================ */}
        <div
          ref={headlineMaskRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-20 border-b border-[rgba(244,240,233,0.12)]"
        >
          <div className="lg:col-span-8">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#a5a198] uppercase block mb-4 flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#f45b25] inline-block" />
              FLAME & FUEL CO.
            </span>
            <h2 className="font-['Space_Grotesk'] font-bold uppercase tracking-[-0.09em] text-[15vw] sm:text-[11vw] lg:text-[9.2rem] leading-[0.78]">
              <span className="block overflow-hidden">
                <span className="footer-word-inner block">STAY</span>
              </span>
              <span className="block overflow-hidden">
                <span className="footer-word-inner block text-[#f45b25]">HUNGRY.</span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end lg:items-end pb-3">
            <p className="footer-sub-lead text-[#a5a198] text-[14px] sm:text-[15px] leading-relaxed max-w-[340px] lg:text-right">
              "Good burgers. Great people. Always something cooking."
            </p>
          </div>
        </div>

        {/* ============================================================
            2. MIDDLE EDITORIAL GRID: Brand, Nav, Socials & Newsletter
        ============================================================ */}
        <div
          ref={linksColRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-14 py-20 border-b border-[rgba(244,240,233,0.1)]"
        >
          {/* Brand Identity Column (Lg 4 cols) */}
          <div className="footer-col-item lg:col-span-4 flex flex-col justify-between">
            <div>
              <a
                href="#home"
                className="inline-flex items-center gap-2.5 font-['Space_Grotesk'] font-bold text-[22px] tracking-tight text-[#f4f0e9] group mb-4"
              >
                <span className="w-8 h-8 rounded-full bg-[#f45b25]/20 text-[#f45b25] flex items-center justify-center group-hover:bg-[#f45b25] group-hover:text-[#17130f] transition-all">
                  <Flame size={18} fill="currentColor" />
                </span>
                <span>
                  FLAME <i className="text-[#f45b25] not-italic">&</i> FUEL
                </span>
              </a>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#f45b25] font-semibold mb-3">
                {restaurantConfig.tagline}
              </p>
              <p className="text-[12px] text-[#8e8980] leading-relaxed max-w-[300px]">
                Handcrafted smash burgers seared fierce on cast iron. Fresh cuts daily.
              </p>
            </div>

            {/* Back-To-Top Circular Button */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <button
                ref={backToTopBtnRef}
                onClick={handleBackToTop}
                aria-label="Back to top"
                className="group inline-flex items-center gap-3.5 text-[10px] font-mono tracking-widest text-[#a5a198] hover:text-[#f4f0e9] transition-colors cursor-pointer select-none"
              >
                <span className="w-11 h-11 rounded-full border border-[rgba(244,240,233,0.25)] flex items-center justify-center transition-all duration-300 group-hover:border-[#f45b25] group-hover:bg-[#f45b25] group-hover:text-[#17130f] group-hover:-translate-y-1 group-hover:rotate-45 cursor-pointer shadow-sm">
                  <ArrowUp size={16} />
                </span>
                <span className="uppercase tracking-[0.2em] font-bold cursor-pointer">BACK TO TOP</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links (Lg 2 cols) */}
          <div className="footer-col-item lg:col-span-2">
            <span className="block font-mono text-[9px] tracking-[0.22em] uppercase text-[#736f66] mb-6">
              EXPLORE
            </span>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 font-['Space_Grotesk'] text-[15px] font-semibold text-[#ded9cf] hover:text-[#f45b25] transition-colors cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#f45b25] transition-colors" />
                    <span className="cursor-pointer">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact (Lg 2 cols) */}
          <div className="footer-col-item lg:col-span-2">
            <span className="block font-mono text-[9px] tracking-[0.22em] uppercase text-[#736f66] mb-6">
              CONTACT
            </span>
            <ul className="space-y-4">
              <li>
                <a
                  href={restaurantConfig.contact.emailMailto}
                  className="group inline-flex items-center gap-2 text-[12px] text-[#a5a198] hover:text-[#f45b25] transition-colors break-all"
                >
                  <span>{restaurantConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <span className="text-[11px] text-[#736f66] font-mono uppercase">
                  OPEN DAILY · DINE-IN & TAKEAWAY
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription (Lg 4 cols) */}
          <div ref={newsletterRef} className="lg:col-span-4">
            <div className="bg-[#151512] border border-[rgba(244,240,233,0.12)] p-6 sm:p-7 rounded-sm">
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#f45b25] block mb-1">
                VIP GRILL CLUB
              </span>
              <h3 className="font-['Space_Grotesk'] font-bold text-[22px] sm:text-[24px] uppercase text-[#f4f0e9] mb-2 tracking-tight">
                GET THE GOOD STUFF.
              </h3>
              <p className="text-[12px] text-[#a5a198] leading-relaxed mb-6">
                Secret menu drops, early tastings and pop-up locations sent to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#10100e] border border-[rgba(244,240,233,0.2)] focus:border-[#f45b25] rounded-sm px-4 py-3 text-[13px] text-[#f4f0e9] placeholder-[#5f5b53] outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#f45b25] hover:bg-[#ff7038] text-[#17130f] rounded-sm font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors"
                  >
                    <span>JOIN</span>
                    <Send size={11} />
                  </button>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-[11px] text-[#ff4d4d] pt-1">
                    <AlertCircle size={13} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2 text-[11px] text-[#22c55e] pt-1">
                    <CheckCircle2 size={13} />
                    <span>You're on the list! (Frontend demo only — no emails stored)</span>
                  </div>
                )}

                <p className="text-[9px] font-mono tracking-wider text-[#635f58] uppercase pt-1">
                  * FRONTEND DEMO ONLY · NO MARKETING SPAM
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* ============================================================
            3. BOTTOM LEGAL & COPYRIGHT BAR
        ============================================================ */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono tracking-[0.16em] uppercase text-[#7a766e]">
          <span>
            © {new Date().getFullYear()} FLAME & FUEL RESTOBAR. ALL RIGHTS RESERVED.
          </span>
          <span className="flex items-center gap-4">
            <span className="text-[#a5a198]">HANDCRAFTED WITH FIRE</span>
            <span>·</span>
            <span>NO COMPROMISES</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

