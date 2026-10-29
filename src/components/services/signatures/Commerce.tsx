"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { pad, prefersReducedMotion } from "@/lib/utils";
import { SectionHead } from "@/components/ui/Section";

const PRODUCTS = [
  { id: "a", name: "Linen Overshirt", price: 48, tone: "p0" },
  { id: "b", name: "Canvas Tote", price: 22, tone: "p1" },
  { id: "c", name: "Leather Cardholder", price: 30, tone: "p2" },
];
const STEPS = ["Cart", "Shipping", "Payment", "Confirmed"];

/**
 * A working miniature of the thing we build: add to cart, watch the count,
 * check out. (Demo products and prices.)
 */
export function StoreDemo() {
  const [cart, setCart] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const badge = useRef<HTMLSpanElement>(null);
  const running = useRef<number[]>([]);
  const total = cart.reduce((sum, id) => sum + (PRODUCTS.find((p) => p.id === id)?.price ?? 0), 0);

  useEffect(() => {
    if (!badge.current || !cart.length || prefersReducedMotion()) return;
    gsap.fromTo(badge.current, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
  }, [cart.length]);

  useEffect(() => () => running.current.forEach((t) => window.clearTimeout(t)), []);

  const checkout = () => {
    if (!cart.length || step > 0) return;
    const fast = prefersReducedMotion();
    [1, 2, 3].forEach((s) => running.current.push(window.setTimeout(() => setStep(s), fast ? 0 : s * 750)));
  };
  const reset = () => {
    running.current.forEach((t) => window.clearTimeout(t));
    running.current = [];
    setCart([]);
    setStep(0);
  };

  return (
    <section className="section section-paper" id="overview">
      <div className="shell">
        <SectionHead
          title={
            <>
              Built to be
              <br />
              bought from.
            </>
          }
          lead="Every tap between interest and order is a chance to lose someone. Try the shortest path — this little store works."
        />
        <div className="st" data-anim="up">
          <div className="st-shop">
            <div className="st-bar">
              <span className="st-brand">yourstore</span>
              <span className="st-cart" aria-live="polite">
                Cart
                <span ref={badge} className="st-badge">
                  {cart.length}
                </span>
              </span>
            </div>
            <ul className="st-grid">
              {PRODUCTS.map((p) => (
                <li key={p.id} className="st-card">
                  <span className={`st-img st-${p.tone}`} aria-hidden />
                  <span className="st-name">{p.name}</span>
                  <span className="st-price">${p.price}</span>
                  <button type="button" className="st-add" onClick={() => step === 0 && setCart((c) => [...c, p.id])} disabled={step > 0}>
                    Add to cart
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="st-side" data-theme="dark">
            <ol className="st-steps" aria-label="Checkout progress">
              {STEPS.map((s, i) => (
                <li key={s} data-on={i <= step}>
                  <i />
                  {s}
                </li>
              ))}
            </ol>
            {step < 3 ? (
              <>
                <ul className="st-lines">
                  {cart.length === 0 && <li className="text-dim">Your cart is empty — add something.</li>}
                  {PRODUCTS.filter((p) => cart.includes(p.id)).map((p) => (
                    <li key={p.id}>
                      <span>
                        {p.name} <span className="text-dim">× {cart.filter((c) => c === p.id).length}</span>
                      </span>
                      <span>${p.price * cart.filter((c) => c === p.id).length}</span>
                    </li>
                  ))}
                </ul>
                <div className="st-total">
                  <span>Total</span>
                  <span className="tabular-nums">${total}</span>
                </div>
                <button type="button" className="btn btn-primary st-go" onClick={checkout} disabled={!cart.length || step > 0}>
                  <span>{step > 0 ? STEPS[step] + "…" : "Checkout"}</span>
                </button>
              </>
            ) : (
              <div className="st-done">
                <p className="t-label text-cyan">Order confirmed</p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">Thank you!</p>
                <p className="mt-2 text-soft">Three steps from cart to confirmation.</p>
                <button type="button" className="t-label mt-6 text-muted hover:text-ink" onClick={reset}>
                  ← Shop again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const JOURNEY = [
  { title: "Discover", body: "Search-ready collections and product pages that show up when people look." },
  { title: "Browse", body: "Filters, sorting and search that make a big catalogue feel small." },
  { title: "Decide", body: "Photography, sizing, delivery dates and reviews that answer the doubt before it forms." },
  { title: "Buy", body: "A short checkout with the payment methods your customers already trust." },
  { title: "Return", body: "Accounts, order tracking and emails that bring people back." },
];

/** The customer journey as five columns; the one you point at opens up. */
export function Journey() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="shell">
        <SectionHead
          title={
            <>
              Five moments
              <br />
              that sell.
            </>
          }
          lead="We design and build for each step a customer takes — not just the homepage."
        />
        <ol className="jr" data-anim="up">
          {JOURNEY.map((j, i) => (
            <li key={j.title} data-open={open === i} onPointerEnter={() => setOpen(i)}>
              <button type="button" onClick={() => setOpen(i)} aria-expanded={open === i}>
                <span className="t-label text-cyan">{pad(i + 1)}</span>
                <span className="jr-title">{j.title}</span>
              </button>
              <p className="jr-body">{j.body}</p>
              <span className="jr-bar" aria-hidden>
                {Array.from({ length: 5 }, (_, k) => (
                  <i key={k} data-on={k <= i} />
                ))}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
