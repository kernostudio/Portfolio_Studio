import bcrypt from "bcrypt";
import { prisma } from "../config/config";

export const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables"
    );
  }

  const adminExist = await prisma.user.findUnique({
    where: { email },
  });

  if (adminExist) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUND)
  );

  const payload = {
    password: hashedPassword,
    email,
    role: "admin",
    fullName: "Admin",
  };

  const admin = await prisma.user.create({
    data: payload,
  });

  console.log("Admin seeded successfully:", admin.email);
};

export const seedCategories = async () => {
  const categories = [
    { name: "Personal", description: "Personal portfolio templates" },
    { name: "Business", description: "Business and corporate templates" },
    { name: "Developer", description: "Portfolio for web and software developers" },
    { name: "Photography", description: "Showcase for photographers" },
    { name: "Agency", description: "Templates for digital agencies" },
  ];

  const count = await prisma.category.count();
  if (count > 0) {
    // console.log("Categories already exist");
    return;
  }

  await prisma.category.createMany({
    data: categories,
  });

  console.log("Default categories seeded successfully");
};

const devPlaceholder1 = {
  root: { bgColor: "#030712", textColor: "#f9fafb" },
  nav: {
    logo: { text: "QUANTUM_CODE", accentColor: "#3b82f6" },
    links: [{ label: "Home", href: "home" }, { label: "Architecture", href: "experience" }, { label: "Vault", href: "work" }],
    ctaButton: { text: "Protocol Startup", url: "#", bgColor: "#3b82f6", textColor: "#ffffff" },
    colors: { bgColor: "#030712", textColor: "#f9fafb", accentColor: "#3b82f6", hoverColor: "#60a5fa" }
  },
  hero: {
    name: "Caleb Rivers", greeting: "Protocol Initialized", title: "Infrastructure Engineer", description: "Building resilient, high-throughput backend systems for the next decade.",
    location: "Zurich, CH", availability: true, profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
    imageBorderColor: "#3b82f6", imageShadowColor: "rgba(59, 130, 246, 0.2)", accentColor: "#3b82f6",
    textColor: "#f9fafb", descriptionColor: "#9ca3af", locationColor: "#d1d5db", availabilityColor: "#10b981"
  },
  about: {
    title: "The Vision", heading: "Solving Scalability", paragraphs: ["I specialize in distributed databases and zero-trust security architecture."],
    quickBits: ["Ex-Google", "Open Source Lead"], finalParagraph: "Standardizing the impossible.",
    aboutImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800",
    bgColor: "#111827", textColor: "#f9fafb", headingColor: "#f9fafb", paragraphColor: "#9ca3af",
    quickBitsColor: "#3b82f6", titleBgColor: "#1f2937", titleTextColor: "#f9fafb"
  },
  skills: {
    title: "Technological Core", items: [{ name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" }],
    titleBgColor: "#1f2937", titleTextColor: "#f9fafb", skillNameColor: "#f9fafb", bgColor: "#030712"
  },
  experience: {
    showSection: true, title: "Trajectory", subtitle: "Operational History",
    experiences: [{ title: "Founding Engineer", company: "SecureFlow", period: "2019-now", locationType: "On-site", description: "Secured $50M in series B via tech audit.", technologies: ["Rust", "AWS"], borderColor: "#3b82f6", titleColor: "#f9fafb", companyColor: "#f9fafb", periodColor: "#9ca3af", descriptionColor: "#9ca3af", techBgColor: "#1f2937", techTextColor: "#3b82f6" }],
    bgColor: "#111827", titleBgColor: "#1f2937", titleTextColor: "#f9fafb", subtitleColor: "#9ca3af", cardBgColor: "#1f2937"
  },
  work: {
    title: "The Vault", subtitle: "Production-ready systems",
    projects: [{ name: "Ether-Gate", description: "L2 scaling solution.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=800", technologies: [{ name: "Solidity", bgColor: "#3b82f6", textColor: "#fff" }], link: "#", layout: "left", projectNameColor: "#f9fafb", descriptionColor: "#9ca3af", cardBgColor: "#1f2937" }],
    titleBgColor: "#1f2937", titleTextColor: "#f9fafb", subtitleColor: "#9ca3af"
  },
  contact: {
    title: "Secure Channel", subtitle: "Initiate contact", email: "caleb@quantum.io", phone: "+41-99", socialText: "Metadata",
    socialLinks: [{ platform: "Github", icon: "FaGithub", url: "#" }],
    titleBgColor: "#1f2937", titleTextColor: "#f9fafb", subtitleColor: "#9ca3af", emailColor: "#f9fafb", phoneColor: "#f9fafb", socialTextColor: "#9ca3af", iconColor: "#3b82f6"
  },
  footer: { text: "© 2026 Quantum Code Labs", bgColor: "#030712", textColor: "#9ca3af" }
};

const devPlaceholder2 = {
  ...devPlaceholder1,
  root: { bgColor: "#000000", textColor: "#ff00ff" },
  nav: { ...devPlaceholder1.nav, logo: { text: "GLITCH_CANVAS", accentColor: "#ff00ff" }, colors: { ...devPlaceholder1.nav.colors, bgColor: "#000000", accentColor: "#ff00ff", hoverColor: "#ffffff" } },
  hero: { ...devPlaceholder1.hero, name: "Sora Night", title: "Creative Technologist", description: "Where generative art meets interactive frontend.", profileImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800", accentColor: "#ff00ff" },
  work: { ...devPlaceholder1.work, title: "Exhibitions", projects: [{ name: "Neon-Dream", description: "WebGPU sandbox.", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800", technologies: [{ name: "GLSL", bgColor: "#ff00ff", textColor: "#fff" }], link: "#", layout: "left", projectNameColor: "#ff00ff", descriptionColor: "#fff", cardBgColor: "#111" }] }
};

const designerPlaceholder1 = {
  root: { bgColor: "#ffffff" },
  nav: {
    logo: { text: "AURA_DESIGN", accentColor: "#6366f1" },
    links: [{ label: "Showcase", href: "projects" }, { label: "Capabilities", href: "services" }],
    ctaButton: { text: "Start a Sprint", url: "#", bgColor: "#6366f1", textColor: "#ffffff" },
    colors: { bgColor: "#ffffff", textColor: "#1f2937", hoverColor: "#6366f1", accentColor: "#6366f1" }
  },
  hero: {
    greeting: "Hey there,", name: "Julian Gray", title: "Lead Product Designer", description: "Bridging the gap between user needs and business objectives.",
    ctaButton: { text: "View Case Studies", url: "#", bgColor: "#6366f1", textColor: "#ffffff" },
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800",
    colors: { bgColor: "#f9fafb", textColor: "#1f2937", accentColor: "#6366f1", hoverColor: "#4f46e5" }
  },
  about: {
    heading: "Strategy-First Design", description: "I don't just push pixels; I solve marketplace problems.",
    skills: [{ name: "Design Systems", level: 95 }, { name: "Business Strategy", level: 88 }],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    colors: { textColor: "#1f2937", accentColor: "#6366f1" }
  },
  services: {
    heading: "Offerings", description: "Enterprise-grade design services.",
    items: [{ title: "Product Audit", description: "Uncover UX debt.", icon: "https://cdn-icons-png.flaticon.com/512/1055/1055644.png", bgColor: "#f5f3ff", hoverBgColor: "#ede9fe" }]
  },
  projects: {
    heading: "Milestones", description: "Impactful work for global brands.",
    items: [{ title: "Eco-Track SaaS", description: "Carbon tracking UI.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800", link: "#", tags: ["Sustainability", "Enterprise"] }]
  },
  contact: {
    heading: "Collaborate", description: "Looking for a design lead to join your team?",
    items: [{ type: "LinkedIn", label: "Professional Profile", value: "Julian Gray Designer", description: "Check my endorsements." }],
    cta: { title: "Strategy Session", description: "Free 30-min consultation.", buttonText: "Book Now", buttonUrl: "#" }
  },
  footer: {
    logo: { text: "AURA", accentColor: "#6366f1" },
    links: [{ label: "Terms", href: "home" }],
    socials: [{ platform: "Twitter", url: "#", icon: "FaTwitter" }],
    copyright: "© 2026 Aura Design Studio",
    colors: { bgColor: "#ffffff", textColor: "#1f2937", accentColor: "#6366f1", hoverColor: "#4f46e5" }
  }
};

const designerPlaceholder2 = {
  ...designerPlaceholder1,
  root: { bgColor: "#fffbeb" },
  nav: { ...designerPlaceholder1.nav, logo: { text: "MINT_STRATEGY", accentColor: "#059669" }, colors: { ...designerPlaceholder1.nav.colors, accentColor: "#059669", hoverColor: "#10b981" } },
  hero: { ...designerPlaceholder1.hero, name: "Lila Chen", title: "Growth & UX Designer", description: "Optimizing conversion funnels through iterative design tests.", profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800", colors: { ...designerPlaceholder1.hero.colors, accentColor: "#059669" } },
  projects: { ...designerPlaceholder1.projects, items: [{ title: "Checkout Flow", description: "Reducing churn by 40%.", image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=800", link: "#", tags: ["E-commerce", "Growth"] }] }
};

const productPlaceholder1 = {
  root: { bgColor: "#fafafa" },
  nav: {
    logo: { text: "VERDANT_LENS", accentColor: "#16a34a" },
    colors: { bgColor: "#ffffff", textColor: "#171717", hoverColor: "#16a34a" },
    links: [{ label: "Flora", href: "work" }, { label: "Bio", href: "about" }],
    socials: [{ platform: "Instagram", url: "#", icon: "FaInstagram" }]
  },
  hero: {
    colors: { bgColor: "#ffffff", textColor: "#171717", accentColor: "#16a34a" },
    name: "Oliver Moss", jobTitle: "Macro Photographer", summary: "Exploring the hidden world of forest floors.",
    profileImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=800",
    cta: { text: "Deep Dive", link: "work" }
  },
  about: {
    heading: "The Microverse", text: "Specialized in 1:1 macro photography of rare fungi.",
    timeline: [{ year: "2024", desc: "Exhibited at the Royal Botanic Gardens." }]
  },
  work: {
    heading: "Specimens",
    items: [{ title: "Fungal Bloom", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800", desc: "A study in spores.", date: "March 2024" }]
  },
  contact: {
    heading: "Book a Shoot", text: "Available for scientific publications.", image: "https://images.unsplash.com/photo-1452781212413-44185739b67b?q=80&w=800",
    email: "oliver@moss.bio", phone: "+44-77", website: "verdantlens.co"
  }
};

const productPlaceholder2 = {
  ...productPlaceholder1,
  root: { bgColor: "#451a03" },
  nav: { ...productPlaceholder1.nav, logo: { text: "ONYX_WILD", accentColor: "#f59e0b" }, colors: { bgColor: "#451a03", textColor: "#fef3c7", hoverColor: "#fbbf24" } },
  hero: { ...productPlaceholder1.hero, name: "Irene Stone", jobTitle: "Wildlife Cinematographer", summary: "Documenting the untamed predators of the Kalahari.", profileImage: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=800", colors: { bgColor: "#451a03", textColor: "#fef3c7", accentColor: "#f59e0b" } },
  work: { ...productPlaceholder1.work, heading: "Expeditions", items: [{ title: "Apex Shadow", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=800", desc: "Midnight capture of a lioness.", date: "Jan 2024" }] }
};

const personalPlaceholder1 = {
  ...designerPlaceholder1,
  root: { bgColor: "#ffffff" },
  nav: { ...designerPlaceholder1.nav, logo: { text: "ALEX_LOGS", accentColor: "#0f172a" } },
  hero: { ...designerPlaceholder1.hero, name: "Alex River", title: "Cultural Critic & Writer", description: "Essays on the intersection of tech and philosophy.", profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" }
};

const personalPlaceholder2 = {
  ...designerPlaceholder1,
  root: { bgColor: "#fafafa" },
  nav: { ...designerPlaceholder1.nav, logo: { text: "CV_PRO", accentColor: "#2563eb" } },
  hero: { ...designerPlaceholder1.hero, name: "Jordan Smith", title: "Sales Executive", description: "Results-driven leader with 10 years in enterprise SaaS.", profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800" }
};

const agencyPlaceholder1 = {
  ...productPlaceholder1,
  nav: { ...productPlaceholder1.nav, logo: { text: "VIBE_AGENCY", accentColor: "#ec4899" } },
  hero: { ...productPlaceholder1.hero, name: "Studio Vibe", jobTitle: "Full Service Agency", summary: "We build brands that people talk about.", profileImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800" }
};

const agencyPlaceholder2 = {
  ...productPlaceholder1,
  nav: { ...productPlaceholder1.nav, logo: { text: "CORE_STRATEGY", accentColor: "#1e40af" } },
  hero: { ...productPlaceholder1.hero, name: "Core Strategy", jobTitle: "Branding Boutique", summary: "Defining the essence of your business.", profileImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800" }
};

export const seedTemplates = async () => {
  // Clear existing templates to avoid duplicates and ensure a fresh state
  await prisma.template.deleteMany();

  const categories = await prisma.category.findMany();
  const templates = [
    // Developer
    {
      title: "Senior Software Architect",
      description: "Dark-themed, professional portfolio for lead engineers.",
      templateImgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
      slug: "developer-portfolio-1",
      placeholders: devPlaceholder1,
      categoryName: "Developer",
    },
    {
      title: "Pixel Perfect Frontend",
      description: "Vibrant, neon-themed portfolio for frontend specialists.",
      templateImgUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
      slug: "developer-portfolio-1",
      placeholders: devPlaceholder2,
      categoryName: "Developer",
    },
    // Business
    {
      title: "Executive UI Strategist",
      description: "Clean, banking-grade interface for strategists.",
      templateImgUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      slug: "uiux-designer-1",
      placeholders: designerPlaceholder1,
      categoryName: "Business",
    },
    {
      title: "Growth Hacker UI",
      description: "Fast-moving, colorful design for modern businesses.",
      templateImgUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1200",
      slug: "uiux-designer-1",
      placeholders: designerPlaceholder2,
      categoryName: "Business",
    },
    // Personal
    {
      title: "Cultural Critic Persona",
      description: "Clean layout for writers and thinkers.",
      templateImgUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
      slug: "uiux-designer-1",
      placeholders: personalPlaceholder1,
      categoryName: "Personal",
    },
    {
      title: "Executive Digital Resume",
      description: "Professional resume for enterprise leaders.",
      templateImgUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200",
      slug: "uiux-designer-1",
      placeholders: personalPlaceholder2,
      categoryName: "Personal",
    },
    // Photography
    {
      title: "Micro-Photography Gallery",
      description: "Dedicated to the beauty of the small world.",
      templateImgUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1200",
      slug: "product-designer-1",
      placeholders: productPlaceholder1,
      categoryName: "Photography",
    },
    {
      title: "Apex Wildlife Journal",
      description: "Rugged layout for high-intensity wildlife photography.",
      templateImgUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200",
      slug: "product-designer-1",
      placeholders: productPlaceholder2,
      categoryName: "Photography",
    },
    // Agency
    {
      title: "Vibe Branding Labs",
      description: "High-energy workspace for creative teams.",
      templateImgUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
      slug: "product-designer-1",
      placeholders: agencyPlaceholder1,
      categoryName: "Agency",
    },
    {
      title: "Strategic Core Studio",
      description: "Elegant, minimalist studio for high-end branding.",
      templateImgUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
      slug: "product-designer-1",
      placeholders: agencyPlaceholder2,
      categoryName: "Agency",
    },
  ];

  for (const t of templates) {
    const category = categories.find((c) => c.name === t.categoryName);
    if (category) {
      const result = await prisma.template.create({
        data: {
          title: t.title,
          description: t.description,
          templateImgUrl: t.templateImgUrl,
          slug: t.slug,
          placeholders: t.placeholders,
          categoryId: category.id,
        },
      });
      await prisma.template.update({
        where: { id: result.id },
        data: { previewUrl: `/${result.id}` },
      });
    }
  }

  console.log("10 Sample templates seeded successfully (2 per category)");
};
