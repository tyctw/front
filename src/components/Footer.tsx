import { Mail, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#FEFAF6] rounded-[40px] p-8 md:p-12 flex flex-col items-center text-center border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE66D]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B6B]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#FF6B6B] mb-6 relative z-10 rotate-3 hover:rotate-0 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 relative z-10">TW會考落點分析</h2>
          <p className="text-slate-500 font-medium text-sm md:text-base mb-8 relative z-10">
            TW會考落點分析<br className="sm:hidden" />
            非官方數據與落點分析平台
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 relative z-10">
            <a href="https://tyctw.github.io/spare" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-[#4ECDC4] hover:shadow-md transition-all border border-slate-100">
              落點分析
            </a>
            <a href="https://tyctw.github.io/shared/" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-[#E0A800] hover:shadow-md transition-all border border-slate-100">
              成績回報
            </a>
            <a href="https://tyctw.github.io/score/" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-[#FF6B6B] hover:shadow-md transition-all border border-slate-100">
              序位分享
            </a>
            <a href="mailto:tyctw.analyze@gmail.com" className="px-5 py-2.5 bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-[#4ECDC4] hover:shadow-md transition-all border border-slate-100 flex items-center">
              <Mail className="w-4 h-4 mr-2" /> 聯繫團隊
            </a>
          </div>

          <div className="w-full h-px bg-slate-200/50 mb-8 relative z-10"></div>
          
          <div className="flex flex-col items-center space-y-2 relative z-10">
            <p className="text-xs font-outfit font-black tracking-[0.2em] text-slate-400 uppercase">
              本網站屬於 TW會考落點分析 團隊
            </p>
            <p className="text-[10px] text-slate-400/80 font-bold tracking-wider">
              不隸屬於官方免試入學委員會
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
