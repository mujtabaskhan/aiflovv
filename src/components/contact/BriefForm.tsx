"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { SITE, mailHref, telHref } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, scroller } from "@/lib/utils";
import { PixelArrow } from "@/components/ui/Pixels";
import { TLink } from "@/components/shell/TLink";

const NEEDS = ["Website", "Mobile app", "AI & automation", "Custom software", "SaaS product", "E-commerce", "UI/UX design", "Cloud & DevOps", "Not sure yet"];
const TIMELINES = ["As soon as possible", "1–3 months", "3–6 months", "Flexible"];

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

interface Fields {
  name: string;
  email: string;
  company: string;
  message: string;
  needs: string[];
  timeline: string;
}

const EMPTY: Fields = { name: "", email: "", company: "", message: "", needs: [], timeline: "" };

/** The brief as a code object — it fills in while you type. */
function Preview({ f }: { f: Fields }) {
  const str = (v: string, ph: string) =>
    v ? <span className="s">&quot;{v.length > 46 ? `${v.slice(0, 46)}…` : v}&quot;</span> : <span className="c">{ph}</span>;
  const rows: [string, ReactNode][] = [
    ["name", str(f.name, "// your name")],
    ["email", str(f.email, "// where we reply")],
    ["company", str(f.company, "// optional")],
    [
      "needs",
      f.needs.length ? (
        <>
          [{f.needs.map((n, i) => (
            <span key={n}>
              <span className="s">&quot;{n.toLowerCase()}&quot;</span>
              {i < f.needs.length - 1 ? ", " : ""}
            </span>
          ))}]
        </>
      ) : (
        <span className="c">[] // pick any</span>
      ),
    ],
    ["timeline", str(f.timeline.toLowerCase(), "// when")],
    ["message", str(f.message.replace(/\s+/g, " "), "// the idea")],
  ];
  return (
    <pre>
      <span className="k">const</span> brief <span className="p">=</span> {"{"}
      {"\n"}
      {rows.map(([k, v]) => (
        <span key={k}>
          {"  "}
          {k}
          <span className="p">:</span> {v}
          <span className="p">,</span>
          {"\n"}
        </span>
      ))}
      {"}"}
      <span className="p">;</span>
      {"\n\n"}
      <span className="k">await</span> aiflovv.<span className="s">send</span>(brief);
    </pre>
  );
}

function SuccessMark() {
  // A pixel check, drawn square by square.
  const on = new Set(["5,1", "6,0", "4,2", "3,3", "2,4", "1,3", "0,2"]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    gsap.from(ref.current.querySelectorAll(".on"), { scale: 0, duration: 0.4, ease: "back.out(3)", stagger: 0.06 });
  }, []);
  return (
    <div ref={ref} className="success-grid" aria-hidden>
      {Array.from({ length: 35 }, (_, i) => {
        const x = i % 7;
        const y = Math.floor(i / 7);
        return <i key={i} className={on.has(`${x},${y}`) ? "on" : ""} />;
      })}
    </div>
  );
}

export function BriefForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [missing, setMissing] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const mailto = useMemo(() => {
    const meta = [
      `Name: ${f.name}`,
      f.company ? `Company: ${f.company}` : "",
      f.needs.length ? `Needs: ${f.needs.join(", ")}` : "",
      f.timeline ? `Timeline: ${f.timeline}` : "",
    ].filter(Boolean);
    const body = `${f.message}\n\n—\n${meta.join("\n")}`;
    return `${mailHref}?subject=${encodeURIComponent(`Project brief — ${f.name || "new project"}`)}&body=${encodeURIComponent(body)}`;
  }, [f]);

  const validate = () => {
    const e: typeof errors = {};
    if (f.name.trim().length < 2) e.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email doesn't look right.";
    if (f.message.trim().length < 10) e.message = "A sentence or two about the project helps.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setServerError("");
    if (!validate()) {
      const first = ev.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("sending");
    const honeypot = (ev.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, website: honeypot, elapsed: Date.now() - startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      if (data.code === "not_configured") {
        setMissing(Array.isArray(data.missing) ? data.missing : []);
        setStatus("unconfigured");
        return;
      }
      setServerError(data.error ?? "We couldn't send your message just now.");
      setStatus("error");
    } catch {
      setServerError("We couldn't reach the server — check your connection and try again.");
      setStatus("error");
    }
  };

  // Bring problems into view and announce them.
  useEffect(() => {
    if ((status === "error" || status === "unconfigured") && alertRef.current) {
      if (scroller.lenis) scroller.lenis.scrollTo(alertRef.current, { offset: -160 });
      gsap.fromTo(alertRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
    }
  }, [status]);

  useEffect(() => {
    const panel = panelRef.current;
    if (status === "sent" && panel) {
      panel.focus({ preventScroll: true });
      if (scroller.lenis) scroller.lenis.scrollTo(panel, { offset: -140 });
      else panel.scrollIntoView({ block: "center" });
      gsap.fromTo(panel, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 });
    }
  }, [status]);

  const done = status === "sent";

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        {done ? (
          <div ref={panelRef} tabIndex={-1} className="outline-none" role="status">
            <SuccessMark />
            <h2 className="t-h2 mt-10">Brief received.</h2>
            <p className="t-lead mt-6 max-w-xl">
              Thanks, {f.name.split(" ")[0]}. Your brief is with the team — we&apos;ll reply to {f.email}.
            </p>
            <button
              type="button"
              className="t-label mt-12 text-muted hover:text-ink"
              onClick={() => {
                setF(EMPTY);
                setStatus("idle");
              }}
            >
              ← Start another brief
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-12" aria-describedby="form-status">
            <fieldset>
              <legend className="t-label mb-5 text-muted">01 · What do you need?</legend>
              <div className="choice-group">
                {NEEDS.map((n) => (
                  <label key={n} className="choice">
                    <input
                      type="checkbox"
                      name="needs"
                      value={n}
                      checked={f.needs.includes(n)}
                      onChange={(e) => set("needs", e.target.checked ? [...f.needs, n] : f.needs.filter((x) => x !== n))}
                    />
                    {n}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="t-label mb-5 text-muted">02 · Timeline</legend>
              <div className="choice-group">
                {TIMELINES.map((t) => (
                  <label key={t} className="choice">
                    <input type="radio" name="timeline" value={t} checked={f.timeline === t} onChange={() => set("timeline", t)} />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="grid gap-9">
              <legend className="t-label mb-1 text-muted">03 · About you</legend>
              <div className="grid gap-9 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name}>
                  <input
                    id="name"
                    className="field-input"
                    autoComplete="name"
                    value={f.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="Your name"
                  />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    className="field-input"
                    autoComplete="email"
                    value={f.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="you@company.com"
                  />
                </Field>
              </div>
              <Field id="company" label="Company (optional)">
                <input
                  id="company"
                  className="field-input"
                  autoComplete="organization"
                  value={f.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Company or project name"
                />
              </Field>
              <Field id="message" label="Project" error={errors.message}>
                <textarea
                  id="message"
                  className="field-input"
                  rows={5}
                  value={f.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="What are you building, and what does success look like?"
                />
              </Field>
              {/* Honeypot */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
            </fieldset>

            {(status === "error" || status === "unconfigured") && (
              <div ref={alertRef} className="form-alert" role="alert" data-kind={status}>
                <p className="form-alert-title">
                  {status === "error" ? serverError : "Our form isn't connected to email yet."}
                </p>
                <p className="mt-2 text-sm text-soft">
                  {status === "error"
                    ? "Nothing was lost — try again, or send the same brief from your email app."
                    : "Your brief is ready to send from your email app — everything you wrote is filled in."}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {status === "error" && (
                    <button type="submit" className="btn btn-ghost btn-sm btn-text">
                      <span>Try again</span>
                    </button>
                  )}
                  <a href={mailto} className="btn btn-primary btn-sm">
                    <span>Send via email</span>
                    <span className="btn-icon">
                      <PixelArrow diagonal size={11} />
                      <PixelArrow diagonal size={11} />
                    </span>
                  </a>
                </div>
                {missing.length > 0 && (
                  <div className="form-alert-dev">
                    <p className="t-label">Developer note · set in .env.local</p>
                    <ul>
                      {missing.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6">
              <button type="submit" className="btn btn-primary" disabled={status === "sending"} data-magnetic="0.2">
                <span>{status === "sending" ? "Sending…" : "Send brief"}</span>
                <span className="btn-icon">
                  <PixelArrow size={12} />
                  <PixelArrow size={12} />
                </span>
              </button>
              <p id="form-status" className="text-sm text-muted" role="status" aria-live="polite">
                {status === "sending" ? "Sending your brief…" : "Or write to us directly — see the details alongside."}
              </p>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-dim">
              We use what you send only to reply to you —{" "}
              <TLink href="/privacy" className="link-px text-muted hover:text-ink">
                privacy policy
              </TLink>
              .
            </p>
          </form>
        )}
      </div>

      <aside className="lg:col-span-5">
        <div className="grid gap-10 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
          <div className="brief-preview" aria-hidden>
            <div className="flex items-center justify-between border-b border-line px-5 py-3 t-label text-dim">
              <span>brief.ts</span>
              <span className="flex items-center gap-2">
                <i className="hero-live" /> live
              </span>
            </div>
            <Preview f={f} />
          </div>
          <div>
            <div className="contact-card">
              <p className="t-label text-dim">Email</p>
              <a href={mailHref} className="link-px w-fit text-lg">
                {SITE.email}
              </a>
            </div>
            <div className="contact-card">
              <p className="t-label text-dim">Phone</p>
              <a href={telHref} className="link-px w-fit text-lg">
                {SITE.phone}
              </a>
            </div>
            <div className="contact-card">
              <p className="t-label text-dim">Instagram</p>
              <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="link-px w-fit text-lg">
                {SITE.instagram.handle}
              </a>
            </div>
            <div className="contact-card">
              <p className="t-label text-dim">Studio</p>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-px w-fit text-lg">
                {SITE.address}
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id} className="t-label text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
