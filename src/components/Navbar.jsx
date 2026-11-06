import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
 
const navLinks = [
  {
    name: "Home",
    href: "#home",
    color: "bg-[#f6cbd0]",
    rotation: "-rotate-3",
  },
  {
    name: "Projects",
    href: "#projects",
    color: "bg-[#f7e69a]",
    rotation: "rotate-2",
  },
  {
    name: "About Me",
    href: "#about",
    color: "bg-[#c8e1ed]",
    rotation: "-rotate-2",
  },
  {
    name: "Contact",
    href: "#contact",
    color: "bg-[#d3e5b8]",
    rotation: "rotate-3",
  },
];
 
// Where the circular "ink spill" opens from: the centre of the hamburger button
// (button is 44px wide, 16px from the top-right corner => 38px from each edge).
const ORIGIN = "calc(100% - 38px) 38px";
 
/**
 * Full-screen hamburger navigation.
 *
 * Optional prop `lenis`: your Lenis instance (or a ref holding it). If you don't pass
 * it, the component looks for `window.lenis`, and otherwise falls back to native
 * smooth scrolling, so it never breaks if Lenis isn't reachable.
 */
const Navbar = ({ lenis: lenisProp }) => {
  const [menuOpen, setMenuOpen] = useState(false);
 
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const tlRef = useRef(null);
  const pendingHrefRef = useRef(null); // section to scroll to once the menu has closed
  const wasOpenRef = useRef(false); // lets the effect ignore mount + StrictMode re-runs
 
  const getLenis = useCallback(
    () => lenisProp?.current ?? lenisProp ?? (typeof window !== "undefined" ? window.lenis : undefined),
    [lenisProp],
  );
 
  /* ---------------------------------------------------------------- *
   * 1. Build the open/close timeline once (reduced-motion aware)
   * ---------------------------------------------------------------- */
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return undefined;
 
    overlay.inert = true;
    const mm = gsap.matchMedia();
 
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduce } = context.conditions;
        const items = overlay.querySelectorAll("[data-nav-item]");
 
        gsap.set(overlay, {
          visibility: "hidden",
          clipPath: reduce ? "none" : `circle(0% at ${ORIGIN})`,
        });
 
        const tl = gsap.timeline({
          paused: true,
          onReverseComplete: () => gsap.set(overlay, { visibility: "hidden" }),
        });
 
        tl.set(overlay, { visibility: "visible" });
 
        if (reduce) {
          // no movement at all: a very quick fade only
          tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "none" });
        } else {
          tl.to(overlay, {
            clipPath: `circle(150% at ${ORIGIN})`,
            duration: 0.9,
            ease: "power3.inOut",
          }).fromTo(
            items,
            { y: 70, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              stagger: 0.11,
              ease: "back.out(1.5)",
            },
            "-=0.5",
          );
        }
 
        tlRef.current = tl;
 
        return () => {
          tl.kill();
          tlRef.current = null;
          // clear only what we animated (never "all", it would wipe the ruled-paper style)
          gsap.set(overlay, { clearProps: "visibility,clipPath,opacity" });
          gsap.set(items, { clearProps: "transform,opacity,scale" });
        };
      },
    );
 
    return () => mm.revert();
  }, []);
  useEffect(() => {
    if (wasOpenRef.current === menuOpen) return undefined;
    wasOpenRef.current = menuOpen;
 
    const tl = tlRef.current;
    const overlay = overlayRef.current;
    const root = document.documentElement;
    const lenis = getLenis();
 
    if (menuOpen) {
      // lock background scroll (without the page jumping sideways)
      const scrollbar = window.innerWidth - root.clientWidth;
      root.style.overflow = "hidden";
      if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
      lenis?.stop?.();
 
      overlay.inert = false;
      gsap.set(overlay, { visibility: "visible" }); // must be focusable right away
      tl?.timeScale(1).play();
      requestAnimationFrame(() => overlay.querySelector("a")?.focus({ preventScroll: true }));
    } else {
      root.style.overflow = "";
      root.style.paddingRight = "";
      lenis?.start?.();
 
      overlay.inert = true;
      tl?.timeScale(1.5).reverse();
 
      const href = pendingHrefRef.current;
      pendingHrefRef.current = null;
 
      if (href) {
        const target = document.querySelector(href);
        if (target) {
          if (lenis?.scrollTo) lenis.scrollTo(target, { duration: 1.4 });
          else target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", href);
        }
      } else {
        buttonRef.current?.focus({ preventScroll: true });
      }
    }
 
    return undefined;
  }, [menuOpen, getLenis]);
 
  // safety net: never leave the page locked if the component unmounts while open
  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.paddingRight = "";
      getLenis()?.start?.();
    },
    [getLenis],
  );
  useEffect(() => {
    if (!menuOpen) return undefined;
 
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
 
      const focusables = [buttonRef.current, ...overlayRef.current.querySelectorAll("a")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
 
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
 
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
 
  const handleLinkClick = (event, href) => {
    event.preventDefault();
    pendingHrefRef.current = href;
    setMenuOpen(false);
  };
 
  return (
    <header className="relative z-50">
      {/* ---------- Hamburger (always visible, top-right) ---------- */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        className={`fixed right-4 top-4 z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-black/10 shadow-[2px_3px_0_rgba(41,37,31,0.12)] transition-[translate,background-color] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c65d4b] sm:right-6 sm:top-6 ${
          menuOpen ? "bg-[#f6cbd0]" : "bg-[#f7e69a]"
        }`}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-8 -translate-x-1/2 -rotate-[4deg] border-x border-black/5 bg-white/50" />
        <span
          className={`h-0.5 w-5 bg-[#29251f] transition-transform duration-300 ${
            menuOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-[#29251f] transition-opacity duration-200 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-5 bg-[#29251f] transition-transform duration-300 ${
            menuOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>
 
      {/* ---------- Full-screen overlay ---------- */}
      <div
        ref={overlayRef}
        id="site-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        data-lenis-prevent
        className="invisible fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#f8f3e7]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 35px, rgba(104,155,190,0.35) 35px, rgba(104,155,190,0.35) 36px)",
        }}
      >
        {/* red notebook margin, same positions as the page */}
        <div className="pointer-events-none absolute inset-y-0 left-[14px] w-px bg-[rgba(211,91,80,0.55)] min-[481px]:left-[35px] min-[481px]:w-0.5 md:left-[55px] lg:left-[80px]" />
 
        <div className="flex min-h-full flex-col items-center justify-center px-6 py-24">
 
          <nav aria-label="Primary" className="flex flex-col items-center gap-6 sm:gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                data-nav-item
                href={link.href}
                onClick={(event) => handleLinkClick(event, link.href)}
                className={`relative flex min-h-16 w-[min(78vw,22rem)] items-center justify-center gap-4 border border-black/5 px-6 py-4 font-retro-handwriting text-3xl font-bold text-[#29251f] shadow-[3px_5px_0_rgba(41,37,31,0.1)] transition-[translate,rotate,box-shadow] duration-300 hover:z-10 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[4px_10px_14px_rgba(41,37,31,0.16)] focus-visible:z-10 focus-visible:-translate-y-1.5 focus-visible:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c65d4b] sm:min-h-20 sm:text-4xl md:text-5xl ${link.color} ${link.rotation}`}
              >
                {/* tape */}
                <span className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-[3deg] border-x border-black/5 bg-white/45" />
                <span className="font-retro-typewriter text-xs font-normal tracking-widest text-[#29251f]/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
 
export default Navbar;