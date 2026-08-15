import { ArrowUpRight, BookOpenCheck, CalendarDays, ExternalLink, Info, Mail, MapPin, Newspaper, Sparkles } from "lucide-react";

const internalLinks = [
  { label: "重要日程", href: "/front/schedule/", icon: CalendarDays },
  { label: "文章專區", href: "/front/articles/", icon: Newspaper },
  { label: "報到指南", href: "/front/guide/", icon: BookOpenCheck },
];

const externalLinks = [
  { label: "落點分析", href: "https://tyctw.github.io/spare" },
  { label: "成績回報", href: "https://tyctw.github.io/shared/" },
  { label: "序位分享", href: "https://tyctw.github.io/score/" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 px-4 pb-5 pt-6 text-slate-200 sm:px-6 sm:pb-8 sm:pt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-400 via-emerald-300 to-amber-300" />
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6 sm:gap-10 sm:pb-10 lg:grid-cols-[1.35fr_0.8fr_0.9fr] lg:gap-14">
          <section className="col-span-2 lg:col-span-1">
            <a href="/front/" className="inline-flex items-center gap-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-300">
              <span className="flex h-11 w-11 items-center justify-center rounded-[17px] bg-gradient-to-br from-sky-300 to-emerald-300 text-slate-950 shadow-[0_16px_32px_-20px_rgba(56,189,248,0.9)]">
                <Sparkles className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-300">TW CAP GUIDE</span>
                <span className="mt-0.5 block text-xl font-black tracking-tight text-white">全國會考查榜入口</span>
              </span>
            </a>
            <p className="mt-3 hidden max-w-md text-sm font-semibold leading-7 text-slate-400 sm:block sm:mt-5">
              將查榜、報到與升學資訊整理成清楚的下一步。查詢與入學程序，請以各就學區、招生委員會及錄取學校的正式公告為準。
            </p>
          </section>

          <nav aria-label="站內導覽">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">EXPLORE</p>
            <h2 className="mt-2 text-lg font-black text-white">快速前往</h2>
            <div className="mt-3 grid gap-1 sm:mt-4 sm:gap-2">
              {internalLinks.map(({ label, href, icon: Icon }) => (
                <a key={href} href={href} className="group flex items-center justify-between rounded-xl px-1 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300 sm:px-3 sm:py-2.5 sm:text-sm">
                  <span className="flex items-center gap-2.5"><Icon className="h-4 w-4 text-sky-300" />{label}</span>
                  <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-sky-300" />
                </a>
              ))}
            </div>
          </nav>

          <section>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">OFFICIAL FIRST</p>
            <h2 className="mt-2 text-lg font-black text-white">查詢與支援</h2>
            <div className="mt-3 grid gap-1 sm:mt-4 sm:gap-2">
              <a href="https://cap.rcpet.edu.tw/" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-xl px-1 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300 sm:px-3 sm:py-2.5 sm:text-sm">
                <span className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-emerald-300" />國中教育會考官網</span><ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-emerald-300" />
              </a>
              <a href="mailto:tyctw.analyze@gmail.com" className="group flex items-center justify-between rounded-xl px-1 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300 sm:px-3 sm:py-2.5 sm:text-sm">
                <span className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-amber-300" />聯繫團隊</span><ArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-amber-300" />
              </a>
              <a href="/front/about/" className="group flex items-center justify-between rounded-xl px-1 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/[0.07] hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300 sm:px-3 sm:py-2.5 sm:text-sm">
                <span className="flex items-center gap-2.5"><Info className="h-4 w-4 text-sky-300" />關於我們</span><ArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-sky-300" />
              </a>
            </div>
            <p className="mt-5 hidden text-xs font-semibold leading-5 text-slate-500 sm:block">若查榜結果、報到期限或資格有疑問，請直接聯繫招生委員會或錄取學校承辦單位。</p>
          </section>
        </div>

        <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:pt-6">
          <p className="text-xs font-semibold leading-5 text-slate-500">© 2027 TW會考落點分析 · 所有資訊請以當年度官方公告為準。</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {externalLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-sky-300">{link.label}<ExternalLink className="h-3 w-3" /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
