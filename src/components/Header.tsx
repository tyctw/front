import { ArrowUpRight, BarChart3, BookOpenCheck, CalendarDays, MapPin, Menu, Newspaper, Share2, type LucideIcon } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const loadMobileNavigation = () => import("./MobileNavigation");
const MobileNavigation = lazy(() => loadMobileNavigation().then((module) => ({ default: module.MobileNavigation })));

type DesktopMenu = { eyebrow: string; title: string; description: string; items: Array<{ label: string; detail: string; href: string; icon: LucideIcon; external?: boolean }> };

const desktopMenus: Record<string, DesktopMenu> = {
  "重要日程": { eyebrow: "116 學年度", title: "把每一個期限放進行事曆", description: "從會考報名、志願選填到分發報到，快速確認現在該做什麼。", items: [{ label: "完整重要日程", detail: "查看全年度日期", href: "/front/schedule/", icon: CalendarDays }, { label: "首頁倒數", detail: "掌握下一個重要時間", href: "/front/", icon: MapPin }] },
  "文章專區": { eyebrow: "RESULT GUIDE", title: "查到錄取結果後，下一步怎麼走？", description: "把查榜、報到、複查與升學備案整理成容易閱讀的攻略。", items: [{ label: "查看全部文章", detail: "11 篇升學實用攻略", href: "/front/articles/", icon: Newspaper }, { label: "查榜後流程", detail: "錄取校科後的待辦", href: "/front/articles/after-results/", icon: BookOpenCheck }] },
  "報到指南": { eyebrow: "AFTER ADMISSION", title: "錄取後的手續，安心一次完成", description: "依序確認報到日期、文件與校方公告，避免錯過重要期限。", items: [{ label: "查榜後報到指南", detail: "報到、複查與放棄資格", href: "/front/guide/", icon: BookOpenCheck }, { label: "報到文件清單", detail: "出發前先準備好", href: "/front/articles/registration-documents/", icon: CalendarDays }] },
  "錄取分享": { eyebrow: "SHARE DATA", title: "分享結果，讓參考更貼近真實", description: "回報錄取與成績資料，協助後續落點比較更有依據。", items: [{ label: "前往錄取分享", detail: "分享你的錄取結果", href: "https://tyctw.github.io/shared/", icon: BarChart3, external: true }, { label: "成績回報", detail: "一起補齊資料樣本", href: "https://tyctw.github.io/shared/", icon: Share2, external: true }] },
  "序位分享": { eyebrow: "RANKING", title: "用序位資訊，理解自己的位置", description: "查看各區的序位分享資料，作為比較與討論的參考。", items: [{ label: "查看序位分享", detail: "對照各區排名資訊", href: "https://tyctw.github.io/score/", icon: MapPin, external: true }, { label: "會考落點分析", detail: "依個人狀況比較選項", href: "https://tyctw.github.io/spare/", icon: BarChart3, external: true }] },
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDesktopLink, setActiveDesktopLink] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const links = [
    { label: "重要日程", detail: "116 會考時程", icon: CalendarDays, href: "/front/schedule/", internal: true },
    { label: "文章專區", detail: "放榜與升學攻略", icon: Newspaper, href: "/front/articles/", internal: true },
    { label: "報到指南", detail: "查榜後流程", icon: BookOpenCheck, href: "/front/guide/", internal: true },
    { label: "錄取分享", detail: "分享錄取分數", icon: BarChart3, href: "https://tyctw.github.io/shared/" },
    { label: "序位分享", detail: "對照各區排名", icon: MapPin, href: "https://tyctw.github.io/score/" },
    { label: "成績回報", detail: "回報分數資料", icon: Share2, href: "https://tyctw.github.io/shared/" },
  ];

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        window.setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="fixed top-3 z-50 flex w-full justify-center px-3 pointer-events-none sm:px-4">
        <header className="pointer-events-auto w-full max-w-[1440px] rounded-[30px] border border-white bg-white/95 shadow-[0_18px_44px_-28px_rgba(15,23,42,0.42)] backdrop-blur-2xl">
          <div className="relative flex h-[72px] items-center justify-between px-4 sm:px-6">
            <div className="flex min-w-0 items-center">
              <a href="/front/" className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[17px] bg-white shadow-sm ring-1 ring-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-200">
                <img src="/front/stile-icon.png" width="88" height="88" alt="全國會考查榜入口圖標" className="h-full w-full object-cover" />
              </a>
              <a href="/front/" className="ml-3 min-w-0 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-200">
                <span className="block truncate text-base font-black leading-none tracking-normal text-slate-950 sm:text-lg">
                  全國會考查榜入口
                </span>
              </a>
            </div>

            <div className="absolute left-1/2 hidden -translate-x-1/2 xl:block" onMouseLeave={() => setActiveDesktopLink(null)}>
              <nav aria-label="主要導覽" className="flex items-center gap-1">
                {links.slice(0, 5).map((link) => {
                  const className = `rounded-full px-4 py-3 text-[15px] font-black transition-all focus:outline-none focus:ring-2 focus:ring-sky-200 ${
                    activeDesktopLink === link.label ? "bg-slate-100 text-slate-950" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`;
                  return <a key={link.label} href={link.href} target={link.internal ? undefined : "_blank"} rel={link.internal ? undefined : "noreferrer"} onMouseEnter={() => setActiveDesktopLink(link.label)} className={className}>{link.label}</a>;
                })}
              </nav>
              {activeDesktopLink && desktopMenus[activeDesktopLink] && (() => {
                const menu = desktopMenus[activeDesktopLink];
                return <div className="absolute left-1/2 top-full z-50 w-[1180px] max-w-[calc(100vw-48px)] -translate-x-1/2 pt-5">
                  <section className="overflow-hidden rounded-[34px] border border-white bg-white p-7 shadow-[0_34px_80px_-38px_rgba(15,23,42,0.52)] ring-1 ring-slate-200/80">
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                      <div>
                        <p className="text-[11px] font-black tracking-[0.16em] text-sky-700">{menu.eyebrow}</p>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          {menu.items.map(({ label, detail, href, icon: Icon, external }) => <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="group min-h-[154px] rounded-[25px] bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-[0_18px_30px_-24px_rgba(14,116,144,0.65)]"><span className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-white text-sky-700 shadow-sm ring-1 ring-slate-100"><Icon className="h-5 w-5" /></span><span className="mt-5 flex items-end gap-2"><span className="min-w-0 flex-1"><span className="block text-base font-black text-slate-950">{label}</span><span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">{detail}</span></span><ArrowUpRight className="mb-0.5 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-sky-700" /></span></a>)}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-[11px] font-black tracking-[0.16em] text-slate-500">快速前往</p>
                        <h2 className="mt-3 text-[26px] font-black leading-tight text-slate-950">{menu.title}</h2>
                        <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-slate-600">{menu.description}</p>
                        <a href={menu.items[0].href} target={menu.items[0].external ? "_blank" : undefined} rel={menu.items[0].external ? "noreferrer" : undefined} className="group mt-6 flex items-center justify-between rounded-[22px] bg-sky-100 px-5 py-4 text-sky-950 transition hover:bg-sky-200"><span className="font-black">立即查看</span><ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                      </div>
                    </div>
                  </section>
                </div>;
              })()}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                ref={menuButtonRef}
                onClick={() => setMobileMenuOpen(true)}
                onFocus={() => void loadMobileNavigation()}
                onPointerEnter={() => void loadMobileNavigation()}
                aria-label="開啟導航選單"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                className="rounded-full p-3 text-slate-800 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-200 xl:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      <Suspense fallback={null}>
        {mobileMenuOpen && (
          <MobileNavigation
            links={links}
            closeButtonRef={closeButtonRef}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </Suspense>
    </>
  );
}
