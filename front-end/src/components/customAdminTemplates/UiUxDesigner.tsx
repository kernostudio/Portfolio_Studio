"use client";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

// Types
interface NavLink {
  label: string;
  href: string;
}

interface CTAButton {
  text: string;
  url: string;
  bgColor: string;
  textColor: string;
}

interface Colors {
  textColor: string;
  hoverColor: string;
  bgColor: string;
  accentColor: string;
}

interface Logo {
  text: string;
  accentColor: string;
}

interface NavData {
  logo: Logo;
  links: NavLink[];
  ctaButton: CTAButton;
  colors: Colors;
}

interface HeroData {
  greeting: string;
  name: string;
  title: string;
  description: string;
  ctaButton: CTAButton;
  profileImage: string;
  colors: Colors & { accentColor: string };
}

interface Skill {
  name: string;
  level: number;
}

interface AboutData {
  heading: string;
  description: string;
  skills: Skill[];
  image: string;
  colors: {
    textColor: string;
    accentColor: string;
  };
}

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  hoverBgColor: string;
}

interface ServicesData {
  heading: string;
  description: string;
  items: ServiceItem[];
}

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

interface ProjectsData {
  heading: string;
  description: string;
  items: ProjectItem[];
}

interface ContactItem {
  type: string;
  label: string;
  value: string;
  url?: string;
  description: string;
}

interface ContactData {
  heading: string;
  description: string;
  items: ContactItem[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
  };
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface FooterData {
  logo: Logo;
  links: NavLink[];
  socials: SocialLink[];
  copyright: string;
  colors: Colors;
}

interface Placeholder {
  root: {
    bgColor: string;
  };
  nav: NavData;
  hero: HeroData;
  about: AboutData;
  services: ServicesData;
  projects: ProjectsData;
  contact: ContactData;
  footer: FooterData;
}

export default function UiUxDesigner({
  placeholder,
}: {
  placeholder: Placeholder;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { root, nav, hero, about, services, projects, contact, footer } =
    placeholder;

  // Smooth scroll function
  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80; // navbar height
      const y = el.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false); // close mobile menu if open
    }
  };

  // Dynamic CSS variables
  const dynamicStyles = `
    :root {
      --nav-bg: ${nav.colors.bgColor};
      --nav-text: ${nav.colors.textColor};
      --nav-hover: ${nav.colors.hoverColor};
      --hero-bg: ${hero.colors.bgColor};
      --hero-text: ${hero.colors.textColor};
      --accent-color: ${hero.colors.accentColor};
    }
    .nav-link:hover { color: var(--nav-hover) !important; }
  `;

  // Helper function to get social icon
  const getSocialIcon = (iconName: string) => {
    const icons = {
      FaFacebookF: FaFacebookF,
      FaTwitter: FaTwitter,
      FaInstagram: FaInstagram,
      FaLinkedinIn: FaLinkedinIn,
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  return (
    <div
      className="font-sans antialiased min-h-screen"
      style={{ backgroundColor: root.bgColor }}
    >
      <style>{dynamicStyles}</style>

      {/* Navigation */}
      <nav className="sticky top-0 left-0 right-0 z-20 bg-[var(--nav-bg)] shadow-sm">
        <div className="w-11/12 mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div
                className="text-xl font-bold cursor-pointer"
                style={{ color: "var(--nav-text)" }}
                onClick={() => handleNavClick("home")}
              >
                <span style={{ color: nav.logo.accentColor }}>
                  {nav.logo.text[0]}
                </span>
                {nav.logo.text.slice(1)}
              </div>
            </div>

            <div className="hidden md:flex items-center justify-between gap-5">
              {nav.links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link text-sm font-medium transition-colors bg-transparent border-none cursor-pointer"
                  style={{ color: "var(--nav-text)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a
                href={nav.ctaButton.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="rounded-lg px-4 py-2 font-medium transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: nav.ctaButton.bgColor,
                    color: nav.ctaButton.textColor,
                  }}
                >
                  {nav.ctaButton.text}
                </button>
              </a>
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
                className="block py-2 nav-link w-full text-left bg-transparent border-none cursor-pointer"
                style={{ color: "var(--nav-text)" }}
              >
                {link.label}
              </button>
            ))}
            <a
              href={nav.ctaButton.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="rounded-lg px-4 py-2 font-medium mt-2 w-full"
                style={{
                  backgroundColor: nav.ctaButton.bgColor,
                  color: nav.ctaButton.textColor,
                }}
              >
                {nav.ctaButton.text}
              </button>
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="w-11/12 mx-auto px-6 mt-16 py-12 flex flex-col md:flex-row items-center gap-8 bg-[var(--hero-bg)]"
      >
        <div className="flex-1 lg:w-1/2">
          <h1
            className="text-xl md:text-3xl font-semibold"
            style={{ color: "var(--hero-text)" }}
          >
            {hero.greeting}
          </h1>
          <h1
            className="text-xl md:text-3xl font-semibold"
            style={{ color: hero.colors.accentColor }}
          >
            {hero.name}
          </h1>
          <h1
            className="text-2xl md:text-7xl font-bold"
            style={{ color: "var(--hero-text)" }}
          >
            {hero.title.split(" ").map((word, i) => (
              <span key={i} className={i === 2 ? "ml-28" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>
          <p
            className="mt-5 leading-snug w-10/12 text-xl"
            style={{ color: "var(--hero-text)" }}
          >
            {hero.description}
          </p>
          <div className="mt-5">
            <a
              href={hero.ctaButton.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="rounded-lg px-6 py-3 font-semibold transition-all hover:shadow-lg"
                style={{
                  backgroundColor: hero.ctaButton.bgColor,
                  color: hero.ctaButton.textColor,
                }}
              >
                {hero.ctaButton.text}
              </button>
            </a>
          </div>
        </div>
        <div className="w-72 h-72 md:w-72 md:h-full">
          <img
            src={hero.profileImage}
            alt="profile"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="w-11/12 mt-10 mx-auto px-6 py-12 flex flex-col md:flex-row-reverse justify-between items-center md:items-start gap-8 md:gap-20"
      >
        <div className="space-y-5 mt-5 md:mt-0 md:w-1/2 text-center md:text-left">
          <h1
            className="font-bold md:text-4xl text-2xl"
            style={{ color: about.colors.textColor }}
          >
            {about.heading}
          </h1>
          <p className="text-gray-700">{about.description}</p>

          <div className="space-y-4 mt-6">
            {about.skills.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">{skill.name}</span>
                  <span className="text-gray-600">{skill.level}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  readOnly
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${about.colors.accentColor} 0%, ${about.colors.accentColor} ${skill.level}%, #d1d5db ${skill.level}%, #d1d5db 100%)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-72 h-72 md:h-80">
          <img
            src={about.image}
            alt="about"
            className="w-full h-full mx-auto object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-11/12 mx-auto px-6 py-12">
        <div>
          <h1 className="font-bold text-center text-2xl md:text-6xl">
            {services.heading}
          </h1>
          <p className="mt-8 leading-snug text-center md:text-xl">
            {services.description}
          </p>
          <div className="flex justify-center">
            <div className="mt-20 grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {services.items.map((service, index) => (
                <div
                  key={index}
                  className="border border-gray-200 hover:shadow-lg transition-all duration-300 rounded-2xl p-6 "
                  style={{
                    backgroundColor: service.bgColor,
                  }}
                >
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center">
                      <img
                        src={service.icon}
                        alt={service.title}
                        className="w-8 h-8"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-11/12 mx-auto px-6 py-12">
        <div>
          <h1 className="font-bold text-center text-2xl md:text-6xl">
            {projects.heading}
          </h1>
          <p className="mt-8 leading-snug text-center md:text-xl">
            {projects.description}
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.items.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#ff6300] font-medium hover:text-orange-700 transition-colors"
                  >
                    View Project
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-11/12 mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-bold text-3xl md:text-7xl mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {contact.heading}
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {contact.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {contact.items.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-orange-200 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-orange-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {/* Icon would go here based on item.type */}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.label}
                  </h3>
                  {item.url ? (
                    <a
                      href={item.url}
                      className="text-gray-600 hover:text-orange-600 transition-colors break-words  text-sm font-medium block mb-2 group-hover:translate-x-2 transition-transform duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-lg font-medium mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {item.value}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {contact.cta.title}
                </h3>
                <p className="text-gray-600">{contact.cta.description}</p>
              </div>
              <a
                href={contact.cta.buttonUrl}
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 whitespace-nowrap"
              >
                {contact.cta.buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f8f8f8] pt-10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div
              className="text-2xl font-bold cursor-pointer"
              onClick={() => handleNavClick("home")}
            >
              <span style={{ color: footer.logo.accentColor }}>
                {footer.logo.text[0]}
              </span>
              {footer.logo.text.slice(1)}
            </div>

            <div className="flex justify-center mt-10">
              <nav>
                <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {footer.links.map((link, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-gray-700 hover:text-orange-600 transition-colors duration-300 font-medium bg-transparent border-none cursor-pointer"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="flex justify-center space-x-6 mt-8">
              {footer.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 shadow-sm"
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-8 bg-[#545454]">
          <p className="text-white py-4">
            <span
              dangerouslySetInnerHTML={{
                __html: footer.copyright.replace(
                  "Muhammad",
                  `<span style="color: ${footer.colors.accentColor}">Muhammad</span>`
                ),
              }}
            />
          </p>
        </div>
      </footer>
    </div>
  );
}
