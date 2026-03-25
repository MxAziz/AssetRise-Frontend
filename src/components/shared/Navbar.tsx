"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a frosted-glass backdrop when page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-[0_1px_24px_0_rgba(0,0,0,0.07)] border-b border-neutral-200/60"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="AssetRise home"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden ring-1 ring-black/10 group-hover:ring-black/30 transition-all duration-200 shadow-sm">
                <Image
                  src="/images/logo/logo.png"
                  alt="AssetRise logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                  priority
                />
              </div>
              <span className="text-[1.35rem] sm:text-[1.5rem] font-bold tracking-tight text-neutral-900 leading-none">
                Asset<span className="text-neutral-500 font-normal">Rise</span>
              </span>
            </Link>

            {/* ── Desktop links (md+) ── */}
            <ul className="hidden md:flex items-center gap-1 lg:gap-1.5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "relative px-3 lg:px-4 py-2 text-sm font-medium rounded-lg",
                      "text-neutral-600 hover:text-neutral-900",
                      "hover:bg-neutral-100/80 transition-all duration-150",
                      "after:absolute after:bottom-1.5 after:left-3 after:right-3 after:h-px",
                      "after:bg-neutral-900 after:scale-x-0 after:origin-left",
                      "hover:after:scale-x-100 after:transition-transform after:duration-200",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:block shrink-0">
              <Link href="/book-viewing">
                <Button
                  className={[
                    "px-6 py-5 text-sm font-semibold rounded-xl cursor-pointer",
                    "bg-neutral-900 text-white hover:bg-neutral-700",
                    "shadow-md hover:shadow-lg hover:-translate-y-0.5",
                    "transition-all duration-200 ease-out",
                  ].join(" ")}
                >
                  Book a Viewing
                </Button>
              </Link>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={[
                "md:hidden flex items-center justify-center",
                "w-10 h-10 rounded-xl border border-neutral-200",
                "bg-white/70 backdrop-blur-sm text-neutral-700",
                "hover:bg-neutral-100 hover:border-neutral-300",
                "transition-all duration-150 shadow-sm",
              ].join(" ")}
            >
              {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer overlay ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={[
          "fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden",
          "transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* ── Mobile drawer panel ── */}
      <aside
        className={[
          "fixed top-0 right-0 bottom-0 z-50 w-[78vw] max-w-xs",
          "bg-white shadow-2xl flex flex-col md:hidden",
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          menuOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-neutral-100">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-1 ring-black/10">
              <Image
                src="/images/logo/logo.png"
                alt="AssetRise logo"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-neutral-900">
              Asset<span className="text-neutral-500 font-normal">Rise</span>
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ href, label }, i) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "flex items-center px-4 py-3 rounded-xl",
                    "text-[0.95rem] font-medium text-neutral-700",
                    "hover:bg-neutral-50 hover:text-neutral-900",
                    "transition-all duration-150",
                    // staggered entrance animation via inline style below
                    menuOpen ? "animate-slideIn" : "",
                  ].join(" ")}
                  style={{
                    animationDelay: `${i * 45 + 80}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pb-8 pt-3 border-t border-neutral-100">
          <Link href="/book-viewing" onClick={() => setMenuOpen(false)}>
            <Button
              className={[
                "w-full py-3 text-sm font-semibold rounded-xl cursor-pointer",
                "bg-neutral-900 text-white hover:bg-neutral-800",
                "shadow-lg transition-all duration-200",
              ].join(" ")}
            >
              Book a Viewing
            </Button>
          </Link>
          <p className="text-center text-xs text-neutral-400 mt-3">
            Premium real estate investments
          </p>
        </div>
      </aside>

      {/* Spacer so page content isn't hidden behind fixed navbar */}
      <div className="h-16 sm:h-18 lg:h-20" aria-hidden="true" />

      {/* Keyframe for slide-in animation on drawer links */}
      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        .animate-slideIn {
          animation: slideIn 0.28s ease-out;
        }
      `}</style>
    </>
  );
}