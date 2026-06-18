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

const regionBadges: Record<string, { label: string; className: string; strip: string }> = {
  北部區域: {
    label: "北部",
    className: "bg-sky-50 text-sky-700 ring-sky-100",
    strip: "from-sky-400 to-indigo-400",
  },
  中部區域: {
    label: "中部",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    strip: "from-emerald-400 to-teal-400",
  },
  南部區域: {
    label: "南部",
    className: "bg-orange-50 text-orange-700 ring-orange-100",
    strip: "from-orange-400 to-rose-400",
  },
  東部區域: {
    label: "東部",
    className: "bg-violet-50 text-violet-700 ring-violet-100",
    strip: "from-violet-400 to-fuchsia-400",
  },
  離島區域: {
    label: "離島",
    className: "bg-amber-50 text-amber-800 ring-amber-100",
    strip: "from-amber-300 to-lime-400",
  },
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
      className="mb-16 content-auto"
      aria-labelledby="regions-title"
    >
      <div className="rounded-[38px] border border-white/80 bg-white/72 p-5 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.45)] backdrop-blur-2xl md:p-7">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-700">
              Portal Select
            </div>
            <h3 id="regions-title" className="text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
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
              aria-label="搜尋就學區"
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
              aria-pressed={category === cat}
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
  const badge = regionBadges[r.category] || regionBadges["北部區域"];

  return (
    <button
      onClick={onClick}
      aria-label={`前往${r.category}${r.name}查榜入口`}
      className="group relative flex min-h-[172px] flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white/88 text-left shadow-[0_18px_54px_-40px_rgba(15,23,42,0.6)] ring-1 ring-slate-950/[0.03] backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_70px_-44px_rgba(15,23,42,0.72)] focus:outline-none focus:ring-4 focus:ring-sky-100"
    >
      <div className={cn("absolute inset-x-0 top-0 h-16 bg-gradient-to-r opacity-15", badge.strip)} />
      <div className="relative flex items-start justify-between gap-4 p-4 pb-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className={cn("inline-flex h-8 shrink-0 items-center rounded-full px-3 text-xs font-black ring-1", badge.className)}>
            {badge.label}
          </span>
          <span className="truncate text-xs font-bold text-slate-400">{r.category}</span>
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm ring-1 ring-white", accent.icon)}>
          <MapPin className="h-5 w-5" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-between px-4 pb-4 pt-2">
        <div>
          <h3 className="text-[30px] font-black leading-none tracking-normal text-slate-950">{r.name}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">免試入學查榜官方入口</p>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-[20px] border border-slate-100 bg-slate-50/80 px-3.5 py-3 text-sm font-black text-slate-700 transition-colors group-hover:border-slate-200 group-hover:bg-slate-950 group-hover:text-white">
          <span>前往查詢</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </button>
  );
}
