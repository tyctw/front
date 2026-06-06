/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { HeroCountdown } from "./components/HeroCountdown";
import { Banner } from "./components/Banner";
import { ADMISSION_LIST_CLOSE_DATE, ADMISSION_LIST_OPEN_DATE, LATEST_ANNOUNCEMENT } from "./data";
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
const ShareModal = lazy(() => import("./components/Modals").then(m => ({ default: m.ShareModal })));

export default function App() {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  
  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [scoreOpen, setScoreOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    // Popups Logic
    const now = new Date();
    const scoreStart = new Date("2026-06-04T00:00:00");
    const scoreEnd = new Date("2026-06-15T00:00:00"); // exclusive
    const volunteerEnd = new Date("2026-06-25T23:59:59");
    
    if (now >= scoreStart && now < scoreEnd) {
      setScoreOpen(true);
    } else if (now >= scoreEnd && now <= volunteerEnd) {
      setVolunteerOpen(true);
    } else if (LATEST_ANNOUNCEMENT.active) {
      setAnnouncementOpen(true);
    }
  }, []);

  const handleWarnUrl = (url: string) => {
    const now = new Date();
    const rankOpen = new Date(ADMISSION_LIST_OPEN_DATE);
    const rankClose = new Date(ADMISSION_LIST_CLOSE_DATE);
    const resultOpen = new Date('2026-07-06T00:00:00'); // Hide warning starting 2026-07-06 00:00

    if ((now >= rankOpen && now <= rankClose) || now >= resultOpen) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      setPendingUrl(url);
      setWarningOpen(true);
    }
  };

  return (
    <>
      <Background />
      <Header onOpenSchedule={() => setScheduleOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
        <HeroCountdown onOpenSchedule={() => setScheduleOpen(true)} />
        <Banner />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>}>
          <Regions onWarnUrl={handleWarnUrl} />
          <FAQ />
        </Suspense>
      </main>

      <Footer />
      
      {/* Floating Share Button */}
      <button 
        onClick={() => setShareOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-teal-500 rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center text-white hover:bg-teal-600 hover:-translate-y-1 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-teal-200"
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
          {shareOpen && <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />}
        </AnimatePresence>
      </Suspense>
    </>
  );
}
