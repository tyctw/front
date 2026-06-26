import { ArrowRight, Database } from "lucide-react";

export function Banner() {
  return (
    <section className="mb-12">
      <div className="overflow-hidden rounded-[34px] border border-white/80 bg-white/82 p-5 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.5)] backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[20px] bg-slate-950 text-white shadow-[0_16px_32px_-24px_rgba(15,23,42,0.9)]">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="mb-2 font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-700">
                Data Sharing
              </div>
              <h3 className="text-2xl font-black tracking-normal text-slate-950 md:text-3xl">
                成績回報計畫
              </h3>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-600">
                回報資料可協助後續落點分析更接近實際情況，也讓下一屆考生有更完整的參考。
              </p>
            </div>
          </div>

          <a
            href="https://tyctw.github.io/shared/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.9)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            前往回報系統
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
