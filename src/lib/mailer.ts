import nodemailer from "nodemailer";
import { SITE } from "@/content/site";

/**
 * Email delivery for the contact form. Two providers, chosen by environment:
 *
 *   SMTP   — SMTP_HOST (+ SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE)
 *            Works with Google Workspace/Gmail (app password), Microsoft 365,
 *            Zoho, cPanel mail or any transactional SMTP service.
 *   Resend — RESEND_API_KEY (HTTP API, no SMTP needed)
 *
 * CONTACT_TO is where briefs go (defaults to the studio inbox) and
 * CONTACT_FROM the sender address your provider allows.
 */

export interface Message {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  to?: string;
}

export type Provider = "smtp" | "resend" | null;

export function provider(): Provider {
  if (process.env.SMTP_HOST) return "smtp";
  if (process.env.RESEND_API_KEY) return "resend";
  return null;
}

/** What's missing, in words a person can act on. */
export function missingConfig(): string[] {
  if (provider()) return [];
  return [
    "SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS (your mail provider's SMTP settings)",
    "— or RESEND_API_KEY (a Resend account with your domain verified)",
    "CONTACT_FROM (an address the provider is allowed to send from)",
  ];
}

const recipient = () => process.env.CONTACT_TO || SITE.email;
const sender = () => process.env.CONTACT_FROM || process.env.SMTP_USER || `AiFlovv Website <${SITE.email}>`;

let transport: nodemailer.Transporter | null = null;
function smtp() {
  if (transport) return transport;
  const port = Number(process.env.SMTP_PORT || 587);
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  return transport;
}

export async function send(msg: Message) {
  const to = msg.to ?? recipient();
  const p = provider();
  if (p === "smtp") {
    await smtp().sendMail({ from: sender(), to, replyTo: msg.replyTo, subject: msg.subject, text: msg.text, html: msg.html });
    return;
  }
  if (p === "resend") {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: sender(), to: [to], reply_to: msg.replyTo, subject: msg.subject, text: msg.text, html: msg.html }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    return;
  }
  throw new Error("No email provider configured");
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** A clean, readable HTML email: a table of the brief, then the message. */
export function briefEmail(rows: [string, string][], message: string) {
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;
  const html = `<!doctype html><html><body style="margin:0;background:#f3f5fa;font-family:Arial,Helvetica,sans-serif;color:#0a1030">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e3e7f0">
<tr><td style="background:#03050b;padding:22px 28px;color:#eef2ff;font-size:13px;letter-spacing:2px;text-transform:uppercase">AiFlovv · New project brief</td></tr>
<tr><td style="padding:28px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">
${rows.map(([k, v]) => `<tr><td style="padding:6px 0;color:#646d86;width:120px;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`).join("")}
</table>
<div style="margin-top:22px;padding-top:22px;border-top:1px solid #e3e7f0;font-size:15px;line-height:1.65;white-space:pre-wrap">${esc(message)}</div>
</td></tr></table></td></tr></table></body></html>`;
  return { text, html };
}
