import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Award, Bell, CalendarClock, ExternalLink, X, MapPin, Link2, Share2, QrCode } from "lucide-react";
import { LATEST_ANNOUNCEMENT } from "../data";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { FaLine, FaInstagram, FaThreads } from "react-icons/fa6";

export function WarningModal({ isOpen, onClose, pendingUrl }: { isOpen: boolean, onClose: () => void, pendingUrl: string | null }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[32px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] p-8 max-w-[340px] w-full text-center overflow-hidden border border-slate-100"
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-20 h-20 bg-orange-50 rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-sm border border-orange-100/50">
          <AlertTriangle className="w-10 h-10 text-orange-500 relative z-10" />
          <div className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full"></div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">非開放查詢時間</h3>
        <p className="text-slate-500 mb-8 text-[15px] font-medium leading-relaxed px-2">
          目前並非系統開放時間，可能無法順利登入或僅顯示測試資料。
        </p>
        
        <div className="bg-slate-50 rounded-[24px] py-6 px-6 mb-8 border border-slate-100 relative overflow-hidden">
           <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-widest">免試入學放榜</h4>
           <div className="text-2xl font-black text-slate-800 tracking-tighter">
             115/07/07 上午11:00
           </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button 
            onClick={onClose} 
            className="w-full py-4 rounded-[20px] bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            返回上一頁
          </button>
          <a 
            href={pendingUrl || "#"} target="_blank" rel="noreferrer" onClick={onClose}
            className="w-full py-4 rounded-[20px] bg-white border-2 border-slate-100 text-slate-500 font-bold hover:border-slate-200 hover:text-slate-600 transition-colors focus:outline-none flex items-center justify-center"
          >
            仍然前往
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export function AnnouncementModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[32px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] p-8 max-w-[340px] w-full text-center overflow-hidden border border-slate-100"
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[32px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] p-8 max-w-[340px] w-full text-center overflow-hidden border border-slate-100"
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[32px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] p-8 max-w-[340px] w-full text-center overflow-hidden border border-slate-100"
      >
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
          <X className="w-5 h-5" />
        </button>
        
        <div className="relative w-20 h-20 bg-indigo-50 rounded-[24px] flex items-center justify-center mx-auto mb-8 shadow-sm border border-indigo-100/50">
          <MapPin className="w-10 h-10 text-indigo-500 relative z-10" />
          <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>
        </div>
          
        <h3 className="text-[28px] font-black text-slate-900 mb-4 tracking-tight leading-[1.2]">免試入學<br /><span className="text-indigo-500">各區志願選填</span></h3>
        <p className="text-slate-500 mb-8 leading-relaxed text-[15px] font-medium">
          選填期間：<span className="font-bold text-slate-700">115/06/18(四) - 115/06/25(四)</span><br/>請把握時間前往各區平台完成志願選填！
        </p>
        
        <div className="flex flex-col space-y-3">
          <a 
            href="https://tyctw.github.io/volunteer/" target="_blank" rel="noreferrer" onClick={onClose}
            className="w-full py-4 rounded-[20px] bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            各區選填網址
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
          <button onClick={onClose} className="w-full py-4 rounded-[20px] bg-white border-2 border-slate-100 text-slate-500 font-bold hover:border-slate-200 hover:text-slate-600 transition-colors focus:outline-none">
            稍後再前往
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
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[28px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] p-6 max-w-[320px] w-full text-center overflow-hidden border border-slate-100"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
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
          <button onClick={() => handleShare('line')} className="flex flex-col items-center gap-1.5 group focus:outline-none">
            <div className="w-10 h-10 bg-[#00B900] rounded-[14px] flex items-center justify-center text-white shadow-md shadow-[#00B900]/20 group-hover:-translate-y-1 transition-transform">
              <FaLine className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">LINE</span>
          </button>
          
          <button onClick={() => handleShare('ig')} className="flex flex-col items-center gap-1.5 group focus:outline-none">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-[14px] flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:-translate-y-1 transition-transform">
              <FaInstagram className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">Instagram</span>
          </button>
          
          <button onClick={() => handleShare('threads')} className="flex flex-col items-center gap-1.5 group focus:outline-none">
            <div className="w-10 h-10 bg-black rounded-[14px] flex items-center justify-center text-white shadow-md shadow-black/20 group-hover:-translate-y-1 transition-transform">
              <FaThreads className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">Threads</span>
          </button>
          
          <button onClick={handleCopy} className="flex flex-col items-center gap-1.5 group focus:outline-none">
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
