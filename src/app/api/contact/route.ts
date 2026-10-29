import { SITE } from "@/content/site";
import { briefEmail, missingConfig, provider, send } from "@/lib/mailer";

/**
 * Contact form endpoint.
 *
 * Validates the brief, filters obvious bots, then emails it to the studio via
 * SMTP or Resend (see src/lib/mailer.ts and .env.example). Responses:
 *   200 { ok: true }                         delivered
 *   422 { ok: false, errors }                fix the form
 *   429 { ok: false, code: "rate_limited" }  too many attempts
 *   502 { ok: false, code: "delivery_failed" }
 *   503 { ok: false, code: "not_configured", missing }
 * The form never claims a message was sent unless the provider accepted it.
 */

export const runtime = "nodejs";

const NEEDS = ["Website", "Mobile app", "AI & automation", "Custom software", "SaaS product", "E-commerce", "UI/UX design", "Cloud & DevOps", "Not sure yet"];
const TIMELINES = ["As soon as possible", "1–3 months", "3–6 months", "Flexible"];

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, code: "bad_request", error: "Invalid request." }, { status: 400 });
  }

  // Bots: a hidden field real people never fill, and forms sent impossibly fast.
  const elapsed = Number(body.elapsed);
  if (clean(body.website, 200) || (Number.isFinite(elapsed) && elapsed < 1500)) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json(
      { ok: false, code: "rate_limited", error: `Too many messages in a short time — please email ${SITE.email} directly.` },
      { status: 429 },
    );
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const message = clean(body.message, 5000);
  const needs = Array.isArray(body.needs) ? body.needs.filter((n): n is string => NEEDS.includes(n as string)) : [];
  const timeline = TIMELINES.includes(body.timeline as string) ? (body.timeline as string) : "";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "That email doesn't look right.";
  if (message.length < 10) errors.message = "A sentence or two about the project helps.";
  if (Object.keys(errors).length) return Response.json({ ok: false, code: "invalid", errors }, { status: 422 });

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ...(company ? [["Company", company] as [string, string]] : []),
    ...(needs.length ? [["Needs", needs.join(", ")] as [string, string]] : []),
    ...(timeline ? [["Timeline", timeline] as [string, string]] : []),
  ];

  if (!provider()) {
    console.warn("[contact] email delivery is not configured. Set:", missingConfig().join(" "));
    return Response.json(
      {
        ok: false,
        code: "not_configured",
        error: "Our form can't send email yet.",
        ...(process.env.NODE_ENV !== "production" ? { missing: missingConfig() } : {}),
      },
      { status: 503 },
    );
  }

  try {
    const { text, html } = briefEmail(rows, message);
    await send({ subject: `New project brief — ${name}${company ? ` (${company})` : ""}`, text, html, replyTo: email });

    // Optional acknowledgement to the visitor.
    if (process.env.CONTACT_ACK === "true") {
      const ack = briefEmail([["Received", new Date().toUTCString()]], `Hi ${name.split(" ")[0]},\n\nThanks for your brief — it's with the AiFlovv team and we'll reply to this address.\n\nWhat you sent:\n\n${message}`);
      await send({ to: email, subject: "We've received your brief — AiFlovv", text: ack.text, html: ack.html }).catch((err) =>
        console.error("[contact] acknowledgement failed:", err),
      );
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return Response.json(
      { ok: false, code: "delivery_failed", error: "We couldn't send your message just now." },
      { status: 502 },
    );
  }
}
