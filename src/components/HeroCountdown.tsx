import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ADMISSION_LIST_CLOSE_DATE, ADMISSION_LIST_OPEN_DATE, EVENTS, RESULT_LOOKUP_URL, VOLUNTEER_URL } from "../data";
import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";

type CountdownStatus = "upcoming" | "active" | "ended";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: CountdownStatus;
  title: string;
}

export function HeroCountdown({ onOpenSchedule }: { onOpenSchedule: () => void }) {
  const [state, setState] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    status: "upcoming",
    title: "載入重要時程",
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const rankOpenDate = new Date(ADMISSION_LIST_OPEN_DATE);
      const rankCloseDate = new Date(ADMISSION_LIST_CLOSE_DATE);

      let targetDateInfo: { title: string; dateStart: string; dateEnd?: string; ended?: boolean } | null = null;
      const daysToRank = (rankOpenDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

      if (now >= rankOpenDate && now <= rankCloseDate) {
        targetDateInfo = { title: "個人序位查詢與志願選填進行中", dateStart: ADMISSION_LIST_OPEN_DATE, dateEnd: ADMISSION_LIST_CLOSE_DATE };
      } else if (daysToRank <= 20 && daysToRank > 0) {
        targetDateInfo = { title: "距離個人序位查詢開放", dateStart: ADMISSION_LIST_OPEN_DATE, dateEnd: ADMISSION_LIST_CLOSE_DATE };
      } else {
        const sortedEvents = [...EVENTS]
          .filter((e) => new Date(e.dateStart).getTime() > now.getTime())
          .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());

        if (sortedEvents.length > 0) {
          targetDateInfo = { title: `距離 ${sortedEvents[0].title}`, dateStart: sortedEvents[0].dateStart, dateEnd: sortedEvents[0].dateEnd };
        } else {
          targetDateInfo = { title: "本年度重要日程已結束", dateStart: now.toISOString(), ended: true };
        }
      }

      const currentNow = now.getTime();
      const start = new Date(targetDateInfo.dateStart).getTime();
      const end = targetDateInfo.dateEnd ? new Date(targetDateInfo.dateEnd).getTime() : start + 86400000;

      let diff = 0;
      let status: CountdownStatus = "upcoming";

      if (targetDateInfo.ended) {
        status = "ended";
      } else if (currentNow < start) {
        status = "upcoming";
        diff = start - currentNow;
      } else if (currentNow >= start && currentNow < end) {
        status = "active";
        diff = end - currentNow;
      } else {
        status = "ended";
      }

      if (status === "ended") diff = 0;

      setState({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        status,
        title: targetDateInfo.title,
      });
    };

    let interval: ReturnType<typeof setInterval> | null = null;
    const startTimer = () => {
      if (interval) return;
      updateTimer();
      interval = setInterval(updateTimer, 1000);
    };
    const stopTimer = () => {
      if (!interval) return;
      clearInterval(interval);
      interval = null;
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const statusCopy = {
    upcoming: { label: "即將到來", icon: Clock3, className: "bg-sky-50 text-sky-700 ring-sky-100" },
    active: { label: "現在進行中", icon: CheckCircle2, className: "bg-rose-50 text-rose-700 ring-rose-100" },
    ended: { label: "本階段已結束", icon: CheckCircle2, className: "bg-slate-100 text-slate-600 ring-slate-200" },
  }[state.status];

  const StatusIcon = statusCopy.icon;
  const volunteerClosed = new Date() >= new Date(ADMISSION_LIST_CLOSE_DATE);
  const volunteerEntryUrl = volunteerClosed ? RESULT_LOOKUP_URL : VOLUNTEER_URL;
  const volunteerEntryLabel = volunteerClosed ? "查榜網址" : "志願選填入口";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="relative overflow-hidden rounded-[38px] border border-white/80 bg-white/86 p-5 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.55)] backdrop-blur-2xl md:p-8">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ring-1 ${statusCopy.className}`}>
              <StatusIcon className="h-4 w-4" />
              {statusCopy.label}
            </div>
            <h2 className="max-w-2xl text-[40px] font-black leading-[1.08] tracking-normal text-slate-950 md:text-6xl">
              {state.title}
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-8 text-slate-600">
              整理各就學區查榜入口、志願選填與重要時程。請以各區官方系統公告為準，並於開放時間內完成查詢。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={onOpenSchedule}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.9)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                <CalendarDays className="h-5 w-5" />
                完整重要日程表
              </button>
              <a
                href={volunteerEntryUrl}
                target={volunteerClosed ? undefined : "_blank"}
                rel={volunteerClosed ? undefined : "noreferrer"}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 px-6 py-3 text-sm font-black text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                {volunteerEntryLabel}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3" role="timer" aria-label={`倒數 ${state.days} 天 ${state.hours} 小時 ${state.minutes} 分 ${state.seconds} 秒`}>
            {[
              { label: "DAYS", val: state.days },
              { label: "HOURS", val: state.hours },
              { label: "MINS", val: state.minutes },
              { label: "SECS", val: state.seconds },
            ].map((item) => (
              <div key={item.label} className="rounded-[30px] border border-white/80 bg-slate-50/78 p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_40px_-30px_rgba(15,23,42,0.55)]">
                <div className={`font-outfit text-5xl font-black leading-none md:text-6xl ${state.status === "active" ? "text-rose-600" : "text-slate-950"}`}>
                  {item.val.toString().padStart(2, "0")}
                </div>
                <div className="mt-3 font-outfit text-[11px] font-black tracking-[0.18em] text-slate-500">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
