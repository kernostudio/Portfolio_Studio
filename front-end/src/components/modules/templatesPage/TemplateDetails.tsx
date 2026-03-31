"use client";

import { useAuth } from "@/Auth/AuthContext";
import { templatesMap } from "@/components/tampletsMap/TampletsMap";
import UseAxiosPublic from "@/hooks/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  GoCheckCircle,
  GoChevronLeft,
  GoDeviceDesktop,
  GoInfo,
  GoRocket,
  GoScreenFull
} from "react-icons/go";

interface TemplateViewerProps {
  id: string;
}

export default function TemplateDetails({ id }: TemplateViewerProps) {
  const axiosPublic = UseAxiosPublic();
  const router = useRouter();
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["template", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/admin/templates/${id}`);
      return res.data.data;
    },
  });

  if (isLoading) return <DetailSkeleton />;
  if (isError || !data) return <ErrorState />;

  const TemplateComponent = templatesMap[data.slug?.toLowerCase()];

  const handleUseTemplate = () => {
    if (user) {
      router.push(`/templateCustomize/${data.id}`);
    } else {
      router.push(`/templates/signin?redirectTo=/templateCustomize/${data.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Sticky Top Bar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <GoChevronLeft className="w-5 h-5" />
            Back to Templates
          </button>
          
          <div className="flex gap-4">
            <button
              onClick={handleUseTemplate}
              className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <GoRocket className="w-4 h-4" />
              Use This Template
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              {data.category?.name || "Professional"}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {data.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              {data.description || "A premium, fully customizable portfolio template designed to showcase your best work with elegance."}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-6 lg:justify-end text-slate-500"
          >
            <div className="flex items-center gap-2">
              <GoCheckCircle className="text-green-500" />
              <span className="text-sm font-medium">Ready to Publish</span>
            </div>
            <div className="flex items-center gap-2">
              <GoScreenFull className="text-blue-500" />
              <span className="text-sm font-medium">Fully Responsive</span>
            </div>
            <div className="flex items-center gap-2">
              <GoDeviceDesktop className="text-purple-500" />
              <span className="text-sm font-medium">Live Preview</span>
            </div>
          </motion.div>
        </div>

        {/* Live Preview / Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          {/* Browser Frame Mockup */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
            <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
              </div>
              <div className="mx-auto bg-white rounded-md px-10 py-1 text-[10px] text-slate-400 font-mono border border-slate-200">
                preview.portfoliostudio.io/{data.slug}
              </div>
            </div>
            
            <div className="min-h-[600px] max-h-[800px] overflow-y-auto bg-white">
              {TemplateComponent ? (
                <div className="transform scale-[0.9] origin-top md:scale-100">
                  {/* Safety check: ensure placeholder exists and has root to prevent immediate crash */}
                  {data.placeholders && typeof data.placeholders === 'object' ? (
                    <TemplateComponent placeholder={data.placeholders} />
                  ) : (
                    <div className="p-20 text-center text-slate-500">
                      Sample Data Unavailable for this Preview
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-[600px] flex flex-col items-center justify-center bg-slate-50 text-center p-12">
                   <img 
                    src={data.templateImgUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"} 
                    alt="Template Snapshot"
                    className="w-full max-w-3xl rounded-xl shadow-lg mb-8 border border-slate-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800"; // Gradient fallback
                    }}
                   />
                   <div className="max-w-md">
                     <h3 className="text-xl font-bold text-slate-900 mb-2">Visual Insight</h3>
                     <p className="text-slate-500 mb-6 italic">"This is a high-fidelity visual representation of the layout structure."</p>
                     <button onClick={handleUseTemplate} className="text-blue-600 font-bold hover:underline">Start Editing to See Live →</button>
                   </div>
                </div>
              )}
            </div>
          </div>

          {/* Floating Use Button - Always visible for accessibility */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transition-all duration-300 transform">
             <button 
                onClick={handleUseTemplate}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-2xl hover:bg-blue-700 transition-colors flex items-center gap-2"
             >
               <GoRocket className="w-4 h-4" />
               Customize This Portfolio Now
             </button>
          </div>
        </motion.div>

        {/* Template Overview Section */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <GoInfo className="text-blue-500" />
              Template Overview
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              <p>
                Experience the perfect blend of modern aesthetics and high-performance architecture. 
                This template is engineered with a focus on visual storytelling and professional 
                credibility. Whether you are illustrating complex case studies or showcasing a 
                curated selection of your best work, the layout adapts to your personal brand.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                {[
                  "Optimized for conversion and lead capture",
                  "Built-in metadata for SEO performance",
                  "Dynamic grid systems for visual harmony",
                  "Typography pairs selected for maximum readability"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white p-4 rounded-xl border border-slate-100">
                    <GoCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h3 className="text-xl font-bold text-slate-900 mb-6 italic">Configuration Fields</h3>
            <div className="space-y-4">
               {Object.keys(data.placeholders || {}).map((key) => (
                 <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 text-sm">
                   <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                   <span className="font-mono text-xs bg-slate-50 px-2 py-1 rounded text-slate-400">Editable</span>
                 </div>
               ))}
               <div className="pt-6">
                  <p className="text-xs text-slate-400 mb-6 italic">Every aspect of this template can be fine-tuned to match your exact portfolio requirements.</p>
                  <button 
                    onClick={handleUseTemplate}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
                  >
                    Start Building
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">
      <div className="h-6 bg-slate-200 w-32 rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
        <div>
          <div className="h-4 bg-slate-200 w-24 rounded mb-4" />
          <div className="h-12 bg-slate-200 w-full rounded mb-4" />
          <div className="h-12 bg-slate-200 w-3/4 rounded" />
        </div>
      </div>
      <div className="h-[600px] bg-slate-100 rounded-2xl w-full" />
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Template Not Found</h2>
        <p className="text-slate-600 mb-6">The template you are looking for might have been moved or deleted.</p>
        <button className="text-blue-600 font-bold hover:underline">Back to Gallery</button>
      </div>
    </div>
  );
}
