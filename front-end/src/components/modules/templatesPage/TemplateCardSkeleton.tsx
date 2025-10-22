"use client";
import { motion } from "framer-motion";

export default function TemplateCardSkeleton() {
  return (
    <motion.div
      className="p-4 border border-gray-200 rounded-2xl bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full h-40 bg-gray-200 rounded-xl relative overflow-hidden mb-4">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="h-5 w-3/4 bg-gray-200 rounded mb-3 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="h-4 w-1/3 bg-gray-200 rounded mb-3 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="h-4 w-full bg-gray-200 rounded mb-2 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="h-4 w-5/6 bg-gray-200 rounded relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
}
