import { EVENTS } from "../data";
import { getNow } from "../lib/now";
import { formatDate } from "../lib/utils";
import { CalendarDays, Check, Clock3, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export function ScheduleModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    window.setTimeout(() => dialogRef.current?.focus(), 80);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sortedEvents = [...EVENTS].sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
  const now = getNow();
  const eventRows = sortedEvents.map((event) => {
    const start = new Date(event.dateStart);
    const end = event.dateEnd ? new Date(event.dateEnd) : new Date(start.getTime() + 86400000);
    const status = now > end ? "past" : now >= start && now <= end ? "current" : "future";

    return { ...event, start, end, status };
  });
  const currentEvent = eventRows.find((event) => event.status === "current");
  const nextEvent = eventRows.find((event) => event.status === "future");
  const heroEvent = currentEvent || nextEvent;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-2 sm:items-center sm:p-4 md:p-6" role="dialog" aria-modal="true" aria-label="重要日程表">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-xl" 
        onClick={onClose} 
      />
      
      <motion.div 
        ref={dialogRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative flex max-h-[94svh] w-full max-w-[780px] flex-col overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_34px_90px_-36px_rgba(15,23,42,0.7)] sm:max-h-[90svh] sm:rounded-[32px]"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-300" />
        <button
          onClick={onClose}
          aria-label="關閉重要日程表"
          className="absolute right-3 top-3 z-50 rounded-full bg-white/88 p-2 text-slate-500 shadow-sm ring-1 ring-slate-200/70 backdrop-blur transition-colors hover:bg-white hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-100 sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex-shrink-0 overflow-hidden border-b border-slate-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50/70 px-4 pb-4 pt-6 sm:px-7 sm:pb-6 sm:pt-8">
          <div className="pointer-events-none absolute right-0 top-[-5rem] h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="relative grid gap-4 sm:grid-cols-[minmax(0,1fr)_max-content] sm:items-end">
            <div className="min-w-0 pr-11 sm:pr-0">
              <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full bg-white/86 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-sky-700 shadow-sm ring-1 ring-sky-100">
                <CalendarDays className="h-4 w-4" />
                115 學年度
              </div>
              <h3 className="break-words text-2xl font-black leading-tight tracking-normal text-slate-950 sm:text-4xl">重要日程表</h3>
            </div>
            {heroEvent && (
              <div className="w-full min-w-0 rounded-[20px] border border-white/80 bg-white/88 p-3.5 text-left shadow-sm sm:w-auto sm:min-w-[230px] sm:max-w-[360px] sm:rounded-[22px] sm:p-4">
                <div className="flex items-center gap-2 text-xs font-black text-slate-500">
                  {heroEvent.status === "current" ? <Sparkles className="h-4 w-4 text-rose-500" /> : <Clock3 className="h-4 w-4 text-sky-600" />}
                  {heroEvent.status === "current" ? "目前階段" : "下一個日程"}
                </div>
                <p className="mt-2 break-words text-base font-black leading-6 text-slate-950">{heroEvent.title}</p>
                <p className="mt-1 whitespace-nowrap font-outfit text-sm font-bold text-slate-500">{formatDate(heroEvent.dateStart)}</p>
              </div>
            )}
          </div>
        </div>

        <div className="relative overflow-y-auto bg-white px-3 py-4 sm:px-7 sm:py-6">
          <div className="relative">
            <div className="absolute bottom-4 left-[18px] top-4 w-px bg-slate-200 sm:bottom-5 sm:left-[26px] sm:top-5" />
            <div className="space-y-2.5 sm:space-y-3">
              {eventRows.map((event, index) => {
                const statusLabel = event.status === "current" ? "進行中" : event.status === "past" ? "已完成" : "未開始";
                const dateText = `${formatDate(event.dateStart)}${event.isRange && event.dateEnd ? ` - ${formatDate(event.dateEnd)}` : ""}`;
              return (
                <div key={event.id} className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-2.5 sm:grid-cols-[52px_minmax(0,1fr)] sm:gap-3">
                  <div className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-[14px] shadow-sm ring-4 ring-white sm:h-13 sm:w-13 sm:rounded-[18px] ${
                    event.status === "current"
                      ? "bg-rose-600 text-white"
                      : event.status === "past"
                        ? "bg-slate-100 text-slate-400"
                        : "bg-white text-slate-500 ring-slate-50"
                  }`}>
                    {event.status === "past" ? <Check className="h-5 w-5" /> : <span className="font-outfit text-sm font-black">{String(index + 1).padStart(2, "0")}</span>}
                  </div>

                  <div className={`min-w-0 rounded-[18px] border p-3.5 text-left transition-all sm:rounded-[24px] sm:p-5 ${
                    event.status === "current"
                      ? "border-rose-200 bg-rose-50/80 shadow-[0_18px_44px_-34px_rgba(225,29,72,0.7)]"
                      : event.status === "past"
                        ? "border-slate-100 bg-slate-50/70"
                        : "border-slate-100 bg-white shadow-[0_16px_38px_-34px_rgba(15,23,42,0.45)]"
                  }`}>
                    <div className="mb-2 flex flex-col items-start gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-[0.12em] ${
                        event.status === "current"
                          ? "bg-rose-600 text-white"
                          : event.status === "past"
                            ? "bg-white text-slate-400 ring-1 ring-slate-200"
                            : "bg-sky-50 text-sky-700 ring-1 ring-sky-100"
                      }`}>
                        {statusLabel}
                      </span>
                      <span className="break-words font-outfit text-xs font-black leading-5 tracking-[0.08em] text-slate-400">{dateText}</span>
                    </div>
                    <h4 className={`break-words text-[15px] font-black leading-6 sm:text-lg ${
                      event.status === "past" ? "text-slate-500" : "text-slate-950"
                    }`}>
                      {event.title}
                    </h4>
                    {event.details && (
                      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[13px] font-semibold leading-6 text-slate-600 sm:text-sm">
                        {event.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
