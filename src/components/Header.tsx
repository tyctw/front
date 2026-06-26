import { BarChart3, CalendarDays, Mail, MapPin, Menu, Share2, Sparkles, X } from "lucide-react";
import { useState } from "react";

export function Header({ onOpenSchedule }: { onOpenSchedule: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: "重要日程", detail: "115 會考時程", icon: CalendarDays, action: onOpenSchedule },
    { label: "錄取分享", detail: "分享錄取分數", icon: BarChart3, href: "https://tyctw.github.io/shared/" },
    { label: "序位分享", detail: "對照各區排名", icon: MapPin, href: "https://tyctw.github.io/score/" },
    { label: "成績回報", detail: "回報分數資料", icon: Share2, href: "https://tyctw.github.io/shared/" },
  ];

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

      {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <div
              className="absolute inset-0 bg-slate-950/30 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="導航選單"
              className="relative flex h-full w-full max-w-[330px] flex-col bg-white/92 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-200/70 p-5">
                <span className="flex items-center text-lg font-black text-slate-950">
                  <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-[18px] bg-slate-950 text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  導航選單
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto p-4">
                {links.map((link) => {
                  const Icon = link.icon;
                  const content = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-slate-100 text-slate-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-bold text-slate-900">{link.label}</span>
                        <span className="block text-xs font-medium text-slate-500">{link.detail}</span>
                      </span>
                    </>
                  );

                  return link.href ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center gap-3 rounded-[22px] p-3 text-left transition-colors hover:bg-slate-100/70"
                    >
                      {content}
                    </a>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        link.action?.();
                      }}
                      className="flex w-full items-center gap-3 rounded-[22px] p-3 text-left transition-colors hover:bg-slate-100/70"
                    >
                      {content}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-200/70 bg-slate-50/70 p-5 text-center">
                <a
                  href="mailto:tyctw.analyze@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-slate-500 transition-colors hover:bg-white hover:text-sky-700"
                >
                  <Mail className="h-4 w-4" />
                  Contact Team
                </a>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
