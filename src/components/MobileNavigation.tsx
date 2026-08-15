import { AnimatePresence, motion } from "motion/react";
import { X, type LucideIcon } from "lucide-react";
import { useEffect, useState, type RefObject } from "react";

interface MobileNavigationLink {
  label: string;
  detail: string;
  icon: LucideIcon;
  href?: string;
  internal?: boolean;
  action?: () => void;
}

const itemAccents = ["bg-sky-100 text-sky-700", "bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-800", "bg-rose-100 text-rose-700", "bg-indigo-100 text-indigo-700"];

export function MobileNavigation({ links, closeButtonRef, onClose }: { links: MobileNavigationLink[]; closeButtonRef: RefObject<HTMLButtonElement | null>; onClose: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.setTimeout(() => closeButtonRef.current?.focus(), 80);
  }, [closeButtonRef]);

  const startClose = () => setVisible(false);

  return (
    <AnimatePresence onExitComplete={onClose}>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] bg-slate-950/80 p-3 sm:p-4" initial="closed" animate="open" exit="closed">
          <motion.div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="導航選單" className="relative flex h-full w-full flex-col overflow-hidden rounded-[34px] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)]" variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <div className="m-3 flex h-[62px] items-center justify-between rounded-full bg-white px-4 shadow-sm ring-1 ring-slate-100">
              <a href="/front/" onClick={startClose} className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[15px] bg-white ring-1 ring-slate-100">
                <img src="/front/stile-icon.png" width="80" height="80" alt="全國會考查榜入口" className="h-full w-full object-cover" />
              </a>
              <button ref={closeButtonRef} onClick={startClose} aria-label="關閉導航選單" className="rounded-full p-2.5 text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-100">
                <X className="h-6 w-6" />
              </button>
            </div>

            <motion.nav aria-label="手機版導覽" className="flex-1 overflow-y-auto px-3 pb-5 pt-3" variants={{ closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }, open: { transition: { delayChildren: 0.05, staggerChildren: 0.045 } } }}>
              <div className="mx-auto grid max-w-2xl gap-2.5">
                {links.map((link, index) => {
                  const Icon = link.icon;
                  const content = <><span className="font-black text-slate-950">{link.label}</span><span className={`ml-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${itemAccents[index % itemAccents.length]}`}><Icon className="h-7 w-7" /></span></>;
                  const className = "flex min-h-[88px] items-center gap-4 rounded-[30px] bg-slate-100 px-6 text-left text-xl transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-sky-100";
                  const variants = { closed: { opacity: 0, y: 10 }, open: { opacity: 1, y: 0 } };

                  return link.href ? (
                    <motion.a key={link.label} href={link.href} target={link.internal ? undefined : "_blank"} rel={link.internal ? undefined : "noreferrer"} onClick={startClose} className={className} variants={variants} transition={{ duration: 0.2 }}>{content}</motion.a>
                  ) : (
                    <motion.button key={link.label} onClick={() => { startClose(); link.action?.(); }} className={className} variants={variants} transition={{ duration: 0.2 }}>{content}</motion.button>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
