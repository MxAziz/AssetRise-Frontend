"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ── Intersection-observer hook ── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Animated counter ── */
function Counter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const { ref, inView } = useInView(0.3);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Fade-up wrapper ── */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Main component ── */
export default function AboutUs() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* ── Section label ── */}
        <FadeUp>
          <div className="flex items-center gap-2.5 mb-10 sm:mb-12">
            <span className="block w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-cyan-100" />
            <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-neutral-400">
              01 — About
            </p>
          </div>
        </FadeUp>

        {/* ── Headline ── */}
        <FadeUp delay={120}>
          <h2 className="text-[1.65rem] sm:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-tight text-neutral-900 max-w-4xl">
            We&rsquo;re a real estate agency that helps people find homes that
            match{" "}
            <span className="text-neutral-400">
              their lifestyle and investments that grow their future.
            </span>
          </h2>
        </FadeUp>

        {/* ── Divider ── */}
        <FadeUp delay={200}>
          <div className="mt-12 sm:mt-16 h-px w-full bg-neutral-100" />
        </FadeUp>

        {/* ── Stats + CTA row ── */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 items-center">

          {/* Stat 1 */}
          <FadeUp delay={300}>
            <div className="flex flex-col gap-2 sm:gap-3">
              <p className="text-[3.5rem] sm:text-6xl lg:text-7xl font-bold tracking-tighter text-neutral-900 leading-none">
                <Counter target={120} />
              </p>
              <p className="text-sm sm:text-base text-neutral-500 font-medium max-w-[16ch] leading-snug">
                Years of Combined Experience
              </p>
              {/* accent line */}
              <span className="block w-8 h-0.5 bg-cyan-400 mt-1 rounded-full" />
            </div>
          </FadeUp>

          {/* CTA — centred on all screens */}
          <FadeUp delay={420} className="flex justify-center sm:justify-center">
            <Link href="/about">
            <Button
              className={[
                "px-7 py-5 sm:px-8 sm:py-6 cursor-pointer rounded-xl text-sm sm:text-base font-semibold",
                "bg-neutral-900 text-white hover:bg-neutral-700",
                "shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                "transition-all duration-200 ease-out",
              ].join(" ")}
            >
              More About Us
            </Button>
            </Link>
          </FadeUp>

          {/* Stat 2 */}
          <FadeUp delay={300} className="sm:text-right">
            <div className="flex flex-col gap-2 sm:gap-3 sm:items-end">
              <p className="text-[3.5rem] sm:text-6xl lg:text-7xl font-bold tracking-tighter text-neutral-900 leading-none">
                <Counter target={350} />
              </p>
              <p className="text-sm sm:text-base text-neutral-500 font-medium max-w-[16ch] leading-snug sm:text-right">
                Properties Sold
              </p>
              <span className="block w-8 h-0.5 bg-cyan-400 mt-1 rounded-full" />
            </div>
          </FadeUp>

        </div>

      </div>
    </section>
  );
}