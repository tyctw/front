/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { HeroCountdown } from "./components/HeroCountdown";
import { Banner } from "./components/Banner";
import { LATEST_ANNOUNCEMENT } from "./data";
import { AnimatePresence } from "motion/react";
import { Share2 } from "lucide-react";
import { Footer } from "./components/Footer";

const Regions = lazy(() => import("./components/Regions").then(m => ({ default: m.Regions })));
const FAQ = lazy(() => import("./components/FAQ").then(m => ({ default: m.FAQ })));
const ScheduleModal = lazy(() => import("./components/ScheduleModal").then(m => ({ default: m.ScheduleModal })));
const WarningModal = lazy(() => import("./components/Modals").then(m => ({ default: m.WarningModal })));
const AnnouncementModal = lazy(() => import("./components/Modals").then(m => ({ default: m.AnnouncementModal })));
const ScoreModal = lazy(() => import("./components/Modals").then(m => ({ default: m.ScoreModal })));
const VolunteerModal = lazy(() => import("./components/Modals").then(m => ({ default: m.VolunteerModal })));
const ResultReminderModal = lazy(() => import("./components/Modals").then(m => ({ default: m.ResultReminderModal })));
const ShareModal = lazy(() => import("./components/Modals").then(m => ({ default: m.ShareModal })));

const RESULT_LIST_OPEN_DATE = "2026-07-05T11:00:00";
const RESULT_REMINDER_START_DATE = "2026-06-27T00:00:00";
const RESULT_REMINDER_END_DATE = "2026-07-30T23:59:59";

export default function App() {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [scoreOpen, setScoreOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [resultReminderOpen, setResultReminderOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    // Popups Logic
    const now = new Date();
    const scoreStart = new Date("2026-06-04T00:00:00");
    const scoreEnd = new Date("2026-06-15T00:00:00"); // exclusive
    const volunteerEnd = new Date("2026-06-25T23:59:59");
    const resultReminderStart = new Date(RESULT_REMINDER_START_DATE);
    const resultReminderEnd = new Date(RESULT_REMINDER_END_DATE);
    
    if (now >= resultReminderStart && now <= resultReminderEnd) {
      setResultReminderOpen(true);
    } else if (now >= scoreStart && now < scoreEnd) {
      setScoreOpen(true);
    } else if (now >= scoreEnd && now <= volunteerEnd) {
      setVolunteerOpen(true);
    } else if (LATEST_ANNOUNCEMENT.active) {
      setAnnouncementOpen(true);
    }
  }, []);

  const handleWarnUrl = (url: string) => {
    const now = new Date();
    const resultOpen = new Date(RESULT_LIST_OPEN_DATE);

    if (now >= resultOpen) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setPendingUrl(url);
      setWarningOpen(true);
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        跳到主要內容
      </a>
      <Background />
      <Header onOpenSchedule={() => setScheduleOpen(true)} />

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-30 pb-12" tabIndex={-1}>
        <HeroCountdown onOpenSchedule={() => setScheduleOpen(true)} />
        <Banner />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400" role="status" aria-live="polite">Loading...</div>}>
          <Regions onWarnUrl={handleWarnUrl} />
          <FAQ />
        </Suspense>
      </main>

      <Footer />
      
      {/* Floating Share Button */}
      <button 
        onClick={() => setShareOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-slate-950 text-white shadow-[0_18px_44px_-24px_rgba(15,23,42,0.9)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        aria-label="分享平台"
      >
        <Share2 className="w-6 h-6" />
      </button>

      <Suspense fallback={null}>
        <AnimatePresence>
          {scheduleOpen && <ScheduleModal isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />}
          {warningOpen && <WarningModal isOpen={warningOpen} onClose={() => setWarningOpen(false)} pendingUrl={pendingUrl} />}
          {announcementOpen && <AnnouncementModal isOpen={announcementOpen} onClose={() => setAnnouncementOpen(false)} />}
          {scoreOpen && <ScoreModal isOpen={scoreOpen} onClose={() => setScoreOpen(false)} />}
          {volunteerOpen && <VolunteerModal isOpen={volunteerOpen} onClose={() => setVolunteerOpen(false)} />}
          {resultReminderOpen && <ResultReminderModal isOpen={resultReminderOpen} onClose={() => setResultReminderOpen(false)} />}
          {shareOpen && <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />}
        </AnimatePresence>
      </Suspense>
    </>
  );
}
