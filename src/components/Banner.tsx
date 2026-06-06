import { motion } from "motion/react";
import { ArrowRight, Database } from "lucide-react";

export function Banner() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-20 max-w-5xl mx-auto"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FF6B6B] to-[#ff8e5b] rounded-[32px] p-8 md:p-10 shadow-xl shadow-red-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-4">
              <Database className="w-3.5 h-3.5" />
              <span>Data Sharing</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
              成就傳承 成績回報計畫
            </h3>
            <p className="text-white/90 text-sm sm:text-base font-medium max-w-lg leading-relaxed">
              加入 TYCTW 數據庫，讓落點分析系統更加精準。<br className="hidden md:block" />
              你的回報，將成為下一屆學弟妹最寶貴的指南針。
            </p>
          </div>
          
          <a 
            href="https://tyctw.github.io/shared/" 
            target="_blank" 
            rel="noreferrer"
            className="flex-shrink-0 relative group inline-flex items-center justify-center px-8 py-4 bg-white text-[#FF6B6B] font-bold text-sm tracking-widest uppercase rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none"
          >
            <span className="relative z-10">前往回報系統</span>
            <ArrowRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
