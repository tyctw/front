import { useEffect, useState } from "react";
import { REGIONS, RESULT_LIST_CLOSE_DATE, RESULT_LIST_OPEN_DATE } from "../data";
import {
  ArrowUpRight,
  BookOpenCheck,
  Building2,
  Castle,
  Compass,
  Factory,
  Landmark,
  LayoutGrid,
  Map as MapIcon,
  MapPin,
  Mountain,
  Palmtree,
  School,
  Ship,
  Sprout,
  TentTree,
  TrainFront,
  Trees,
  Waves,
  Wheat,
  X,
  Search,
} from "lucide-react";
import { cn } from "../lib/utils";
import { getNow, parseTaipeiDate } from "../lib/now";

const CATEGORIES = ["ALL", "北部區域", "中部區域", "南部區域", "東部區域", "離島區域"];

const categoryLabel: Record<string, string> = {
  ALL: "全部區域",
};

const categoryFilterStyles: Record<string, { active: string; idle: string }> = {
  ALL: {
    active: "bg-slate-900 text-white shadow-[0_12px_26px_-16px_rgba(15,23,42,0.95)] ring-1 ring-slate-900",
    idle: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  },
  北部區域: {
    active: "bg-sky-700 text-white shadow-[0_12px_26px_-16px_rgba(2,132,199,0.9)] ring-1 ring-sky-500",
    idle: "text-sky-700 hover:bg-sky-50",
  },
  中部區域: {
    active: "bg-emerald-700 text-white shadow-[0_12px_26px_-16px_rgba(5,150,105,0.85)] ring-1 ring-emerald-500",
    idle: "text-emerald-700 hover:bg-emerald-50",
  },
  南部區域: {
    active: "bg-rose-700 text-white shadow-[0_12px_26px_-16px_rgba(225,29,72,0.82)] ring-1 ring-rose-500",
    idle: "text-rose-700 hover:bg-rose-50",
  },
  東部區域: {
    active: "bg-violet-700 text-white shadow-[0_12px_26px_-16px_rgba(124,58,237,0.85)] ring-1 ring-violet-500",
    idle: "text-violet-700 hover:bg-violet-50",
  },
  離島區域: {
    active: "bg-amber-400 text-amber-950 shadow-[0_12px_26px_-16px_rgba(245,158,11,0.88)] ring-1 ring-amber-300",
    idle: "text-amber-800 hover:bg-amber-50",
  },
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

const regionIcons: Record<string, typeof MapPin> = {
  tp: Building2,
  tl: TrainFront,
  hm: Mountain,
  ct: School,
  chc: Factory,
  ylc: Wheat,
  cyc: Landmark,
  tn: Castle,
  kh: Waves,
  ptc: Palmtree,
  iln: TentTree,
  ttf: Sprout,
  hlc: Trees,
  ph: Ship,
  km: Landmark,
};

type PortalStatus = "locked" | "open" | "closed";

const portalStatusMeta: Record<PortalStatus, { label: string; className: string }> = {
  locked: {
    label: "尚未開放",
    className: "bg-slate-100 text-slate-600 ring-slate-200",
  },
  open: {
    label: "正式開放",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  closed: {
    label: "已截止",
    className: "bg-rose-50 text-rose-700 ring-rose-100",
  },
};

function getPortalStatus(now: Date): PortalStatus {
  const openDate = parseTaipeiDate(RESULT_LIST_OPEN_DATE);
  const closeDate = parseTaipeiDate(RESULT_LIST_CLOSE_DATE);

  if (now > closeDate) return "closed";
  if (now >= openDate) return "open";
  return "locked";
}

export function Regions({ onWarnUrl }: { onWarnUrl: (url: string) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [now, setNow] = useState(() => getNow());
  const portalStatus = getPortalStatus(now);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(getNow()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const filtered = REGIONS.filter((r) => {
    const matchSearch = r.name.includes(search) || r.category.includes(search);
    const matchCat = category === "ALL" || r.category === category;
    return matchSearch && matchCat;
  });

  return (
    <section
      className="mb-16 content-auto"
      aria-labelledby="regions-title"
    >
      <div className="rounded-[32px] border border-slate-200/80 bg-white/90 p-3 shadow-[0_24px_80px_-54px_rgba(15,23,42,0.45)] sm:p-5 lg:p-7">
        <div className="mb-4 grid items-end gap-5 rounded-[24px] bg-slate-950 bg-linear-to-br from-slate-950 via-slate-900 to-sky-900 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8 lg:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1.5 font-outfit text-[11px] font-bold uppercase tracking-[0.18em] text-sky-200">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
              Portal Select
            </div>
            <h3 id="regions-title" className="text-[clamp(1.5rem,4vw,2.5rem)] leading-tight font-black text-white">
              各就學區查榜入口
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
              選擇所屬區域後，將前往各區官方查榜或選填系統。
            </p>
          </div>

          <a
            href="/front/guide/"
            className="group flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 text-white transition-colors hover:border-sky-200/50 hover:bg-white/15 focus-visible:outline-sky-200 sm:p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-200 text-sky-950">
              <BookOpenCheck aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black leading-5 sm:text-base">查榜後報到指南</span>
              <span className="mt-1 block text-xs font-semibold leading-5 text-sky-100">
                報到文件、複查與放棄資格一次看
              </span>
            </span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-100 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mb-6 rounded-[24px] border border-slate-200 bg-slate-50/80 p-3 sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p id="region-filter-label" className="text-base font-black text-slate-950">篩選就學區</p>
              <p role="status" className="mt-1 text-sm tabular-nums text-slate-600">目前顯示 {filtered.length} 個就學區入口</p>
            </div>
            <div className="sm:w-64">
              <label htmlFor="region-search" className="sr-only">搜尋就學區</label>
              <div className="relative w-full">
                <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="region-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-11 text-base font-medium text-slate-900 placeholder:text-slate-500 focus-visible:border-sky-600 sm:text-sm"
                  placeholder="搜尋就學區"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label="清除搜尋"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div role="group" aria-labelledby="region-filter-label" className="grid grid-cols-2 gap-2 min-[400px]:grid-cols-3 md:grid-cols-6">
            {CATEGORIES.map((cat) => {
              const filterStyle = categoryFilterStyles[cat];

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setSearch("");
                  }}
                  aria-pressed={category === cat}
                  className={cn(
                    "inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-2 text-sm font-bold transition-colors",
                    category === cat ? cn("border-transparent", filterStyle.active) : cn("border-slate-200 bg-white", filterStyle.idle)
                  )}
                >
                  {cat === "ALL" ? <LayoutGrid aria-hidden="true" className="h-4 w-4 shrink-0" /> : <MapIcon aria-hidden="true" className="h-4 w-4 shrink-0" />}
                  {categoryLabel[cat] || cat}
                </button>
              );
            })}
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
            <div className="space-y-12">
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
                    <div
                      className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
                    >
                      {subList.map((r) => (
                        <RegionCard key={r.id} r={r} status={portalStatus} onClick={() => onWarnUrl(r.url)} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            >
              {filtered.map((r) => (
                <RegionCard key={r.id} r={r} status={portalStatus} onClick={() => onWarnUrl(r.url)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RegionCard({ r, status, onClick }: { r: any; status: PortalStatus; onClick: () => void }) {
  const accent = accents[r.colorClass] || accents.teal;
  const badge = regionBadges[r.category] || regionBadges["北部區域"];
  const RegionIcon = regionIcons[r.id] || MapPin;
  const statusMeta = portalStatusMeta[status];

  return (
    <button
      onClick={onClick}
      aria-label={`前往${r.category}${r.name}查榜入口`}
      className="group relative flex min-h-[172px] flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white/88 text-left opacity-100 shadow-[0_18px_54px_-40px_rgba(15,23,42,0.6)] ring-1 ring-slate-950/[0.03] backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_26px_70px_-44px_rgba(15,23,42,0.72)] focus:outline-none focus:ring-4 focus:ring-sky-100"
    >
      <div className={cn("absolute inset-x-0 top-0 h-16 bg-gradient-to-r opacity-15", badge.strip)} />
      <div className="relative flex items-start justify-between gap-4 p-4 pb-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2 pr-2">
          <span className={cn("inline-flex h-8 shrink-0 items-center rounded-full px-3 text-xs font-black ring-1", badge.className)}>
            {badge.label}
          </span>
          <span className={cn("inline-flex h-8 shrink-0 items-center rounded-full px-3 text-xs font-black ring-1", statusMeta.className)}>
            {statusMeta.label}
          </span>
        </div>
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-white/90 shadow-sm ring-1 ring-white transition-transform group-hover:scale-105", accent.icon)}>
          <RegionIcon className="h-5 w-5" aria-hidden="true" />
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
