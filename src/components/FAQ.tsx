import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ_DATA } from "../data";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-16"
    >
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-outfit text-[11px] font-black uppercase tracking-[0.18em] text-sky-700">
            FAQ
          </span>
          <h3 className="mt-2 text-3xl font-black tracking-normal text-slate-950">
            常見問題
          </h3>
        </div>
        <p className="max-w-xl text-sm font-medium leading-6 text-slate-600">
          整理查榜、志願選填與成績相關問題，實際流程仍以官方簡章與各區系統公告為準。
        </p>
      </div>

      <div className="grid gap-3">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`overflow-hidden rounded-[28px] border bg-white/82 shadow-[0_16px_44px_-36px_rgba(15,23,42,0.48)] backdrop-blur-xl transition-all ${
                isOpen ? "border-sky-200" : "border-white/80 hover:bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none sm:px-6"
              >
                <span className={`text-base font-black leading-6 ${isOpen ? "text-sky-700" : "text-slate-900"}`}>
                  {item.q}
                </span>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  <Plus className={`h-5 w-5 transition-transform ${isOpen ? "rotate-45" : ""}`} />
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6">
                      <p className="text-sm font-medium leading-7 text-slate-600">
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
