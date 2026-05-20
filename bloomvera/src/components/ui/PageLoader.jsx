import React from "react";
import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-orange-100 border-t-orange-500"
        />
        <p className="text-sm text-muted font-sans">Loading...</p>
      </div>
    </div>
  );
}
