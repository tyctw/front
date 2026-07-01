import { ArrowRight, Database } from "lucide-react";

export function Banner() {
  return (
    <section className="mb-12">
      <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/88 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.5)] backdrop-blur-xl">
        <div className="grid gap-0 md:grid-cols-[1fr_auto]">
          <div className="relative p-5 sm:p-6 md:p-7">
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[20px] bg-slate-950 text-white shadow-[0_16px_32px_-24px_rgba(15,23,42,0.9)]">
                <Database className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="mb-1.5 font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-700">
                  Data Sharing
                </div>
                <h3 className="text-[28px] font-black leading-tight tracking-normal text-slate-950 md:text-4xl">
                  成績回報計畫
                </h3>
                <p className="mt-3 max-w-2xl text-[15px] font-semibold leading-7 text-slate-600">
                  回報資料可協助後續落點分析更接近實際情況，也讓下一屆考生有更完整的參考。
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-slate-100 bg-gradient-to-br from-amber-50 via-white to-teal-50 p-5 sm:p-6 md:min-w-[280px] md:border-l md:border-t-0 md:p-7">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">Join the dataset</p>
              <p className="mt-2 text-lg font-black leading-7 text-slate-950">
                花一分鐘回報，讓資料更完整。
              </p>
            </div>

            <a
              href="https://tyctw.github.io/shared/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-full items-center justify-center rounded-[18px] bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 px-5 py-4 text-sm font-black text-white shadow-[0_18px_38px_-18px_rgba(249,115,22,0.75)] ring-1 ring-orange-300/40 transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-18px_rgba(244,63,94,0.78)] focus:outline-none focus:ring-4 focus:ring-orange-100"
            >
              前往回報系統
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
