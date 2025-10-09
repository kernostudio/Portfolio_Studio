// {
//   "root": {
//     "bgColor": "#ffffff"
//   },
//   "nav": {
//     "logo": {

//       "text": "MyBrand"
//     },
//     "links": [
//       { "label": "Home", "href": "/" },
//       { "label": "About", "href": "/about" },
//       { "label": "Work", "href": "/work" }
//     ],
//     "socials": [
//       { "platform": "facebook", "url": "https://fb.com" },
//       { "platform": "linkedin", "url": "https://linkedin.com" },
//       { "platform": "github", "url": "https://github.com" }
//     ],
//     "colors": {
//       "textColor": "#111827",
//       "hoverColor": "#7c3aed",
//       "bgColor": "#ffffff"
//     }
//   },
//   "hero": {
//     "jobTitle": "Product Designer",
//     "name": "Rakibur Rahman Ratul",
//     "summary": "based in Netherland.",
//     "cta": { "text": "Resume", "link": "/contact" },
//     "profileImage": "https://i.ibb.co/0V6W4QLT/Screenshot-4.png",
//     "colors": {
//       "textColor": "#111827",
//       "bgColor": "#ffffff",
//       "accentColor": "#facc15"
//     }
//   },
//   "about": {
//     "heading": "about.",
//     "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet vulputate tristique quam felis. Id phasellus dui orci vulputate consequat nulla proin. Id sit scelerisque neque, proin bibendum diam.",
//     "timeline": [
//       { "year": "2014-2018", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet vulputate tristique quam felis. Id phasellus dui orci vulputate consequat nulla proin. Id sit scelerisque neque, proin bibendum diam." },
//       { "year": "2014-2018", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet vulputate tristique quam felis. Id phasellus dui orci vulputate consequat nulla proin. Id sit scelerisque neque, proin bibendum diam." },
//       { "year": "2014-2018", "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet vulputate tristique quam felis. Id phasellus dui orci vulputate consequat nulla proin. Id sit scelerisque neque, proin bibendum diam." }
//     ]
//   },
//   "work": {
//     "heading": "My Work",
//     "items": [
//       {
//         "title": "Some Case Study",
//         "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed aliquam sollicitudin rhoncus morbi. Tincidunt quam sem elit a convallis. Eget ipsum, velit vitae eu nunc, consequat, at.",
//         "image": "https://i.ibb.co/cX1Wj5cj/Rectangle-8.png",
//         "date": "November 24, 2019"
//       },
//       {
//         "title": "Some Case Study",
//         "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed aliquam sollicitudin rhoncus morbi. Tincidunt quam sem elit a convallis. Eget ipsum, velit vitae eu nunc, consequat, at.",
//         "image": "https://i.ibb.co/RTXqhHDc/unsplash-ub-IWo074-Ql-U.png",
//         "date": "November 24, 2019"
//       }
//     ]
//   },
//   "contact": {
//     "heading": "contact.",
//     "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet vulputate tristique quam felis. Id phasellus dui orci vulputate consequat nulla proin. Id sit scelerisque neque, proin bibendum diam.",
//     "email": "johndoe@mail.com",
//     "phone": "0183849236856",
//     "website": "behance.com/johndoe",
//     "image": "https://i.ibb.co/JRkpMm2h/unsplash-2-Xht5-D22y0-I.png"
//   }
// }

// "use client";
// import React, { useState } from "react";
// import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

// export default function Page({placeholders}) {
//   const [isOpen, setIsOpen] = useState(false);

//   const { root, nav, hero, about, work, contact } = placeholders;

//   return (
//     <div
//       className="font-sans antialiased min-h-screen transition-colors duration-500"
//       style={{ backgroundColor: root.bgColor }}
//     >
//       {/* Inline styles for dynamic colors */}
//       <style>
//         {`
//           :root {
//             --nav-bg: ${nav.colors.bgColor};
//             --nav-text: ${nav.colors.textColor};
//             --nav-hover: ${nav.colors.hoverColor};
//             --hero-bg: ${hero.colors.bgColor};
//             --hero-text: ${hero.colors.textColor};
//             --accent-color: ${hero.colors.accentColor};
//           }
//           .nav-link:hover { color: var(--nav-hover) !important; }
//           .cta-btn { background-color: var(--accent-color); color: #111827; }
//           #nav-toggle:checked + .nav-mobile { display: block; }
//         `}
//       </style>

//       {/* ===== NAVBAR ===== */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)]">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center gap-3">
//               <div style={{ color: "var(--nav-text)", fontWeight: "bold" }}>
//                 {nav.logo.text}
//               </div>
//             </div>

//             <div className="hidden md:flex items-center gap-8">
//               {nav.links.map((link, idx) => (
//                 <a
//                   key={idx}
//                   href={link.href}
//                   className="nav-link text-sm font-medium transition-colors"
//                   style={{ color: "var(--nav-text)" }}
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </div>

//             <div className="hidden md:flex items-center gap-4">
//               {nav.socials.map((social, idx) => (
//                 <a
//                   key={idx}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-[var(--nav-text)] hover:text-[var(--nav-hover)] transition-colors"
//                 >
//                   {social.platform === "facebook" && <FaFacebook />}
//                   {social.platform === "linkedin" && <FaLinkedin />}
//                   {social.platform === "github" && <FaGithub />}
//                 </a>
//               ))}
//             </div>

//             <div className="md:hidden">
//               <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
//                 <svg
//                   className="w-7 h-7"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   style={{ color: "var(--nav-text)" }}
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="md:hidden px-6 pb-6 bg-[var(--nav-bg)]">
//             {nav.links.map((link, idx) => (
//               <a key={idx} href={link.href} className="block py-2 nav-link" style={{ color: "var(--nav-text)" }}>
//                 {link.label}
//               </a>
//             ))}
//           </div>
//         )}
//       </nav>

//       {/* ===== HERO ===== */}
//       <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8 bg-[var(--hero-bg)]">
//         <div className="flex-1">
//           <div className="text-sm uppercase font-semibold tracking-wide mb-2" style={{ color: "var(--hero-text)" }}>
//             {hero.jobTitle}
//           </div>
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "var(--hero-text)" }}>
//             {hero.name}
//           </h1>
//           <p className="max-w-xl mb-6" style={{ color: "var(--hero-text)" }}>
//             {hero.summary}
//           </p>
//           <a href={hero.cta.link} className="inline-block px-6 py-3 rounded-lg cta-btn font-medium">
//             {hero.cta.text}
//           </a>
//         </div>
//         <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden border-4 border-white">
//           <img src={hero.profileImage} alt="profile" className="w-full h-full object-cover" />
//         </div>
//       </section>

//       {/* ===== ABOUT ===== */}
//       <section className="max-w-6xl mx-auto px-6 py-12">
//         <div className="md:w-1/2">
//           <h2 className="text-2xl md:text-[48px] font-bold mb-4">{about.heading}</h2>
//           <p className="text-gray-700 mb-6">{about.text}</p>
//         </div>
//         <div className="space-y-7 mt-28">
//           {about.timeline.map((item, idx) => (
//             <div key={idx} className="flex gap-2">
//               <div className="flex-shrink-0">•</div>
//               <div>
//                 <h1 className="text-xl font-semibold">{item.year}</h1>
//                 <p>{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== WORK ===== */}
//       <section className="max-w-6xl mx-auto px-6 py-12">
//         <div className="md:w-1/2">
//           <h2 className="text-2xl md:text-[48px] font-bold mb-4">{work.heading}</h2>
//         </div>
//         <div className="lg:flex justify-between mt-20 gap-20">
//           {work.items.map((item, idx) => (
//             <div key={idx}>
//               <img src={item.image} alt={item.title} />
//               <p className="mt-1">{item.date}</p>
//               <h1 className="font-bold text-2xl">{item.title}</h1>
//               <p>{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== CONTACT ===== */}
//       <section className="max-w-6xl mx-auto px-6 py-12">
//         <h2 className="text-2xl lg:text-6xl font-bold mb-4">{contact.heading}</h2>
//         <div className="mt-12 lg:flex justify-between gap-10">
//           <img src={contact.image} alt="contact" />
//           <div className="space-y-5">
//             <p>{contact.text}</p>
//             <p>{contact.email}</p>
//             <p>{contact.phone}</p>
//             <p>{contact.website}</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
