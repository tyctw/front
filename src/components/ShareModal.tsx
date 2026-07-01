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
        className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/80 bg-white text-left shadow-[0_34px_90px_-36px_rgba(15,23,42,0.7)] sm:rounded-[32px]"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400" />
        <button onClick={onClose} aria-label="關閉分享視窗" className="absolute right-4 top-4 z-20 rounded-full bg-white/88 p-2 text-slate-500 shadow-sm ring-1 ring-slate-200/70 backdrop-blur transition-colors hover:bg-white hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-100">
          <X className="h-5 w-5" />
        </button>

        <div className="px-5 pb-5 pt-7 sm:px-6 sm:pb-6 sm:pt-8">
          <div className="mb-5 flex items-start gap-3 pr-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-teal-100 bg-teal-50 text-teal-600 shadow-sm sm:h-14 sm:w-14 sm:rounded-[20px]">
              <Share2 className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-teal-600">Share</p>
              <h3 className="mt-1 text-3xl font-black leading-tight tracking-normal text-slate-950">分享給朋友</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                把查榜入口傳給同學，大家一起快速找到正確的就學區系統。
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[170px_1fr] sm:items-stretch">
            <div className="rounded-[24px] border border-slate-100 bg-slate-50/90 p-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
              <div className="mx-auto inline-block rounded-[18px] border border-slate-100 bg-white p-3 shadow-sm">
                <QRCodeSVG value={shareUrl} size={124} level="H" includeMargin={false} />
              </div>
            </div>

            <div className="grid gap-2.5">
              <button onClick={() => handleShare("line")} aria-label="分享到 LINE" className="group flex items-center gap-3 rounded-[20px] border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#00B900]/30 hover:bg-[#00B900]/5 focus:outline-none focus:ring-4 focus:ring-emerald-100">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-[#00B900] text-white shadow-md shadow-[#00B900]/20">
                  <FaLine className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black text-slate-950">LINE</span>
                  <span className="block text-xs font-bold text-slate-500">傳到群組或聊天室</span>
                </span>
              </button>

              <button onClick={() => handleShare("ig")} aria-label="分享到 Instagram" className="group flex items-center gap-3 rounded-[20px] border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50/70 focus:outline-none focus:ring-4 focus:ring-pink-100">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md shadow-pink-500/20">
                  <FaInstagram className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black text-slate-950">Instagram</span>
                  <span className="block text-xs font-bold text-slate-500">複製後貼到限動或訊息</span>
                </span>
              </button>

              <button onClick={() => handleShare("threads")} aria-label="分享到 Threads" className="group flex items-center gap-3 rounded-[20px] border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-black text-white shadow-md shadow-black/20">
                  <FaThreads className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black text-slate-950">Threads</span>
                  <span className="block text-xs font-bold text-slate-500">直接發文分享入口</span>
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={handleCopy}
            aria-label="複製分享連結"
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-[20px] px-5 py-4 text-sm font-black shadow-lg transition-all focus:outline-none focus:ring-4 ${
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
