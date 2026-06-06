import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ_DATA } from "../data";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-32 mb-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-outfit text-sm font-bold tracking-widest text-[#FF6B6B] uppercase mb-4 block">FAQ</span>
          <h3 className="text-4xl font-black text-slate-900 italic tracking-tight">常見問題解答</h3>
        </div>
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-[24px] overflow-hidden border transition-all duration-300 ${isOpen ? 'border-[#4ECDC4] shadow-lg shadow-teal-50' : 'border-slate-100 shadow-sm hover:shadow-md'}`}
              >
                <button 
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center space-x-4 pr-4">
                    <div className="w-10 h-10 bg-[#FFE66D]/20 rounded-[14px] hidden sm:flex items-center justify-center shrink-0 text-[#E0A800] font-black text-lg italic font-outfit">
                      Q
                    </div>
                    <span className={`font-bold text-lg sm:text-xl transition-colors duration-300 ${isOpen ? 'text-[#4ECDC4]' : 'text-slate-800'}`}>
                      {item.q}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-[12px] flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-[#4ECDC4] text-white' : 'bg-slate-50 text-slate-400'}`}>
                    <Plus className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 sm:pt-4 sm:ml-14">
                        <p className="text-slate-500 leading-relaxed text-sm sm:text-base font-medium">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
