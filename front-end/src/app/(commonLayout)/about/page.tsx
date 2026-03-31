"use client";

import { motion } from "framer-motion";
import {
  GoCheckCircle,
  GoCode,
  GoRocket,
  GoTelescope
} from "react-icons/go";

const features = [
  {
    icon: <GoCode className="w-8 h-8 text-blue-500" />,
    title: "Developer First",
    description: "Built by developers for developers, ensuring clean code and modern tech stacks."
  },
  {
    icon: <GoRocket className="w-8 h-8 text-purple-500" />,
    title: "Ultra Fast",
    description: "Optimized for speed and performance, delivering a seamless user experience."
  },
  {
    icon: <GoTelescope className="w-8 h-8 text-cyan-500" />,
    title: "Visionary Design",
    description: "Aesthetically pleasing templates that stand out from the crowd."
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f9fbff] via-[#e3f3ff] to-[#f9fbff] opacity-80" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Redefining Your <br />
            <span className="bg-clip-text">
              Digital Presence
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-600 font-medium"
          >
            Portfolio Studio is more than just a template engine. It's a precision tool 
            designed to help creators, developers, and businesses showcase their true potential.
          </motion.p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Vision</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                In an era dominated by digital noise, we believe in clarity. Our mission is to 
                provide the world with a streamlined platform where design meets functionality 
                without compromise.
              </p>
              <div className="space-y-4">
                {[
                  "Elite Design Systems",
                  "Cross-Platform Compatibility",
                  "One-Click Customization"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <GoCheckCircle className="text-blue-500 w-5 h-5" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio Workspace"
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-blue-600/10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Built for Excellence</h2>
            <div className="mt-2 w-20 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[100px]" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of professionals already using Portfolio Studio 
              to stand out in the digital landscape.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
            >
              Explore Templates
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
