import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SplitHeading from "../components/SplitHeading";

import {
  faArrowUpRightFromSquare,
  faCode,
  faServer,
  faDatabase,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

const skillGroups = [
  {
    title: "Frontend",
    number: "01",
    icon: faCode,
    accent: "#c65d4b",
    skills: ["React", "Tailwind CSS", "GSAP", "Lenis", "Vite"],
  },
  {
    title: "Backend",
    number: "02",
    icon: faServer,
    accent: "#71916a",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT"],
  },
  {
    title: "Database",
    number: "03",
    icon: faDatabase,
    accent: "#557f85",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    title: "Tools",
    number: "04",
    icon: faToolbox,
    accent: "#b18b55",
    skills: ["Git", "GitHub", "Cloudinary"],
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 pl-8 pr-4 sm:py-20 sm:pl-12 sm:pr-6 md:py-24 md:pl-16 md:pr-10 lg:pl-20 lg:pr-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#c65d4b] sm:w-10" />

            <p className="font-retro-typewriter text-[10px] tracking-[0.15em] text-[#8a5144] sm:text-xs sm:tracking-[0.2em]">
              A LITTLE ABOUT ME
            </p>
          </div>

          <SplitHeading
            as="h2"
            splitBy="words"
            duration={0.8}
            stagger={0.1}
            className="max-w-4xl break-words font-retro-heading text-4xl font-bold leading-tight text-[#29251f] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {" "}
            Building things for the web, <br className="hidden sm:block" />{" "}
            <span className="text-[#c65d4b]"> one idea at a time.</span>{" "}
          </SplitHeading>
        </div>

        {/* About + Skills */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* About Me */}
          <div className="min-w-0">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#71916a]" />

              <p className="font-retro-typewriter text-xs tracking-wider text-[#8a7863]">
                THE PERSON BEHIND THE CODE
              </p>
            </div>

            <p className="font-retro-body text-base leading-8 text-[#51483e] sm:text-lg sm:leading-9">
              {" "}
              I'm an MCA student who enjoys building complete products, from
              interactive interfaces to the APIs and databases behind them. I
              care about the details—from smooth scrolling and thoughtful user
              experiences to clean backend architecture. I'm always exploring
              new technologies and improving through hands-on projects. I'm
              looking for an entry-level full-stack developer role where I can
              keep learning, contribute to a team, and build products that solve
              real problems.{" "}
            </p>

            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-3 border-2 border-[#29251f] bg-[#29251f] px-5 py-3 font-retro-handwriting text-base font-bold text-[#fffaf0] shadow-[4px_4px_0_#c65d4b] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#c65d4b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c65d4b]"
            >
              Download Resume
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                aria-hidden="true"
              />
            </a>

            <p className="mt-5 font-retro-handwriting text-base text-[#8a7863]">
              Always learning. Always building.
            </p>
          </div>

          {/* Skills */}
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <article
                key={group.number}
                className="relative min-w-0 border border-[#d8cdb8] bg-[#fffaf0]/80 p-5 shadow-[3px_4px_0_rgba(41,37,31,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[6px_7px_0_rgba(41,37,31,0.1)] sm:p-6"
              >
                {/* Card Header */}
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-dashed border-[#d8cdb8] pb-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center"
                      style={{
                        backgroundColor: `${group.accent}18`,
                        color: group.accent,
                      }}
                    >
                      <FontAwesomeIcon icon={group.icon} aria-hidden="true" />
                    </span>

                    <h3 className="break-words font-retro-heading text-2xl font-bold text-[#29251f]">
                      {group.title}
                    </h3>
                  </div>

                  <span className="shrink-0 font-retro-typewriter text-[10px] text-[#a3947d]">
                    {group.number}
                  </span>
                </div>

                {/* Skills List */}
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-[#d8cdb8] bg-[#f7f0e3] px-2.5 py-1.5 font-retro-handwriting text-sm font-bold text-[#51483e] sm:text-base"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Accent Line */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-12"
                  style={{ backgroundColor: group.accent }}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
