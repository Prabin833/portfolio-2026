import React from "react";
import Projects from "../components/Projects";
import HandwritingText from "../components/HandwritingText";
import SplitHeading from "../components/SplitHeading";

const Home = () => {
  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 py-16 sm:px-10 md:px-16"
      >
        <div className="mx-auto w-full max-w-5xl">
          {/* Main Heading */}
          <div className="max-w-4xl">
            {" "}
            <SplitHeading
              as="h1"
              splitBy="chars"
              duration={0.8}
              stagger={0.04}
              className="font-retro-heading text-6xl font-bold leading-[0.95] tracking-tight text-[#29251f] sm:text-7xl md:text-8xl lg:text-9xl"
            >
              {" "}
              Hi, I'm{" "}
            </SplitHeading>
            <div className="relative mt-2 inline-block max-w-full text-[#c65d4b]">
              {" "}
              <HandwritingText
                text="Prabin Kumar Nayak"
                as="h2"
                fontSize={64}
                strokeWidth={3.5}
                strokeColor="#c65d4b"
                duration={3}
                delay={0.3}
                playOnView={true}
                start="top 80%"
                showPen={true}
                className="font-retro-heading font-bold"
                style={{ maxWidth: "100%" }}
              />
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 500 18"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12 C120 2, 300 17, 496 5"
                  stroke="#c65d4b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>{" "}
          </div>


          <p className="mt-10 max-w-2xl font-retro-body text-lg leading-relaxed text-[#51483e] sm:text-xl md:text-2xl">
            Full-Stack Developer building{" "}
            <span className="font-bold text-[#29251f]">
              fast, animated React websites
            </span>{" "}
            and clean{" "}
            <span className="font-bold text-[#29251f]">Node.js APIs.</span>
          </p>

          
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-block rotate-[-1deg] border border-[#d9cdb7] bg-[#fff9e9] px-4 py-2 font-retro-handwriting text-base text-[#51483e] shadow-[2px_3px_0_rgba(41,37,31,0.06)] sm:text-lg">
               MCA Student @ Sri Sri University
            </span>

            <span className="inline-flex items-center gap-2 font-retro-handwriting text-base text-[#42643a] sm:text-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-[#719c61]"></span>
              Open to entry-level roles
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 border-2 border-[#29251f] bg-[#29251f] px-6 py-3.5 font-retro-handwriting text-lg font-bold text-[#fffaf0] shadow-[4px_4px_0_#c65d4b] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#c65d4b] sm:text-xl"
            >
              View Projects
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-3 border-2 border-dashed border-[#8a7863] bg-[#fffaf0]/70 px-6 py-3.5 font-retro-handwriting text-lg font-bold text-[#29251f] transition-all duration-200 hover:-translate-y-1 hover:bg-[#f7e69a] sm:text-xl"
            >
              <span aria-hidden="true">↓</span>
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-10 flex items-center gap-5">
            <span className="font-retro-typewriter text-[10px] text-[#8a7863] sm:text-xs">
              FIND ME ON
            </span>

            <a
              href="https://github.com/prabin833"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="font-retro-handwriting text-lg font-bold text-[#51483e] underline decoration-[#c65d4b]/50 decoration-2 underline-offset-4 transition-colors hover:text-[#c65d4b]"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/prabin-nayak-14b51b322/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="font-retro-handwriting text-lg font-bold text-[#51483e] underline decoration-[#c65d4b]/50 decoration-2 underline-offset-4 transition-colors hover:text-[#c65d4b]"
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Decorative Sticky Note */}
          <div className="pointer-events-none absolute right-[8%] top-[15%] hidden rotate-6 border border-[#d9c87b] bg-[#f7e69a] p-5 shadow-[4px_6px_0_rgba(41,37,31,0.08)] lg:block">
            <div className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rotate-[-4deg] bg-white/40"></div>

            <p className="font-retro-handwriting text-xl font-bold text-[#51483e]">
              Building cool
              <br />
              things ✦
            </p>

            <p className="mt-2 font-retro-typewriter text-[9px] text-[#8a7863]">
              ONE LINE AT A TIME
            </p>
          </div>
        </div>
      </section>
      <Projects />
    </>
  );
};

export default Home;
