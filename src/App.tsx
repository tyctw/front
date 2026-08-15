/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { HeroCountdown } from "./components/HeroCountdown";
import { Banner } from "./components/Banner";
import { GuidePage } from "./components/GuidePage";
import { SchedulePage } from "./components/SchedulePage";
import { ArticleHubPage } from "./components/ArticleHubPage";
import { AboutPage } from "./components/AboutPage";
import { FIREWORK_SHOW_START_DATE, RESULT_WARNING_UNLOCK_DATE } from "./data";
import { Share2 } from "lucide-react";
import { Footer } from "./components/Footer";
import { getNow, parseTaipeiDate } from "./lib/now";
import { FireworksShow } from "./components/FireworksShow";

const loadModals = () => import("./components/Modals");
const loadShareModal = () => import("./components/ShareModal");

const Regions = lazy(() => import("./components/Regions").then(m => ({ default: m.Regions })));
const FAQ = lazy(() => import("./components/FAQ").then(m => ({ default: m.FAQ })));
const WarningModal = lazy(() => loadModals().then(m => ({ default: m.WarningModal })));
const ScoreModal = lazy(() => loadModals().then(m => ({ default: m.ScoreModal })));
const VolunteerModal = lazy(() => loadModals().then(m => ({ default: m.VolunteerModal })));
const ResultReminderModal = lazy(() => loadModals().then(m => ({ default: m.ResultReminderModal })));
const ShareModal = lazy(() => loadShareModal().then(m => ({ default: m.ShareModal })));

const RESULT_REMINDER_START_DATE = "2027-07-01T00:00:00";
const RESULT_REMINDER_END_DATE = "2027-07-30T23:59:59";
const FIREWORKS_SEEN_KEY = "front:116-fireworks-seen";

function hasSeenFireworks() {
  try {
    return window.localStorage.getItem(FIREWORKS_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markFireworksSeen() {
  try {
    window.localStorage.setItem(FIREWORKS_SEEN_KEY, "1");
  } catch {
    // If storage is blocked, fall back to showing the celebration without breaking the page.
  }
}

export default function App() {
  const isGuidePage = window.location.pathname.replace(/\/$/, "") === "/front/guide";
  const isSchedulePage = window.location.pathname.replace(/\/$/, "") === "/front/schedule";
  const isAboutPage = window.location.pathname.replace(/\/$/, "") === "/front/about";
  const articleRoute = window.location.pathname.replace(/\/$/, "").match(/^\/front\/articles(?:\/([^/]+))?$/);
  const isArticlePage = articleRoute !== null;
  const articleId = articleRoute?.[1];
  const isContentPage = isGuidePage || isSchedulePage || isAboutPage || isArticlePage;
  const [warningOpen, setWarningOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  
  const [scoreOpen, setScoreOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [resultReminderOpen, setResultReminderOpen] = useState(false);
  const [fireworksOpen, setFireworksOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [secondaryReady, setSecondaryReady] = useState(false);

  useEffect(() => {
    if (isContentPage) return;

    if (!hasSeenFireworks() && getNow() >= parseTaipeiDate(FIREWORK_SHOW_START_DATE)) {
      markFireworksSeen();
      setFireworksOpen(true);
    }
  }, [isContentPage]);

  useEffect(() => {
    if (isContentPage) {
      setSecondaryReady(true);
      return;
    }

    const runAfterPaint =
      window.requestIdleCallback ||
      ((callback: IdleRequestCallback) => window.setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 0 }), 1200));

    const secondaryId = runAfterPaint(() => setSecondaryReady(true));
    const delayedPopupIds: number[] = [];
    const popupId = runAfterPaint(() => {
      // Popups Logic
      const now = getNow();
      const scoreStart = parseTaipeiDate("2027-06-04T00:00:00");
      const scoreEnd = parseTaipeiDate("2027-06-15T00:00:00"); // exclusive
      const volunteerEnd = parseTaipeiDate("2027-06-25T23:59:59");
      const resultReminderStart = parseTaipeiDate(RESULT_REMINDER_START_DATE);
      const resultReminderEnd = parseTaipeiDate(RESULT_REMINDER_END_DATE);
      const fireworksStartDate = parseTaipeiDate(FIREWORK_SHOW_START_DATE);
      const fireworksStarted = now >= fireworksStartDate;
      const popupDelay = now >= fireworksStartDate ? 21000 : 0;
      const openAfterFireworks = (open: () => void) => {
        if (popupDelay > 0) {
          delayedPopupIds.push(window.setTimeout(open, popupDelay));
        } else {
          open();
        }
      };

      if (!fireworksStarted && now >= resultReminderStart && now <= resultReminderEnd) {
        openAfterFireworks(() => setResultReminderOpen(true));
      } else if (now >= scoreStart && now < scoreEnd) {
        openAfterFireworks(() => setScoreOpen(true));
      } else if (now >= scoreEnd && now <= volunteerEnd) {
        openAfterFireworks(() => setVolunteerOpen(true));
      }
    });

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(secondaryId as number);
        window.cancelIdleCallback(popupId as number);
      } else {
        clearTimeout(secondaryId as number);
        clearTimeout(popupId as number);
      }
      delayedPopupIds.forEach((id) => clearTimeout(id));
    };
  }, [isContentPage]);

  useEffect(() => {
    document.title = isGuidePage
      ? "116會考查榜與免試入學報到重點｜完整指南｜TW會考落點分析"
      : isSchedulePage
        ? "116會考重要日程｜國中教育會考與免試入學時程｜TW會考落點分析"
        : isAboutPage
          ? "關於我們｜升學資訊整理與使用原則｜TW會考落點分析"
        : isArticlePage
          ? "116會考文章專區｜放榜、查榜與升學流程整理｜TW會考落點分析"
        : "116會考查榜入口｜免試入學錄取結果與報到資訊｜TW會考落點分析";
  }, [isAboutPage, isArticlePage, isGuidePage, isSchedulePage]);

  const handleWarnUrl = (url: string) => {
    const now = getNow();
    const resultOpen = parseTaipeiDate(RESULT_WARNING_UNLOCK_DATE);

    if (now >= resultOpen) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setPendingUrl(url);
      setWarningOpen(true);
    }
  };

  const openShare = () => {
    void loadShareModal();
    setShareOpen(true);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        跳到主要內容
      </a>
      <Background />
      <div className="relative flex min-h-screen flex-col">
        <Header />

        <div className="flex-1">
          {isGuidePage ? (
            <GuidePage />
          ) : isSchedulePage ? (
            <SchedulePage />
          ) : isAboutPage ? (
            <AboutPage />
          ) : isArticlePage ? (
            <ArticleHubPage articleId={articleId} />
          ) : (
            <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-30 pb-12" tabIndex={-1}>
              <HeroCountdown />
              <Banner />
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400" role="status" aria-live="polite">Loading...</div>}>
                {secondaryReady && (
                  <>
                    <Regions onWarnUrl={handleWarnUrl} />
                    <FAQ />
                  </>
                )}
              </Suspense>
            </main>
          )}
        </div>

        <Footer />
      </div>
      <FireworksShow isOpen={fireworksOpen} onClose={() => setFireworksOpen(false)} />
      
      {/* Floating Share Button */}
      <button 
        onClick={openShare}
        onFocus={() => void loadShareModal()}
        onPointerEnter={() => void loadShareModal()}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-slate-950 text-white shadow-[0_18px_44px_-24px_rgba(15,23,42,0.9)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        aria-label="分享平台"
        aria-haspopup="dialog"
        aria-expanded={shareOpen}
      >
        <Share2 className="w-6 h-6" />
      </button>

      <Suspense fallback={null}>
        {warningOpen && <WarningModal isOpen={warningOpen} onClose={() => setWarningOpen(false)} pendingUrl={pendingUrl} />}
        {scoreOpen && <ScoreModal isOpen={scoreOpen} onClose={() => setScoreOpen(false)} />}
        {volunteerOpen && <VolunteerModal isOpen={volunteerOpen} onClose={() => setVolunteerOpen(false)} />}
        {resultReminderOpen && <ResultReminderModal isOpen={resultReminderOpen} onClose={() => setResultReminderOpen(false)} />}
        {shareOpen && <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />}
      </Suspense>
    </>
  );
}
