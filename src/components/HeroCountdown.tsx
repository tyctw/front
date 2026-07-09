import { useEffect, useState } from "react";
import { ADMISSION_LIST_CLOSE_DATE, ADMISSION_LIST_OPEN_DATE, EVENTS, FRESHMAN_GUIDE_URL, REGISTRATION_COMPLETE_DATE, RESULT_LOOKUP_URL, VOLUNTEER_URL } from "../data";
import { ArrowDownCircle, ArrowRight, BookOpenCheck, CalendarDays, CheckCircle2, Clock3, ExternalLink, PartyPopper, Sparkles } from "lucide-react";
import { getNow, getTaipeiDayBounds, parseTaipeiDate } from "../lib/now";

type CountdownStatus = "upcoming" | "active" | "ended";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: CountdownStatus;
  title: string;
  isResultDay: boolean;
  isResultOpen: boolean;
  isResultPending: boolean;
  isResultCountdown: boolean;
  isPostResultGuide: boolean;
  isRegistrationComplete: boolean;
}

export function HeroCountdown({ onOpenSchedule }: { onOpenSchedule: () => void }) {
  const [state, setState] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    status: "upcoming",
    title: "載入重要時程",
    isResultDay: false,
    isResultOpen: false,
    isResultPending: false,
    isResultCountdown: false,
    isPostResultGuide: false,
    isRegistrationComplete: false,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = getNow();
      const rankOpenDate = parseTaipeiDate(ADMISSION_LIST_OPEN_DATE);
      const rankCloseDate = parseTaipeiDate(ADMISSION_LIST_CLOSE_DATE);
      const resultEvent = EVENTS.find((event) => event.id === "final");
      const resultOpenDate = resultEvent ? parseTaipeiDate(resultEvent.dateStart) : null;
      const resultDayBounds = resultOpenDate ? getTaipeiDayBounds(resultOpenDate) : null;
      const resultDayEnd = resultDayBounds?.end || null;
      const resultDayStart = resultDayBounds?.start || null;
      const isResultDay = !!resultDayStart && !!resultDayEnd && now >= resultDayStart && now < resultDayEnd;
      const isResultOpen = !!resultOpenDate && !!resultDayEnd && now >= resultOpenDate && now < resultDayEnd;
      const isResultPending = isResultDay && !!resultOpenDate && now < resultOpenDate;
      const resultCountdownStart = parseTaipeiDate("2026-07-01T00:00:00");
      const isResultCountdown = !!resultOpenDate && now >= resultCountdownStart && now < resultOpenDate;
      const isPostResultGuide = !!resultDayEnd && now >= resultDayEnd;
      const registrationCompleteDate = parseTaipeiDate(REGISTRATION_COMPLETE_DATE);
      const isRegistrationComplete = now >= registrationCompleteDate;

      let targetDateInfo: { title: string; dateStart: string; dateEnd?: string; ended?: boolean } | null = null;
      const daysToRank = (rankOpenDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

      if (isRegistrationComplete) {
        targetDateInfo = {
          title: "恭喜大家正式成為高中生！",
          dateStart: registrationCompleteDate.toISOString(),
          ended: true,
        };
      } else if (isResultOpen && resultOpenDate) {
        targetDateInfo = { title: "今天放榜，先查錄取結果", dateStart: resultOpenDate.toISOString(), dateEnd: resultDayEnd?.toISOString() };
      } else if (isResultDay && isResultPending && resultOpenDate) {
        targetDateInfo = { title: "今天 11:00 開放查榜", dateStart: resultOpenDate.toISOString(), dateEnd: resultDayEnd?.toISOString() };
      } else if (isResultCountdown && resultOpenDate) {
        targetDateInfo = { title: "距離放榜開放查詢", dateStart: resultOpenDate.toISOString(), dateEnd: resultDayEnd?.toISOString() };
      } else if (now >= rankOpenDate && now <= rankCloseDate) {
        targetDateInfo = { title: "個人序位查詢與志願選填進行中", dateStart: ADMISSION_LIST_OPEN_DATE, dateEnd: ADMISSION_LIST_CLOSE_DATE };
      } else if (daysToRank <= 20 && daysToRank > 0) {
        targetDateInfo = { title: "距離個人序位查詢開放", dateStart: ADMISSION_LIST_OPEN_DATE, dateEnd: ADMISSION_LIST_CLOSE_DATE };
      } else {
        const currentOrUpcomingEvents = [...EVENTS]
          .map((event) => {
            const start = parseTaipeiDate(event.dateStart);
            const end = event.dateEnd ? parseTaipeiDate(event.dateEnd) : new Date(start.getTime() + 86400000);
            return { event, start, end };
          })
          .filter(({ end }) => end.getTime() > now.getTime())
          .sort((a, b) => a.start.getTime() - b.start.getTime());

        if (currentOrUpcomingEvents.length > 0) {
          const next = currentOrUpcomingEvents[0];
          const isActiveEvent = now >= next.start && now < next.end;
          targetDateInfo = {
            title: isActiveEvent ? `${next.event.title}進行中` : `距離 ${next.event.title}`,
            dateStart: next.event.dateStart,
            dateEnd: next.event.dateEnd,
          };
        } else {
          targetDateInfo = { title: "本年度重要日程已結束", dateStart: now.toISOString(), ended: true };
        }
      }

      const currentNow = now.getTime();
      const start = parseTaipeiDate(targetDateInfo.dateStart).getTime();
      const end = targetDateInfo.dateEnd ? parseTaipeiDate(targetDateInfo.dateEnd).getTime() : start + 86400000;

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

      const totalSeconds = Math.max(0, Math.ceil(diff / 1000));

      setState({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        status,
        title: targetDateInfo.title,
        isResultDay,
        isResultOpen,
        isResultPending,
        isResultCountdown,
        isPostResultGuide,
        isRegistrationComplete,
      });
    };

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const scheduleNextTick = () => {
      updateTimer();
      const nowMs = getNow().getTime();
      const delay = Math.max(250, 1000 - (nowMs % 1000) + 20);
      timeoutId = setTimeout(scheduleNextTick, delay);
    };
    const startTimer = () => {
      if (timeoutId) return;
      scheduleNextTick();
    };
    const stopTimer = () => {
      if (!timeoutId) return;
      clearTimeout(timeoutId);
      timeoutId = null;
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
  const statusLabel = state.isRegistrationComplete ? "報到完成" : state.isPostResultGuide ? "最近日程" : state.isResultPending ? "今日 11:00 開放" : state.isResultCountdown ? "7/7 11:00 開放" : statusCopy.label;

  const badgeClassName = state.isRegistrationComplete
    ? "bg-amber-50 text-amber-700 ring-amber-100"
    : statusCopy.className;
  const StatusIcon = state.isRegistrationComplete ? PartyPopper : statusCopy.icon;
  const volunteerClosed = getNow() >= parseTaipeiDate(ADMISSION_LIST_CLOSE_DATE);
  const volunteerEntryUrl = state.isRegistrationComplete ? FRESHMAN_GUIDE_URL : state.isPostResultGuide ? "/front/guide/" : volunteerClosed ? RESULT_LOOKUP_URL : VOLUNTEER_URL;
  const volunteerEntryLabel = state.isRegistrationComplete ? "看升高一小提醒" : state.isPostResultGuide ? "查榜後報到指南" : state.isResultCountdown || state.isResultDay ? "立即跳至查榜入口" : volunteerClosed ? "查榜網址" : "志願選填入口";
  const primaryLinkIsExternal = state.isRegistrationComplete || (!state.isPostResultGuide && !volunteerClosed);
  const heroTitle = state.title;
  const heroCopy = state.isRegistrationComplete
    ? "報到完畢，新的旅程正式開始。整理好的升高一提醒已經準備好，開學前可以慢慢看、安心準備。"
    : state.isResultDay
    ? state.isResultOpen
      ? "請選擇所屬就學區查詢錄取學校。"
      : ""
    : state.isPostResultGuide
      ? "放榜後請先確認錄取學校公告，留意報到方式、複查、續招與放棄錄取資格期限。"
    : "整理各就學區查榜入口、志願選填與重要時程。請以各區官方系統公告為準，並於開放時間內完成查詢。";
  const resultOpenDate = parseTaipeiDate(EVENTS.find((event) => event.id === "final")?.dateStart || "");
  const resultOpenDateLabel = Number.isNaN(resultOpenDate.getTime())
    ? ""
    : `${resultOpenDate.getFullYear() - 1911}/${resultOpenDate.getMonth() + 1}/${resultOpenDate.getDate()}（${resultOpenDate.toLocaleDateString("zh-TW", { weekday: "short" })}）`;
  const resultOpenClockLabel = Number.isNaN(resultOpenDate.getTime())
    ? ""
    : `${resultOpenDate.getHours().toString().padStart(2, "0")}:${resultOpenDate.getMinutes().toString().padStart(2, "0")}`;
  const countdownItems = [
    { label: "DAYS", val: state.days },
    { label: "HOURS", val: state.hours },
    { label: "MINS", val: state.minutes },
    { label: "SECS", val: state.seconds },
  ];
  return (
    <section className="mb-10">
      <div className="relative overflow-hidden rounded-[38px] border border-white/80 bg-white/86 p-5 shadow-[0_28px_90px_-54px_rgba(15,23,42,0.55)] backdrop-blur-2xl md:p-8">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className={`grid gap-8 ${
          state.isRegistrationComplete
            ? "md:grid-cols-[1.04fr_0.96fr] md:items-center"
            : state.isResultCountdown
            ? "md:grid-cols-[0.92fr_1.08fr] md:items-center"
            : state.isResultDay
              ? ""
              : "md:grid-cols-[1.1fr_0.9fr] md:items-center"
        }`}>
          <div>
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ring-1 ${badgeClassName}`}>
              <StatusIcon className="h-4 w-4" />
              {statusLabel}
            </div>
            <h1 className="max-w-2xl text-[40px] font-black leading-[1.08] tracking-normal text-slate-950 md:text-6xl">
              {heroTitle}
            </h1>
            {heroCopy && (
              <p className="mt-5 max-w-xl text-base font-medium leading-8 text-slate-600">
                {heroCopy}
              </p>
            )}
            {state.isResultCountdown && (
              <div className="mt-5 max-w-2xl md:hidden">
                <div className="rounded-[24px] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50/80 p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_16px_38px_-34px_rgba(225,29,72,0.55)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-white text-rose-600 shadow-sm ring-1 ring-rose-100">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-rose-600">放榜時間</p>
                      <div className="mt-2 grid gap-1 sm:flex sm:flex-wrap sm:items-end sm:gap-x-3 sm:gap-y-1">
                        <span className="text-xl font-black leading-tight text-slate-950">{resultOpenDateLabel}</span>
                        <span className="font-outfit text-5xl font-black leading-none text-rose-600 sm:text-4xl">{resultOpenClockLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="timer" aria-label={`倒數 ${state.days} 天 ${state.hours} 小時 ${state.minutes} 分 ${state.seconds} 秒`}>
                  {countdownItems.map((item) => (
                    <div key={item.label} className="rounded-[20px] border border-white/80 bg-slate-50/78 px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_40px_-30px_rgba(15,23,42,0.55)]">
                      <div className="font-outfit text-3xl font-black leading-none text-rose-600 sm:text-4xl">
                        {item.val.toString().padStart(2, "0")}
                      </div>
                      <div className="mt-2 font-outfit text-[10px] font-black tracking-[0.16em] text-slate-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={`flex gap-3 ${state.isResultCountdown || state.isResultDay || state.isPostResultGuide ? "mt-5 max-w-2xl flex-col sm:flex-row sm:items-center" : "mt-8 flex-wrap"}`}>
              <a
                href={volunteerEntryUrl}
                target={primaryLinkIsExternal ? "_blank" : undefined}
                rel={primaryLinkIsExternal ? "noreferrer" : undefined}
                className={`inline-flex items-center justify-center transition-all hover:-translate-y-0.5 focus:outline-none ${
                  state.isRegistrationComplete
                    ? "min-h-[58px] w-full rounded-[22px] bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 px-8 py-4 text-base font-black text-white shadow-[0_20px_44px_-22px_rgba(225,29,72,0.85)] hover:shadow-[0_24px_52px_-24px_rgba(245,158,11,0.82)] focus:ring-4 focus:ring-amber-100 sm:w-auto"
                    : state.isResultCountdown || state.isResultDay || state.isPostResultGuide
                    ? "min-h-[56px] w-full rounded-[22px] bg-rose-600 px-8 py-4 text-base font-black text-white shadow-[0_18px_38px_-20px_rgba(225,29,72,0.72)] hover:bg-rose-700 focus:ring-4 focus:ring-rose-100 sm:w-auto"
                    : "rounded-full border border-slate-200 bg-white/70 px-6 py-3 text-sm font-black text-slate-700 shadow-sm hover:bg-white focus:ring-4 focus:ring-slate-200"
                }`}
              >
                {state.isRegistrationComplete ? (
                  <Sparkles className="mr-2 h-5 w-5" />
                ) : state.isPostResultGuide ? (
                  <BookOpenCheck className="mr-2 h-5 w-5" />
                ) : (
                  (state.isResultCountdown || state.isResultDay) && <ArrowDownCircle className="mr-2 h-5 w-5" />
                )}
                {volunteerEntryLabel}
                {state.isRegistrationComplete ? <ExternalLink className="ml-2 h-5 w-5" /> : state.isPostResultGuide && <ArrowRight className="ml-2 h-5 w-5" />}
              </a>
              <button
                onClick={onOpenSchedule}
                className={`inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 focus:outline-none ${
                  state.isResultOpen
                    ? "min-h-[52px] w-full rounded-[20px] border border-slate-200 bg-white/78 px-6 py-3.5 text-sm font-black text-slate-700 shadow-sm hover:bg-white focus:ring-4 focus:ring-slate-200 sm:w-auto"
                    : state.isResultCountdown || state.isResultDay || state.isPostResultGuide
                      ? "min-h-[52px] w-full rounded-[20px] border border-slate-200 bg-white/78 px-6 py-3.5 text-sm font-black text-slate-700 shadow-sm hover:bg-white focus:ring-4 focus:ring-slate-200 sm:w-auto"
                    : "rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.9)] hover:bg-slate-800 focus:ring-4 focus:ring-slate-200"
                }`}
              >
                <CalendarDays className="h-5 w-5" />
                完整重要日程表
              </button>
            </div>
          </div>

          {state.isRegistrationComplete && (
            <div className="relative overflow-hidden rounded-[32px] border border-amber-100 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_70px_-48px_rgba(245,158,11,0.78)]">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-200/45 blur-2xl" />
              <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-rose-200/45 blur-2xl" />
              <div className="relative rounded-[26px] bg-white/78 p-5 shadow-sm ring-1 ring-white/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] bg-rose-600 text-white shadow-[0_16px_34px_-20px_rgba(225,29,72,0.85)]">
                    <PartyPopper className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.16em] text-rose-600">Welcome to High School</p>
                    <p className="mt-1 text-2xl font-black leading-tight text-slate-950">下一站，高中生活</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["確認新生資訊", "準備開學用品", "調整生活節奏"].map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/80 bg-slate-50/78 px-4 py-4 text-sm font-black text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
                      <Sparkles className="mb-2 h-4 w-4 text-amber-500" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm font-bold leading-7 text-slate-500">
                  已完成報到的同學可以先查看升高一小提醒，把暑假尾聲和開學準備安排得更從容。
                </p>
              </div>
            </div>
          )}

          {state.isResultCountdown && (
            <div className="hidden rounded-[32px] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_24px_70px_-50px_rgba(225,29,72,0.65)] md:block">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-stretch">
                <div className="rounded-[24px] bg-white/78 px-5 py-4 shadow-sm ring-1 ring-rose-100/80">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-rose-600">放榜時間</p>
                  <p className="mt-2 text-3xl font-black leading-none text-slate-950">{resultOpenDateLabel}</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-slate-500">各就學區免試入學分發結果開放查詢</p>
                </div>
                <div className="flex min-w-[180px] flex-col items-center justify-center rounded-[24px] bg-rose-600 px-6 py-5 text-white shadow-[0_18px_42px_-26px_rgba(225,29,72,0.85)]">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-rose-100">Open</p>
                  <p className="mt-1 font-outfit text-6xl font-black leading-none">{resultOpenClockLabel}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2.5" role="timer" aria-label={`倒數 ${state.days} 天 ${state.hours} 小時 ${state.minutes} 分 ${state.seconds} 秒`}>
                {countdownItems.map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-white/80 bg-white/72 px-3 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_14px_34px_-30px_rgba(15,23,42,0.45)]">
                    <div className="font-outfit text-4xl font-black leading-none text-slate-950">
                      {item.val.toString().padStart(2, "0")}
                    </div>
                    <div className="mt-2 font-outfit text-[10px] font-black tracking-[0.16em] text-slate-500">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!state.isRegistrationComplete && !state.isResultDay && !state.isResultCountdown && (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4" role="timer" aria-label={`倒數 ${state.days} 天 ${state.hours} 小時 ${state.minutes} 分 ${state.seconds} 秒`}>
              {countdownItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[30px] border border-white/80 bg-slate-50/78 p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_14px_40px_-30px_rgba(15,23,42,0.55)]"
                >
                  <div className={`font-outfit text-5xl font-black leading-none md:text-6xl ${state.status === "active" ? "text-rose-600" : "text-slate-950"}`}>
                    {item.val.toString().padStart(2, "0")}
                  </div>
                  <div className="mt-3 font-outfit text-[11px] font-black tracking-[0.18em] text-slate-500">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
