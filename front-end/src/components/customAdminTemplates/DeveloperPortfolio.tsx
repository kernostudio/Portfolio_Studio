"use client";
import { LinkIcon, PhoneCall } from "lucide-react";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { LiaLinkedin } from "react-icons/lia";
import { MdEmail } from "react-icons/md";

// Type definitions
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

interface NavColors {
  textColor: string;
  accentColor: string;
  bgColor: string;
  hoverColor: string;
}

interface NavLogo {
  text: string;
  accentColor: string;
}

interface Nav {
  logo: NavLogo;
  links: NavLink[];
  ctaButton: CTAButton;
  colors: NavColors;
}

interface Hero {
  name: string;
  greeting: string;
  title: string;
  description: string;
  location: string;
  availability: boolean;
  profileImage: string;
  imageBorderColor: string;
  imageShadowColor: string;
  accentColor: string;
  textColor: string;
  descriptionColor: string;
  locationColor: string;
  availabilityColor: string;
}

interface About {
  title: string;
  heading: string;
  paragraphs: string[];
  quickBits: string[];
  finalParagraph: string;
  aboutImage: string;
  bgColor: string;
  textColor: string;
  headingColor: string;
  paragraphColor: string;
  quickBitsColor: string;
  titleBgColor: string;
  titleTextColor: string;
}

interface SkillItem {
  name: string;
  icon: string;
}

interface Skills {
  title: string;
  items: SkillItem[];
  titleBgColor: string;
  titleTextColor: string;
  skillNameColor: string;
  bgColor: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  locationType: string;
  description: string;
  technologies: string[];
  borderColor: string;
  titleColor: string;
  companyColor: string;
  periodColor: string;
  descriptionColor: string;
  techBgColor: string;
  techTextColor: string;
}

interface Experience {
  showSection: boolean;
  title: string;
  subtitle: string;
  experiences: ExperienceItem[];
  bgColor: string;
  titleBgColor: string;
  titleTextColor: string;
  subtitleColor: string;
  cardBgColor: string;
}

interface Technology {
  name: string;
  bgColor: string;
  textColor: string;
}

interface Project {
  name: string;
  description: string;
  image: string;
  technologies: Technology[];
  link: string;
  layout: "left" | "right";
  projectNameColor: string;
  descriptionColor: string;
  cardBgColor: string;
}

interface Work {
  title: string;
  subtitle: string;
  projects: Project[];
  titleBgColor: string;
  titleTextColor: string;
  subtitleColor: string;
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

interface Contact {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  socialText: string;
  socialLinks: SocialLink[];
  titleBgColor: string;
  titleTextColor: string;
  subtitleColor: string;
  emailColor: string;
  phoneColor: string;
  socialTextColor: string;
  iconColor: string;
}

interface Footer {
  text: string;
  bgColor: string;
  textColor: string;
}

interface Root {
  bgColor: string;
  textColor: string;
}

interface Placeholders {
  root: Root;
  nav: Nav;
  hero: Hero;
  about: About;
  skills: Skills;
  experience: Experience;
  work: Work;
  contact: Contact;
  footer: Footer;
}

export default function DeveloperPortfolio({
  placeholder,
}: {
  placeholder: Placeholders;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { root, nav, hero, about, skills, experience, work, contact, footer } =
    placeholder;

  // Smooth scroll function
  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const y = el.getBoundingClientRect().top + window.pageYOffset - topOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  // Dynamic CSS variables
  const dynamicStyles = `
    :root {
      --nav-bg: ${nav.colors.bgColor};
      --nav-text: ${nav.colors.textColor};
      --nav-hover: ${nav.colors.hoverColor};
      --hero-accent: ${hero.accentColor};
      --about-bg: ${about.bgColor};
      --about-text: ${about.textColor};
      --experience-bg: ${experience.bgColor};
      --footer-bg: ${footer.bgColor};
      --root-text: ${root.textColor};
    }
    .nav-link:hover { color: var(--nav-hover) !important; }
    .hero-accent { color: var(--hero-accent); }
  `;

  // Helper function to get social icon
  const getSocialIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ size: number }> } = {
      FaGithub: FaGithub,
      LiaLinkedin: LiaLinkedin,
      FaXTwitter: FaXTwitter,
      FaFacebookF: FaFacebookF,
      FaTwitter: FaTwitter,
      FaInstagram: FaInstagram,
      FaLinkedinIn: FaLinkedinIn,
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  return (
    <div
      className="font-sans antialiased min-h-screen"
      style={{
        backgroundColor: root.bgColor,
        color: root.textColor,
      }}
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
                {`<${nav.logo.text.slice(0, 2)}/>`}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="hidden md:flex items-center gap-8">
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
        className="w-11/12 mx-auto px-6 mt-7 py-12 flex flex-col md:flex-row gap-20"
      >
        <div className="flex-1 lg:w-1/2">
          <h1
            className="md:text-3xl text-xl font-bold lg:text-5xl"
            style={{ color: hero.textColor }}
          >
            Hi, I&apos;m {hero.name} {hero.greeting}
          </h1>
          <p
            className="mt-10 font-light text-xs lg:text-[16px]"
            style={{ color: hero.descriptionColor }}
          >
            {hero.description}
          </p>

          <div className="mt-14 flex gap-4 items-center">
            <HiLocationMarker className="hero-accent" />
            <p style={{ color: hero.locationColor }}>{hero.location}</p>
          </div>
          <div className="mt-5 flex gap-4 items-center">
            <span
              className="w-5 h-5 border-2 border-white rounded-full"
              style={{
                backgroundColor: hero.availability ? "#10b981" : "#ef4444",
              }}
            ></span>
            <p style={{ color: hero.availabilityColor }}>
              {hero.availability
                ? "Available for new projects"
                : "Currently unavailable"}
            </p>
          </div>
        </div>
        <div className="w-72 h-72 md:w-72 lg:w-1/3 md:h-full">
          <div className="relative inline-block">
            <div
              className="absolute -right-10 -bottom-10 w-full h-full hidden md:block rounded-xl"
              style={{ backgroundColor: hero.imageShadowColor }}
            ></div>
            <img
              src={hero.profileImage}
              alt="profile"
              className="relative z-10 w-72 rounded-xl object-cover shadow-lg"
              style={{ borderColor: hero.imageBorderColor, borderWidth: "8px" }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="mt-16 py-12 overflow-hidden"
        style={{ backgroundColor: about.bgColor }}
      >
        <div className="w-11/12 mx-auto">
          <div className="flex justify-center">
            <div
              className="w-36 rounded-xl px-2 py-1"
              style={{
                backgroundColor: about.titleBgColor,
                color: about.titleTextColor,
              }}
            >
              <h1 className="text-center text-xl">{about.title}</h1>
            </div>
          </div>
          <div
            className="flex flex-col 
          mt-20 md:flex-row-reverse mb-4 justify-between items-center md:items-start gap-8 md:gap-20"
          >
            <div className="space-y-5 mt-5 md:mt-0 md:w-1/2 text-center md:text-left">
              <h1
                className="font-bold lg:text-2xl text-xl"
                style={{ color: about.headingColor }}
              >
                {about.heading}
              </h1>
              {about.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-light"
                  style={{ color: about.paragraphColor }}
                >
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-2">
                {about.quickBits.map((bit, index) => (
                  <h1
                    key={index}
                    className="font-light"
                    style={{ color: about.quickBitsColor }}
                  >
                    {bit}
                  </h1>
                ))}
              </div>
              <p className="font-light" style={{ color: about.paragraphColor }}>
                {about.finalParagraph}
              </p>
            </div>

            <div className="relative inline-block w-72 h-72 md:h-80">
              <div className="absolute hidden md:block right-0 -bottom-14 w-full h-full bg-gray-200 rounded-xl"></div>
              <img
                src={about.aboutImage}
                alt="about profile"
                className="absolute  md:left-10 z-10 w-72 rounded-xl border-8 border-white object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="w-11/12 mx-auto py-12"
        style={{ backgroundColor: skills.bgColor }}
      >
        <div className="flex justify-center">
          <div
            className="w-36 rounded-xl px-2 py-1"
            style={{
              backgroundColor: skills.titleBgColor,
              color: skills.titleTextColor,
            }}
          >
            <h1 className="text-center text-xl">{skills.title}</h1>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-16 text-center">
          {skills.items.map((skill, index) => (
            <div key={index}>
              <img src={skill.icon} alt={skill.name} className="mx-auto" />
              <h1
                className="text-xl font-semibold mt-2"
                style={{ color: skills.skillNameColor }}
              >
                {skill.name}
              </h1>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      {experience.showSection && (
        <section
          id="experience"
          className="mt-16"
          style={{ backgroundColor: experience.bgColor }}
        >
          <div className="w-11/12 mx-auto py-12">
            <div className="flex justify-center">
              <div
                className="w-36 rounded-xl px-2 py-1"
                style={{
                  backgroundColor: experience.titleBgColor,
                  color: experience.titleTextColor,
                }}
              >
                <h1 className="text-center text-xl">{experience.title}</h1>
              </div>
            </div>
            <p
              className="text-center mt-4"
              style={{ color: experience.subtitleColor }}
            >
              {experience.subtitle}
            </p>
            <div className="mt-8 space-y-6">
              {experience.experiences.map((exp, index) => (
                <div
                  key={index}
                  className="rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  style={{
                    borderLeftColor: exp.borderColor,
                    borderLeftWidth: "4px",
                    backgroundColor: experience.cardBgColor,
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: exp.titleColor }}
                      >
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <i
                          className="fas fa-building"
                          style={{ color: exp.companyColor }}
                        ></i>
                        <span
                          style={{ color: exp.companyColor }}
                          className="font-medium"
                        >
                          {exp.company}
                        </span>
                        <i
                          className="fas fa-calendar-alt ml-4"
                          style={{ color: exp.periodColor }}
                        ></i>
                        <span style={{ color: exp.periodColor }}>
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${exp.borderColor}20`,
                          color: exp.borderColor,
                        }}
                      >
                        {exp.locationType}
                      </span>
                    </div>
                  </div>
                  <p
                    className="mt-4 leading-relaxed"
                    style={{ color: exp.descriptionColor }}
                  >
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: exp.techBgColor,
                          color: exp.techTextColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Work Section */}
      <section id="work" className="w-11/12 mx-auto mt-16">
        <div className="flex justify-center">
          <div
            className="w-36 rounded-xl px-2 py-1"
            style={{
              backgroundColor: work.titleBgColor,
              color: work.titleTextColor,
            }}
          >
            <h1 className="text-center text-xl">{work.title}</h1>
          </div>
        </div>
        <p className="text-center mt-5" style={{ color: work.subtitleColor }}>
          {work.subtitle}
        </p>
        <div className="mt-16 space-y-14">
          {work.projects.map((project, index) => (
            <div
              key={index}
              className={`lg:flex gap-10 shadow-2xl rounded-xl ${
                project.layout === "right" ? "flex-row-reverse" : ""
              }`}
              style={{ backgroundColor: project.cardBgColor }}
            >
              <div className="lg:w-1/2 rounded-xl rounded-r-none bg-gray-100">
                <img
                  className="p-10 w-full"
                  src={project.image}
                  alt={project.name}
                />
              </div>

              <div className="lg:w-1/2 space-y-7 mt-10 p-10">
                <h1
                  className="font-bold"
                  style={{ color: project.projectNameColor }}
                >
                  {project.name}
                </h1>
                <p style={{ color: project.descriptionColor }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-xl px-3 py-1 text-center text-sm font-medium"
                      style={{
                        backgroundColor: tech.bgColor,
                        color: tech.textColor,
                      }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon style={{ color: work.titleTextColor }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-11/12 mx-auto py-20">
        <div className="flex justify-center">
          <div
            className="w-36 rounded-xl px-2 py-1"
            style={{
              backgroundColor: contact.titleBgColor,
              color: contact.titleTextColor,
            }}
          >
            <h1 className="text-center text-xl">{contact.title}</h1>
          </div>
        </div>
        <p
          className="text-center mt-4 break-normal"
          style={{ color: contact.subtitleColor }}
        >
          {contact.subtitle}
        </p>
        <div className="flex justify-center mt-14">
          <div className="space-y-3">
            <div className="flex gap-3 items-center font-bold md:text-2xl">
              <MdEmail style={{ color: contact.iconColor }} />
              <h1 style={{ color: contact.emailColor }}>{contact.email}</h1>
            </div>
            <div className="flex gap-3 justify-center items-center font-bold md:text-2xl">
              <PhoneCall style={{ color: contact.iconColor }} />
              <h1 style={{ color: contact.phoneColor }}>{contact.phone}</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <div>
            <h1 style={{ color: contact.socialTextColor }}>
              {contact.socialText}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-2">
              {contact.socialLinks.map((social, index) => (
                <a
                  key={index}
                  className="text-2xl"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: contact.iconColor }}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center"
        style={{
          backgroundColor: footer.bgColor,
          color: footer.textColor,
        }}
      >
        <p className="text-xl lg:text-xl py-4">{footer.text}</p>
      </footer>
    </div>
  );
}
