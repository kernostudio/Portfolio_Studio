"use client";

import React, { useState, useEffect } from "react";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

interface TemplateColors {
  bgColor: string;
  textColor: string;
  hoverColor?: string;
  accentColor?: string;
}
interface TemplateLink {
  label: string;
  href: string;
}
interface TemplateSocial {
  platform: "facebook" | "linkedin" | "github";
  url: string;
}
interface TemplateNav {
  logo: { text: string };
  colors: TemplateColors;
  links: TemplateLink[];
  socials: TemplateSocial[];
}
interface TemplateHero {
  colors: TemplateColors;
  name: string;
  jobTitle: string;
  summary: string;
  profileImage: string;
  cta: { text: string; link: string };
}
interface TemplateAbout {
  heading: string;
  text: string;
  timeline: { year: string; desc: string }[];
}
interface TemplateWork {
  heading: string;
  items: { title: string; image: string; desc: string; date: string }[];
}
interface TemplateContact {
  heading: string;
  image: string;
  text: string;
  email: string;
  phone: string;
  website: string;
}
interface TemplateRoot {
  bgColor: string;
}
interface TemplatePlaceholders {
  root: TemplateRoot;
  nav: TemplateNav;
  hero: TemplateHero;
  about: TemplateAbout;
  work: TemplateWork;
  contact: TemplateContact;
}
interface PageProps {
  placeholder: TemplatePlaceholders;
}

export default function ProductDesigner({ placeholder }: PageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { root, nav, hero, about, work, contact } = placeholder;

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80; // navbar height
      const y = el.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false); // close mobile menu if open
    }
  };

  return (
    <div
      className="font-sans antialiased min-h-screen transition-colors duration-500"
      style={{ backgroundColor: root.bgColor }}
    >
      <style>{`
        :root {
          --nav-bg: ${nav.colors.bgColor};
          --nav-text: ${nav.colors.textColor};
          --nav-hover: ${nav.colors.hoverColor};
          --hero-bg: ${hero.colors.bgColor};
          --hero-text: ${hero.colors.textColor};
          --accent-color: ${hero.colors.accentColor};
        }
        .nav-link:hover { color: var(--nav-hover) !important; }
        .cta-btn { background-color: var(--accent-color); color: #111827; }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)]">
        <div className="w-11/12 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div style={{ color: "var(--nav-text)", fontWeight: "bold" }}>
              {nav.logo.text}
            </div>
            <div className="hidden md:flex items-center gap-8">
              {nav.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link text-sm font-medium transition-colors"
                  style={{ color: "var(--nav-text)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4">
              {nav.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--nav-text)] hover:text-[var(--nav-hover)] transition-colors"
                >
                  {social.platform === "facebook" && <FaFacebook />}
                  {social.platform === "linkedin" && <FaLinkedin />}
                  {social.platform === "github" && <FaGithub />}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "var(--nav-text)" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden px-6 pb-6 bg-[var(--nav-bg)]">
            {nav.links.map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(link.href)}
                className="block py-2 nav-link w-full text-left"
                style={{ color: "var(--nav-text)" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="/"
        className="w-11/12 mx-auto mt-16 py-12 flex flex-col md:flex-row items-center gap-8 bg-[var(--hero-bg)]"
      >
        <div className="flex-1">
          <div
            className="text-sm uppercase font-semibold tracking-wide mb-2"
            style={{ color: "var(--hero-text)" }}
          >
            {hero.jobTitle}
          </div>
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: "var(--hero-text)" }}
          >
            {hero.name}
          </h1>
          <p className="max-w-xl mb-6" style={{ color: "var(--hero-text)" }}>
            {hero.summary}
          </p>
          <button
            onClick={() => handleNavClick(hero.cta.link)}
            className="inline-block px-6 py-3 rounded-lg cta-btn font-medium"
          >
            {hero.cta.text}
          </button>
        </div>
        <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden border-4 border-white">
          <img
            src={hero.profileImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ABOUT */}
      <section id="/about" className="w-11/12 mx-auto py-12">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-[48px] font-bold mb-4">
            {about.heading}
          </h2>
          <p className="text-gray-700 mb-6">{about.text}</p>
        </div>
        <div className="lg:flex justify-between">
          <div className="w-1/3"></div>
          <div className="space-y-7 mt-28">
            {about.timeline.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="flex-shrink-0">•</div>
                <div>
                  <h1 className="text-xl font-semibold">{item.year}</h1>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="/work" className="w-11/12 mx-auto py-12">
        <div className="md:w-1/2">
          <h2 className="text-2xl md:text-[48px] font-bold mb-4">
            {work.heading}
          </h2>
        </div>
        <div className="lg:flex justify-between space-y-14 lg:space-y-0 mt-20 gap-20">
          {work.items.map((item, idx) => (
            <div key={idx}>
              <img src={item.image} alt={item.title} />
              <p className="mt-1">{item.date}</p>
              <h1 className="font-bold text-2xl">{item.title}</h1>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="/contact" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl lg:text-6xl font-bold mb-4">
          {contact.heading}
        </h2>
        <div className="mt-12 lg:flex justify-between gap-10">
          <img src={contact.image} alt="contact" />
          <div className="space-y-5">
            <p>{contact.text}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.website}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
