import { EVENTS } from "../data";
import { formatDate } from "../lib/utils";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";

export function ScheduleModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  const sortedEvents = [...EVENTS].sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="重要日程表">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-[32px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] max-w-2xl w-full flex flex-col border border-slate-100 max-h-[85vh] overflow-hidden"
      >
        <div className="absolute top-6 right-6 z-50 bg-white/80 backdrop-blur rounded-full">
          <button 
            onClick={onClose}
            aria-label="關閉重要日程表"
            className="p-2 bg-white/50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-8 pb-6 border-b border-slate-100 bg-slate-50 relative overflow-hidden flex-shrink-0">
           <div className="relative z-10 flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-900 font-bold">
               115
             </div>
             <div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">重要日程表</h3>
               <p className="text-sm text-slate-400 font-outfit mt-0.5 font-medium tracking-wide">KEY MILESTONES</p>
             </div>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>

        <div className="overflow-y-auto p-6 bg-white relative">
          <div className="space-y-3">
            {sortedEvents.map((event, index) => {
              const now = new Date();
              const start = new Date(event.dateStart);
              const end = event.dateEnd ? new Date(event.dateEnd) : new Date(start.getTime() + 86400000);
              
              let status = 'future';
              if (now > end) status = 'past';
              else if (now >= start && now <= end) status = 'current';

              return (
                <div key={event.id} className={`p-5 rounded-[24px] border transition-all ${
                  status === 'current' ? 'bg-[#FF6B6B]/5 border-[#FF6B6B]/20 shadow-sm' : 
                  status === 'past' ? 'bg-slate-50 border-slate-100 opacity-70' : 
                  'bg-white border-slate-100 shadow-sm'
                } flex items-center gap-4`}>
                  
                  <div className={`flex-shrink-0 w-12 h-12 rounded-[16px] flex items-center justify-center ${
                    status === 'current' ? 'bg-[#FF6B6B] text-white shadow-md shadow-red-200' :
                    status === 'past' ? 'bg-slate-200 text-slate-400' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {status === 'past' ? <Check className="w-5 h-5" /> : <div className="font-outfit font-black text-lg">{index + 1}</div>}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <h4 className={`text-lg font-bold ${status === 'current' ? 'text-slate-900' : 'text-slate-700'}`}>
                        {event.title}
                      </h4>
                      {status === 'current' && (
                        <span className="inline-block px-2 py-0.5 bg-[#FF6B6B]/10 text-[#FF6B6B] text-[10px] font-black tracking-widest uppercase rounded">Active</span>
                      )}
                    </div>
                    <span className="font-outfit text-sm font-bold text-slate-400">
                      {formatDate(event.dateStart)} {event.isRange && event.dateEnd ? ` - ${formatDate(event.dateEnd)}` : ''}
                    </span>
                    {event.details && (
                      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm font-medium leading-6 text-slate-500">
                        {event.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
