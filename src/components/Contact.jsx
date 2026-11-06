import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowUpRightFromSquare,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import SplitHeading from "../components/SplitHeading";
import HandwritingText from "../components/HandwritingText";

const API_URL = import.meta.env.VITE_API_URL;
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to send your message.");
      }
      setStatus("success");
      setFeedback("Message sent successfully! Thank you for reaching out.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setFeedback(
        error.message || "Something went wrong. Please try again later.",
      );
    }
  };

  const inputClass =
    "mt-1 block w-full min-w-0 border-0 border-b border-[#cbbda6] bg-transparent px-1 py-2.5 font-retro-body text-base text-[#29251f] outline-none transition-colors duration-200 placeholder:text-[#a3947d] hover:border-[#a3947d] focus:border-[#c65d4b] focus:bg-[#fff3d1]/60 focus:ring-0";
  const labelClass =
    "block font-retro-typewriter text-[11px] tracking-[0.14em] text-[#8a5144]";
  const paperCard =
    "relative min-w-0 border border-[#d8cdb8] bg-[#fffaf0]/90 shadow-[4px_5px_0_rgba(41,37,31,0.07)]";
  const tape =
    "pointer-events-none absolute -top-3 h-6 w-20 border-x border-black/5 bg-white/55";
  const linkRow =
    "group flex min-w-0 items-center gap-3 border border-dashed border-[#d8cdb8] bg-[#fffaf0]/70 px-3 py-3.5 sm:gap-4 sm:px-4 text-[#51483e] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c65d4b]/60 hover:bg-white/70 hover:shadow-[3px_5px_0_rgba(41,37,31,0.07)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c65d4b]";
  const iconTile =
    "grid h-11 w-11 shrink-0 place-items-center border border-black/10 text-lg text-[#29251f] shadow-[2px_2px_0_rgba(41,37,31,0.08)] transition-transform duration-300 group-hover:rotate-0";
  const caption =
    "block font-retro-typewriter text-[10px] tracking-[0.18em] text-[#a3947d]";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 pl-8 pr-4 sm:py-20 sm:pl-12 sm:pr-6 md:py-24 md:pl-16 md:pr-10 lg:pl-20 lg:pr-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Heading */}
        <div className="mb-12 sm:mb-14 lg:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#c65d4b] sm:w-10" />
            <p className="font-retro-typewriter text-[10px] tracking-[0.15em] text-[#8a5144] sm:text-xs sm:tracking-[0.2em]">
              THE LAST PAGE
            </p>
          </div>
          <SplitHeading
            as="h2"
            splitBy="words"
            duration={0.8}
            stagger={0.1}
            className="break-words font-retro-heading text-4xl font-bold leading-tight text-[#29251f] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {" "}
            Let's work <span className="text-[#c65d4b]">together.</span>{" "}
          </SplitHeading>
          <HandwritingText
            text={
              "Have a project in mind, an opportunity\nto share, or just want to talk about\ndevelopment? My inbox is open."
            }
            as="p"
            fontSize={36}
            strokeWidth={1.2}
            strokeColor="#625749"
            duration={3.1}
            delay={0.3}
            playOnView={true}
            start="top 85%"
            showPen={false}
            className="mt-4 max-w-xl font-retro-body text-sm leading-relaxed sm:text-base md:text-lg"
          />
        </div>

        {/* Contact Information + Form */}
        <div className="grid min-w-0 grid-cols-1 items-stretch gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 xl:gap-16">
          {/* Contact Information */}
          <div className={`${paperCard} flex flex-col p-5 sm:p-8`}>
            <span className={`${tape} left-8 -rotate-3`} aria-hidden="true" />

            <p className="mb-6 flex items-center gap-3 border-b border-dashed border-[#d8cdb8] pb-4 font-retro-typewriter text-xs tracking-[0.14em] text-[#8a7863]">
              <span className="h-px w-6 bg-[#c65d4b]" aria-hidden="true" />
              FIND ME AROUND THE WEB
            </p>

            <div className="grid gap-3 md:grid-cols-2 lg:flex-1 lg:auto-rows-fr lg:grid-cols-1 lg:gap-4">
              <a
                href="mailto:prabinkuamrnayak833@gmail.com"
                className={`${linkRow} md:col-span-2 lg:col-span-1`}
              >
                <span className={`${iconTile} -rotate-3 bg-[#f6cbd0]`}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={caption}>WRITE TO ME</span>
                  <span className="block break-words font-retro-body text-[13px] leading-snug min-[400px]:text-sm sm:text-base [overflow-wrap:anywhere]">
                    prabinkumarnayak833@gmail.com
                  </span>
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/prabin-nayak-14b51b322/"
                target="_blank"
                rel="noopener noreferrer"
                className={linkRow}
              >
                <span className={`${iconTile} rotate-2 bg-[#c8e1ed]`}>
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={caption}>LET'S CONNECT</span>
                  <span className="block font-retro-body text-base leading-snug">
                    LinkedIn
                  </span>
                </span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="shrink-0 text-xs opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#c65d4b] group-hover:opacity-100"
                />
              </a>

              <a
                href="https://github.com/Prabin833"
                target="_blank"
                rel="noopener noreferrer"
                className={linkRow}
              >
                <span className={`${iconTile} -rotate-2 bg-[#d3e5b8]`}>
                  <FontAwesomeIcon icon={faGithub} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={caption}>SEE MY CODE</span>
                  <span className="block font-retro-body text-base leading-snug">
                    GitHub
                  </span>
                </span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="shrink-0 text-xs opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#c65d4b] group-hover:opacity-100"
                />
              </a>
            </div>

            <p className="mt-6 border-t border-dashed border-[#d8cdb8] pt-6 font-retro-handwriting text-lg text-[#8a7863] lg:mt-8">
              Good things start with a conversation.
            </p>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className={`${paperCard} py-6 pl-12 pr-5 sm:py-8 sm:pl-[4.5rem] sm:pr-8`}
          >
            {/* paper details: tape, margin line, punched holes (decorative) */}
            <span className={`${tape} right-10 rotate-2`} aria-hidden="true" />
            <span
              className="pointer-events-none absolute inset-y-0 left-9 w-px bg-[#e2958c]/70 sm:left-14"
              aria-hidden="true"
            />
            {["18%", "50%", "82%"].map((top) => (
              <span
                key={top}
                className="pointer-events-none absolute left-2.5 h-3 w-3 rounded-full border border-[#d8cdb8] bg-[#f8f3e7] shadow-[inset_1px_1px_2px_rgba(41,37,31,0.18)] sm:left-4"
                style={{ top }}
                aria-hidden="true"
              />
            ))}

            <div className="mb-7 flex items-center justify-between gap-3 border-b border-dashed border-[#d8cdb8] pb-4">
              <h3 className="font-retro-heading text-3xl font-bold leading-none text-[#29251f] sm:text-4xl">
                Drop me a note.
              </h3>
              <span className="shrink-0 rotate-3 border border-[#c65d4b]/50 px-2 py-1 font-retro-typewriter text-[10px] text-[#c65d4b]/80">
                NOTE_001
              </span>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {/* Name */}
              <div className="min-w-0">
                <label htmlFor="contact-name" className={labelClass}>
                  YOUR NAME *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="What should I call you?"
                  className={inputClass}
                  required
                  maxLength={100}
                />
              </div>
              {/* Email */}
              <div className="min-w-0">
                <label htmlFor="contact-email" className={labelClass}>
                  YOUR EMAIL *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                  required
                  maxLength={254}
                />
              </div>
              {/* Phone */}
              <div className="min-w-0">
                <label htmlFor="contact-phone" className={labelClass}>
                  PHONE NUMBER *
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your contact number"
                  className={inputClass}
                  required
                  maxLength={30}
                />
              </div>
              {/* Subject */}
              <div className="min-w-0">
                <label htmlFor="contact-subject" className={labelClass}>
                  SUBJECT *
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClass}
                  required
                  maxLength={150}
                />
              </div>
              {/* Message */}
              <div className="min-w-0 sm:col-span-2">
                <label htmlFor="contact-message" className={labelClass}>
                  YOUR MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me a little about it..."
                  className={`${inputClass} min-h-28 resize-y`}
                  required
                  maxLength={5000}
                />
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <p
                role="status"
                aria-live="polite"
                className={`mt-6 break-words border-l-4 px-3 py-2 font-retro-body text-sm ${status === "success" ? "border-[#557f5b] bg-[#557f5b]/10 text-[#557f5b]" : "border-[#b3483b] bg-[#b3483b]/10 text-[#b3483b]"}`}
              >
                {feedback}
              </p>
            )}

            {/* Submit */}
            <div className="mt-7 flex flex-col gap-4 border-t border-dashed border-[#d8cdb8] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 border-2 border-[#29251f] bg-[#29251f] px-6 py-3 font-retro-handwriting text-base font-bold text-[#fffaf0] shadow-[4px_4px_0_#c65d4b] transition-[transform,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#c65d4b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c65d4b] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
              <p className="font-retro-typewriter text-[10px] leading-relaxed text-[#a3947d]">
                Fields marked * are required.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Contact;