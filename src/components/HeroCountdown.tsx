import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ADMISSION_LIST_CLOSE_DATE, ADMISSION_LIST_OPEN_DATE, EVENTS } from "../data";
import { Activity, CalendarDays, CheckCircle2, Clock } from "lucide-react";

type CountdownStatus = 'upcoming' | 'active' | 'ended';

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
    days: 0, hours: 0, minutes: 0, seconds: 0, status: 'upcoming', title: '載入中...'
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const rankOpenDate = new Date(ADMISSION_LIST_OPEN_DATE);
      const rankCloseDate = new Date(ADMISSION_LIST_CLOSE_DATE);
      
      let targetDateInfo: { title: string, dateStart: string, dateEnd?: string, ended?: boolean } | null = null;
      const daysToRank = (rankOpenDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

      if (now >= rankOpenDate && now <= rankCloseDate) {
        targetDateInfo = { title: "個人序位查詢 & 志願選填", dateStart: ADMISSION_LIST_OPEN_DATE, dateEnd: ADMISSION_LIST_CLOSE_DATE };
      } else if (daysToRank <= 20 && daysToRank > 0) {
        targetDateInfo = { title: "距離 個人序位查詢 開放", dateStart: ADMISSION_LIST_OPEN_DATE, dateEnd: ADMISSION_LIST_CLOSE_DATE };
      } else {
        const sortedEvents = [...EVENTS].filter(e => new Date(e.dateStart).getTime() > now.getTime())
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
      let status: CountdownStatus = 'upcoming';

      if (targetDateInfo.ended) {
        status = 'ended';
      } else if (currentNow < start) {
        status = 'upcoming';
        diff = start - currentNow;
      } else if (currentNow >= start && currentNow < end) {
        status = 'active';
        diff = end - currentNow;
      } else {
        status = 'ended';
      }

      if (status === 'ended') diff = 0;

      setState({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        status,
        title: targetDateInfo.title
      });
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, []);

  const StatusDisplay = () => {
    if (state.status === 'upcoming') {
      return (
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-sm font-bold mb-6 shadow-sm border border-[#4ECDC4]/20 text-[#4ECDC4]">
          <span className="w-2 h-2 rounded-full mr-2.5 bg-[#4ECDC4]"></span>
          即將到來
        </div>
      );
    }
    if (state.status === 'active') {
      return (
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-sm font-bold mb-6 shadow-sm border border-[#FF6B6B]/20 text-[#FF6B6B]">
          <span className="w-2 h-2 rounded-full mr-2.5 bg-[#FF6B6B] animate-pulse"></span>
          現在進行中
        </div>
      );
    }
    return (
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-sm font-bold mb-6 shadow-sm border border-slate-200 text-slate-500">
          <span className="w-2 h-2 rounded-full mr-2.5 bg-slate-400"></span>
          本階段已結束
        </div>
    );
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="relative rounded-[40px] overflow-hidden glass-card shadow-lg shadow-teal-50 border border-slate-100">
        <div className="relative z-10 p-10 md:p-14">
          <div className="flex flex-col items-center text-center">
            <StatusDisplay />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-12 text-slate-800 leading-tight">
              {state.title}
            </h2>

            {state.status !== 'ended' ? (
              <div className="flex justify-center gap-4 md:gap-6 w-full max-w-3xl">
                {[
                  { label: "DAYS", val: state.days },
                  { label: "HOURS", val: state.hours },
                  { label: "MINS", val: state.minutes },
                  { label: "SECS", val: state.seconds }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div className="w-full aspect-[4/3] max-w-[120px] flex items-center justify-center mb-3 rounded-[24px] bg-white border border-slate-100 shadow-sm shadow-slate-200/30">
                      <span className={`text-4xl md:text-6xl font-outfit font-black tracking-tighter ${
                        state.status === 'active' 
                          ? 'text-[#FF6B6B]' 
                          : 'text-slate-900'
                      }`}>
                        {item.val.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-xs font-bold font-outfit tracking-[0.2em] text-slate-400 uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 px-12 rounded-2xl bg-white/50 border border-slate-200 text-slate-500 font-medium w-full max-w-xl">
                目前無進行中事項，請查看完整日程表
              </div>
            )}

            <div className="mt-12">
              <button 
                onClick={onOpenSchedule}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-[#4ECDC4] text-white rounded-[24px] shadow-lg shadow-teal-100 hover:bg-[#45b7af] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                <CalendarDays className="w-5 h-5 text-white/80 mr-2 group-hover:text-white transition-colors" />
                <span className="font-bold text-sm">完整重要日程表</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
