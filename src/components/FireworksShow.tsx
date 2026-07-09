import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Sparkles, X } from "lucide-react";
import { THREADS_COMMUNITY_URL } from "../data";

const SHOW_DURATION_MS = 20000;
const FRAME_MS = 1000 / 30;

const FIREWORK_ACTS = [
  { at: 0, title: "序幕｜第一束升空", copy: "低空金色彗星先開場，像完成報到後點亮跑道。" },
  { at: 5200, title: "第二幕｜牡丹展開", copy: "紅金牡丹與環形禮花慢慢打開，留出真實煙火的呼吸感。" },
  { at: 10400, title: "第三幕｜柳瀑落下", copy: "銀金柳瀑往下垂落，火星拖著長尾，像星河慢慢散開。" },
  { at: 15400, title: "終幕｜下一站齊放", copy: "最後以多點齊發收束，歡迎抵達高中生活。" },
] as const;

type FireworkKind = "brocade" | "comet" | "crackle" | "palm" | "peony" | "ring" | "willow";

type Profile = {
  dpr: number;
  shellLimit: number;
  sparkLimit: number;
  burstScale: number;
};

type FireworkCue = {
  at: number;
  positions: number[];
  kind: FireworkKind;
  hue: number;
  heightBand: [number, number];
  optional?: boolean;
};

type MineCue = {
  at: number;
  positions: number[];
  hue: number;
  optional?: boolean;
};

type StarRainCue = {
  at: number;
  count: number;
  hue: number;
  optional?: boolean;
};

const FIREWORK_CUES: FireworkCue[] = [
  { at: 700, positions: [0.5], kind: "comet", hue: 44, heightBand: [0.34, 0.4] },
  { at: 1700, positions: [0.36, 0.64], kind: "comet", hue: 42, heightBand: [0.38, 0.46] },
  { at: 2900, positions: [0.5], kind: "brocade", hue: 42, heightBand: [0.18, 0.26] },
  { at: 4200, positions: [0.28, 0.72], kind: "peony", hue: 355, heightBand: [0.25, 0.34], optional: true },

  { at: 5400, positions: [0.5], kind: "ring", hue: 198, heightBand: [0.18, 0.26] },
  { at: 6500, positions: [0.3, 0.7], kind: "peony", hue: 34, heightBand: [0.24, 0.34] },
  { at: 7800, positions: [0.5], kind: "palm", hue: 40, heightBand: [0.28, 0.38] },
  { at: 9200, positions: [0.25, 0.75], kind: "ring", hue: 190, heightBand: [0.22, 0.32], optional: true },

  { at: 10600, positions: [0.32, 0.68], kind: "willow", hue: 45, heightBand: [0.18, 0.28] },
  { at: 11900, positions: [0.5], kind: "brocade", hue: 46, heightBand: [0.13, 0.23] },
  { at: 13200, positions: [0.24, 0.76], kind: "peony", hue: 355, heightBand: [0.26, 0.36], optional: true },
  { at: 14500, positions: [0.4, 0.6], kind: "willow", hue: 42, heightBand: [0.2, 0.32] },

  { at: 15400, positions: [0.5], kind: "crackle", hue: 48, heightBand: [0.16, 0.25] },
  { at: 16000, positions: [0.24, 0.5, 0.76], kind: "brocade", hue: 40, heightBand: [0.17, 0.3] },
  { at: 16600, positions: [0.32, 0.68], kind: "ring", hue: 200, heightBand: [0.17, 0.28] },
  { at: 17300, positions: [0.22, 0.42, 0.58, 0.78], kind: "willow", hue: 45, heightBand: [0.16, 0.34] },
  { at: 18100, positions: [0.18, 0.34, 0.5, 0.66, 0.82], kind: "peony", hue: 350, heightBand: [0.18, 0.38] },
  { at: 18900, positions: [0.25, 0.5, 0.75], kind: "crackle", hue: 48, heightBand: [0.13, 0.28] },
  { at: 19600, positions: [0.14, 0.28, 0.42, 0.58, 0.72, 0.86], kind: "brocade", hue: 42, heightBand: [0.15, 0.4] },
];

const MINE_CUES: MineCue[] = [
  { at: 0, positions: [0.5], hue: 42 },
  { at: 1250, positions: [0.36, 0.64], hue: 42 },
  { at: 5000, positions: [0.18, 0.82], hue: 198, optional: true },
  { at: 10000, positions: [0.24, 0.5, 0.76], hue: 46 },
  { at: 15200, positions: [0.12, 0.28, 0.44, 0.56, 0.72, 0.88], hue: 42 },
  { at: 17800, positions: [0.16, 0.32, 0.48, 0.52, 0.68, 0.84], hue: 350 },
  { at: 19400, positions: [0.1, 0.24, 0.38, 0.5, 0.62, 0.76, 0.9], hue: 42 },
];

const STAR_RAIN_CUES: StarRainCue[] = [
  { at: 11200, count: 12, hue: 46, optional: true },
  { at: 16900, count: 18, hue: 44 },
  { at: 18800, count: 24, hue: 48 },
];

type Shell = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  targetY: number;
  hue: number;
  kind: FireworkKind;
};

type Flash = {
  x: number;
  y: number;
  life: number;
  ttl: number;
  hue: number;
};

type Spark = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  hue: number;
  size: number;
  gravity: number;
  drag: number;
  strobe: boolean;
};

type FallingStar = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  life: number;
  ttl: number;
  hue: number;
};

type Star = {
  x: number;
  y: number;
  alpha: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function getProfile(width: number): Profile {
  if (width < 640) {
    return { dpr: 1, shellLimit: 4, sparkLimit: 240, burstScale: 0.42 };
  }

  if (width < 1024) {
    return { dpr: 1, shellLimit: 5, sparkLimit: 360, burstScale: 0.58 };
  }

  return { dpr: 1, shellLimit: 8, sparkLimit: 620, burstScale: 0.82 };
}

function getActIndex(elapsed: number) {
  if (elapsed >= FIREWORK_ACTS[3].at) return 3;
  if (elapsed >= FIREWORK_ACTS[2].at) return 2;
  if (elapsed >= FIREWORK_ACTS[1].at) return 1;
  return 0;
}

function launchShell(width: number, height: number, cue: FireworkCue, position: number, cueIndex: number): Shell {
  const x = width * position;
  const targetY = height * randomBetween(cue.heightBand[0], cue.heightBand[1]);
  const deterministicDrift = Math.sin((cueIndex + 1) * 1.91 + position * 4.7) * width * 0.035;
  const startX = x + deterministicDrift;
  const power = -randomBetween(7.9, 10.2) * Math.max(0.78, Math.min(1.08, height / 780));

  return {
    x: startX,
    y: height + 20,
    px: startX,
    py: height + 20,
    vx: (x - startX) / randomBetween(68, 92),
    vy: power,
    targetY,
    hue: cue.hue,
    kind: cue.kind,
  };
}

function addSpark(sparks: Spark[], spark: Spark, profile: Profile) {
  sparks.push(spark);
  if (sparks.length > profile.sparkLimit) {
    sparks.splice(0, sparks.length - profile.sparkLimit);
  }
}

function burst(shell: Shell, sparks: Spark[], profile: Profile) {
  const baseCounts: Record<FireworkKind, number> = {
    brocade: 104,
    comet: 36,
    crackle: 90,
    palm: 48,
    peony: 76,
    ring: 64,
    willow: 82,
  };
  const count = Math.max(18, Math.round(baseCounts[shell.kind] * profile.burstScale));
  const baseSpeed: Record<FireworkKind, number> = {
    brocade: 3.8,
    comet: 2.5,
    crackle: 4.7,
    palm: 3.8,
    peony: 4.2,
    ring: 3.6,
    willow: 3.2,
  };

  for (let i = 0; i < count; i += 1) {
    const ringAngle = (Math.PI * 2 * i) / count;
    const angle = shell.kind === "ring"
      ? ringAngle
      : shell.kind === "palm"
        ? randomBetween(Math.PI * 1.12, Math.PI * 1.88)
        : randomBetween(0, Math.PI * 2);
    const speed = shell.kind === "ring"
      ? randomBetween(baseSpeed.ring * 0.92, baseSpeed.ring * 1.08)
      : randomBetween(baseSpeed[shell.kind] * 0.42, baseSpeed[shell.kind]);
    const ttl = shell.kind === "willow" || shell.kind === "brocade" ? randomBetween(96, 142) : randomBetween(52, 88);
    const gold = shell.kind === "willow" || shell.kind === "comet" || shell.kind === "palm" || shell.kind === "brocade" || shell.kind === "crackle";
    const hue = gold ? randomBetween(34, 54) : shell.hue + randomBetween(-16, 16);

    addSpark(sparks, {
      x: shell.x,
      y: shell.y,
      px: shell.x,
      py: shell.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed + (shell.kind === "willow" || shell.kind === "brocade" ? randomBetween(0.35, 1.05) : 0),
      life: ttl,
      ttl,
      hue,
      size: randomBetween(0.75, shell.kind === "willow" || shell.kind === "brocade" ? 1.35 : 1.75),
      gravity: shell.kind === "willow" || shell.kind === "brocade" ? 0.04 : 0.028,
      drag: shell.kind === "willow" || shell.kind === "brocade" ? 0.992 : 0.982,
      strobe: shell.kind === "ring" && i % 4 === 0 || shell.kind === "crackle" && i % 3 === 0,
    }, profile);
  }
}

function addMine(width: number, height: number, cue: MineCue, position: number, sparks: Spark[], profile: Profile) {
  const x = width * position;
  const baseY = height + 4;
  const count = Math.max(10, Math.round(28 * profile.burstScale));
  for (let i = 0; i < count; i += 1) {
    const spread = randomBetween(-0.32, 0.32);
    const speed = randomBetween(4.2, 7.3);
    addSpark(sparks, {
      x,
      y: baseY,
      px: x,
      py: baseY,
      vx: Math.sin(spread) * speed,
      vy: -Math.cos(spread) * speed,
      life: randomBetween(42, 72),
      ttl: 72,
      hue: cue.hue + randomBetween(-8, 8),
      size: randomBetween(0.9, 1.8),
      gravity: 0.05,
      drag: 0.982,
      strobe: false,
    }, profile);
  }
}

function makeStars(width: number, height: number, count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height * 0.62,
    alpha: randomBetween(0.08, 0.32),
  }));
}

function addStarRain(width: number, height: number, cue: StarRainCue, fallingStars: FallingStar[], profile: Profile) {
  const count = Math.max(5, Math.round(cue.count * profile.burstScale));
  for (let i = 0; i < count; i += 1) {
    const x = randomBetween(width * 0.12, width * 0.88);
    const y = randomBetween(height * 0.08, height * 0.28);
    fallingStars.push({
      x,
      y,
      px: x,
      py: y,
      vx: randomBetween(-0.22, 0.22),
      vy: randomBetween(0.8, 1.7),
      life: randomBetween(62, 96),
      ttl: 96,
      hue: cue.hue + randomBetween(-8, 8),
    });
  }
}

export function FireworksShow({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFinishing, setIsFinishing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [actIndex, setActIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shells: Shell[] = [];
    const sparks: Spark[] = [];
    const flashes: Flash[] = [];
    const fallingStars: FallingStar[] = [];
    let stars: Star[] = [];
    let profile = getProfile(window.innerWidth);
    let animationId = 0;
    let startedAt = performance.now();
    let lastFrame = 0;
    let lastUi = 0;
    let nextCueIndex = 0;
    let nextMineCueIndex = 0;
    let nextStarRainIndex = 0;
    let closeQueued = false;
    let lastKnownAct = 0;

    setIsFinishing(false);
    setProgress(0);
    setActIndex(0);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      profile = getProfile(width);
      canvas.width = Math.floor(width * profile.dpr);
      canvas.height = Math.floor(height * profile.dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(profile.dpr, 0, 0, profile.dpr, 0, 0);
      stars = makeStars(width, height, width < 640 ? 28 : 48);
    };

    const playCues = (elapsed: number, width: number, height: number) => {
      while (nextCueIndex < FIREWORK_CUES.length && elapsed >= FIREWORK_CUES[nextCueIndex].at) {
        const cue = FIREWORK_CUES[nextCueIndex];
        const skipOptionalOnSmallScreens = width < 640 && cue.optional;
        if (!skipOptionalOnSmallScreens) {
          const availableSlots = Math.max(0, profile.shellLimit - shells.length);
          const positions = cue.positions.slice(0, availableSlots || cue.positions.length);
          for (const position of positions) {
            if (shells.length >= profile.shellLimit) break;
            shells.push(launchShell(width, height, cue, position, nextCueIndex));
          }
        }
        nextCueIndex += 1;
      }

      while (nextMineCueIndex < MINE_CUES.length && elapsed >= MINE_CUES[nextMineCueIndex].at) {
        const cue = MINE_CUES[nextMineCueIndex];
        const skipOptionalOnSmallScreens = width < 640 && cue.optional;
        if (!skipOptionalOnSmallScreens) {
          for (const position of cue.positions) {
            addMine(width, height, cue, position, sparks, profile);
          }
        }
        nextMineCueIndex += 1;
      }

      while (nextStarRainIndex < STAR_RAIN_CUES.length && elapsed >= STAR_RAIN_CUES[nextStarRainIndex].at) {
        const cue = STAR_RAIN_CUES[nextStarRainIndex];
        if (!(width < 640 && cue.optional)) {
          addStarRain(width, height, cue, fallingStars, profile);
        }
        nextStarRainIndex += 1;
      }
    };

    const paintSky = (width: number, height: number, elapsed: number) => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = elapsed < SHOW_DURATION_MS ? "rgba(3, 7, 18, 0.24)" : "rgba(3, 7, 18, 0.14)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(255,255,255,0.8)";
      for (const star of stars) {
        ctx.globalAlpha = star.alpha;
        ctx.fillRect(star.x, star.y, 1, 1);
      }
      ctx.globalAlpha = 1;
    };

    const render = (now: number) => {
      if (now - lastFrame < FRAME_MS) {
        animationId = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;

      const elapsed = now - startedAt;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (reducedMotion) {
        setProgress(100);
        setIsFinishing(true);
        window.setTimeout(onClose, 450);
        return;
      }

      if (elapsed <= SHOW_DURATION_MS) {
        playCues(elapsed, width, height);
      } else if (!closeQueued) {
        closeQueued = true;
        setIsFinishing(true);
        window.setTimeout(onClose, 650);
      }

      paintSky(width, height, elapsed);

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (let i = flashes.length - 1; i >= 0; i -= 1) {
        const flash = flashes[i];
        const alpha = Math.max(0, flash.life / flash.ttl);
        ctx.fillStyle = `hsla(${flash.hue}, 100%, 82%, ${alpha * 0.24})`;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, 10 * alpha + 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.32})`;
        ctx.lineWidth = 1.2;
        for (let ray = 0; ray < 8; ray += 1) {
          const angle = (Math.PI * 2 * ray) / 8;
          const inner = 8 * (1 - alpha);
          const outer = 18 + 22 * (1 - alpha);
          ctx.beginPath();
          ctx.moveTo(flash.x + Math.cos(angle) * inner, flash.y + Math.sin(angle) * inner);
          ctx.lineTo(flash.x + Math.cos(angle) * outer, flash.y + Math.sin(angle) * outer);
          ctx.stroke();
        }
        flash.life -= 1;
        if (flash.life <= 0) flashes.splice(i, 1);
      }

      for (let i = shells.length - 1; i >= 0; i -= 1) {
        const shell = shells[i];
        shell.px = shell.x;
        shell.py = shell.y;
        shell.x += shell.vx;
        shell.y += shell.vy;
        shell.vy += 0.115;

        ctx.strokeStyle = `hsla(${shell.hue}, 100%, 72%, 0.78)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shell.px, shell.py);
        ctx.lineTo(shell.x, shell.y);
        ctx.stroke();

        ctx.fillStyle = `hsla(${shell.hue}, 100%, 82%, 0.92)`;
        ctx.beginPath();
        ctx.arc(shell.x, shell.y, 1.8, 0, Math.PI * 2);
        ctx.fill();

        if (shell.y <= shell.targetY || shell.vy >= -0.4) {
          burst(shell, sparks, profile);
          flashes.push({
            x: shell.x,
            y: shell.y,
            life: 9,
            ttl: 9,
            hue: shell.hue,
          });
          shells.splice(i, 1);
        }
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i];
        const alpha = Math.max(0, spark.life / spark.ttl);
        const blink = spark.strobe ? 0.45 + Math.sin(spark.life * 0.9) * 0.42 : 1;
        spark.px = spark.x;
        spark.py = spark.y;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= spark.drag;
        spark.vy = spark.vy * spark.drag + spark.gravity;
        spark.life -= 1;

        ctx.strokeStyle = `hsla(${spark.hue}, 100%, ${64 + alpha * 24}%, ${alpha * blink})`;
        ctx.lineWidth = Math.max(0.75, spark.size * (0.7 + alpha));
        ctx.beginPath();
        ctx.moveTo(spark.px, spark.py);
        ctx.lineTo(spark.x, spark.y);
        ctx.stroke();

        if (spark.life <= 0 || spark.y > height + 60) {
          sparks.splice(i, 1);
        }
      }

      for (let i = fallingStars.length - 1; i >= 0; i -= 1) {
        const star = fallingStars[i];
        const alpha = Math.max(0, star.life / star.ttl);
        star.px = star.x;
        star.py = star.y;
        star.x += star.vx;
        star.y += star.vy;
        star.vy += 0.018;
        star.life -= 1;

        ctx.strokeStyle = `hsla(${star.hue}, 100%, 76%, ${alpha * 0.78})`;
        ctx.lineWidth = 1.15;
        ctx.beginPath();
        ctx.moveTo(star.px, star.py);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        if (star.life <= 0 || star.y > height + 40) {
          fallingStars.splice(i, 1);
        }
      }

      if (now - lastUi > 180) {
        const nextProgress = Math.min(100, Math.round((elapsed / SHOW_DURATION_MS) * 100));
        const nextAct = getActIndex(elapsed);
        setProgress(nextProgress);
        if (nextAct !== lastKnownAct) {
          lastKnownAct = nextAct;
          setActIndex(nextAct);
        }
        lastUi = now;
      }

      animationId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const currentAct = FIREWORK_ACTS[actIndex];

  return (
    <div
      className={`fixed inset-0 overflow-hidden bg-slate-950 text-white transition-opacity duration-700 ${isFinishing ? "opacity-0" : "opacity-100"}`}
      style={{ zIndex: 2147483000 }}
      role="dialog"
      aria-modal="true"
      aria-label="20 秒煙火秀與社群提醒"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0)_0%,rgba(2,6,23,0.58)_100%)]" />

      <button
        onClick={onClose}
        aria-label="關閉煙火秀"
        className="absolute right-3 top-3 z-20 rounded-full bg-white/12 p-2 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/20 sm:right-4 sm:top-4"
      >
        <X className="h-5 w-5" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: isFinishing ? 0 : 1, y: isFinishing ? -8 : 0 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute inset-x-3 top-4 z-10 mx-auto max-w-2xl text-center sm:top-6"
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-black/28 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-amber-100 ring-1 ring-white/12 backdrop-blur sm:text-xs">
          <Sparkles className="h-4 w-4 text-amber-200" />
          115 Celebration Fireworks
        </div>
        <h3 className="mx-auto mt-3 max-w-xl text-xl font-black leading-tight tracking-normal text-white drop-shadow sm:text-4xl">
          {currentAct.title}
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-xs font-semibold leading-5 text-white/72 sm:text-sm sm:leading-6">{currentAct.copy}</p>
        <div className="mx-auto mt-3 h-1 max-w-xs overflow-hidden rounded-full bg-white/14 sm:mt-4 sm:h-1.5 sm:max-w-sm">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-300 via-amber-200 to-emerald-200 transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>

      <motion.a
        href={THREADS_COMMUNITY_URL}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: isFinishing ? 0 : 1, y: isFinishing ? 12 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute bottom-4 left-4 right-4 z-10 mx-auto flex max-w-[340px] items-center justify-between gap-3 rounded-[22px] border border-white/12 bg-black/36 px-4 py-3 text-left shadow-[0_18px_54px_-34px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors hover:bg-black/48 focus:outline-none focus:ring-4 focus:ring-white/15 sm:left-auto sm:right-5 sm:mx-0"
      >
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-100/80">我們社群</p>
          <p className="font-outfit text-2xl font-black leading-none text-white">@115.rcpet</p>
        </div>
        <ExternalLink className="h-5 w-5 shrink-0 text-white/72" />
      </motion.a>

    </div>
  );
}
