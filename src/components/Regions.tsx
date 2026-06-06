import { motion } from "motion/react";
import React, { useState } from "react";
import { REGIONS } from "../data";
import { Compass, LayoutGrid, Map as MapIcon, MapPin, Search, ArrowUpRight, X } from "lucide-react";
import { cn } from "../lib/utils";

const CATEGORIES = ['ALL', '北部區域', '中部區域', '南部區域', '東部區域', '離島區域'];

const cMapClasses = [
  "hover:shadow-[#FF6B6B]/20 hover:border-[#FF6B6B]/30 text-[#FF6B6B] hover:bg-[#FF6B6B]/5",
  "hover:shadow-[#4ECDC4]/20 hover:border-[#4ECDC4]/30 text-[#4ECDC4] hover:bg-[#4ECDC4]/5",
  "hover:shadow-[#E0A800]/20 hover:border-[#E0A800]/30 text-[#E0A800] hover:bg-[#FFE66D]/10",
];

const colorMap: Record<string, string> = {
  blue: cMapClasses[1],
  indigo: cMapClasses[1],
  teal: cMapClasses[1],
  emerald: cMapClasses[1],
  orange: cMapClasses[2],
  lime: cMapClasses[2],
  amber: cMapClasses[2],
  red: cMapClasses[0],
  rose: cMapClasses[0],
  pink: cMapClasses[0],
  violet: cMapClasses[0],
  purple: cMapClasses[0],
  fuchsia: cMapClasses[0],
  sky: cMapClasses[1],
  yellow: cMapClasses[2],
};

const iconMap: Record<string, { bg: string, text: string, groupBg: string }> = {
  blue: { bg: "bg-[#4ECDC4]/10", text: "text-[#4ECDC4]", groupBg: "group-hover:bg-[#4ECDC4]" },
  indigo: { bg: "bg-[#4ECDC4]/10", text: "text-[#4ECDC4]", groupBg: "group-hover:bg-[#4ECDC4]" },
  teal: { bg: "bg-[#4ECDC4]/10", text: "text-[#4ECDC4]", groupBg: "group-hover:bg-[#4ECDC4]" },
  emerald: { bg: "bg-[#4ECDC4]/10", text: "text-[#4ECDC4]", groupBg: "group-hover:bg-[#4ECDC4]" },
  orange: { bg: "bg-[#FFE66D]/20", text: "text-[#E0A800]", groupBg: "group-hover:bg-[#FFE66D]" },
  lime: { bg: "bg-[#FFE66D]/20", text: "text-[#E0A800]", groupBg: "group-hover:bg-[#FFE66D]" },
  amber: { bg: "bg-[#FFE66D]/20", text: "text-[#E0A800]", groupBg: "group-hover:bg-[#FFE66D]" },
  red: { bg: "bg-[#FF6B6B]/10", text: "text-[#FF6B6B]", groupBg: "group-hover:bg-[#FF6B6B]" },
  rose: { bg: "bg-[#FF6B6B]/10", text: "text-[#FF6B6B]", groupBg: "group-hover:bg-[#FF6B6B]" },
  pink: { bg: "bg-[#FF6B6B]/10", text: "text-[#FF6B6B]", groupBg: "group-hover:bg-[#FF6B6B]" },
  violet: { bg: "bg-[#FF6B6B]/10", text: "text-[#FF6B6B]", groupBg: "group-hover:bg-[#FF6B6B]" },
  purple: { bg: "bg-[#FF6B6B]/10", text: "text-[#FF6B6B]", groupBg: "group-hover:bg-[#FF6B6B]" },
  fuchsia: { bg: "bg-[#FF6B6B]/10", text: "text-[#FF6B6B]", groupBg: "group-hover:bg-[#FF6B6B]" },
  sky: { bg: "bg-[#4ECDC4]/10", text: "text-[#4ECDC4]", groupBg: "group-hover:bg-[#4ECDC4]" },
  yellow: { bg: "bg-[#FFE66D]/20", text: "text-[#E0A800]", groupBg: "group-hover:bg-[#FFE66D]" },
};

export function Regions({ onWarnUrl }: { onWarnUrl: (url: string) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const filtered = REGIONS.filter(r => {
    const matchSearch = r.name.includes(search) || r.category.includes(search);
    const matchCat = category === 'ALL' || r.category === category;
    return matchSearch && matchCat;
  });

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-24"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-2 w-8 bg-[#FFE66D] rounded-full"></div>
            <span className="text-xs font-black text-[#8a7a2a] uppercase tracking-[0.2em] font-outfit">Portal Select</span>
          </div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">
            選擇就學區
          </h3>
        </div>

        <div className="w-full md:w-80 relative group z-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-12 pr-10 py-4 glass-card text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]/50 focus:border-[#4ECDC4] transition-all duration-300 max-w-full" 
            placeholder="搜尋區域..." 
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <div className="p-1.5 rounded-lg hover:bg-slate-200/50 text-slate-400 transition-colors">
                <X className="h-4 w-4" />
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        <div className="flex space-x-2 min-w-max">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => { setCategory(cat); setSearch(""); }}
              className={cn(
                "flex items-center px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                category === cat 
                  ? "bg-[#4ECDC4] text-white shadow-xl shadow-teal-100 border-transparent" 
                  : "bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:bg-slate-50"
              )}
            >
              {cat === 'ALL' ? <LayoutGrid className="w-4 h-4 mr-2" /> : <MapIcon className="w-4 h-4 mr-2" />}
              {cat === 'ALL' ? '全部顯示' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 glass-card rounded-[2rem] border-dashed border-2 border-slate-200">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <Compass className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-xl font-bold text-slate-800 mb-2">找不到符合的區域</p>
            <button 
              onClick={() => { setSearch(""); setCategory("ALL"); }}
              className="mt-4 px-6 py-2 bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              清除搜尋條件
            </button>
          </div>
        ) : category === 'ALL' && !search ? (
          <div className="space-y-12">
            {CATEGORIES.map(cat => {
              if (cat === 'ALL') return null;
              const subList = filtered.filter(x => x.category === cat);
              if (subList.length === 0) return null;
              
              return (
                <div key={cat} className="animate-fade-in-up">
                  <div className="flex items-center mb-6">
                    <h4 className="text-2xl font-black text-slate-900 italic bg-white/50 px-4 py-1.5 rounded-xl border border-slate-100/50 backdrop-blur-sm">{cat}</h4>
                    <div className="ml-4 flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {subList.map(r => (
                      <RegionCard key={r.id} r={r} onClick={() => onWarnUrl(r.url)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 animate-fade-in-up">
            {filtered.map(r => (
              <RegionCard key={r.id} r={r} onClick={() => onWarnUrl(r.url)} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}

function RegionCard({ r, onClick }: { r: any, onClick: () => void }) {
  const cMap = colorMap[r.colorClass] || colorMap['blue'];
  const iMap = iconMap[r.colorClass] || iconMap['blue'];
  
  return (
    <button 
      onClick={onClick}
      className={cn(
        "group relative flex flex-col text-left overflow-hidden rounded-[32px] glass-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-200/50",
        cMap
      )}
    >
      <div className="relative z-10 flex-1 flex flex-col justify-between w-full">
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className={cn(
              "inline-flex items-center justify-center w-12 h-12 rounded-[20px] group-hover:-rotate-6 transition-transform duration-300",
              iMap.bg, iMap.text
            )}>
              <MapPin className="w-6 h-6" />
            </span>
            <div className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 transition-colors duration-300",
               iMap.groupBg
            )}>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          <h3 className={cn("text-2xl font-black text-slate-900 mb-1 tracking-tight transition-colors", iMap.text.replace("text-", "group-hover:text-"))}>
            {r.name}
          </h3>
          <p className="text-xs font-outfit font-bold text-slate-400 uppercase tracking-widest mt-2 opacity-80">Portal</p>
        </div>
      </div>
      <Compass className={cn("absolute -bottom-8 -right-8 w-40 h-40 opacity-10 transition-colors duration-500 -rotate-12 pointer-events-none", iMap.text)} />
    </button>
  );
}
