"use client";

/**
 * Last-resort screen if the root layout itself fails. It renders its own
 * document without the site's stylesheet, so it carries its own styles.
 */
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#03050b",
          color: "#eef2ff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <title>Something went wrong — AiFlovv</title>
        <main style={{ padding: "2rem", maxWidth: "34rem" }}>
          <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, letterSpacing: 2, color: "#8691ae", textTransform: "uppercase" }}>
            AiFlovv · error
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", lineHeight: 1, margin: "1.5rem 0" }}>Something went wrong.</h1>
          <p style={{ color: "#bac3dd", lineHeight: 1.6 }}>
            Please try again. If it keeps happening, email us at{" "}
            <a href="mailto:info@aiflovv.com" style={{ color: "#3cc8ff" }}>
              info@aiflovv.com
            </a>
            .
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => retry()}
              style={{ padding: "0.9rem 1.4rem", border: 0, background: "#eef2ff", color: "#03050b", fontWeight: 600, cursor: "pointer" }}
            >
              Try again
            </button>
            {/* A full reload is the point here: the app shell itself failed. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" style={{ padding: "0.9rem 1.4rem", color: "#eef2ff", boxShadow: "inset 0 0 0 1px rgba(148,168,255,0.3)", textDecoration: "none" }}>
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
