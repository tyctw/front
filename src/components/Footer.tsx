import { Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-white/45 px-4 py-10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-slate-950 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-normal text-slate-950">
              TW會考落點分析
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
              非官方數據與落點分析平台，不隸屬於官方免試入學委員會。
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <a href="https://tyctw.github.io/spare" target="_blank" rel="noreferrer" className="rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-sky-700">
            落點分析
          </a>
          <a href="https://tyctw.github.io/shared/" target="_blank" rel="noreferrer" className="rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-amber-700">
            成績回報
          </a>
          <a href="https://tyctw.github.io/score/" target="_blank" rel="noreferrer" className="rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-rose-700">
            序位分享
          </a>
          <a href="mailto:tyctw.analyze@gmail.com" className="inline-flex items-center rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm font-bold text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-slate-950">
            <Mail className="mr-2 h-4 w-4" />
            聯繫團隊
          </a>
        </div>
      </div>
    </footer>
  );
}
