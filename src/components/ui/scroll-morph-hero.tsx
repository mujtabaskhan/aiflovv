"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { motion, type MotionValue } from "framer-motion";

/*
 * Adapted from the 21st.dev "scroll morph hero". The look and the geometry —
 * scatter, line, ring, then an arc that sweeps — are the original's; the
 * engine is not:
 *
 *  - Cards are positioned by one animation frame loop that writes transforms
 *    straight to the DOM. The original re-rendered the whole component on
 *    every frame of scroll and restarted a spring per card each time, which
 *    was the single heaviest thing on the page.
 *  - With a host `progress`, every phase is driven by scroll, with a hold on
 *    the ring so the title can be read and a long sweep so each client gets
 *    a moment. The card at the top of the arc is enlarged and named, so it
 *    reads as a client roster rather than a pattern. Without `progress` it
 *    falls back to the original timed intro and its own wheel/touch scroll.
 *  - Scatter positions come from a seeded PRNG, so server and client agree.
 *  - The loop only runs while the component is on screen.
 */

export interface MorphItem {
    /** Card image. Omit to show a neutral placeholder while it loads. */
    src?: string;
    /** Client name — on the card back, and in the caption at the arc's top. */
    title?: string;
    subtitle?: string;
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

/** Self-driven virtual scroll range (the original's). */
const MAX_SCROLL = 3000;

/**
 * Host-driven phase map, as fractions of `progress`. The host starts
 * `progress` while the section is still scrolling into view, so the cards
 * gather into the line and the ring on the way in, hold as a ring once the
 * section settles, then open into the arc and sweep.
 */
const PHASE = {
    line: [0.0, 0.1],
    ring: [0.1, 0.22],
    hold: [0.22, 0.36],
    morph: [0.36, 0.5],
    sweep: [0.5, 1.0],
} as const;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ramp = (v: number, [a, b]: readonly [number, number]) => clamp01((v - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Seeded PRNG (mulberry32): identical sequence on the server and the client. */
function seededRandom(seed: number) {
    let s = seed | 0;
    return () => {
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function Card({ item, index }: { item: MorphItem; index: number }) {
    return (
        <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ rotateY: 180 }}
        >
            {/* Front face */}
            <div
                className="absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-graphite shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
            >
                {item.src && (
                    <img
                        src={item.src}
                        alt={item.title ?? `card-${index}`}
                        className="h-full w-full object-cover"
                        draggable={false}
                    />
                )}
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
            </div>

            {/* Back face */}
            <div
                className="absolute inset-0 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-gray-700 bg-gray-900 p-1.5 shadow-lg"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
                <div className="text-center">
                    <p className="mb-1 text-[5px] font-bold uppercase leading-tight tracking-widest text-ion-soft">
                        {item.subtitle ?? "View"}
                    </p>
                    <p className="text-[8px] font-medium leading-tight text-white">
                        {item.title ?? "Details"}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

interface IntroAnimationProps {
    items: MorphItem[];
    /** 0..1 driven by the host page. When omitted, the component scrolls itself. */
    progress?: MotionValue<number>;
    introTitle?: string;
    introHint?: string;
    title?: string;
    description?: React.ReactNode;
    /** CSS background. Pass "transparent" to sit over the page behind it. */
    background?: string;
    /** Hold the intro until this is true (e.g. behind a preloader). */
    play?: boolean;
}

export default function IntroAnimation({
    items,
    progress,
    introTitle = "The future is built on AI.",
    introHint = "SCROLL TO EXPLORE",
    title = "Explore Our Vision",
    description,
    background = "#FAFAFA",
    play = true,
}: IntroAnimationProps) {
    const total = items.length;
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const introRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLParagraphElement>(null);
    const arcRef = useRef<HTMLDivElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);
    const capName = useRef<HTMLSpanElement>(null);
    const capTag = useRef<HTMLSpanElement>(null);
    const capIndex = useRef<HTMLSpanElement>(null);

    // Read inside the loop without restarting it.
    const live = useRef({ progress, play, items });
    live.current = { progress, play, items };

    const scatter = useMemo(() => {
        const rand = seededRandom(0x5c47 + total);
        return Array.from({ length: total }, () => ({
            x: (rand() - 0.5) * 1500,
            y: (rand() - 0.5) * 1000,
            r: (rand() - 0.5) * 180,
        }));
    }, [total]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const size = { w: container.clientWidth, h: container.clientHeight };
        const ro = new ResizeObserver(([entry]) => {
            size.w = entry.contentRect.width;
            size.h = entry.contentRect.height;
        });
        ro.observe(container);

        // Self-driven fallback: wheel/touch into a virtual scroll, releasing
        // the page at either end. Only attached without a host — a
        // non-passive wheel listener makes the browser wait on script before
        // every scroll step.
        let virtual = 0;
        const selfDriven = !live.current.progress;
        const onWheel = (e: WheelEvent) => {
            const next = Math.min(Math.max(virtual + e.deltaY, 0), MAX_SCROLL);
            if (next === virtual) return;
            e.preventDefault();
            virtual = next;
        };
        let touchY = 0;
        const onTouchStart = (e: TouchEvent) => {
            touchY = e.touches[0].clientY;
        };
        const onTouchMove = (e: TouchEvent) => {
            const y = e.touches[0].clientY;
            virtual = Math.min(Math.max(virtual + (touchY - y), 0), MAX_SCROLL);
            touchY = y;
        };
        if (selfDriven) {
            container.addEventListener("wheel", onWheel, { passive: false });
            container.addEventListener("touchstart", onTouchStart, { passive: true });
            container.addEventListener("touchmove", onTouchMove, { passive: true });
        }

        // Pointer parallax on the arc — a fine pointer only.
        let parTarget = 0;
        const onPointer = (e: PointerEvent) => {
            if (e.pointerType === "touch") return;
            const rect = container.getBoundingClientRect();
            parTarget = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 70;
        };
        window.addEventListener("pointermove", onPointer, { passive: true });

        const cur = scatter.map((s) => ({ x: s.x, y: s.y, r: s.r, s: 0.6, o: 0 }));
        let par = 0;
        let shownIndex = -1;
        let startedAt = -1;
        let raf = 0;
        let last = performance.now();

        const tick = (now: number) => {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            const { progress: host, play: canPlay } = live.current;
            const { w, h } = size;
            const n = cur.length;

            // Phase values.
            let lineT = 0;
            let ringT = 0;
            let holdT = 0;
            let morphT = 0;
            let sweepT = 0;
            if (host) {
                const p = canPlay ? host.get() : 0;
                lineT = ease(ramp(p, PHASE.line));
                ringT = ease(ramp(p, PHASE.ring));
                holdT = ramp(p, PHASE.hold);
                morphT = ease(ramp(p, PHASE.morph));
                sweepT = ramp(p, PHASE.sweep);
            } else if (canPlay) {
                if (startedAt < 0) startedAt = now;
                const e = (now - startedAt) / 1000;
                lineT = ease(clamp01((e - 0.5) / 0.8));
                ringT = ease(clamp01((e - 2.5) / 1.0));
                morphT = ease(clamp01(virtual / 600));
                sweepT = clamp01((virtual - 600) / (MAX_SCROLL - 600));
            }

            // Geometry, as in the original.
            const isMobile = w < 768;
            const minDim = Math.min(w, h);
            const ringRadius = Math.min(minDim * 0.35, 350);
            const ringSpin = holdT * 28 + Math.sin(now * 0.0004) * 2;
            const lineSpacing = 70;

            const baseRadius = Math.min(w, h * 1.5);
            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
            const arcApexY = h * (isMobile ? 0.35 : 0.25);
            const arcCenterY = arcApexY + arcRadius;
            const perItem = isMobile ? 7 : 9;
            const maxSpread = isMobile ? 100 : 130;
            const spread = n > 1 ? Math.min(maxSpread, perItem * (n - 1)) : 0;
            const startAngle = -90 - spread / 2;
            const step = n > 1 ? spread / (n - 1) : 1;
            const activeScale = isMobile ? 1.4 : 1.8;

            // Sweep from the first card resting at the left edge to the last
            // resting at the right, so every client passes the top of the arc.
            const edgeInset = 30 * activeScale + 16;
            const visibleHalf = arcRadius > 0
                ? (Math.asin(Math.min(1, Math.max(0, w / 2 - edgeInset) / arcRadius)) * 180) / Math.PI
                : 90;
            const overflow = Math.max(0, spread / 2 - visibleHalf);
            // With room to spare the sweep still travels far enough to bring
            // each card to the top in turn.
            const travel = Math.max(overflow, spread / 2);
            const sweepRot = travel * (1 - 2 * sweepT);

            par += (parTarget - par) * (1 - Math.exp(-4 * dt));
            const k = 1 - Math.exp(-7 * dt);

            let focus = -1;
            let focusDist = Infinity;

            for (let i = 0; i < n; i++) {
                const sc = scatter[i];

                // Scatter → line.
                let x = lerp(sc.x, i * lineSpacing - (n * lineSpacing) / 2, lineT);
                let y = lerp(sc.y, 0, lineT);
                let r = lerp(sc.r, 0, lineT);
                let s = lerp(0.6, 1, lineT);
                const o = lineT;

                // Line → ring.
                const ringAngle = (i / n) * 360 + ringSpin;
                const ringRad = (ringAngle * Math.PI) / 180;
                x = lerp(x, Math.cos(ringRad) * ringRadius, ringT);
                y = lerp(y, Math.sin(ringRad) * ringRadius, ringT);
                r = lerp(r, ringAngle + 90, ringT);

                // Ring → arc.
                const arcAngle = startAngle + i * step + sweepRot;
                const arcRad = (arcAngle * Math.PI) / 180;
                const fromTop = Math.abs(arcAngle + 90);
                const lift = Math.max(0, 1 - fromTop / step) * morphT;
                x = lerp(x, Math.cos(arcRad) * arcRadius + par, morphT);
                y = lerp(y, Math.sin(arcRad) * arcRadius + arcCenterY - lift * 14, morphT);
                r = lerp(r, arcAngle + 90, morphT);
                s = lerp(s, activeScale * (1 + 0.14 * lift), morphT);

                if (fromTop < focusDist) {
                    focusDist = fromTop;
                    focus = i;
                }

                const c = cur[i];
                c.x += (x - c.x) * k;
                c.y += (y - c.y) * k;
                c.r += (r - c.r) * k;
                c.s += (s - c.s) * k;
                c.o += (o - c.o) * k;

                const el = cardRefs.current[i];
                if (el) {
                    el.style.transform = `translate3d(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px, 0) rotate(${c.r.toFixed(2)}deg) scale(${c.s.toFixed(3)})`;
                    el.style.opacity = c.o.toFixed(3);
                    el.style.zIndex = i === focus && morphT > 0.5 ? "2" : "1";
                }
            }

            // Ring title, then the arc heading.
            const introO = ease(clamp01((ringT - 0.6) / 0.4)) * (1 - ease(clamp01(morphT * 2.2)));
            if (introRef.current) {
                introRef.current.style.opacity = introO.toFixed(3);
                introRef.current.style.transform = `translateY(${((1 - introO) * 14).toFixed(1)}px)`;
                introRef.current.style.filter = introO > 0.98 ? "none" : `blur(${((1 - introO) * 8).toFixed(1)}px)`;
            }
            if (hintRef.current) hintRef.current.style.opacity = (introO * 0.55).toFixed(3);
            const arcO = ease(clamp01((morphT - 0.7) / 0.3));
            if (arcRef.current) {
                arcRef.current.style.opacity = arcO.toFixed(3);
                arcRef.current.style.transform = `translateY(${((1 - arcO) * 20).toFixed(1)}px)`;
            }

            // Caption for the client at the top of the arc.
            const cap = captionRef.current;
            if (cap) {
                const onTop = Math.max(0, 1 - focusDist / (step * 0.5));
                cap.style.opacity = (arcO * (0.6 + 0.4 * onTop)).toFixed(3);
                const cardTop = h / 2 + arcApexY - 14 - (IMG_HEIGHT * activeScale * 1.14) / 2;
                cap.style.transform = `translate3d(${(w / 2 + par).toFixed(1)}px, ${(cardTop - 18).toFixed(1)}px, 0) translate(-50%, -100%)`;
                if (focus !== shownIndex && focus >= 0) {
                    shownIndex = focus;
                    const it = live.current.items[focus];
                    if (capName.current) capName.current.textContent = it?.title ?? "";
                    if (capTag.current) capTag.current.textContent = it?.subtitle ?? "";
                    if (capIndex.current) {
                        capIndex.current.textContent = `${String(focus + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
                    }
                }
            }

            raf = requestAnimationFrame(tick);
        };

        // Only animate while on screen.
        const io = new IntersectionObserver(
            ([entry]) => {
                cancelAnimationFrame(raf);
                if (entry.isIntersecting) {
                    last = performance.now();
                    raf = requestAnimationFrame(tick);
                }
            },
            { rootMargin: "200px 0px" },
        );
        io.observe(container);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            container.removeEventListener("wheel", onWheel);
            container.removeEventListener("touchstart", onTouchStart);
            container.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("pointermove", onPointer);
        };
    }, [scatter]);

    return (
        <div ref={containerRef} className="relative h-full w-full overflow-hidden" style={{ background }}>
            <div className="flex h-full w-full flex-col items-center justify-center [perspective:1000px]">
                {/* Ring title. A tagline, not a heading: the page's only h1 is the hero's. */}
                <div
                    ref={introRef}
                    className="pointer-events-none absolute top-1/2 z-0 flex -translate-y-1/2 flex-col items-center justify-center text-center opacity-0"
                >
                    <p className="text-2xl font-medium tracking-tight text-fog md:text-4xl">{introTitle}</p>
                    <p ref={hintRef} className="mt-4 text-xs font-bold tracking-[0.2em] text-mist">
                        {introHint}
                    </p>
                </div>

                {/* Arc heading. Clamped so the title always clears the fixed site nav. */}
                <div
                    ref={arcRef}
                    className="pointer-events-none absolute top-[clamp(6.5rem,14%,9rem)] z-10 flex flex-col items-center justify-center px-4 text-center opacity-0"
                >
                    <h2 className="mb-4 text-3xl font-semibold tracking-tight text-chalk md:text-5xl">{title}</h2>
                    {description && (
                        <p className="max-w-lg text-sm leading-relaxed text-fog md:text-base">{description}</p>
                    )}
                </div>

                {/* The client at the top of the arc. */}
                <div
                    ref={captionRef}
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 z-10 flex flex-col items-center text-center opacity-0 will-change-transform"
                >
                    <span ref={capIndex} className="font-mono text-[0.625rem] tracking-[0.2em] text-ion" />
                    <span ref={capName} className="mt-1.5 text-lg font-semibold tracking-tight text-chalk md:text-xl" />
                    <span ref={capTag} className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-mist" />
                </div>

                <div className="relative flex h-full w-full items-center justify-center">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                cardRefs.current[i] = el;
                            }}
                            className="group absolute cursor-pointer opacity-0 will-change-transform"
                            style={{
                                width: IMG_WIDTH,
                                height: IMG_HEIGHT,
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                            }}
                            data-cursor="hover"
                        >
                            <Card item={item} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
