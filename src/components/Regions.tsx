import { motion } from "motion/react";
import { useState } from "react";
import { REGIONS } from "../data";
import { ArrowUpRight, Compass, LayoutGrid, Map as MapIcon, MapPin, Search, X } from "lucide-react";
import { cn } from "../lib/utils";

const CATEGORIES = ["ALL", "北部區域", "中部區域", "南部區域", "東部區域", "離島區域"];

const categoryLabel: Record<string, string> = {
  ALL: "全部區域",
};

const accents: Record<string, { bar: string; icon: string; bg: string }> = {
  blue: { bar: "bg-sky-500", icon: "text-sky-600", bg: "bg-sky-50" },
  indigo: { bar: "bg-indigo-500", icon: "text-indigo-600", bg: "bg-indigo-50" },
  teal: { bar: "bg-teal-500", icon: "text-teal-600", bg: "bg-teal-50" },
  emerald: { bar: "bg-emerald-500", icon: "text-emerald-600", bg: "bg-emerald-50" },
  orange: { bar: "bg-orange-500", icon: "text-orange-600", bg: "bg-orange-50" },
  lime: { bar: "bg-lime-500", icon: "text-lime-700", bg: "bg-lime-50" },
  amber: { bar: "bg-amber-500", icon: "text-amber-700", bg: "bg-amber-50" },
  red: { bar: "bg-red-500", icon: "text-red-600", bg: "bg-red-50" },
  rose: { bar: "bg-rose-500", icon: "text-rose-600", bg: "bg-rose-50" },
  pink: { bar: "bg-pink-500", icon: "text-pink-600", bg: "bg-pink-50" },
  violet: { bar: "bg-violet-500", icon: "text-violet-600", bg: "bg-violet-50" },
  purple: { bar: "bg-purple-500", icon: "text-purple-600", bg: "bg-purple-50" },
  fuchsia: { bar: "bg-fuchsia-500", icon: "text-fuchsia-600", bg: "bg-fuchsia-50" },
  sky: { bar: "bg-sky-500", icon: "text-sky-600", bg: "bg-sky-50" },
  yellow: { bar: "bg-yellow-500", icon: "text-yellow-700", bg: "bg-yellow-50" },
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
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-teal-700">
            Portal Select
          </div>
          <h3 className="text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
            各就學區查榜入口
          </h3>
          <p className="mt-2 text-sm font-medium text-slate-600">
            選擇所屬區域後，將前往各區官方查榜或選填系統。
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-sm font-bold text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100"
            placeholder="搜尋區域..."
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="清除搜尋"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSearch("");
              }}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-black transition-colors focus:outline-none focus:ring-4 focus:ring-teal-100",
                category === cat
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-950"
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
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100">
              <Compass className="h-7 w-7 text-slate-400" />
            </div>
            <p className="text-lg font-black text-slate-900">找不到符合的區域</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("ALL");
              }}
              className="mt-4 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-black text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              重設篩選
            </button>
          </div>
        ) : category === "ALL" && !search ? (
          <div className="space-y-8">
            {CATEGORIES.map((cat) => {
              if (cat === "ALL") return null;
              const subList = filtered.filter((x) => x.category === cat);
              if (subList.length === 0) return null;

              return (
                <div key={cat}>
                  <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="text-lg font-black text-slate-950">{cat}</h4>
                    <span className="text-xs font-bold text-slate-500">{subList.length} 個入口</span>
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
    </motion.section>
  );
}

function RegionCard({ r, onClick }: { r: any; onClick: () => void }) {
  const accent = accents[r.colorClass] || accents.teal;

  return (
    <button
      onClick={onClick}
      className="group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-teal-100"
    >
      <div className={cn("absolute inset-x-0 top-0 h-1", accent.bar)} />
      <div className="flex items-start justify-between gap-4">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", accent.bg, accent.icon)}>
          <MapPin className="h-5 w-5" />
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-slate-950 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-5">
        <h3 className="text-2xl font-black tracking-normal text-slate-950">{r.name}</h3>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-500">{r.category}</p>
      </div>
    </button>
  );
}
