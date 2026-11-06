import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FONT } from "../lib/handwritingFont";

// Safe to call more than once (also if you register it somewhere else).
gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ *
 * Layout: turn text into positioned single-stroke glyphs
 * ------------------------------------------------------------------ */

const PAD = 3; // breathing room (font units) so round caps are never clipped
const LINE_GAP = 6; // extra space between lines (font units)
const LINE_H = FONT.maxY - FONT.minY + LINE_GAP;

function layout(text) {
  const lines = String(text).split("\n");
  const glyphs = []; // { d: [pathStrings], x, y }
  let width = 0;
  let missing = 0;

  lines.forEach((line, row) => {
    let x = 0;
    for (const ch of line) {
      if (ch === " ") {
        x += FONT.space;
        continue;
      }
      const g = FONT.glyphs[ch];
      if (!g) {
        missing += 1; // unsupported character: leave a gap rather than breaking
        x += FONT.space;
        continue;
      }
      glyphs.push({ d: g.s, x, y: row * LINE_H });
      x += g.w;
    }
    width = Math.max(width, x);
  });

  return {
    glyphs,
    missing,
    viewBox: {
      x: -8 - PAD, // glyph strokes start slightly left of the origin
      y: FONT.minY - PAD,
      w: width + 8 + PAD * 2,
      h: lines.length * LINE_H - LINE_GAP + PAD * 2,
    },
  };
}

// Deterministic pseudo-random (so rerenders never change the "hand")
function rand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export default function HandwritingText({
  text,
  as: Tag = "span",
  duration = 2.4, // seconds for the whole text (pen lifts included)
  delay = 0, // seconds before writing starts
  strokeColor = "#29251f",
  strokeWidth = 2.5, // pen thickness in px at the given fontSize
  fontSize = 64, // px height of one line of text
  playOnView = true, // start when scrolled into view (otherwise on mount)
  start = "top 85%", // ScrollTrigger start (only if playOnView)
  repeat = 0, // extra plays after the first; -1 = loop forever
  repeatDelay = 1.2, // pause between loops
  showPen = true, // small pen-tip dot that follows the stroke
  className = "",
  style,
}) {
  const rootRef = useRef(null);
  const svgRef = useRef(null);
  const penRef = useRef(null);

  const { glyphs, viewBox } = useMemo(() => layout(text), [text]);
  const scale = fontSize / (FONT.maxY - FONT.minY); // px per font unit
  const sw = strokeWidth / scale; // stroke width in font units
  const pxWidth = Math.round(viewBox.w * scale);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const pen = penRef.current;
    if (!svg || !glyphs.length) return undefined;

    const mm = gsap.matchMedia();

    // Reduced motion: nothing to do — strokes are fully drawn by default.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const paths = Array.from(svg.querySelectorAll("path[data-s]"));
      const info = paths.map((el) => ({
        el,
        len: el.getTotalLength(),
        dx: Number(el.dataset.dx),
        dy: Number(el.dataset.dy),
      }));
      const total = info.reduce((n, i) => n + i.len, 0) || 1;

      // pen lifts between strokes cost a little time, ~12% of the budget
      const lift = (duration * 0.12) / Math.max(info.length - 1, 1);
      const drawBudget = duration - lift * (info.length - 1);
      const speed = total / Math.max(drawBudget, 0.2); // font units / second

      // hide everything before the first frame is painted
      info.forEach(({ el, len }) => {
        // visibility:hidden also stops round line-caps leaving a dot at each stroke start
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, visibility: "hidden" });
      });
      if (pen) gsap.set(pen, { opacity: 0 });

      const tl = gsap.timeline({
        paused: true,
        repeat,
        repeatDelay,
        defaults: { ease: "none" },
      });

      if (pen) tl.set(pen, { opacity: 1 }, 0);

      info.forEach(({ el, len, dx, dy }, i) => {
        // ±14% speed variation per stroke: slightly human, never jittery
        const wobble = 0.86 + rand(i + glyphs.length) * 0.28;
        const dur = (len / speed) * wobble;
        const state = { p: 0 };
        tl.set(el, { visibility: "visible" }, ">" + (i === 0 ? 0 : lift)).to(
          el,
          { strokeDashoffset: 0, duration: dur, ease: "sine.inOut" },
          "<",
        ).to(
          state,
          {
            p: 1,
            duration: dur,
            ease: "sine.inOut",
            onUpdate: () => {
              if (!pen) return;
              const pt = el.getPointAtLength(len * state.p);
              pen.setAttribute("cx", pt.x + dx);
              pen.setAttribute("cy", pt.y + dy);
            },
          },
          "<",
        );
      });

      if (pen) tl.to(pen, { opacity: 0, duration: 0.35 }, ">");

      let st;
      let wait;
      const play = () => {
        wait = gsap.delayedCall(delay, () => tl.play());
      };
      if (playOnView) {
        st = ScrollTrigger.create({
          trigger: rootRef.current,
          start,
          once: true,
          onEnter: play,
        });
      } else {
        play();
      }

      // cleanup (matchMedia reverts tweens; we kill the rest explicitly)
      return () => {
        st?.kill();
        wait?.kill();
        tl.kill();
        info.forEach(({ el }) => gsap.set(el, { clearProps: "strokeDasharray,strokeDashoffset,visibility" }));
        if (pen) gsap.set(pen, { clearProps: "opacity" });
      };
    });

    return () => mm.revert();
  }, [glyphs, duration, delay, repeat, repeatDelay, playOnView, start, showPen]);

  // Fallback: nothing drawable -> plain, still-accessible text
  if (!glyphs.length) {
    return (
      <Tag className={className} style={{ fontSize, color: strokeColor, ...style }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={rootRef} className={className} style={{ display: "block", ...style }}>
      {/* real text for screen readers, search engines and copy/paste */}
      <span style={srOnly}>{text}</span>

      <svg
        ref={svgRef}
        aria-hidden="true"
        focusable="false"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        // reserves the exact space up-front (no layout jump); shrinks on small screens
        style={{
  display: "block",
  width: `${pxWidth}px`,
  maxWidth: "100%",
  height: "auto",
  overflow: "visible",
}}
        fill="none"
        stroke={strokeColor}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs.map((g, gi) =>
          g.d.map((d, si) => (
            <path key={`${gi}-${si}`} d={d} data-s="" data-dx={g.x} data-dy={g.y} transform={`translate(${g.x} ${g.y})`} />
          )),
        )}
        {showPen && <circle ref={penRef} r={sw * 0.9} cx="0" cy="0" fill={strokeColor} stroke="none" opacity="0" />}
      </svg>
    </Tag>
  );
}