import { ExternalLink, Mail, ShieldCheck, Sparkles, Scale, Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/48 px-4 py-6 backdrop-blur-xl sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[24px] border border-white/82 bg-white/78 shadow-[0_24px_80px_-52px_rgba(15,23,42,0.55)] ring-1 ring-slate-950/[0.03] backdrop-blur-2xl sm:rounded-[32px]">
          <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative p-4 sm:p-6 md:p-7">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-300" />
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[15px] bg-slate-950 text-white shadow-[0_16px_34px_-24px_rgba(15,23,42,0.9)] sm:h-13 sm:w-13 sm:rounded-[22px]">
                  <ShieldCheck className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <p className="hidden font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-700 sm:block">
                    Copyright Notice
                  </p>
                  <h2 className="text-lg font-black tracking-normal text-slate-950 sm:mt-1 sm:text-3xl">
                    TW會考落點分析
                  </h2>
                  <p className="mt-1 max-w-2xl text-xs font-semibold leading-5 text-slate-600 sm:hidden">
                    非官方資訊整理平台，查榜、報到與錄取資格請以官方公告為準。
                  </p>
                  <p className="mt-3 hidden max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:block">
                    本平台為非官方資訊整理與落點分析工具，提供查榜入口、時程提醒與考生參考資料；實際招生、報到、複查與錄取資格仍以各就學區委員會、錄取學校及官方簡章公告為準。
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden gap-2 border-t border-slate-100 bg-slate-50/68 p-5 sm:grid sm:grid-cols-3 md:border-l md:border-t-0">
              <div className="rounded-[16px] border border-white/80 bg-white/82 p-2.5 shadow-sm sm:rounded-[22px] sm:p-4">
                <Scale className="mb-1.5 h-4 w-4 text-slate-700 sm:mb-3 sm:h-5 sm:w-5" />
                <p className="text-xs font-black text-slate-950">非官方聲明</p>
                <p className="mt-1 hidden text-xs font-semibold leading-5 text-slate-500 sm:block">
                  不隸屬於官方免試入學委員會。
                </p>
              </div>
              <div className="rounded-[16px] border border-white/80 bg-white/82 p-2.5 shadow-sm sm:rounded-[22px] sm:p-4">
                <Database className="mb-1.5 h-4 w-4 text-emerald-600 sm:mb-3 sm:h-5 sm:w-5" />
                <p className="text-xs font-black text-slate-950">資料來源</p>
                <p className="mt-1 hidden text-xs font-semibold leading-5 text-slate-500 sm:block">
                  以公開資訊與使用者回報整理。
                </p>
              </div>
              <div className="rounded-[16px] border border-white/80 bg-white/82 p-2.5 shadow-sm sm:rounded-[22px] sm:p-4">
                <Sparkles className="mb-1.5 h-4 w-4 text-amber-600 sm:mb-3 sm:h-5 sm:w-5" />
                <p className="text-xs font-black text-slate-950">使用提醒</p>
                <p className="mt-1 hidden text-xs font-semibold leading-5 text-slate-500 sm:block">
                  查詢與報到請回到官方系統確認。
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 px-4 py-3 sm:px-6 sm:py-4 md:px-7">
            <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-[11px] font-semibold leading-5 text-slate-500 sm:text-xs sm:leading-6">
                <span className="sm:hidden">© 2026 TW會考落點分析。非官方平台，資訊請以官方公告為準。</span>
                <span className="hidden sm:inline">© 2026 TW會考落點分析。頁面內容、排版與整理資料保留所有權利；引用或分享請註明來源。本網站不保證第三方連結與官方系統於任何時間皆可正常連線。</span>
              </p>

              <div className="grid grid-cols-4 gap-1.5 sm:flex sm:shrink-0 sm:flex-wrap sm:gap-2">
                <a href="https://tyctw.github.io/spare" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/90 bg-white/82 px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100 sm:px-4 sm:text-sm">
                  <span className="sm:hidden">落點</span>
                  <span className="hidden sm:inline">落點分析</span>
                  <ExternalLink className="ml-1 h-3 w-3 sm:ml-2 sm:h-3.5 sm:w-3.5" />
                </a>
                <a href="https://tyctw.github.io/shared/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/90 bg-white/82 px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-100 sm:px-4 sm:text-sm">
                  <span className="sm:hidden">回報</span>
                  <span className="hidden sm:inline">成績回報</span>
                  <ExternalLink className="ml-1 h-3 w-3 sm:ml-2 sm:h-3.5 sm:w-3.5" />
                </a>
                <a href="https://tyctw.github.io/score/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/90 bg-white/82 px-3 py-2 text-xs font-bold text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-100 sm:px-4 sm:text-sm">
                  <span className="sm:hidden">序位</span>
                  <span className="hidden sm:inline">序位分享</span>
                  <ExternalLink className="ml-1 h-3 w-3 sm:ml-2 sm:h-3.5 sm:w-3.5" />
                </a>
                <a href="mailto:tyctw.analyze@gmail.com" className="inline-flex items-center justify-center rounded-full border border-white/90 bg-slate-950 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:px-4 sm:text-sm">
                  <Mail className="mr-1 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
                  <span className="sm:hidden">聯繫</span>
                  <span className="hidden sm:inline">聯繫團隊</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
