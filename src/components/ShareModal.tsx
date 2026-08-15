import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, Link2, Share2, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { FaInstagram, FaLine, FaThreads } from "react-icons/fa6";

export function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const shareUrl = "https://tyctw.github.io/front/";

  useEffect(() => {
    if (!isOpen) return;

    window.setTimeout(() => dialogRef.current?.focus(), 80);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent("推薦使用 TW會考落點分析平台，提供各區免試入學落點分析、成績分享與志願選填等相關資訊！");
    const url = encodeURIComponent(shareUrl);

    switch (platform) {
      case "line":
        window.open(`https://line.me/R/msg/text/?${text}%20${url}`, "_blank");
        break;
      case "threads":
        window.open(`https://threads.net/intent/post?text=${text}%20${url}`, "_blank");
        break;
      case "ig":
        if (navigator.share) {
          navigator.share({
            title: "TW會考落點分析",
            text: "推薦使用 TW會考落點分析平台！",
            url: shareUrl,
          }).catch(console.error);
        } else {
          handleCopy();
          alert("連結已複製，您可以前往 Instagram 貼上連結與好友分享！");
        }
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-label="分享平台">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/45 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/90 bg-white text-left shadow-[0_36px_100px_-38px_rgba(15,23,42,0.7)] sm:rounded-[34px]"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-emerald-100/65 blur-3xl" />
        <button onClick={onClose} aria-label="關閉分享視窗" className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 text-slate-500 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-950 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-100">
          <X className="h-5 w-5" />
        </button>

        <div className="relative border-b border-slate-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50/80 px-5 py-5 sm:px-7 sm:py-6">
          <div className="relative flex items-center gap-3 pr-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[17px] bg-white shadow-[0_14px_28px_-18px_rgba(56,189,248,0.75)] ring-1 ring-sky-100">
              <img src="/front/stile.png" alt="全國會考查榜入口" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h3 className="text-2xl font-black leading-tight tracking-normal text-slate-950 sm:text-3xl">分享查榜入口</h3>
              <p className="mt-1.5 max-w-md text-sm font-semibold leading-6 text-slate-600">把正確的就學區系統與重要日程，快速傳給朋友。</p>
            </div>
          </div>
        </div>

        <div className="relative px-5 py-5 sm:px-7 sm:py-6">
          <div className="grid gap-4 sm:grid-cols-[174px_178px] sm:justify-center sm:gap-2">
            <div className="flex items-center justify-center rounded-[22px] border border-slate-100 bg-slate-50/85 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:-translate-x-4 sm:items-center sm:justify-center">
              <div className="inline-flex shrink-0 rounded-[16px] bg-white p-2.5 shadow-sm ring-1 ring-sky-100">
                <QRCodeSVG value={shareUrl} size={138} level="H" includeMargin={false} />
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-xs font-black tracking-[0.14em] text-slate-500">選擇分享方式</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-1 sm:justify-items-start sm:gap-2">
                <button onClick={() => handleShare("line")} aria-label="分享到 LINE" className="group flex min-w-0 flex-col items-center justify-center rounded-[20px] border border-white bg-white p-2.5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.7)] transition-all hover:-translate-y-0.5 hover:border-[#00B900]/35 hover:bg-[#00B900]/5 focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:min-h-[44px] sm:w-[178px] sm:flex-row sm:justify-start sm:gap-2 sm:p-1.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#00B900] text-white shadow-md shadow-[#00B900]/20 sm:h-9 sm:w-9 sm:rounded-[12px]">
                  <FaLine className="h-6 w-6 sm:h-5 sm:w-5" />
                </span>
                  <span className="mt-1.5 min-w-0 text-center sm:mt-0 sm:text-left"><span className="block text-xs font-black text-slate-950 sm:text-sm">LINE</span><span className="hidden text-xs font-bold text-slate-500 sm:block">傳到群組</span></span>
              </button>

                <button onClick={() => handleShare("ig")} aria-label="分享到 Instagram" className="group flex min-w-0 flex-col items-center justify-center rounded-[20px] border border-white bg-white p-2.5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.7)] transition-all hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50/70 focus:outline-none focus:ring-4 focus:ring-pink-100 sm:min-h-[44px] sm:w-[178px] sm:flex-row sm:justify-start sm:gap-2 sm:p-1.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md shadow-pink-500/20 sm:h-9 sm:w-9 sm:rounded-[12px]">
                  <FaInstagram className="h-6 w-6 sm:h-5 sm:w-5" />
                </span>
                  <span className="mt-1.5 min-w-0 text-center sm:mt-0 sm:text-left"><span className="block text-xs font-black text-slate-950 sm:text-sm">Instagram</span><span className="hidden text-xs font-bold text-slate-500 sm:block">限動或訊息</span></span>
              </button>

                <button onClick={() => handleShare("threads")} aria-label="分享到 Threads" className="group flex min-w-0 flex-col items-center justify-center rounded-[20px] border border-white bg-white p-2.5 shadow-[0_12px_28px_-24px_rgba(15,23,42,0.7)] transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 sm:min-h-[44px] sm:w-[178px] sm:flex-row sm:justify-start sm:gap-2 sm:p-1.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-black text-white shadow-md shadow-black/20 sm:h-9 sm:w-9 sm:rounded-[12px]">
                  <FaThreads className="h-6 w-6 sm:h-5 sm:w-5" />
                </span>
                  <span className="mt-1.5 min-w-0 text-center sm:mt-0 sm:text-left"><span className="block text-xs font-black text-slate-950 sm:text-sm">Threads</span><span className="hidden text-xs font-bold text-slate-500 sm:block">直接發文</span></span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            aria-label="複製分享連結"
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-[18px] px-5 py-3.5 text-sm font-black shadow-lg transition-all focus:outline-none focus:ring-4 ${
              copied
                ? "bg-emerald-500 text-white shadow-emerald-500/20 focus:ring-emerald-100"
                : "bg-slate-950 text-white shadow-slate-950/20 hover:bg-slate-800 focus:ring-slate-200"
            }`}
          >
            {copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}
            {copied ? "連結已複製" : "複製分享連結"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
