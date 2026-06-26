import { useState } from "react";
import { motion } from "motion/react";
import { Link2, QrCode, Share2, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { FaInstagram, FaLine, FaThreads } from "react-icons/fa6";

export function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://tyctw.github.io/";

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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="分享平台">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-[320px] overflow-hidden rounded-[28px] border border-slate-100 bg-white p-6 text-center shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)]"
      >
        <button onClick={onClose} aria-label="關閉分享視窗" className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none">
          <X className="h-5 w-5" />
        </button>

        <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] border border-teal-100/50 bg-teal-50 shadow-sm">
          <Share2 className="relative z-10 h-8 w-8 text-teal-500" />
          <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-xl" />
        </div>

        <h3 className="mb-2 text-[24px] font-black leading-[1.2] tracking-tight text-slate-900">分享給朋友</h3>
        <p className="mb-6 text-[14px] font-medium leading-relaxed text-slate-500">
          一起查榜、一起分享喜悅與緊張，陪你走過會考放榜的重要時刻！
        </p>

        <div className="mb-6 flex flex-col items-center rounded-[20px] border border-slate-100 bg-slate-50 p-5">
          <div className="mb-3 inline-block rounded-[12px] border border-slate-100 bg-white p-2 shadow-sm">
            <QRCodeSVG value={shareUrl} size={100} level="H" includeMargin={false} />
          </div>
          <p className="mt-1 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <QrCode className="mr-1 h-3 w-3" /> Scan QR Code
          </p>
        </div>

        <div className="mb-1 grid grid-cols-4 gap-2">
          <button onClick={() => handleShare("line")} aria-label="分享到 LINE" className="group flex flex-col items-center gap-1.5 focus:outline-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#00B900] text-white shadow-md shadow-[#00B900]/20 transition-transform group-hover:-translate-y-1">
              <FaLine className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">LINE</span>
          </button>

          <button onClick={() => handleShare("ig")} aria-label="分享到 Instagram" className="group flex flex-col items-center gap-1.5 focus:outline-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md shadow-pink-500/20 transition-transform group-hover:-translate-y-1">
              <FaInstagram className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">Instagram</span>
          </button>

          <button onClick={() => handleShare("threads")} aria-label="分享到 Threads" className="group flex flex-col items-center gap-1.5 focus:outline-none">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-black text-white shadow-md shadow-black/20 transition-transform group-hover:-translate-y-1">
              <FaThreads className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">Threads</span>
          </button>

          <button onClick={handleCopy} aria-label="複製分享連結" className="group flex flex-col items-center gap-1.5 focus:outline-none">
            <div className={`flex h-10 w-10 items-center justify-center rounded-[14px] text-white shadow-md transition-all group-hover:-translate-y-1 ${copied ? "bg-emerald-500 shadow-emerald-500/20" : "bg-slate-700 shadow-slate-700/20"}`}>
              <Link2 className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">{copied ? "已複製" : "複製連結"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
