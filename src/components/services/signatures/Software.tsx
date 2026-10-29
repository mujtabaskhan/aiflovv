"use client";

import { useState } from "react";
import { SectionHead } from "@/components/ui/Section";
import { CompareSlider } from "../CompareSlider";

const SHEET_ROWS = [
  ["ORD-2291", "Malik T.", "pending", "??"],
  ["ORD-2292", "Ayesha K.", "paid", "3"],
  ["ORD-2293", "R. Khan", "PAID", "2"],
  ["ORD-2291", "Malik T.", "pending", "1"],
  ["ORD-2294", "Sara", "refund?", ""],
  ["ORD-2295", "Bilal A.", "paid", "4"],
  ["ORD-2296", "", "pending", "2"],
];

function Spreadsheet() {
  return (
    <div className="sheet" aria-hidden>
      <div className="sheet-bar">
        <span className="sheet-file">orders_v3_FINAL(2).xlsx</span>
        <span className="sheet-note">4 people editing</span>
      </div>
      <div className="sheet-grid">
        {["", "A", "B", "C", "D"].map((h) => (
          <span key={h} className="sheet-h">
            {h}
          </span>
        ))}
        {SHEET_ROWS.map((r, i) => (
          <div key={i} className="sheet-row">
            <span className="sheet-h">{i + 1}</span>
            {r.map((c, k) => (
              <span key={k} className={i === 3 ? "sheet-dup" : c === "??" || c === "refund?" || c === "" ? "sheet-bad" : undefined}>
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="sheet-comment">Is this the latest version??</span>
    </div>
  );
}

function System() {
  return (
    <div className="sys" data-theme="dark" aria-hidden>
      <div className="sys-side">
        <span className="sys-logo" />
        <i className="on" />
        <i />
        <i />
      </div>
      <div className="sys-main">
        <div className="sys-kpis">
          <div>
            <span>Orders today</span>
            <b>Live</b>
          </div>
          <div>
            <span>Awaiting payment</span>
            <b>Tracked</b>
          </div>
          <div>
            <span>Refunds</span>
            <b>In one queue</b>
          </div>
        </div>
        <div className="sys-table">
          {["paid", "pending", "paid", "refund", "paid"].map((s, i) => (
            <div key={i} className="sys-row">
              <span>ORD-229{i + 2}</span>
              <span className="sys-name" />
              <span className={`sys-chip sys-${s}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SpreadsheetToSystem() {
  return (
    <section className="section section-paper" id="overview">
      <div className="shell">
        <SectionHead
          title={
            <>
              From spreadsheet
              <br />
              to system.
            </>
          }
          lead="Most custom software starts life as a spreadsheet that outgrew itself. Drag the handle."
        />
        <div data-anim="up">
          <CompareSlider before={<Spreadsheet />} after={<System />} beforeLabel="Today" afterLabel="With AiFlovv" start={46} />
        </div>
      </div>
    </section>
  );
}

const NODES = [
  { id: "web", col: 0, row: 0, label: "Web app", body: "The browser interface your customers or team use every day." },
  { id: "mobile", col: 0, row: 1, label: "Mobile app", body: "The same data and actions, on iOS and Android." },
  { id: "admin", col: 0, row: 2, label: "Admin portal", body: "Back-office control: users, content, settings and reports." },
  { id: "api", col: 1, row: 1, label: "API", body: "One secure, documented API that every interface talks to." },
  { id: "auth", col: 2, row: 0, label: "Auth & roles", body: "Sign-in, permissions and audit trails, so people see only what they should." },
  { id: "logic", col: 2, row: 1, label: "Business logic", body: "Your rules — pricing, approvals, workflows — written once, used everywhere." },
  { id: "jobs", col: 2, row: 2, label: "Jobs & queues", body: "Emails, imports and reports that run in the background without slowing anyone down." },
  { id: "db", col: 3, row: 0, label: "Database", body: "A data model designed for the next stage of the business, not just today." },
  { id: "files", col: 3, row: 1, label: "Files", body: "Documents and uploads stored securely, served fast." },
  { id: "int", col: 3, row: 2, label: "Integrations", body: "Payments, CRM, accounting and the tools you already use." },
];

const LINKS: [string, string][] = [
  ["web", "api"],
  ["mobile", "api"],
  ["admin", "api"],
  ["api", "auth"],
  ["api", "logic"],
  ["api", "jobs"],
  ["logic", "db"],
  ["logic", "files"],
  ["jobs", "int"],
  ["auth", "db"],
];

/** The shape of a typical system — pick a part to see what it does. */
export function ArchitectureExplorer() {
  const [active, setActive] = useState("api");
  const node = NODES.find((n) => n.id === active)!;
  const linked = new Set(LINKS.filter(([a, b]) => a === active || b === active).flat());
  const X = (c: number) => 60 + c * 160;
  const Y = (r: number) => 40 + r * 80;

  return (
    <section className="section">
      <div className="shell">
        <SectionHead
          title={
            <>
              What&apos;s under
              <br />
              the hood.
            </>
          }
          lead="A typical custom system, simplified. Choose a part to see the job it does."
        />
        <div className="arch" data-anim="up">
          <div className="arch-scroll">
          <div className="arch-map" data-theme="dark">
            <svg viewBox="0 0 600 220" aria-hidden>
              {LINKS.map(([a, b]) => {
                const A = NODES.find((n) => n.id === a)!;
                const B = NODES.find((n) => n.id === b)!;
                const on = a === active || b === active;
                return (
                  <path
                    key={`${a}-${b}`}
                    d={`M${X(A.col) + 50} ${Y(A.row)} C ${X(A.col) + 90} ${Y(A.row)}, ${X(B.col) - 40} ${Y(B.row)}, ${X(B.col) - 50} ${Y(B.row)}`}
                    className={on ? "arch-wire on" : "arch-wire"}
                  />
                );
              })}
            </svg>
            {NODES.map((n) => (
              <button
                key={n.id}
                type="button"
                className="arch-node"
                data-active={n.id === active}
                data-linked={linked.has(n.id) && n.id !== active}
                style={{ left: `${(X(n.col) / 600) * 100}%`, top: `${(Y(n.row) / 220) * 100}%` }}
                onClick={() => setActive(n.id)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(n.id)}
                aria-pressed={n.id === active}
              >
                {n.label}
              </button>
            ))}
          </div>
          </div>
          <p className="arch-hint t-label text-dim" aria-hidden>
            Swipe to explore →
          </p>
          <div className="arch-info" aria-live="polite">
            <p className="t-label text-cyan">Selected</p>
            <h3 className="t-h3 mt-3">{node.label}</h3>
            <p className="t-lead mt-3">{node.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
