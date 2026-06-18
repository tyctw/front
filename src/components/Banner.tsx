import { motion } from "motion/react";
import { ArrowRight, Database } from "lucide-react";

export function Banner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-12"
    >
      <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-5 shadow-lg shadow-slate-300/40 md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-teal-300">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <div className="mb-2 font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-teal-300">
                Data Sharing
              </div>
              <h3 className="text-2xl font-black tracking-normal text-white md:text-3xl">
                成績回報計畫
              </h3>
              <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-300">
                回報資料可協助後續落點分析更接近實際情況，也讓下一屆考生有更完整的參考。
              </p>
            </div>
          </div>

          <a
            href="https://tyctw.github.io/shared/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            前往回報系統
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
