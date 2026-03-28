"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, ChevronDown } from "lucide-react";
import Image from "next/image";

// Utility to join class names
function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ─────────────────────────────────────────────
   Tiny hook: triggers once when element enters viewport
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────────
   Word-by-word animated heading
───────────────────────────────────────────── */
function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const { ref, inView } = useInView(0.1);
  const words = text.split(" ");
  return (
    <h1 ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <span
            className={cn(
              "inline-block transition-all duration-700 ease-out",
              inView
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            )}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}

/* ─────────────────────────────────────────────
   Fade-up wrapper
───────────────────────────────────────────── */
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN HERO SECTION
───────────────────────────────────────────── */
export default function HeroSection() {
  const [, setMounted] = useState(false);
  useEffect(() => {
    // Small delay to ensure CSS transitions fire after hydration
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={cn(
        // Responsive width: full on mobile, max-capped on larger screens
        "relative w-full max-w-470 mx-auto",
        // Responsive height: aspect-ratio based so image never crops oddly
        // mobile: taller aspect (portrait-ish), tablet+: widescreen
        "aspect-3/4 sm:aspect-4/3 md:h-full lg:aspect-16/10",
        "rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden font-sans"
      )}
    >

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/banner.png"
          alt="Modern luxury house on rocky coast"
          fill
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-24 sm:pb-28 md:pb-32">

        {/* Heading — word-by-word reveal */}
        <AnimatedHeading
          text="Elevate your portfolio with real estate"
          className={cn(
            "text-black/75 font-semibold leading-[1.1] tracking-tight",
            // Responsive font sizes: mobile → tablet → laptop → desktop
            "text-[1.6rem] xs:text-[1.9rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
            "max-w-[14ch] sm:max-w-[18ch]"
          )}
        />

        {/* Sub-copy */}
        <FadeUp delay={500} className="mt-3 sm:mt-4 md:mt-5">
          <p className="text-black text-xs sm:text-sm md:text-base font-light max-w-65 sm:max-w-xs md:max-w-md leading-relaxed">
            Invest in cutting-edge, premium real estate developments
            that combine modern design with lasting value.
          </p>
        </FadeUp>

        {/* CTA button */}
        <FadeUp delay={700}>
          <button
            className={cn(
              "mt-6 sm:mt-7 md:mt-9 bg-[#1a1a1a] text-white font-medium",
              "text-xs sm:text-sm",
              "px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl",
              "hover:bg-black hover:scale-105 active:scale-95",
              "transition-all duration-200 ease-out shadow-lg shadow-black/20",
              "focus:outline-none focus:ring-2 focus:ring-white/40"
            )}
          >
            Schedule a Call
          </button>
        </FadeUp>
      </div>

      {/* ── Bottom-left stats card ── */}
      <FadeUp
        delay={900}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-3 sm:left-5 md:left-8 z-20"
      >
        <div
          className={cn(
            "rounded-xl sm:rounded-2xl px-3 py-3 sm:px-4 sm:py-3.5 md:px-5 md:py-4 backdrop-blur-md",
            "bg-white/20 border border-white/30 shadow-xl",
            "w-28 sm:w-32 md:w-36 lg:w-40"
          )}
        >
          <p className="text-white text-2xl sm:text-3xl md:text-4xl font-bold leading-none">
            70+
          </p>
          <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-light mt-1 leading-snug">
            Experts working on
            <br />your success
          </p>
          {/* Avatar stack */}
          <div className="flex mt-2 sm:mt-3 -space-x-2">
            {["👩‍💼", "👨‍💼", "👩‍💻"].map((emoji, i) => (
              <div
                key={i}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/30 border border-white/50 flex items-center justify-center text-[10px] sm:text-xs backdrop-blur-sm"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* ── Bottom-center scroll indicator ── */}
      <FadeUp
        delay={1100}
        className="absolute bottom-5 sm:bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-white/60 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ChevronDown
          className="text-white/50 animate-bounce w-3 h-3 sm:w-4 sm:h-4"
          strokeWidth={1.5}
        />
      </FadeUp>

      {/* ── Bottom-right "Find Your Harmony" pill ── */}
      <FadeUp
        delay={1000}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-3 sm:right-5 md:right-8 z-20"
      >
        <button
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 rounded-full px-3 py-2 sm:px-4 sm:py-2.5",
            "backdrop-blur-md bg-white/20 border border-white/30",
            "text-white text-[10px] sm:text-xs md:text-sm font-medium shadow-lg",
            "hover:bg-white/30 transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-white/40"
          )}
        >
          <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white/80 stroke-none" />
          Find Your Harmony
        </button>
      </FadeUp>
    </section>
  );
}