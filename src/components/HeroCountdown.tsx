import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ADMISSION_LIST_CLOSE_DATE, ADMISSION_LIST_OPEN_DATE, EVENTS } from "../data";
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

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, []);

  const statusCopy = {
    upcoming: { label: "即將到來", icon: Clock3, className: "border-teal-200 bg-teal-50 text-teal-700" },
    active: { label: "現在進行中", icon: CheckCircle2, className: "border-rose-200 bg-rose-50 text-rose-700" },
    ended: { label: "本階段已結束", icon: CheckCircle2, className: "border-slate-200 bg-slate-100 text-slate-600" },
  }[state.status];

  const StatusIcon = statusCopy.icon;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1.15fr_1fr] md:p-8">
        <div className="flex flex-col justify-between">
          <div>
            <div className={`mb-5 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-bold ${statusCopy.className}`}>
              <StatusIcon className="h-4 w-4" />
              {statusCopy.label}
            </div>
            <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-normal text-slate-950 md:text-5xl">
              {state.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-slate-600 md:text-base">
              整理各就學區查榜入口、志願選填與重要時程。請以各區官方系統公告為準，並於開放時間內完成查詢。
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onOpenSchedule}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              <CalendarDays className="h-5 w-5" />
              完整重要日程表
            </button>
            <a
              href="https://tyctw.github.io/volunteer/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              志願選填入口
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:self-center">
          {[
            { label: "DAYS", val: state.days },
            { label: "HOURS", val: state.hours },
            { label: "MINS", val: state.minutes },
            { label: "SECS", val: state.seconds },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
              <div className={`font-outfit text-4xl font-black leading-none md:text-5xl ${state.status === "active" ? "text-rose-600" : "text-slate-950"}`}>
                {item.val.toString().padStart(2, "0")}
              </div>
              <div className="mt-3 font-outfit text-[11px] font-black tracking-[0.16em] text-slate-500">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
