import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, X, Flame, Sparkles, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { menuItems, menuCategories } from "../data/menu";
import SafeImage from "../components/SafeImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Menu() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const modalOverlayRef = useRef(null);
  const modalCardRef = useRef(null);

  // Filter items based on active category
  const filteredItems =
    selectedCategory === "ALL"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // Initial scroll-in animations using useGSAP
  useGSAP(
    () => {
      // Header text reveals
      gsap.from(".menu-header-anim", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Filter tabs reveal
      gsap.from(".filter-tab-btn", {
        y: 25,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Staggered reveal for product cards on initial scroll
      gsap.from(".product-menu-card", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });

      // Subtle parallax on card images
      const cards = gsap.utils.toArray(".product-menu-card");
      cards.forEach((card) => {
        const img = card.querySelector(".product-card-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  // Smooth animate card changes when switching filter category
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".product-menu-card");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        }
      );
    }
    // Refresh ScrollTrigger so positions stay accurate
    ScrollTrigger.refresh();
  }, [selectedCategory]);

  // Modal open/close animation & Background Scroll Lock
  useEffect(() => {
    if (activeModalItem) {
      // Stop Lenis smooth scroll and lock body/html scroll
      if (window.__lenis) {
        window.__lenis.stop();
      }
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      if (modalOverlayRef.current && modalCardRef.current) {
        const tl = gsap.timeline();
        tl.fromTo(
          modalOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        ).fromTo(
          modalCardRef.current,
          { y: 50, scale: 0.95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.4)" },
          "-=0.15"
        );
      }
    } else {
      // Restore Lenis smooth scroll and unlock body/html scroll
      if (window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      if (window.__lenis) {
        window.__lenis.start();
      }
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [activeModalItem]);

  const closeModal = () => {
    if (modalOverlayRef.current && modalCardRef.current) {
      gsap.to(modalCardRef.current, {
        y: 30,
        scale: 0.96,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(modalOverlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setActiveModalItem(null),
      });
    } else {
      setActiveModalItem(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative w-full bg-[#10100e] text-[#f4f0e9] py-28 px-[5.2vw] border-t border-[rgba(244,240,233,0.12)] overflow-hidden"
    >
      {/* Background Ambient Lighting Glow */}
      <div
        className="pointer-events-none absolute top-1/4 -right-[20%] w-[650px] h-[650px] rounded-full opacity-20 blur-[150px]"
        style={{
          background: "radial-gradient(circle, #f45b25 0%, rgba(16,16,14,0) 70%)",
        }}
      />

      {/* Section Kicker Bar */}
      <div className="menu-header-anim flex justify-between items-center border-b border-[rgba(244,240,233,0.15)] pb-4 mb-14 text-[9px] tracking-[0.2em] font-mono text-[#a5a198]">
        <span className="flex items-center gap-2">
          <Flame size={14} className="text-[#f45b25]" />
          03 // THE CRAFTED LINEUP
        </span>
        <span className="hidden sm:inline">100% FRESH CHICKEN & ARTISAN VEG · HOUSE BAKED DAILY</span>
      </div>

      {/* Section Heading & Copy */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="menu-header-anim text-[10px] tracking-[0.2em] uppercase font-mono text-[#f45b25] flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#f45b25] inline-block" />
            CRAFTED WITH OBSESSION
          </p>
          <h2 className="menu-header-anim text-[11vw] sm:text-[7vw] md:text-[5.5rem] leading-[0.82] font-['Space_Grotesk'] font-bold tracking-[-0.08em] uppercase">
            THE <em className="not-italic text-[#f45b25]">MENU.</em>
            <br />
            <span className="text-[7vw] sm:text-[4.5vw] md:text-[3.8rem] text-[#ded9cf] font-light">
              MADE FOR THE HUNGRY.
            </span>
          </h2>
        </div>
        <p className="menu-header-anim text-[#a5a198] text-[13px] md:text-[14px] leading-relaxed max-w-[380px]">
          Every burger starts with tender buttermilk-marinated chicken or hand-prepped artisan farm vegetables, seared fiercely on cast iron and served on toasted brioche.
        </p>
      </div>

      {/* Category Filter Navigation */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-12 sm:mb-14 border-b border-[rgba(244,240,233,0.1)] pb-6">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#a5a198] mr-1 sm:mr-2 flex items-center leading-none">
          FILTER:
        </span>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {menuCategories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-tab-btn inline-flex items-center justify-center h-9 sm:h-10 px-5 sm:px-6 text-[10.5px] sm:text-[11px] font-mono tracking-[0.16em] uppercase rounded-full cursor-pointer transition-all duration-300 select-none leading-none box-border ${
                  isActive
                    ? "bg-[#f45b25] text-[#10100e] font-bold shadow-[0_0_20px_rgba(244,91,37,0.45)] border border-[#f45b25]"
                    : "bg-[#181814] text-[#d4cfc5] hover:text-[#f4f0e9] border border-[rgba(244,240,233,0.16)] hover:border-[#f45b25]/70 hover:bg-[#22211c]"
                }`}
              >
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Cards Grid: 1 col on mobile, 2 col on tablet, 3-4 on desktop */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7"
      >
        {filteredItems.map((item, index) => (
          <article
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="product-menu-card group relative bg-[#151512] border border-[rgba(244,240,233,0.1)] rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-500 hover:border-[#f45b25]/70 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            {/* Top Image Showcase with Parallax Container */}
            <div className="relative w-full h-[260px] sm:h-[280px] overflow-hidden bg-[#1f1d19]">
              <SafeImage
                src={item.image}
                alt={item.name}
                loading="lazy"
                width={1000}
                height={750}
                className="product-card-img w-full h-[115%] object-cover object-center filter brightness-105 contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-108"
              />
              {/* Subtle Bottom Card Transition Vignette (Clear & Bright Image) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#151512] to-transparent" />

              {/* Tag & Category Badge */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center pointer-events-none">
                <span className="font-mono text-[9px] tracking-wider text-[#a5a198] bg-[#10100e]/85 backdrop-blur-md px-2.5 py-1 border border-white/10 rounded-sm">
                  0{index + 1}
                </span>
                <span className="bg-[#f45b25] text-[#17130f] font-bold text-[8px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-sm shadow-sm">
                  {item.tag}
                </span>
              </div>

              {/* Hover Quick View Pill */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="bg-[#17130f]/90 backdrop-blur-md text-[#f4f0e9] border border-[#f45b25] text-[9px] font-mono tracking-widest px-4 py-2 uppercase rounded-full shadow-lg flex items-center gap-2">
                  <Sparkles size={11} className="text-[#f45b25]" />
                  EXPLORE ANATOMY
                </span>
              </div>
            </div>

            {/* Card Content & Details */}
            <div className="p-6 flex flex-col flex-grow justify-between border-t border-[rgba(244,240,233,0.08)]">
              <div>
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="text-[20px] sm:text-[22px] font-['Space_Grotesk'] font-bold text-[#f4f0e9] tracking-tight group-hover:text-[#f45b25] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="text-[20px] sm:text-[22px] font-['Space_Grotesk'] font-bold text-[#f4f0e9] whitespace-nowrap">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-[9px] font-mono tracking-[0.16em] uppercase text-[#f45b25] mb-3">
                  {item.subtitle}
                </p>

                <p className="text-[12px] text-[#a5a198] line-clamp-2 leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              {/* Bottom Interactive Arrow Bar */}
              <div className="pt-4 border-t border-[rgba(244,240,233,0.08)] flex justify-between items-center text-[10px] font-mono tracking-wider text-[#a5a198] group-hover:text-[#f4f0e9]">
                <span className="uppercase text-[9px] text-[#736f66] group-hover:text-[#f45b25] transition-colors">
                  {item.category} · {item.spiciness}
                </span>
                <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#f45b25] group-hover:border-[#f45b25] group-hover:text-[#17130f] transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* PRODUCT DETAIL MODAL OVERLAY */}
      {activeModalItem && (
        <div
          ref={modalOverlayRef}
          onClick={closeModal}
          data-lenis-prevent
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
        >
          <div
            ref={modalCardRef}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative w-full max-w-[780px] my-auto max-h-[92vh] bg-[#151512] border border-[rgba(244,240,233,0.2)] rounded-sm overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col md:flex-row overscroll-contain"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-[#181815]/90 hover:bg-[#f45b25] border border-[rgba(244,240,233,0.25)] hover:border-[#f45b25] text-[#ded9cf] hover:text-[#17130f] flex items-center justify-center cursor-pointer transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              <X size={16} />
            </button>

            {/* Left Big Image */}
            <div className="relative w-full md:w-1/2 h-[200px] sm:h-[240px] md:h-auto overflow-hidden bg-black flex-shrink-0">
              <SafeImage
                src={activeModalItem.image}
                alt={activeModalItem.name}
                loading="eager"
                width={1000}
                height={750}
                className="w-full h-full object-cover object-center filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151512]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#151512]/60" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                <span className="bg-[#f45b25] text-[#17130f] font-bold text-[8.5px] sm:text-[9px] tracking-widest uppercase px-2.5 sm:px-3 py-1 rounded-sm">
                  {activeModalItem.tag}
                </span>
              </div>
            </div>

            {/* Right Information & Recipe Breakdown */}
            <div className="w-full md:w-1/2 p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex justify-between items-start gap-3 mb-2 pr-8">
                  <h3 className="text-[20px] sm:text-[24px] md:text-[26px] font-['Space_Grotesk'] font-bold text-[#f4f0e9] tracking-tight leading-tight">
                    {activeModalItem.name}
                  </h3>
                  <span className="text-[20px] sm:text-[24px] md:text-[26px] font-['Space_Grotesk'] font-bold text-[#f45b25] whitespace-nowrap">
                    ₹{activeModalItem.price}
                  </span>
                </div>

                <p className="text-[8.5px] sm:text-[9px] font-mono tracking-widest uppercase text-[#a5a198] mb-3 sm:mb-4">
                  {activeModalItem.subtitle}
                </p>

                <p className="text-[12px] sm:text-[13px] text-[#ded9cf] leading-relaxed mb-5 sm:mb-6">
                  {activeModalItem.description}
                </p>

                {/* Ingredients Pill List */}
                <div className="mb-5 sm:mb-6">
                  <h4 className="text-[8.5px] sm:text-[9px] font-mono tracking-widest uppercase text-[#736f66] mb-2 sm:mb-3">
                    INGREDIENTS BREAKDOWN
                  </h4>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {activeModalItem.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="text-[11.5px] sm:text-[12px] text-[#a5a198] flex items-center gap-2"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#f45b25]/20 flex items-center justify-center text-[#f45b25] flex-shrink-0">
                          <Check size={10} />
                        </span>
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Quick Spec Bar */}
              <div className="pt-3.5 border-t border-[rgba(244,240,233,0.12)] flex flex-wrap gap-2 justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#a5a198]">
                <span>HEAT: <strong className="text-[#f4f0e9]">{activeModalItem.spiciness}</strong></span>
                <span>ENERGY: <strong className="text-[#f4f0e9]">{activeModalItem.calories}</strong></span>
                <span>CAT: <strong className="text-[#f45b25]">{activeModalItem.category}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
