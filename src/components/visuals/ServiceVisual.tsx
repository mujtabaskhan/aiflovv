import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Code-drawn, looping illustrations — one per service. Pure SVG/CSS so they
 * cost nothing to load, scale with their container (sized in cqw), and pause
 * when off screen (see AnimationEngine).
 */
export function ServiceVisual({ slug, className }: { slug: ServiceSlug; className?: string }) {
  return (
    <div className={cn("vis", `vis-${slug}`, className)} data-theme="dark" aria-hidden>
      {slug === "web-development" && <WebVisual />}
      {slug === "software-development" && <SoftwareVisual />}
      {slug === "mobile-applications" && <MobileVisual />}
      {slug === "ui-ux-design" && <DesignVisual />}
      {slug === "ai-solutions" && <AiVisual />}
      {slug === "saas-development" && <SaasVisual />}
      {slug === "ecommerce-development" && <CommerceVisual />}
      {slug === "cloud-devops" && <CloudVisual />}
    </div>
  );
}

function Cursor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 20" aria-hidden>
      <path d="M1 1v16l4.2-4.1 2.9 6.3 2.6-1.2-2.9-6.2H14z" fill="#fff" stroke="#0a1030" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/* --------------------------------------------------------------- Web */
function WebVisual() {
  return (
    <>
      <div className="vw-window">
        <div className="vw-bar">
          <i />
          <i />
          <i />
          <span className="vw-url">
            https://<b>yourbrand.com</b>
          </span>
        </div>
        <div className="vw-body">
          <div className="vw-copy">
            <span className="vw-blk vw-k" />
            <span className="vw-blk vw-h1" />
            <span className="vw-blk vw-h1 vw-short" />
            <span className="vw-blk vw-p" />
            <span className="vw-blk vw-p vw-short" />
            <span className="vw-blk vw-btn">
              <i />
            </span>
          </div>
          <span className="vw-blk vw-media">
            <i />
          </span>
          <div className="vw-cards">
            <span className="vw-blk" />
            <span className="vw-blk" />
            <span className="vw-blk" />
          </div>
        </div>
        <Cursor className="vw-cursor" />
      </div>
      <div className="vw-checks">
        <span>Performance</span>
        <span>SEO</span>
        <span>Accessibility</span>
        <span>Responsive</span>
      </div>
    </>
  );
}

/* --------------------------------------------------------------- Software */
const NODES = [
  { id: "web", x: 40, y: 54, label: "web app" },
  { id: "mobile", x: 40, y: 146, label: "mobile" },
  { id: "api", x: 170, y: 100, label: "api" },
  { id: "auth", x: 300, y: 32, label: "auth" },
  { id: "db", x: 300, y: 100, label: "database" },
  { id: "ai", x: 300, y: 168, label: "ai service" },
] as const;

const EDGES = [
  { d: "M88 66 C 128 66, 130 112, 170 112", dur: 2.4, begin: 0 },
  { d: "M88 158 C 128 158, 130 112, 170 112", dur: 2.8, begin: 0.9 },
  { d: "M218 112 C 258 112, 260 44, 300 44", dur: 2.2, begin: 0.4 },
  { d: "M218 112 L 300 112", dur: 1.8, begin: 1.2 },
  { d: "M218 112 C 258 112, 260 180, 300 180", dur: 2.6, begin: 0.2 },
];

function SoftwareVisual() {
  return (
    <>
      <svg className="vs-graph" viewBox="0 0 380 220">
        {EDGES.map((e, i) => (
          <path key={i} d={e.d} className="vs-edge" />
        ))}
        {EDGES.map((e, i) => (
          <g key={`p${i}`}>
            <rect x="-3" y="-3" width="6" height="6" fill={i % 2 ? "#3cc8ff" : "#4f7cff"}>
              <animateMotion dur={`${e.dur}s`} begin={`${e.begin}s`} repeatCount="indefinite" path={e.d} />
            </rect>
            <rect x="-2" y="-2" width="4" height="4" fill="#eaf2ff" opacity=".9">
              <animateMotion dur={`${e.dur}s`} begin={`${e.begin + e.dur / 2}s`} repeatCount="indefinite" path={e.d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
            </rect>
          </g>
        ))}
        {NODES.map((n, i) => (
          <g key={n.id} className="vs-node" style={{ animationDelay: `${i * 0.45}s` }}>
            <rect x={n.x} y={n.y} width="48" height="24" />
            <text x={n.x + 24} y={n.y + 15.5} textAnchor="middle">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="vs-term">
        <div className="vs-term-bar">
          <i />
          <span>deploy.log</span>
        </div>
        <ol className="vs-log">
          {[
            ["GET", "/api/orders", "200"],
            ["POST", "/api/bookings", "201"],
            ["sync", "inventory", "ok"],
            ["auth", "token refreshed", "ok"],
            ["job", "send-invoices", "done"],
            ["deploy", "main → production", "live"],
            ["GET", "/api/orders", "200"],
            ["POST", "/api/bookings", "201"],
            ["sync", "inventory", "ok"],
            ["auth", "token refreshed", "ok"],
          ].map(([a, b, c], i) => (
            <li key={i}>
              <b>{a}</b> {b} <em>{c}</em>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

/* --------------------------------------------------------------- Mobile */
function MobileVisual() {
  return (
    <div className="vm-stage">
      <div className="vm-phone vm-back">
        <div className="vm-screen">
          <span className="vm-blk" style={{ height: "30%" }} />
          <span className="vm-blk" />
          <span className="vm-blk" />
        </div>
      </div>
      <div className="vm-phone vm-front">
        <div className="vm-screen">
          <div className="vm-status">
            <span>9:41</span>
            <i />
          </div>
          <p className="vm-hello">Good morning</p>
          <div className="vm-carousel">
            <div className="vm-track">
              <span className="vm-card vm-c1" />
              <span className="vm-card vm-c2" />
              <span className="vm-card vm-c3" />
              <span className="vm-card vm-c1" />
            </div>
          </div>
          <ul className="vm-list">
            {[0, 1, 2].map((i) => (
              <li key={i} style={{ animationDelay: `${i * 0.18}s` }}>
                <i />
                <span />
                <em />
              </li>
            ))}
          </ul>
          <div className="vm-tabs">
            <i />
            <i />
            <i />
            <i />
            <b />
          </div>
          <div className="vm-toast">
            <i />
            <span>Order confirmed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Design */
function DesignVisual() {
  return (
    <div className="vd-canvas">
      <div className="vd-toolbar">
        <i className="on" />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="vd-frame">
        <span className="vd-tag">Card / Product</span>
        <div className="vd-card">
          <span className="vd-img" />
          <span className="vd-line" />
          <span className="vd-line vd-short" />
          <span className="vd-btn" />
        </div>
        <div className="vd-select">
          <i />
          <i />
          <i />
          <i />
          <span className="vd-size">320 × 200</span>
        </div>
      </div>
      <svg className="vd-pen" viewBox="0 0 300 120" preserveAspectRatio="none">
        <path d="M10 100 C 70 10, 150 130, 290 30" pathLength={1} />
        <rect x="6" y="96" width="8" height="8" />
        <rect x="286" y="26" width="8" height="8" />
      </svg>
      <div className="vd-swatches">
        <i style={{ background: "#0a1030" }} />
        <i style={{ background: "#2453e8" }} />
        <i style={{ background: "#4f7cff" }} />
        <i style={{ background: "#3cc8ff" }} />
        <i style={{ background: "#eef2ff" }} />
      </div>
      <div className="vd-type">
        <b>Aa</b>
        <span>
          Hubot Sans
          <br />
          700 · 118%
        </span>
      </div>
      <div className="vd-peer">
        <Cursor className="vd-cursor" />
        <span>AiFlovv</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- AI */
function AiVisual() {
  return (
    <div className="va-stage">
      <div className="va-doc">
        <div className="va-doc-head">
          <i />
          <span>invoice_0427.pdf</span>
        </div>
        <span className="va-line" />
        <span className="va-line va-w2" />
        <span className="va-line va-w3" />
        <span className="va-line" />
        <span className="va-line va-w2" />
        <span className="va-scan" />
      </div>
      <div className="va-fields">
        <span>vendor</span>
        <span>amount</span>
        <span>due date</span>
        <span>po match</span>
      </div>
      <div className="va-chat">
        <div className="va-msg va-user">Summarise this invoice and flag anything unusual.</div>
        <div className="va-msg va-ai">
          <span className="va-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="va-answer">
            <span className="va-line" />
            <span className="va-line va-w2" />
            <span className="va-flag">1 item to review</span>
          </span>
        </div>
        <div className="va-source">
          <i /> source · page 1
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- SaaS */
function SaasVisual() {
  return (
    <div className="vsa-app">
      <div className="vsa-side">
        <span className="vsa-logo" />
        <i className="on" />
        <i />
        <i />
        <i />
      </div>
      <div className="vsa-main">
        <div className="vsa-top">
          <span className="vsa-tenant">
            <b className="vsa-t1">Acme Co</b>
            <b className="vsa-t2">Northwind</b>
          </span>
          <span className="vsa-plan">Pro plan</span>
          <span className="vsa-seats">
            <i />
            <i />
            <i />
            <em>+</em>
          </span>
        </div>
        <div className="vsa-kpis">
          {[0, 1, 2].map((k) => (
            <div key={k} className="vsa-kpi">
              <span className="vsa-label" />
              <span className="vsa-num" />
              <svg viewBox="0 0 60 16" preserveAspectRatio="none">
                <path d="M0 13 L10 11 L20 12 L30 7 L40 8 L50 4 L60 2" pathLength={1} />
              </svg>
            </div>
          ))}
        </div>
        <div className="vsa-chart">
          {[38, 52, 44, 66, 58, 74, 70, 88, 80, 96].map((h, k) => (
            <i key={k} style={{ height: `${h}%`, animationDelay: `${k * 0.08}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Commerce */
function CommerceVisual() {
  return (
    <div className="vc-store">
      <div className="vc-bar">
        <span className="vc-brand" />
        <span className="vc-search" />
        <span className="vc-cart">
          <i />
          <b>
            <em className="vc-c0">0</em>
            <em className="vc-c1">1</em>
          </b>
        </span>
      </div>
      <div className="vc-grid">
        {[0, 1, 2].map((k) => (
          <div key={k} className={`vc-card vc-p${k}`}>
            <span className="vc-img" />
            <span className="vc-name" />
            <span className="vc-price" />
            <span className="vc-add">Add</span>
          </div>
        ))}
      </div>
      <div className="vc-drawer">
        <p>Your cart</p>
        <div className="vc-item">
          <i />
          <span />
        </div>
        <span className="vc-checkout">Checkout</span>
      </div>
      <div className="vc-toast">Order placed</div>
      <Cursor className="vc-cursor" />
    </div>
  );
}

/* --------------------------------------------------------------- Cloud */
function CloudVisual() {
  const stages = ["build", "test", "scan", "deploy"];
  return (
    <div className="vcl-stage">
      <div className="vcl-pipe">
        {stages.map((st, k) => (
          <div key={st} className="vcl-step" style={{ animationDelay: `${k * 0.9}s` }}>
            <i style={{ animationDelay: `${k * 0.9}s` }} />
            <span>{st}</span>
          </div>
        ))}
      </div>
      <svg className="vcl-net" viewBox="0 0 300 130">
        <path className="vcl-wire" d="M20 65 L110 65" />
        <path className="vcl-wire" d="M150 65 C 190 65, 190 22, 230 22" />
        <path className="vcl-wire" d="M150 65 L230 65" />
        <path className="vcl-wire" d="M150 65 C 190 65, 190 108, 230 108" />
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x="-2.5" y="-2.5" width="5" height="5" fill={k % 2 ? "#3cc8ff" : "#4f7cff"}>
            <animateMotion
              dur="2.2s"
              begin={`${k * 0.55}s`}
              repeatCount="indefinite"
              path={["M20 65 L110 65 L150 65 C 190 65, 190 22, 230 22", "M20 65 L150 65 L230 65", "M20 65 L150 65 C 190 65, 190 108, 230 108", "M20 65 L150 65 L230 65"][k]}
            />
          </rect>
        ))}
        <g className="vcl-node">
          <rect x="4" y="53" width="32" height="24" />
          <text x="20" y="68.5" textAnchor="middle">users</text>
        </g>
        <g className="vcl-node">
          <rect x="110" y="53" width="40" height="24" />
          <text x="130" y="68.5" textAnchor="middle">lb</text>
        </g>
        {[22, 65, 108].map((y, k) => (
          <g key={y} className="vcl-node vcl-pod" style={{ animationDelay: `${k * 0.4}s` }}>
            <rect x="230" y={y - 12} width="58" height="24" />
            <circle cx="241" cy={y} r="2.6" />
            <text x="266" y={y + 3.5} textAnchor="middle">
              app-{k + 1}
            </text>
          </g>
        ))}
      </svg>
      <div className="vcl-log">
        <span>
          <b>✓</b> image built · sha 9f3c2a1
        </span>
        <span>
          <b>✓</b> 3/3 healthy · rolling deploy complete
        </span>
      </div>
    </div>
  );
}
