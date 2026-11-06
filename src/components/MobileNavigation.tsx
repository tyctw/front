import { X, type LucideIcon } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

interface MobileNavigationLink {
  label: string;
  icon: LucideIcon;
  href: string;
  internal?: boolean;
}

const itemAccents = ["bg-sky-100 text-sky-700", "bg-emerald-100 text-emerald-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-800", "bg-rose-100 text-rose-700", "bg-indigo-100 text-indigo-700"];

export function MobileNavigation({ links, onClose }: { links: MobileNavigationLink[]; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current!;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const closeMenu = () => {
    dialogRef.current?.close();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      id="mobile-navigation"
      aria-label="導航選單"
      onCancel={(event) => {
        event.preventDefault();
        closeMenu();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden bg-transparent p-3 backdrop:bg-slate-950/80 sm:p-4"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[34px] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)]">
        <div className="m-3 flex h-[62px] shrink-0 items-center justify-between rounded-full bg-white px-4 shadow-sm ring-1 ring-slate-100">
          <a href="/front/" onClick={closeMenu} className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[15px] bg-white ring-1 ring-slate-100">
            <img src="/front/stile-icon.png" width="80" height="80" alt="全國會考查榜入口" className="h-full w-full object-cover" />
          </a>
          <button type="button" ref={closeButtonRef} onClick={closeMenu} aria-label="關閉導航選單" className="rounded-full p-2.5 text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-100">
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <nav aria-label="手機版導覽" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-5 pt-3">
          <div className="mx-auto grid max-w-2xl gap-2.5">
            {links.map(({ label, href, internal, icon: Icon }, index) => (
              <a
                key={label}
                href={href}
                target={internal ? undefined : "_blank"}
                rel={internal ? undefined : "noreferrer"}
                onClick={closeMenu}
                className="flex min-h-[88px] items-center gap-4 rounded-[30px] bg-slate-100 px-6 text-left text-xl transition-colors hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-sky-100"
              >
                <span className="font-black text-slate-950">{label}</span>
                <span className={`ml-auto flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${itemAccents[index % itemAccents.length]}`}>
                  <Icon aria-hidden="true" className="h-7 w-7" />
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </dialog>
  );
}
