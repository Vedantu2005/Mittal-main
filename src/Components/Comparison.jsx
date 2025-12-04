import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const Comparison = () => {
  const comparisons = [
    { left: "Promised Lifetime Support", right: "No Lifetime Support" },
    { left: "5 Pillar Strategy", right: "Branding Implemented Superficially" },
    { left: "Feedback Value Based Approach", right: "Money-Driven Approach" },
    { left: "Ideal for Long-Term Organic Growth", right: "Short-Term Inorganic Gains" },
    { left: "ISO 9001:2015 QMS Implemented", right: "Not Implemented by Many Companies" },
    { left: "Multinational Community Support", right: "Very Rare in the Industry" },
  ];

  return (
    <div className="min-h-screen w-full bg-black/90 flex flex-col items-center pt-16 px-4 text-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-semibold text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text"
      >
        Mittal Brand Vs Other Companies
      </motion.h1>

{/* ===================== MOBILE TABLE VIEW ===================== */}
<div className="w-full max-w-3xl md:hidden flex flex-col gap-4">
  {/* Table Header */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className="grid grid-cols-2 bg-white/10 backdrop-blur-xl border border-gray-700 p-3 rounded-lg text-center font-semibold"
  >
    <p className="text-blue-300">Mittal Company</p>
    <p className="text-red-300">Other Companies</p>
  </motion.div>

  {/* Table Rows */}
  {comparisons.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      }}
      className="grid grid-cols-2 bg-white/5 backdrop-blur-xl border border-gray-700 p-3 rounded-lg text-sm"
    >
      {/* LEFT TEXT — ONLY LETTER COLOR PULSES */}
      <div className="border-r border-gray-700 pr-2">
        <p className="animate-[pulseGreenText_2s_ease-in-out_infinite]">
          {item.left}
        </p>
      </div>

      {/* RIGHT TEXT — ONLY LETTER COLOR PULSES */}
      <div className="pl-2">
        <p className="animate-[pulseRedText_2s_ease-in-out_infinite]">
          {item.right}
        </p>
      </div>
    </motion.div>
  ))}
</div>


      {/* ===================== DESKTOP SPLIT VIEW ===================== */}
      <div className="hidden md:grid relative grid-cols-2 gap-10 max-w-6xl w-full mt-10">
        {/* Center Divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

        {/* LEFT COLUMN — Mittal Company */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-bold mb-6 text-blue-300"
          >
            Mittal Company
          </motion.h2>

          <div className="flex flex-col gap-6">
            {comparisons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className="p-5 rounded-xl bg-white/5 backdrop-blur-xl border border-gray-700 shadow-lg 
                hover:shadow-blue-500/30 hover:-translate-y-2 transition-all duration-400"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-blue-400" size={22} />
                  <p className="text-lg">{item.left}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — Other Companies */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl font-bold mb-6 text-red-300"
          >
            Other Companies
          </motion.h2>

          <div className="flex flex-col gap-6">
            {comparisons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className="p-5 rounded-xl bg-white/5 backdrop-blur-xl border border-gray-700 shadow-lg 
                hover:shadow-red-500/30 hover:-translate-y-2 transition-all duration-400"
              >
                <div className="flex items-center gap-3">
                  <XCircle className="text-red-400" size={22} />
                  <p className="text-lg">{item.right}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Comparison;
