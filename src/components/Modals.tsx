import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Award, Bell, CalendarClock, CheckCircle2, Clock3, ExternalLink, MapPinned, X, MapPin, Link2, Share2, QrCode, FileText, GraduationCap, RotateCcw } from "lucide-react";
import { ADMISSION_LIST_CLOSE_DATE, LATEST_ANNOUNCEMENT, RESULT_LOOKUP_URL, VOLUNTEER_URL } from "../data";
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

  const volunteerClosed = new Date() >= new Date(ADMISSION_LIST_CLOSE_DATE);
  const volunteerEntryUrl = volunteerClosed ? RESULT_LOOKUP_URL : VOLUNTEER_URL;
  const volunteerEntryLabel = volunteerClosed ? "前往查榜網址" : "前往各區選填網址";

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
                href={volunteerEntryUrl} target={volunteerClosed ? undefined : "_blank"} rel={volunteerClosed ? undefined : "noreferrer"} onClick={onClose}
                className="group flex w-full items-center justify-center rounded-[18px] bg-slate-950 px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                {volunteerEntryLabel}
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

export function ResultReminderModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const reminders = [
    {
      icon: GraduationCap,
      title: "115/7/9（四）完成報到",
      text: "免試入學及特色招生考試分發入學報到日為 115/7/9（四），請到錄取學校官網查看報到時間、地點與流程，並依規定完成報到。",
    },
    {
      icon: FileText,
      title: "備妥報到文件",
      text: "先準備錄取通知單、國中畢業證書、身分證或戶口名簿等文件，實際文件與份數請以錄取學校官網公告為準。",
    },
    {
      icon: RotateCcw,
      title: "115/7/13（一）前掌握放棄與續招",
      text: "若要放棄錄取，須於 115/7/13（一）前依簡章規定送達放棄錄取資格聲明書；未錄取或未報到者請關注續招資訊網與各縣市教育局公告。",
    },
  ];

  return (
    <div className="fixed inset-0 z-[125] flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-label="放榜前提醒">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/45 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative max-h-[92vh] w-full max-w-[520px] overflow-y-auto overflow-x-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_30px_80px_-34px_rgba(15,23,42,0.55)]"
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-300" />
        <button onClick={onClose} aria-label="關閉放榜前提醒" className="absolute right-4 top-4 z-20 rounded-full bg-white/85 p-2 text-slate-500 shadow-sm ring-1 ring-slate-200/70 backdrop-blur transition-colors hover:bg-slate-50 hover:text-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-100">
          <X className="h-5 w-5" />
        </button>

        <div className="px-5 pb-5 pt-7 sm:px-7 sm:pb-7">
          <div className="mb-5 flex items-start gap-4 pr-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-sky-50 text-sky-600 ring-1 ring-sky-100">
              <Bell className="h-7 w-7" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">放榜前一天提醒</p>
              <h3 className="mt-1 text-[26px] font-black leading-tight tracking-normal text-slate-950">
                查榜後先確認報到與續招
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
                放榜後時程通常很緊，請先把查詢、報到文件、放棄期限與續招資訊整理好。
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-[22px] border border-amber-100 bg-amber-50/70 p-4 text-left">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-700">最重要</p>
            <p className="mt-1 text-sm font-bold leading-6 text-slate-800">
              錄取者請於 115/7/9（四）依校方規定完成報到，並先到錄取學校官網查看最新報到公告；未錄取、未報到，或放棄錄取者，請立刻追蹤續招資訊。
            </p>
          </div>

          <div className="grid gap-3">
            {reminders.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid grid-cols-[auto_1fr] gap-3 rounded-[20px] border border-slate-100 bg-slate-50/80 p-4 text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[15px] bg-white text-slate-700 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-950">{item.title}</h4>
                    <p className="mt-1 text-sm font-medium leading-6 text-slate-600">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={onClose} className="mt-5 w-full rounded-[18px] bg-slate-950 px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition-colors hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200">
            我知道了
          </button>
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[28px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] p-6 max-w-[320px] w-full text-center overflow-hidden border border-slate-100"
      >
        <button onClick={onClose} aria-label="關閉分享視窗" className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
          <X className="w-5 h-5" />
        </button>
        
        <div className="relative w-16 h-16 bg-teal-50 rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-100/50">
          <Share2 className="w-8 h-8 text-teal-500 relative z-10" />
          <div className="absolute inset-0 bg-teal-400/20 blur-xl rounded-full"></div>
        </div>
          
        <h3 className="text-[24px] font-black text-slate-900 mb-2 tracking-tight leading-[1.2]">分享給朋友</h3>
        <p className="text-slate-500 mb-6 leading-relaxed text-[14px] font-medium">
          一起查榜、一起分享喜悅與緊張，陪你走過會考放榜的重要時刻！
        </p>

        <div className="bg-slate-50 p-5 rounded-[20px] mb-6 border border-slate-100 flex flex-col items-center">
          <div className="bg-white p-2 rounded-[12px] shadow-sm border border-slate-100 mb-3 inline-block">
             <QRCodeSVG value={shareUrl} size={100} level="H" includeMargin={false} />
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center justify-center"><QrCode className="w-3 h-3 mr-1" /> Scan QR Code</p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-1">
          <button onClick={() => handleShare('line')} aria-label="分享到 LINE" className="flex flex-col items-center gap-1.5 group focus:outline-none">
            <div className="w-10 h-10 bg-[#00B900] rounded-[14px] flex items-center justify-center text-white shadow-md shadow-[#00B900]/20 group-hover:-translate-y-1 transition-transform">
              <FaLine className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">LINE</span>
          </button>
          
          <button onClick={() => handleShare('ig')} aria-label="分享到 Instagram" className="flex flex-col items-center gap-1.5 group focus:outline-none">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-[14px] flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:-translate-y-1 transition-transform">
              <FaInstagram className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">Instagram</span>
          </button>
          
          <button onClick={() => handleShare('threads')} aria-label="分享到 Threads" className="flex flex-col items-center gap-1.5 group focus:outline-none">
            <div className="w-10 h-10 bg-black rounded-[14px] flex items-center justify-center text-white shadow-md shadow-black/20 group-hover:-translate-y-1 transition-transform">
              <FaThreads className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">Threads</span>
          </button>
          
          <button onClick={handleCopy} aria-label="複製分享連結" className="flex flex-col items-center gap-1.5 group focus:outline-none">
            <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center text-white shadow-md group-hover:-translate-y-1 transition-all ${copied ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-slate-700 shadow-slate-700/20'}`}>
              <Link2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">{copied ? '已複製' : '複製連結'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
