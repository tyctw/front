import { CalendarDays, Check, Clock3, GraduationCap, Info, Sparkles } from "lucide-react";
import { useState } from "react";
import { SCHEDULE_EVENTS, SCHEDULE_CATEGORIES, SCHEDULE_NOTES, SCHEDULE_PDF_URL, SCHEDULE_SOURCE } from "../schedule";
import { getNow, getTaipeiDayBounds, parseTaipeiDate } from "../lib/now";
import { formatDate } from "../lib/utils";
import { BackButton } from "./BackButton";

const stageLabels = [2, 3, 4, 5, 6, 7];

export function SchedulePage() {
  const [category, setCategory] = useState("全部管道");
  const [query, setQuery] = useState("");
  const now = getNow();
  const events = [...SCHEDULE_EVENTS]
    .sort((a, b) => parseTaipeiDate(a.dateStart).getTime() - parseTaipeiDate(b.dateStart).getTime())
    .map((event) => {
      const start = parseTaipeiDate(event.dateStart);
      const end = getTaipeiDayBounds(event.dateEnd || event.dateStart).end;
      const status = now >= end ? "past" : now >= start && now < end ? "current" : "future";
      return { ...event, status };
    });
  const filteredEvents = events.filter(event => (category === "全部管道" || event.category === category || event.title.includes(category)) && event.title.includes(query.trim()));
  const currentEvent = events.find((event) => event.status === "current");
  const nextEvent = events.find((event) => event.status === "future");
  const featuredEvent = currentEvent || nextEvent;

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8" tabIndex={-1}>
      <div className="mb-5"><BackButton /></div>
      <section className="relative overflow-hidden rounded-[32px] bg-slate-950 px-5 py-7 text-white shadow-[0_28px_80px_-34px_rgba(15,23,42,0.85)] sm:rounded-[42px] sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -right-14 -top-24 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-[0.16em] text-sky-100 ring-1 ring-white/15">
              <CalendarDays className="h-4 w-4" />
              116 學年度 · TAIWAN CAP
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl">重要日程</h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-300 sm:text-base">
              依教育部重要日程表完整整理 2 至 7 月會考、高中及五專適性入學日程，可依入學管道篩選或搜尋。日期為民國 116 年（西元 2027 年）。
            </p>
          </div>
          {featuredEvent && (
            <div className="rounded-[26px] border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-black text-sky-200">
                {featuredEvent.status === "current" ? <Sparkles className="h-4 w-4 text-amber-200" /> : <Clock3 className="h-4 w-4" />}
                {featuredEvent.status === "current" ? "目前進行中" : "下一個重要節點"}
              </div>
              <p className="mt-3 text-xl font-black leading-tight">{featuredEvent.title}</p>
              <p className="mt-2 font-outfit text-sm font-bold text-slate-300">{formatDate(featuredEvent.dateStart)}</p>
            </div>
          )}
        </div>
      </section>

      <section aria-label="日程篩選" className="mt-6 rounded-[24px] border border-slate-100 bg-white p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-bold text-slate-700">入學管道
            <select value={category} onChange={event => setCategory(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3">
              {["全部管道", ...SCHEDULE_CATEGORIES].map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="text-sm font-bold text-slate-700">搜尋日程
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="例如：報名、報到、放棄錄取資格" className="mt-2 w-full rounded-xl border border-slate-200 p-3" />
          </label>
        </div>
        <p className="mt-4 text-xs leading-6 text-slate-500">原表僅列日期；開始日、截止日與報到日依各項文字標示，實際辦理時刻請查閱各區、各校簡章。</p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-sky-700">TIMELINE</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">年度時程表</h2>
            </div>
            <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-500 sm:inline">顯示 {filteredEvents.length} / {events.length} 項</span>
          </div>

          <div className="space-y-8">
            <p role="status" className="text-sm text-slate-500">{filteredEvents.length ? `共找到 ${filteredEvents.length} 項日程` : "沒有符合的日程，請調整管道或搜尋文字。"}</p>
            {stageLabels.map((stage) => {
              const stageEvents = filteredEvents.filter(event => Number(event.dateStart.slice(5, 7)) === stage);
              return (
                <section key={stage} id={`month-${stage}`} className="scroll-mt-28">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px flex-1 bg-slate-200" />
                    <h3 className="text-xs font-black tracking-[0.16em] text-slate-400">{stage} 月 · {stageEvents.length} 項</h3>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="space-y-3">
                    {stageEvents.map((event) => {
                      const dateText = `${formatDate(event.dateStart)}${event.isRange && event.dateEnd ? ` — ${formatDate(event.dateEnd)}` : ""}`;
                      const isCurrent = event.status === "current";
                      return (
                        <article key={event.id} className={`relative overflow-hidden rounded-[24px] border p-5 shadow-[0_22px_50px_-40px_rgba(15,23,42,0.65)] sm:p-6 ${
                          isCurrent ? "border-sky-200 bg-sky-50/80" : event.status === "past" ? "border-slate-100 bg-slate-50/70" : "border-slate-100 bg-white"
                        }`}>
                          <div className={`absolute bottom-0 left-0 top-0 w-1 ${isCurrent ? "bg-sky-500" : event.status === "past" ? "bg-slate-200" : "bg-emerald-400"}`} />
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-[0.12em] ${isCurrent ? "bg-sky-600 text-white" : event.status === "past" ? "bg-slate-200 text-slate-500" : "bg-emerald-50 text-emerald-700"}`}>
                                  {isCurrent ? "進行中" : event.status === "past" ? "日期已過" : "尚未開始"}
                                </span>
                                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-black tracking-[0.12em] text-sky-700">{event.category}</span>
                              </div>
                              <p className="mt-3 font-outfit text-xs font-black leading-6 tracking-[0.05em] text-slate-400">{dateText}</p>
                              <h4 className={`mt-3 text-xl font-black leading-snug ${event.status === "past" ? "text-slate-500" : "text-slate-950"}`}>{event.title}</h4>

                            </div>
                            {event.status === "past" ? <Check className="h-6 w-6 shrink-0 text-slate-300" /> : <CalendarDays className={`h-6 w-6 shrink-0 ${isCurrent ? "text-sky-500" : "text-emerald-500"}`} />}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        <aside className="rounded-[28px] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-sky-50 p-5 shadow-[0_24px_64px_-44px_rgba(15,23,42,0.6)] lg:sticky lg:top-24">
          <GraduationCap className="h-7 w-7 text-amber-600" />
          <h2 className="mt-4 text-xl font-black text-slate-950">安排小提醒</h2>
          <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-slate-600">
            {SCHEDULE_NOTES.map(note => <li key={note}>{note}</li>)}
          </ul>
          <a href={SCHEDULE_PDF_URL} target="_blank" rel="noreferrer" className="mt-5 block rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-bold text-white hover:bg-sky-800">開啟教育部原始日程表 PDF</a>
          <p className="mt-3 break-words text-xs leading-6 text-slate-500">資料來源：{SCHEDULE_SOURCE}</p>
          <div className="mt-5 flex gap-2 rounded-[18px] bg-white/80 p-3 text-xs font-bold leading-5 text-slate-500 ring-1 ring-white">
            <Info className="h-4 w-4 shrink-0 text-sky-600" />
            本頁為資訊整理，並非招生主管機關公告。
          </div>
        </aside>
      </section>
    </main>
  );
}

