import React, { useRef } from "react";
import {
  Clock,
  Mail,
  ArrowUpRight,
  Flame,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { restaurantConfig } from "../data/restaurant";
import SafeImage from "../components/SafeImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const leftPanelRef = useRef(null);
  const mapPanelRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.from(".contact-reveal", {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        });
        return;
      }

      // 1. Heading masked text reveal
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 78%",
        },
      });

      headingTl
        .from(".contact-head-word-inner", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.14,
          ease: "power4.out",
        })
        .from(
          ".contact-sub-copy",
          {
            y: 35,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // 2. Contact details panel staggered reveal
      gsap.from(".contact-info-block", {
        y: 50,
        opacity: 0,
        stagger: 0.14,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftPanelRef.current,
          start: "top 75%",
        },
      });

      // 3. Visual Panel reveal with parallax
      const mapCard = mapPanelRef.current;
      if (mapCard) {
        gsap.from(mapCard, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapCard,
            start: "top 75%",
          },
        });

        const bgImg = mapCard.querySelector(".map-parallax-img");
        if (bgImg) {
          gsap.fromTo(
            bgImg,
            { scale: 1.18, yPercent: -8 },
            {
              scale: 1,
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: mapCard,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full bg-[#10100e] text-[#f4f0e9] py-28 px-[5.2vw] border-t border-[rgba(244,240,233,0.12)] overflow-hidden select-none"
    >
      {/* Background Ambient Flame Lighting */}
      <div
        className="pointer-events-none absolute bottom-10 left-1/4 w-[600px] h-[600px] rounded-full opacity-25 blur-[160px]"
        style={{
          background: "radial-gradient(circle, #f45b25 0%, rgba(16,16,14,0) 70%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header Kicker */}
        <div className="flex justify-between items-center border-b border-[rgba(244,240,233,0.15)] pb-4 mb-16 text-[9px] tracking-[0.2em] font-mono text-[#a5a198]">
          <span className="flex items-center gap-2">
            <Flame size={14} className="text-[#f45b25]" />
            05 // GET IN TOUCH
          </span>
          <span className="hidden sm:inline font-mono">DIRECT INQUIRIES & RESERVATIONS</span>
        </div>

        {/* 2. Main Heading: COME FIND YOUR NEW FAVOURITE */}
        <div ref={headingRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
          <div className="lg:col-span-8">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#f45b25] flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-[#f45b25] inline-block" />
              CONNECT WITH US
            </p>
            <h2 className="font-['Space_Grotesk'] font-bold uppercase tracking-[-0.09em] text-[12vw] sm:text-[9vw] lg:text-[6.8rem] leading-[0.82]">
              <span className="block overflow-hidden">
                <span className="contact-head-word-inner block">COME FIND</span>
              </span>
              <span className="block overflow-hidden">
                <span className="contact-head-word-inner block text-[#736f66]">YOUR</span>
              </span>
              <span className="block overflow-hidden">
                <span className="contact-head-word-inner block text-[#f45b25]">NEW FAVOURITE.</span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 pb-2">
            <p className="contact-sub-copy text-[#ded9cf] text-[15px] sm:text-[16px] leading-[1.8] font-normal border-l border-[#f45b25] pl-5">
              "Great burgers, good people and even better times. Direct inquiries, catering, or questions — we are always an email away."
            </p>
          </div>
        </div>

        {/* Two-Column Layout: Contact Panel & Restobar Ambiance Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Direct Gmail Contact & Operating Hours */}
          <div ref={leftPanelRef} className="lg:col-span-6 flex flex-col justify-between space-y-8">
            {/* Direct Official Contact Card */}
            <div className="contact-info-block p-8 sm:p-9 bg-[#151512] border border-[rgba(244,240,233,0.12)] rounded-sm">
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-[#f45b25] uppercase mb-4">
                <Mail size={16} />
                <span>OFFICIAL INBOX</span>
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-[24px] sm:text-[28px] text-[#f4f0e9] mb-3">
                {restaurantConfig.contact.email}
              </h3>
              <p className="text-[#a5a198] text-[14px] leading-relaxed mb-8">
                Drop us a message for table bookings, custom catering events, press inquiries or collaborations.
              </p>
              <a
                href={restaurantConfig.contact.emailMailto}
                className="group inline-flex items-center gap-3.5 bg-[#f45b25] hover:bg-[#ff7038] text-[#17130f] font-mono font-bold text-[11px] tracking-widest uppercase px-7 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(244,91,37,0.4)]"
              >
                <span>SEND DIRECT EMAIL</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Opening Hours Block */}
            <div className="contact-info-block p-8 bg-[#151512] border border-[rgba(244,240,233,0.1)] rounded-sm">
              <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-[#f45b25] uppercase mb-5">
                <Clock size={16} />
                <span>SERVICE & GRILL HOURS</span>
              </div>
              <div className="space-y-4">
                {restaurantConfig.hours.map((h, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[rgba(244,240,233,0.08)] last:border-0"
                  >
                    <span className="font-mono text-[11px] text-[#ded9cf] tracking-wider mb-1 sm:mb-0">
                      {h.days}
                    </span>
                    <span className="font-['Space_Grotesk'] font-bold text-[14px] sm:text-[15px] text-[#f45b25]">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time Guarantee Pill */}
            <div className="contact-info-block p-5 bg-[#121210] border border-white/5 rounded-sm flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-[#f45b25]/15 text-[#f45b25] flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={18} />
              </span>
              <div>
                <span className="block text-[11px] font-mono tracking-wider font-bold text-[#ded9cf]">
                  PROMPT RESPONSE
                </span>
                <span className="block text-[11px] text-[#736f66]">
                  Inquiries sent to mehtatanish2306@gmail.com are attended directly within 24 hours.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Branded Kitchen Atmosphere */}
          <div
            ref={mapPanelRef}
            className="lg:col-span-6 relative min-h-[460px] lg:min-h-full rounded-sm overflow-hidden border border-[rgba(244,240,233,0.15)] bg-[#141411] flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            {/* Background Atmosphere Parallax Image */}
            <div className="absolute inset-0 overflow-hidden">
              <SafeImage
                src="/images/story/story-chef.jpg"
                alt="Flame & Fuel kitchen atmosphere"
                loading="lazy"
                width={1000}
                height={750}
                className="map-parallax-img w-full h-[125%] object-cover object-center filter saturate-[0.6] contrast-[1.1]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10100e] via-[#10100e]/75 to-black/70" />
            </div>

            {/* Top Corner Status Indicator */}
            <div className="relative z-10 p-7 flex justify-between items-center">
              <div className="inline-flex items-center gap-2.5 bg-[#10100e]/90 backdrop-blur-md px-3.5 py-1.5 border border-white/10 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block animate-pulse" />
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#ded9cf]">
                  OPEN FOR RESERVATIONS
                </span>
              </div>

              <span className="font-mono text-[9px] tracking-widest text-[#a5a198]">
                EST. 2026
              </span>
            </div>

            {/* Center Flame & Fuel Callout */}
            <div className="relative z-10 px-8 py-14 flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full border border-[#f45b25]/40 flex items-center justify-center animate-ping absolute inset-0 opacity-40" />
                <div className="w-20 h-20 rounded-full bg-[#17130f]/90 border border-[#f45b25] flex items-center justify-center text-[#f45b25] shadow-[0_0_35px_rgba(244,91,37,0.6)]">
                  <Flame size={32} fill="currentColor" />
                </div>
              </div>

              <span className="font-mono text-[10px] tracking-[0.25em] text-[#f45b25] uppercase mb-2 flex items-center gap-1.5">
                <Sparkles size={11} />
                FLAME & FUEL
              </span>
              <h4 className="font-['Space_Grotesk'] font-bold text-[28px] sm:text-[34px] uppercase text-[#f4f0e9] mb-3">
                TABLES READY TONIGHT.
              </h4>
              <p className="text-[#a5a198] text-[13px] max-w-[360px] leading-relaxed mb-6">
                Step straight into the aroma of sizzling crisp chicken and toasted brioche. No fuss. Just hungry appetites.
              </p>

              <a
                href={restaurantConfig.contact.emailMailto}
                className="group inline-flex items-center gap-3 bg-[#f45b25] text-[#17130f] px-7 py-3.5 rounded-full font-mono text-[11px] font-bold tracking-widest uppercase hover:bg-[#ff7038] hover:shadow-[0_0_25px_rgba(244,91,37,0.5)] transition-all"
              >
                <span>WRITE TO US</span>
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Bottom Status */}
            <div className="relative z-10 p-6 border-t border-[rgba(244,240,233,0.1)] bg-[#10100e]/85 backdrop-blur-md flex justify-between items-center text-[8px] font-mono tracking-widest text-[#736f66] uppercase">
              <span>DIRECT CONTACT CHANNEL</span>
              <span>{restaurantConfig.contact.email}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
