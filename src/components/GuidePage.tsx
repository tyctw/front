import { ContentGuide } from "./ContentGuide";
import { ArrowLeft } from "lucide-react";

export function GuidePage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 pb-12 pt-30 sm:px-6 lg:px-8" tabIndex={-1}>
      <div className="mb-5">
        <a
          href="/front/"
          className="inline-flex items-center rounded-full border border-white/80 bg-white/82 px-4 py-2.5 text-sm font-black text-slate-600 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回查榜入口
        </a>
      </div>
      <ContentGuide />
    </main>
  );
}
