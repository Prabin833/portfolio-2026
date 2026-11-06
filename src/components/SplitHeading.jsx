import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);
export default function SplitHeading({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  splitBy = "words",
}) {
  const headingRef = useRef(null);
  useLayoutEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    let split;
    let animation;
    let scrollTrigger;
    const ctx = gsap.context(() => {
      split = SplitText.create(heading, {
        type: splitBy,
        wordsClass: "split-word",
        charsClass: "split-char",
      });
      const targets = splitBy === "chars" ? split.chars : split.words;
      animation = gsap.from(targets, {
        y: 40,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        paused: true,
      });
      scrollTrigger = ScrollTrigger.create({
        trigger: heading,
        start: "top 85%",
        onEnter: () => animation.restart(),
        onEnterBack: () => animation.restart(),
      });
    }, heading);
    return () => {
      scrollTrigger?.kill();
      animation?.kill();
      split?.revert();
      ctx.revert();
    };
  }, [children, delay, duration, stagger, splitBy]);
  return (
    <h2 ref={headingRef} className={className}>
      {" "}
      {children}{" "}
    </h2>
  );
}
