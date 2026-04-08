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

const placeholders: Placeholders = {
  root: {
    bgColor: "#ffffff",
    textColor: "#111827",
  },
  nav: {
    logo: {
      text: "Sagor",
      accentColor: "#ff6300",
    },
    links: [
      { label: "Home", href: "home" },
      { label: "About", href: "about" },
      { label: "Skills", href: "skills" },
      { label: "Work", href: "work" },
      { label: "Contact", href: "contact" },
    ],
    ctaButton: {
      text: "Download CV",
      url: "https://drive.google.com/uc?export=download&id=1KdBb38A4nbH6cIGRUOdo_Gp1UErX8j7e",
      bgColor: "#000000",
      textColor: "#ffffff",
    },
    colors: {
      textColor: "#111827",
      accentColor: "#ff6300",
      bgColor: "#ffffff",
      hoverColor: "#ff6300",
    },
  },
  hero: {
    name: "Sagar",
    greeting: "👋",
    title: "Full Stack Developer",
    description:
      "I'm a full stack developer (React.js & Node.js) with a focus on creating (and occasionally designing) exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Even though I have been creating web applications for over 7 years, I still love it as if it was something new.",
    location: "Ahmedabad, India",
    availability: true,
    profileImage: "https://i.ibb.co.com/s90QV07Z/Pic.png",
    imageBorderColor: "#ffffff",
    imageShadowColor: "#f9fafb",
    accentColor: "#ff6300",
    textColor: "#111827",
    descriptionColor: "#6b7280",
    locationColor: "#374151",
    availabilityColor: "#374151",
  },
  about: {
    title: "About Me",
    heading: "Curious about me? Here you have it:",
    paragraphs: [
      "I'm a passionate, self-proclaimed designer who specializes in full stack development (React.js & Node.js). I am very enthusiastic about bringing the technical and visual aspects of digital products to life. User experience, pixel perfect design, and writing clear, readable, highly performant code matters to me.",
      "I began my journey as a web developer in 2015, and since then, I've continued to grow and evolve as a developer, taking on new challenges and learning the latest technologies along the way. Now, in my early thirties, 7 years after starting my web development journey, I'm building cutting-edge web applications using modern technologies such as Next.js, TypeScript, Nestjs, Tailwindcss, Supabase and much more.",
      "I am very much a progressive thinker and enjoy working on products end to end, from ideation all the way to development.",
      "When I'm not in full-on developer mode, you can find me hovering around on twitter or on indie hacker, witnessing the journey of early startups or enjoying some free time. You can follow me on Twitter where I share tech-related bites and build in public, or you can follow me on GitHub.",
      "Finally, some quick bits about me.",
    ],
    quickBits: [
      "B.E. in Computer Engineering",
      "Full time freelancer",
      "Avid learner",
      "Aspiring indie hacker",
    ],
    finalParagraph:
      "One last thing, I'm available for freelance work, so feel free to reach out and say hello! I promise I don't bite 😉",
    aboutImage: "https://i.ibb.co.com/Zp8pxWJr/Pic.png",
    bgColor: "#f9fafb",
    textColor: "#111827",
    headingColor: "#111827",
    paragraphColor: "#6b7280",
    quickBitsColor: "#6b7280",
    titleBgColor: "#e5e7eb",
    titleTextColor: "#111827",
  },
  skills: {
    title: "Skills",
    items: [
      {
        name: "JavaScript",
        icon: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
      },
      {
        name: "React",
        icon: "https://img.icons8.com/?size=100&id=123603&format=png&color=000000",
      },
      {
        name: "Node.js",
        icon: "https://img.icons8.com/?size=100&id=54087&format=png&color=000000",
      },
      {
        name: "Express.js",
        icon: "https://img.icons8.com/?size=100&id=kg46nzoJrmTR&format=png&color=000000",
      },
      {
        name: "MongoDB",
        icon: "https://img.icons8.com/?size=100&id=74402&format=png&color=000000",
      },
      {
        name: "TypeScript",
        icon: "https://img.icons8.com/?size=100&id=TpULddJc4gTh&format=png&color=000000",
      },
      {
        name: "Git & GitHub",
        icon: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000",
      },
      {
        name: "Tailwind CSS",
        icon: "https://img.icons8.com/?size=100&id=4PiNHtUJVbLs&format=png&color=000000",
      },
      {
        name: "Firebase",
        icon: "https://img.icons8.com/?size=100&id=62452&format=png&color=000000",
      },
      {
        name: "Next.js",
        icon: "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
      },
    ],
    titleBgColor: "#e5e7eb",
    titleTextColor: "#111827",
    skillNameColor: "#111827",
    bgColor: "#ffffff",
  },
  experience: {
    showSection: true,
    title: "Experience",
    subtitle: "Here is a quick summary of my most recent experiences:",
    experiences: [
      {
        title: "Sr. Frontend Developer & Team Lead",
        company: "TechCorp Solutions",
        period: "Jan 2020 - Present",
        locationType: "Remote",
        description:
          "Led a team of 8 frontend developers in building scalable React applications. Improved application performance by 40% through code optimization and implemented CI/CD pipelines.",
        technologies: ["React", "TypeScript", "Next.js", "Team Leadership"],
        borderColor: "#3b82f6",
        titleColor: "#111827",
        companyColor: "#6b7280",
        periodColor: "#6b7280",
        descriptionColor: "#6b7280",
        techBgColor: "#f3f4f6",
        techTextColor: "#374151",
      },
      {
        title: "Fullstack Developer",
        company: "Digital Innovations Inc.",
        period: "Mar 2017 - Dec 2019",
        locationType: "Hybrid",
        description:
          "Developed full-stack applications using React, Node.js, and MongoDB. Architected microservices and REST APIs serving 50k+ daily users.",
        technologies: ["Node.js", "MongoDB", "AWS", "Docker"],
        borderColor: "#10b981",
        titleColor: "#111827",
        companyColor: "#6b7280",
        periodColor: "#6b7280",
        descriptionColor: "#6b7280",
        techBgColor: "#f3f4f6",
        techTextColor: "#374151",
      },
      {
        title: "Frontend Developer",
        company: "WebCraft Studios",
        period: "Jun 2015 - Feb 2017",
        locationType: "On-site",
        description:
          "Built responsive web applications and collaborated with UX designers to implement pixel-perfect interfaces. Contributed to 15+ client projects with 99% client satisfaction rate.",
        technologies: ["JavaScript", "CSS3", "Vue.js", "UI/UX"],
        borderColor: "#8b5cf6",
        titleColor: "#111827",
        companyColor: "#6b7280",
        periodColor: "#6b7280",
        descriptionColor: "#6b7280",
        techBgColor: "#f3f4f6",
        techTextColor: "#374151",
      },
    ],
    bgColor: "#f9fafb",
    titleBgColor: "#e5e7eb",
    titleTextColor: "#111827",
    subtitleColor: "#6b7280",
    cardBgColor: "#ffffff",
  },
  work: {
    title: "Works",
    subtitle: "Some of the noteworthy projects I have built:",
    projects: [
      {
        name: "Fiskil",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec urna ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
        image: "https://i.ibb.co.com/NgGsWKFq/Picture.png",
        technologies: [
          { name: "React", bgColor: "#dbeafe", textColor: "#1e40af" },
          { name: "Next.js", bgColor: "#000000", textColor: "#ffffff" },
          { name: "TypeScript", bgColor: "#3b82f6", textColor: "#ffffff" },
          { name: "Nest.js", bgColor: "#fecaca", textColor: "#dc2626" },
          { name: "PostgreSQL", bgColor: "#dbeafe", textColor: "#1e3a8a" },
          { name: "TailwindCSS", bgColor: "#cffafe", textColor: "#0e7490" },
          { name: "Figma", bgColor: "#f3e8ff", textColor: "#7c3aed" },
          { name: "Cypress", bgColor: "#e5e7eb", textColor: "#374151" },
          { name: "Storybook", bgColor: "#fce7f3", textColor: "#be185d" },
          { name: "Git", bgColor: "#fed7aa", textColor: "#ea580c" },
        ],
        link: "https://github.com/RAKIBURRAHMAN007",
        layout: "left",
        projectNameColor: "#111827",
        descriptionColor: "#6b7280",
        cardBgColor: "#ffffff",
      },
      {
        name: "Fiskil",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec urna ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
        image: "https://i.ibb.co.com/NgGsWKFq/Picture.png",
        technologies: [
          { name: "React", bgColor: "#dbeafe", textColor: "#1e40af" },
          { name: "Next.js", bgColor: "#000000", textColor: "#ffffff" },
          { name: "TypeScript", bgColor: "#3b82f6", textColor: "#ffffff" },
          { name: "Nest.js", bgColor: "#fecaca", textColor: "#dc2626" },
          { name: "PostgreSQL", bgColor: "#dbeafe", textColor: "#1e3a8a" },
          { name: "TailwindCSS", bgColor: "#cffafe", textColor: "#0e7490" },
          { name: "Figma", bgColor: "#f3e8ff", textColor: "#7c3aed" },
          { name: "Cypress", bgColor: "#e5e7eb", textColor: "#374151" },
          { name: "Storybook", bgColor: "#fce7f3", textColor: "#be185d" },
          { name: "Git", bgColor: "#fed7aa", textColor: "#ea580c" },
        ],
        link: "https://github.com/RAKIBURRAHMAN007",
        layout: "right",
        projectNameColor: "#111827",
        descriptionColor: "#6b7280",
        cardBgColor: "#ffffff",
      },
      {
        name: "Fiskil",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec urna ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
        image: "https://i.ibb.co.com/NgGsWKFq/Picture.png",
        technologies: [
          { name: "React", bgColor: "#dbeafe", textColor: "#1e40af" },
          { name: "Next.js", bgColor: "#000000", textColor: "#ffffff" },
          { name: "TypeScript", bgColor: "#3b82f6", textColor: "#ffffff" },
          { name: "Nest.js", bgColor: "#fecaca", textColor: "#dc2626" },
          { name: "PostgreSQL", bgColor: "#dbeafe", textColor: "#1e3a8a" },
          { name: "TailwindCSS", bgColor: "#cffafe", textColor: "#0e7490" },
          { name: "Figma", bgColor: "#f3e8ff", textColor: "#7c3aed" },
          { name: "Cypress", bgColor: "#e5e7eb", textColor: "#374151" },
          { name: "Storybook", bgColor: "#fce7f3", textColor: "#be185d" },
          { name: "Git", bgColor: "#fed7aa", textColor: "#ea580c" },
        ],
        link: "https://github.com/RAKIBURRAHMAN007",
        layout: "left",
        projectNameColor: "#111827",
        descriptionColor: "#6b7280",
        cardBgColor: "#ffffff",
      },
    ],
    titleBgColor: "#e5e7eb",
    titleTextColor: "#111827",
    subtitleColor: "#6b7280",
  },
  contact: {
    title: "Get In Touch",
    subtitle:
      "What's next? Feel free to reach out to me if you're looking for a developer, have a query, or simply want to connect.",
    email: "reachsagarshah@gmail.com",
    phone: "+91 8980500565",
    socialText: "You may also find me on these platforms!",
    socialLinks: [
      {
        platform: "GitHub",
        icon: "FaGithub",
        url: "https://github.com/RAKIBURRAHMAN007",
      },
      {
        platform: "LinkedIn",
        icon: "LiaLinkedin",
        url: "https://www.linkedin.com/in/rakibur-rahman-ratul/",
      },
      {
        platform: "Twitter",
        icon: "FaXTwitter",
        url: "https://www.linkedin.com/in/rakibur-rahman-ratul/",
      },
    ],
    titleBgColor: "#e5e7eb",
    titleTextColor: "#111827",
    subtitleColor: "#6b7280",
    emailColor: "#111827",
    phoneColor: "#111827",
    socialTextColor: "#111827",
    iconColor: "#111827",
  },
  footer: {
    text: "© 2023 | Designed and coded with ❤️️ by Sagar Shah",
    bgColor: "#f3f4f6",
    textColor: "#111827",
  },
};

export default function DeveloperPortfolio() {
  const [isOpen, setIsOpen] = useState(false);
  const { root, nav, hero, about, skills, experience, work, contact, footer } =
    placeholders;

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
              className="absolute -right-10 -bottom-10 w-full h-full rounded-xl"
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
              <div className="absolute right-0 -bottom-14 w-full h-full bg-gray-200 rounded-xl"></div>
              <img
                src={about.aboutImage}
                alt="about profile"
                className="absolute left-10 z-10 w-72 rounded-xl border-8 border-white object-cover shadow-lg"
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
            <div className="flex gap-3 items-center font-bold text-2xl">
              <MdEmail style={{ color: contact.iconColor }} />
              <h1 style={{ color: contact.emailColor }}>{contact.email}</h1>
            </div>
            <div className="flex gap-3 justify-center items-center font-bold text-2xl">
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
