import { CalendarDays, Check, Clock3, GraduationCap, Info, Sparkles } from "lucide-react";
import { EVENTS } from "../data";
import { getNow, parseTaipeiDate } from "../lib/now";
import { formatDate } from "../lib/utils";
import { BackButton } from "./BackButton";

const stageLabels = ["準備", "應試", "放榜與報到"];

function getStage(index: number) {
  if (index < 2) return stageLabels[0];
  if (index < 4) return stageLabels[1];
  return stageLabels[2];
}

export function SchedulePage() {
  const now = getNow();
  const events = [...EVENTS]
    .sort((a, b) => parseTaipeiDate(a.dateStart).getTime() - parseTaipeiDate(b.dateStart).getTime())
    .map((event) => {
      const start = parseTaipeiDate(event.dateStart);
      const end = event.dateEnd ? parseTaipeiDate(event.dateEnd) : new Date(start.getTime() + 86400000);
      const status = now > end ? "past" : now >= start && now <= end ? "current" : "future";
      return { ...event, status };
    });
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
              從報名、考試到分發報到，一頁掌握國中教育會考與免試入學的重要節點。
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

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        {stageLabels.map((stage, index) => (
          <div key={stage} className="rounded-[22px] border border-slate-100 bg-white/80 p-4 shadow-[0_18px_44px_-36px_rgba(15,23,42,0.5)] backdrop-blur">
            <span className="font-outfit text-xs font-black tracking-[0.14em] text-sky-600">0{index + 1}</span>
            <p className="mt-1 text-lg font-black text-slate-950">{stage}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">{index === 0 ? "報名與准考證" : index === 1 ? "考試與成績公布" : "選填、放榜與入學"}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_270px] lg:items-start">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.16em] text-sky-700">TIMELINE</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-950">年度時程表</h2>
            </div>
            <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-500 sm:inline">共 {events.length} 項日程</span>
          </div>

          <div className="space-y-8">
            {stageLabels.map((stage) => {
              const stageEvents = events.filter((_, index) => getStage(index) === stage);
              return (
                <section key={stage}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px flex-1 bg-slate-200" />
                    <h3 className="text-xs font-black tracking-[0.16em] text-slate-400">{stage}</h3>
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
                                  {isCurrent ? "進行中" : event.status === "past" ? "已完成" : "即將開始"}
                                </span>
                                <span className="font-outfit text-xs font-black tracking-[0.05em] text-slate-400">{dateText}</span>
                              </div>
                              <h4 className={`mt-3 text-xl font-black leading-snug ${event.status === "past" ? "text-slate-500" : "text-slate-950"}`}>{event.title}</h4>
                              {event.details && <ul className="mt-3 space-y-1.5 text-sm font-semibold leading-6 text-slate-600">{event.details.map((detail) => <li key={detail}>• {detail}</li>)}</ul>}
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
            <li>志願選填與報到時間會依就學區及學校略有不同。</li>
            <li>請預留時間確認錄取學校公告及應備文件。</li>
            <li>時程如有異動，請以官方簡章與就學區公告為準。</li>
          </ul>
          <div className="mt-5 flex gap-2 rounded-[18px] bg-white/80 p-3 text-xs font-bold leading-5 text-slate-500 ring-1 ring-white">
            <Info className="h-4 w-4 shrink-0 text-sky-600" />
            本頁為資訊整理，並非招生主管機關公告。
          </div>
        </aside>
      </section>
    </main>
  );
}
