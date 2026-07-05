import { BarChart3, CalendarDays, MapPin, Menu, Share2, Sparkles } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const loadMobileNavigation = () => import("./MobileNavigation");
const MobileNavigation = lazy(() => loadMobileNavigation().then((module) => ({ default: module.MobileNavigation })));

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
              onFocus={() => void loadMobileNavigation()}
              onPointerEnter={() => void loadMobileNavigation()}
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

      <Suspense fallback={null}>
        {mobileMenuOpen && (
          <MobileNavigation
            links={links}
            closeButtonRef={closeButtonRef}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
}
