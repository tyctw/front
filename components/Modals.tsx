import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Award, Bell, CalendarClock, CheckCircle2, Clock3, ExternalLink, MapPinned, X, MapPin, Link2, Share2, QrCode } from "lucide-react";
import { LATEST_ANNOUNCEMENT } from "../data";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { FaLine, FaInstagram, FaThreads } from "react-icons/fa6";

export function WarningModal({ isOpen, onClose, pendingUrl }: { isOpen: boolean, onClose: () => void, pendingUrl: string | null }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="非開放查詢時間提醒">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/45 backdrop-blur-xl" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-[430px] overflow-hidden rounded-[34px] border border-white/80 bg-white/95 p-5 text-left shadow-[0_34px_90px_-38px_rgba(15,23,42,0.55)] backdrop-blur-2xl sm:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-amber-300 via-orange-400 to-sky-400" />
        <button onClick={onClose} aria-label="關閉提醒" className="absolute right-4 top-4 rounded-full bg-slate-100/80 p-2 text-slate-500 transition-colors hover:bg-slate-200/80 hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-100">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5 flex items-center gap-4 pr-10">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] border border-amber-100 bg-amber-50 text-amber-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-600">尚未開放</p>
            <h3 className="mt-1 text-2xl font-black tracking-normal text-slate-950">非開放查詢時間</h3>
          </div>
        </div>

        <p className="text-[15px] font-medium leading-7 text-slate-600">
          目前尚未到各區免試入學查榜開放時間。為避免看見未更新或測試資料，請於正式開放後再進入查詢。
        </p>
        
        <div className="my-6 rounded-[26px] border border-slate-100 bg-slate-50/90 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-white text-sky-600 shadow-sm">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">正式開放時間</p>
              <p className="mt-1 text-xl font-black tracking-normal text-slate-950">115年7月7日 11:00</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row-reverse">
          <button 
            onClick={onClose} 
            className="w-full rounded-[20px] bg-slate-950 px-5 py-4 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            我知道了
          </button>
          {pendingUrl && (
            <a 
              href={pendingUrl} target="_blank" rel="noreferrer" onClick={onClose}
              className="flex w-full items-center justify-center rounded-[20px] border border-slate-200 bg-white px-5 py-4 text-sm font-black text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              仍然前往
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function AnnouncementModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="最新公告">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[32px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] p-8 max-w-[340px] w-full text-center overflow-hidden border border-slate-100"
      >
        <button onClick={onClose} aria-label="關閉公告" className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-20 h-20 bg-blue-50 rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-sm border border-blue-100/50">
          <Bell className="w-10 h-10 text-blue-500 relative z-10" />
          <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full"></div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">最新公告</h3>
        
        <div className="bg-slate-50 rounded-[24px] p-6 mb-8 border border-slate-100 relative overflow-hidden">
          <p className="text-slate-600 leading-relaxed text-[15px] font-medium text-left">
            {LATEST_ANNOUNCEMENT.text}
          </p>
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-200/60">
            <div className="flex items-center text-slate-400">
               <CalendarClock className="w-4 h-4 mr-2" />
               <span className="text-xs font-bold tracking-wider">DATE</span>
            </div>
            <p className="text-slate-700 text-sm font-outfit font-bold tracking-tight">{LATEST_ANNOUNCEMENT.date}</p>
          </div>
        </div>

        <button onClick={onClose} className="w-full py-4 rounded-[20px] bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 focus:outline-none focus:ring-4 focus:ring-slate-100">
          我知道了
        </button>
      </motion.div>
    </div>
  );
}

export function ScoreModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="會考成績查詢提醒">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[32px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] p-8 max-w-[340px] w-full text-center overflow-hidden border border-slate-100"
      >
        <button onClick={onClose} aria-label="關閉成績提醒" className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
          <X className="w-5 h-5" />
        </button>
        
        <div className="relative w-20 h-20 bg-emerald-50 rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-sm border border-emerald-100/50">
          <Award className="w-10 h-10 text-emerald-500 relative z-10" />
          <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full"></div>
        </div>
          
        <h3 className="text-[28px] font-black text-slate-900 mb-4 tracking-tight leading-[1.2]">會考成績<br /><span className="text-emerald-500">6/5 早上 8 點公布</span></h3>
        <p className="text-slate-500 mb-8 leading-relaxed text-[15px] font-medium">
          請前往「國中教育會考全國試務會」<br/>官方網站查詢您的正式成績。<br/>祝您金榜題名！
        </p>
        
        <div className="flex flex-col space-y-3">
          <a 
            href="https://cap.rcpet.edu.tw/" target="_blank" rel="noreferrer" onClick={onClose}
            className="w-full py-4 rounded-[20px] bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            前往官方網站查詢
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
          <button onClick={onClose} className="w-full py-4 rounded-[20px] bg-white border-2 border-slate-100 text-slate-500 font-bold hover:border-slate-200 hover:text-slate-600 transition-colors focus:outline-none">
            稍後再看
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function VolunteerModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-label="志願選填提醒">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/45 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 24 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative w-full max-w-[360px] max-h-[92vh] overflow-y-auto overflow-x-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_24px_64px_-24px_rgba(15,23,42,0.5)]"
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#4ECDC4] via-[#FFE66D] to-[#FF6B6B]" />
        <button onClick={onClose} aria-label="關閉志願選填提醒" className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 text-slate-400 shadow-sm ring-1 ring-slate-200/70 backdrop-blur hover:bg-slate-50 hover:text-slate-700 transition-colors focus:outline-none focus:ring-4 focus:ring-teal-100">
          <X className="w-4 h-4" />
        </button>

        <div className="relative px-5 pb-5 pt-7 sm:px-6 sm:pb-6">
          <div className="absolute right-[-4rem] top-[-4rem] h-36 w-36 rounded-full bg-[#4ECDC4]/10" />
          <div className="absolute left-[-4rem] bottom-[-4rem] h-40 w-40 rounded-full bg-[#FFE66D]/20" />

          <div className="relative">
            <div className="mb-4 flex items-start gap-3 pr-9">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-teal-50 text-teal-500 shadow-sm ring-1 ring-teal-100">
                <MapPinned className="h-6 w-6" />
              </div>
              <div className="min-w-0 text-left">
                <div className="mb-1.5 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                  115 學年度
                </div>
                <h3 className="text-[23px] font-black leading-tight tracking-tight text-slate-950">
                  免試入學<br />
                  <span className="text-teal-500">各區志願選填</span>
                </h3>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-[auto_1fr] gap-3 rounded-[20px] border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-4 text-left shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-teal-500 shadow-sm">
                <Clock3 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-600">選填期間</p>
                <p className="mt-1 text-lg font-black leading-snug text-slate-900">115/06/18 12:00 - 115/06/25 12:00</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-500">請於期限內前往所屬就學區平台完成志願選填。</p>
              </div>
            </div>

            <div className="mb-5 space-y-2 text-left">
              {[
                "先確認個人序位區間，再安排志願順序。",
                "不同就學區系統入口不同，請選擇正確區域。",
                "送出前再次檢查帳號、資料與志願清單。"
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 rounded-2xl bg-slate-50 px-3 py-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <p className="text-xs font-bold leading-relaxed text-slate-600">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://tyctw.github.io/volunteer/" target="_blank" rel="noreferrer" onClick={onClose}
                className="group flex w-full items-center justify-center rounded-[18px] bg-slate-950 px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                前往各區選填網址
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button onClick={onClose} className="w-full rounded-[18px] border-2 border-slate-100 bg-white px-4 py-3.5 text-sm font-black text-slate-500 transition-colors hover:border-slate-200 hover:bg-slate-50 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-100">
                稍後再看
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ShareModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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
    
    switch(platform) {
      case 'line':
        window.open(`https://line.me/R/msg/text/?${text}%20${url}`, '_blank');
        break;
      case 'threads':
        window.open(`https://threads.net/intent/post?text=${text}%20${url}`, '_blank');
        break;
      case 'ig':
        if (navigator.share) {
          navigator.share({
            title: 'TW會考落點分析',
            text: '推薦使用 TW會考落點分析平台！',
            url: shareUrl
          }).catch(console.error);
        } else {
          handleCopy();
          alert('連結已複製，您可以前往 Instagram 貼上連結與好友分享！');
        }
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="分享平台">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/45 backdrop-blur-xl" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-[420px] overflow-hidden rounded-[34px] border border-white/80 bg-white/95 p-5 text-left shadow-[0_34px_90px_-38px_rgba(15,23,42,0.55)] backdrop-blur-2xl sm:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-teal-300 via-sky-400 to-indigo-400" />
        <button onClick={onClose} aria-label="關閉分享視窗" className="absolute right-4 top-4 rounded-full bg-slate-100/80 p-2 text-slate-500 transition-colors hover:bg-slate-200/80 hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-100">
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-5 flex items-center gap-4 pr-10">
          <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-[22px] border border-teal-100 bg-teal-50 text-teal-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
            <Share2 className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-600">Share</p>
            <h3 className="mt-1 text-2xl font-black tracking-normal text-slate-950">分享平台</h3>
          </div>
        </div>
          
        <p className="text-[15px] font-medium leading-7 text-slate-600">
          將查榜入口分享給同學或家人，重要時刻一起確認資訊。
        </p>

        <div className="my-6 rounded-[28px] border border-slate-100 bg-slate-50/90 p-4">
          <div className="flex items-center gap-4">
            <div className="shrink-0 rounded-[22px] border border-slate-100 bg-white p-3 shadow-sm">
              <QRCodeSVG value={shareUrl} size={112} level="H" includeMargin={false} />
            </div>
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500 shadow-sm">
                <QrCode className="h-3.5 w-3.5" />
                QR Code
              </div>
              <p className="break-all text-sm font-bold leading-6 text-slate-600">{shareUrl}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button onClick={() => handleShare('line')} aria-label="分享到 LINE" className="group flex items-center gap-3 rounded-[22px] border border-slate-100 bg-white p-3.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#00B900]/30 hover:bg-[#00B900]/5 focus:outline-none focus:ring-4 focus:ring-emerald-100">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-[#00B900] text-white shadow-md shadow-[#00B900]/20">
              <FaLine className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm font-black text-slate-900">LINE</span>
              <span className="block text-xs font-bold text-slate-500">傳給好友</span>
            </span>
          </button>
          
          <button onClick={() => handleShare('ig')} aria-label="分享到 Instagram" className="group flex items-center gap-3 rounded-[22px] border border-slate-100 bg-white p-3.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-pink-200 hover:bg-pink-50/60 focus:outline-none focus:ring-4 focus:ring-pink-100">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md shadow-pink-500/20">
              <FaInstagram className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm font-black text-slate-900">Instagram</span>
              <span className="block text-xs font-bold text-slate-500">複製分享</span>
            </span>
          </button>
          
          <button onClick={() => handleShare('threads')} aria-label="分享到 Threads" className="group flex items-center gap-3 rounded-[22px] border border-slate-100 bg-white p-3.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] bg-black text-white shadow-md shadow-black/20">
              <FaThreads className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm font-black text-slate-900">Threads</span>
              <span className="block text-xs font-bold text-slate-500">發布連結</span>
            </span>
          </button>
          
          <button onClick={handleCopy} aria-label="複製分享連結" className="group flex items-center gap-3 rounded-[22px] border border-slate-100 bg-white p-3.5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50/70 focus:outline-none focus:ring-4 focus:ring-sky-100">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[17px] text-white shadow-md transition-colors ${copied ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-slate-800 shadow-slate-800/20'}`}>
              <Link2 className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-black text-slate-900">{copied ? '已複製' : '複製連結'}</span>
              <span className="block text-xs font-bold text-slate-500">{copied ? '可貼給朋友' : '取得網址'}</span>
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
