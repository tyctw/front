import { motion } from "motion/react";
import { useState } from "react";
import { REGIONS } from "../data";
import { ArrowUpRight, Compass, LayoutGrid, Map as MapIcon, MapPin, Search, X } from "lucide-react";
import { cn } from "../lib/utils";

const CATEGORIES = ["ALL", "北部區域", "中部區域", "南部區域", "東部區域", "離島區域"];

const categoryLabel: Record<string, string> = {
  ALL: "全部區域",
};

const accents: Record<string, { glow: string; icon: string; bg: string }> = {
  blue: { glow: "from-sky-400/28", icon: "text-sky-600", bg: "bg-sky-50" },
  indigo: { glow: "from-indigo-400/28", icon: "text-indigo-600", bg: "bg-indigo-50" },
  teal: { glow: "from-teal-400/28", icon: "text-teal-600", bg: "bg-teal-50" },
  emerald: { glow: "from-emerald-400/28", icon: "text-emerald-600", bg: "bg-emerald-50" },
  orange: { glow: "from-orange-400/28", icon: "text-orange-600", bg: "bg-orange-50" },
  lime: { glow: "from-lime-400/28", icon: "text-lime-700", bg: "bg-lime-50" },
  amber: { glow: "from-amber-400/28", icon: "text-amber-700", bg: "bg-amber-50" },
  red: { glow: "from-red-400/28", icon: "text-red-600", bg: "bg-red-50" },
  rose: { glow: "from-rose-400/28", icon: "text-rose-600", bg: "bg-rose-50" },
  pink: { glow: "from-pink-400/28", icon: "text-pink-600", bg: "bg-pink-50" },
  violet: { glow: "from-violet-400/28", icon: "text-violet-600", bg: "bg-violet-50" },
  purple: { glow: "from-purple-400/28", icon: "text-purple-600", bg: "bg-purple-50" },
  fuchsia: { glow: "from-fuchsia-400/28", icon: "text-fuchsia-600", bg: "bg-fuchsia-50" },
  sky: { glow: "from-sky-400/28", icon: "text-sky-600", bg: "bg-sky-50" },
  yellow: { glow: "from-yellow-400/28", icon: "text-yellow-700", bg: "bg-yellow-50" },
};

export function Regions({ onWarnUrl }: { onWarnUrl: (url: string) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const filtered = REGIONS.filter((r) => {
    const matchSearch = r.name.includes(search) || r.category.includes(search);
    const matchCat = category === "ALL" || r.category === category;
    return matchSearch && matchCat;
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
    >
      <div className="rounded-[38px] border border-white/80 bg-white/72 p-5 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.45)] backdrop-blur-2xl md:p-7">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-700">
              Portal Select
            </div>
            <h3 className="text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
              各就學區查榜入口
            </h3>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
              選擇所屬區域後，將前往各區官方查榜或選填系統。
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block h-13 w-full rounded-full border border-white/80 bg-white/82 pl-12 pr-11 text-sm font-bold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_12px_36px_-30px_rgba(15,23,42,0.45)] placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-100"
              placeholder="搜尋區域..."
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                aria-label="清除搜尋"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mb-7 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2 rounded-full bg-slate-100/70 p-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setSearch("");
                }}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-black transition-all focus:outline-none focus:ring-4 focus:ring-sky-100",
                  category === cat
                    ? "bg-white text-slate-950 shadow-sm"
                    : "text-slate-500 hover:bg-white/70 hover:text-slate-950"
                )}
              >
                {cat === "ALL" ? <LayoutGrid className="h-4 w-4" /> : <MapIcon className="h-4 w-4" />}
                {categoryLabel[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[320px]">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-300 bg-white/72 py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[22px] bg-slate-100">
                <Compass className="h-7 w-7 text-slate-400" />
              </div>
              <p className="text-lg font-black text-slate-900">找不到符合的區域</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("ALL");
                }}
                className="mt-4 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                重設篩選
              </button>
            </div>
          ) : category === "ALL" && !search ? (
            <div className="space-y-9">
              {CATEGORIES.map((cat) => {
                if (cat === "ALL") return null;
                const subList = filtered.filter((x) => x.category === cat);
                if (subList.length === 0) return null;

                return (
                  <div key={cat}>
                    <div className="mb-3 flex items-center justify-between px-1">
                      <h4 className="text-lg font-black text-slate-950">{cat}</h4>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                        {subList.length} 個入口
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {subList.map((r) => (
                        <RegionCard key={r.id} r={r} onClick={() => onWarnUrl(r.url)} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <RegionCard key={r.id} r={r} onClick={() => onWarnUrl(r.url)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

function RegionCard({ r, onClick }: { r: any; onClick: () => void }) {
  const accent = accents[r.colorClass] || accents.teal;

  return (
    <button
      onClick={onClick}
      className="group relative flex min-h-[142px] flex-col justify-between overflow-hidden rounded-[30px] border border-white/80 bg-white/82 p-4 text-left shadow-[0_18px_50px_-36px_rgba(15,23,42,0.48)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_70px_-42px_rgba(15,23,42,0.62)] focus:outline-none focus:ring-4 focus:ring-sky-100"
    >
      <div className={cn("absolute inset-x-0 top-0 h-20 bg-gradient-to-b to-transparent", accent.glow)} />
      <div className="relative flex items-start justify-between gap-4">
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px]", accent.bg, accent.icon)}>
          <MapPin className="h-5 w-5" />
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100/80 text-slate-400 transition-all group-hover:bg-slate-950 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="relative mt-6">
        <h3 className="text-2xl font-black tracking-normal text-slate-950">{r.name}</h3>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">{r.category}</p>
      </div>
    </button>
  );
}
