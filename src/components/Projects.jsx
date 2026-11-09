import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import HandwritingText from "../components/HandwritingText";
import SplitHeading from "../components/SplitHeading"

const projects = [
  {
    id: 1,
    number: "01",
    title: "ThePurpleCow",
    category: "AGENCY WEBSITE",
    description:
      "A responsive agency website featuring scroll-driven animations, an interactive React interface, and an Express.js backend with Resend email integration.",
    image: "/projects/thepurplecow-demo.mp4",
    imageType: "video",
    accent: "#c65d4b",
    rotation: "-rotate-[0.5deg]",
    tags: ["React", "Tailwind CSS", "GSAP", "Express.js", "Resend"],
    liveUrl: "https://www.thepurpllecow.website/",
    githubUrl: "https://github.com/Prabin833/ThePurpleCow",
  },
  {
    id: 2,
    number: "02",
    title: "VideoTube Backend",
    category: "BACKEND DEVELOPMENT",
    description:
      "A modular REST API featuring JWT authentication, secure password hashing, MongoDB data management, and Cloudinary-powered media uploads.",
    image: "/projects/videotube-backend.png",
    imageType: "image",
    accent: "#71916a",
    rotation: "rotate-[0.5deg]",
    tags: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Cloudinary"],
    liveUrl: null,
    githubUrl: "https://github.com/Prabin833/backend1",
  },
  {
    id: 3,
    number: "03",
    title: "Personal Portfolio",
    category: "CREATIVE WEB DEVELOPMENT",
    description:
      "A personal portfolio showcasing my projects, skills, and development journey. Built with React, Tailwind CSS, GSAP animations, and smooth scrolling to create an interactive and responsive user experience.",
    image: "/projects/interactive-portfolio.png",
    imageType: "image",
    accent: "#557f85",
    rotation: "-rotate-[0.5deg]",
    tags: ["React", "Tailwind CSS", "JavaScript", "GSAP", "Locomotive Scroll"],
    liveUrl: "https://webstoniez.online/",
    githubUrl: "https://github.com/Prabin833/portfolio-",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative scroll-mt-8 overflow-hidden py-16 pl-8 pr-4 sm:py-20 sm:pl-12 sm:pr-6 md:py-24 md:pl-16 md:pr-10 lg:pl-20 lg:pr-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-[#c65d4b] sm:w-10" />

            <p className="font-retro-typewriter text-[10px] tracking-[0.15em] text-[#8a5144] sm:text-xs sm:tracking-[0.2em]">
              A SELECTION OF MY WORK
            </p>
          </div>

          <SplitHeading as="h2" splitBy="words" duration={0.8} stagger={0.12} className="break-words font-retro-heading text-4xl font-bold leading-tight text-[#29251f] sm:text-5xl md:text-6xl lg:text-7xl" > Things I've <span className="text-[#c65d4b]">built.</span> </SplitHeading>

          <HandwritingText
            text={
              "A few projects where I've turned ideas\ninto working products, explored new\ntechnologies, and learned by building."
            }
            as="p"
            fontSize={36}
            strokeWidth={1.8}
            strokeColor="#625749"
            duration={3.1}
            delay={0.2}
            playOnView={true}
            start="top 85%"
            showPen={false}
            className="mt-4 max-w-xl font-retro-body text-sm leading-relaxed sm:text-base md:text-lg"
          />
        </div>

        {/* Project Cards */}
        <div className="space-y-16 sm:space-y-20">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`grid min-w-0 grid-cols-1 items-center gap-7 md:grid-cols-2 md:gap-8 lg:gap-12 ${project.rotation}`}
            >
              <div className="min-w-0">
                <div className="relative min-w-0 rounded-sm border border-[#d8cdb8] bg-[#fffaf0] p-2 shadow-[4px_5px_0_rgba(41,37,31,0.08)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[8px_10px_0_rgba(41,37,31,0.12)] sm:p-3">
                  {/* Browser Header */}
                  <div className="flex h-9 min-w-0 items-center gap-1.5 border-b border-[#e7ddcb] px-1 sm:px-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#e7a29a] sm:h-2.5 sm:w-2.5" />
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#e9d18a] sm:h-2.5 sm:w-2.5" />
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#a8c69a] sm:h-2.5 sm:w-2.5" />

                    <span className="ml-2 min-w-0 truncate font-retro-typewriter text-[9px] text-[#8a7863] sm:ml-3 sm:text-[10px]">
                      {project.title}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eee5d5]">
                    {project.imageType === "video" ? (
                      <video
                        className="h-full w-full object-contain"
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={`${project.title} website demonstration`}
                      >
                        <source src={project.image} type="video/mp4" />
                        Your browser does not support video playback.
                      </video>
                    ) : (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className="block h-full w-full"
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} Postman API response`}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </a>
                    )}
                  </div>

                  {/* Bottom Paper Edge */}
                  <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-3 sm:px-2">
                    <span className="font-retro-typewriter text-[9px] tracking-wider text-[#8a7863] sm:text-[10px]">
                      PROJECT_{project.number}
                    </span>

                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="min-w-0 py-2 md:py-5">
                <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="font-retro-typewriter text-[10px] tracking-wider text-[#8a5144] sm:text-xs sm:tracking-[0.15em]">
                    {project.category}
                  </span>

                  <span className="h-px w-5 shrink-0 bg-[#cbbda6] sm:w-8" />

                  <span className="font-retro-typewriter text-[10px] text-[#a3947d] sm:text-xs">
                    {project.number} / 03
                  </span>
                </div>

                <h3 className="break-words font-retro-heading text-3xl font-bold leading-tight text-[#29251f] sm:text-4xl md:text-5xl lg:text-6xl">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-xl font-retro-body text-sm leading-relaxed text-[#625749] sm:mt-5 sm:text-base md:text-lg">
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#d8cdb8] bg-[#fffaf0]/70 px-2.5 py-1.5 font-retro-handwriting text-sm font-bold text-[#51483e] sm:px-3 sm:text-base"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 border-2 border-[#29251f] bg-[#29251f] px-3 py-2.5 font-retro-handwriting text-sm font-bold text-[#fffaf0] shadow-[3px_3px_0_#c65d4b] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#c65d4b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c65d4b] sm:px-5 sm:text-base"
                    >
                      Live Demo
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        aria-hidden="true"
                      />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-dashed border-[#8a7863] bg-[#fffaf0]/70 px-3 py-2.5 font-retro-handwriting text-sm font-bold text-[#29251f] transition-colors duration-200 hover:bg-[#f7e69a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c65d4b] sm:px-5 sm:text-base"
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="text-base sm:text-lg"
                      aria-hidden="true"
                    />
                    GitHub
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Small Handwritten Note */}
                <p className="mt-5 font-retro-handwriting text-sm text-[#8a7863] sm:mt-6 sm:text-base">
                  {project.id === 1
                    ? "Made with creativity & a little bit of motion."
                    : "Built to learn, tested to improve."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
