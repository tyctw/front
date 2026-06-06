import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Menu, Zap, X, MapPin, Share2, Compass, Mail, BarChart3 } from "lucide-react";
import { useState } from "react";

export function Header({ onOpenSchedule }: { onOpenSchedule: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 w-full z-50 flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto w-full max-w-5xl glass-header rounded-[24px]"
        >
          <div className="px-5 sm:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center group cursor-default">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-[14px] bg-[#FF6B6B] shadow-lg shadow-red-200 transform group-hover:scale-105 transition-transform duration-300">
                  <Zap className="w-5 h-5 text-white fill-white" />
                  <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 bg-white rounded-md border-2 border-white flex items-center justify-center shadow-sm">
                    <span className="font-outfit text-[9px] font-black text-[#FF6B6B] leading-none tracking-tighter">
                      115
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex flex-col justify-center">
                  <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">
                    TYCTW<span className="text-[#4ECDC4] ml-1">會考查榜</span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="開啟導航選單"
                  className="p-2.5 rounded-[16px] text-slate-500 hover:text-[#FF6B6B] hover:bg-red-50 transition-all focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-[320px] bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <span className="text-xl font-black text-slate-900 flex items-center">
                  <div className="w-8 h-8 rounded-[10px] bg-[#FF6B6B] flex items-center justify-center mr-3 shadow-md shadow-red-200">
                    <Zap className="w-4 h-4 text-white fill-white" />
                  </div>
                  導航選單
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-[16px] hover:bg-slate-50 text-slate-400 hover:text-[#FF6B6B] transition-all focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSchedule();
                  }}
                  className="w-full flex items-center p-4 rounded-[24px] bg-[#FEFAF6] hover:bg-[#FFE66D]/20 text-[#E0A800] transition-colors group text-left"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">重要日程</div>
                    <div className="text-xs font-medium opacity-80">115會考時程表</div>
                  </div>
                </button>

                <a
                  href="https://tyctw.github.io/spare"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center p-4 rounded-[24px] bg-teal-50/50 hover:bg-[#4ECDC4]/10 text-[#4ECDC4] transition-colors group text-left block"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">落點分析</div>
                    <div className="text-xs font-medium opacity-80">精準志願評估</div>
                  </div>
                </a>

                <a
                  href="https://tyctw.github.io/score/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center p-4 rounded-[24px] bg-blue-50/50 hover:bg-blue-100/50 text-blue-500 transition-colors group text-left block"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">序位分享</div>
                    <div className="text-xs font-medium opacity-80">查閱各區排名</div>
                  </div>
                </a>

                <a
                  href="https://tyctw.github.io/shared/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center p-4 rounded-[24px] bg-red-50/50 hover:bg-[#FF6B6B]/10 text-[#FF6B6B] transition-colors group text-left block"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">成績分享</div>
                    <div className="text-xs font-medium opacity-80">回報您的分數</div>
                  </div>
                </a>
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-[#FEFAF6] text-center">
                <a 
                  href="mailto:tyctw.analyze@gmail.com"
                  className="inline-flex items-center justify-center space-x-2 text-sm text-slate-500 hover:text-[#FF6B6B] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-bold font-outfit tracking-wide">Contact Team</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
