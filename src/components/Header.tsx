import { BarChart3, CalendarDays, Mail, MapPin, Menu, Share2, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function Header({ onOpenSchedule }: { onOpenSchedule: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const links = [
    { label: "重要日程", detail: "115 會考時程", icon: CalendarDays, action: onOpenSchedule },
    { label: "錄取分享", detail: "分享錄取分數", icon: BarChart3, href: "https://tyctw.github.io/shared/" },
    { label: "序位分享", detail: "對照各區排名", icon: MapPin, href: "https://tyctw.github.io/score/" },
    { label: "成績回報", detail: "回報分數資料", icon: Share2, href: "https://tyctw.github.io/shared/" },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        window.setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed top-4 z-50 flex w-full justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-6xl rounded-[28px] glass-header">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex min-w-0 items-center">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-slate-950 text-white shadow-[0_12px_28px_-18px_rgba(15,23,42,0.9)]">
                <Sparkles className="h-5 w-5" />
                <span className="absolute -bottom-1 -right-1 rounded-full bg-sky-500 px-1.5 py-0.5 font-outfit text-[9px] font-black leading-none text-white">
                  115
                </span>
              </div>
              <div className="ml-3 min-w-0">
                <h1 className="truncate text-base font-black leading-none tracking-normal text-slate-950 sm:text-lg">
                  全國會考查榜入口
                </h1>
                <p className="mt-1 hidden text-xs font-bold text-slate-500 sm:block">
                  免試入學放榜與志願資訊整理
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-1 rounded-full bg-slate-100/70 p-1 md:flex">
              {links.slice(0, 3).map((link) => {
                const Icon = link.icon;
                const className = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:bg-white hover:text-slate-950 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200";
                return link.href ? (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={className}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </a>
                ) : (
                  <button key={link.label} onClick={link.action} className={className}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </button>
                );
              })}
            </div>

            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="開啟導航選單"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="rounded-full p-2.5 text-slate-600 transition-all hover:bg-white hover:text-slate-950 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex justify-end"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              className="absolute inset-0 bg-slate-950/35 backdrop-blur-md"
              variants={{
                closed: { opacity: 0 },
                open: { opacity: 1 },
              }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="導航選單"
              className="relative flex h-full w-full max-w-[350px] flex-col overflow-hidden bg-slate-50 shadow-2xl"
              variants={{
                closed: { opacity: 0, x: 42, scale: 0.98 },
                open: { opacity: 1, x: 0, scale: 1 },
              }}
              transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.9 }}
            >
              <motion.div
                className="relative overflow-hidden bg-slate-950 p-5 text-white"
                variants={{
                  closed: { opacity: 0, y: -8 },
                  open: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.22, delay: 0.04 }}
              >
                <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 left-10 h-36 w-36 rounded-full bg-emerald-300/15 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-white text-slate-950 shadow-sm">
                        <Sparkles className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-200">115 CAP</p>
                        <h2 className="text-xl font-black leading-tight">全國會考查榜入口</h2>
                      </div>
                    </div>
                    <p className="max-w-[240px] text-sm font-semibold leading-6 text-slate-300">
                      快速前往查榜、日程、錄取分享與成績回報。
                    </p>
                  </div>
                  <button
                    ref={closeButtonRef}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="關閉導航選單"
                    className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="flex-1 overflow-y-auto p-4"
                variants={{
                  closed: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
                  open: { transition: { delayChildren: 0.08, staggerChildren: 0.055 } },
                }}
              >
                <div className="mb-3 flex items-center justify-between px-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Menu</p>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-slate-400 shadow-sm ring-1 ring-slate-100">
                    {links.length} items
                  </span>
                </div>

                <div className="grid gap-2.5">
                {links.map((link, index) => {
                  const Icon = link.icon;
                  const isHighlight = link.label === "成績回報";
                  const content = (
                    <>
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] shadow-sm ${
                        isHighlight ? "bg-gradient-to-br from-amber-400 to-rose-500 text-white" : "bg-slate-100 text-slate-700"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-black text-slate-950">{link.label}</span>
                        <span className="mt-0.5 block text-xs font-semibold text-slate-500">{link.detail}</span>
                      </span>
                      <span className="font-outfit text-[11px] font-black text-slate-300">0{index + 1}</span>
                    </>
                  );
                  const itemClassName = `flex w-full items-center gap-3 rounded-[22px] p-3.5 text-left shadow-sm ring-1 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-4 ${
                    isHighlight
                      ? "bg-white ring-amber-100 hover:bg-amber-50 focus:ring-amber-100"
                      : "bg-white ring-slate-100 hover:bg-slate-50 focus:ring-sky-100"
                  }`;

                  return link.href ? (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className={itemClassName}
                      variants={{
                        closed: { opacity: 0, x: 18, scale: 0.98 },
                        open: { opacity: 1, x: 0, scale: 1 },
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    >
                      {content}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={link.label}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        link.action?.();
                      }}
                      className={itemClassName}
                      variants={{
                        closed: { opacity: 0, x: 18, scale: 0.98 },
                        open: { opacity: 1, x: 0, scale: 1 },
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    >
                      {content}
                    </motion.button>
                  );
                })}
                </div>
              </motion.div>

              <motion.div
                className="border-t border-slate-200/70 bg-white p-5"
                variants={{
                  closed: { opacity: 0, y: 10 },
                  open: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.22, delay: 0.14 }}
              >
                <p className="mb-3 text-center text-xs font-bold leading-5 text-slate-500">
                  非官方資訊整理平台，實際作業以各區與學校公告為準。
                </p>
                <a
                  href="mailto:tyctw.analyze@gmail.com"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-white hover:text-sky-700"
                >
                  <Mail className="h-4 w-4" />
                  Contact Team
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
