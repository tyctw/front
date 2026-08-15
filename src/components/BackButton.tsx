import { ArrowLeft } from "lucide-react";

export function BackButton({ href }: { href?: string }) {
  const goBack = () => {
    if (href) {
      window.location.assign(href);
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/front/");
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-4 py-2.5 text-sm font-black text-slate-600 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-200"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      回上一頁
    </button>
  );
}
