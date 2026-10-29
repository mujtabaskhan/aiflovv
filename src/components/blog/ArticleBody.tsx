import type { ReactNode } from "react";
import type { Block } from "@/content/posts";

const KEYWORDS = /\b(const|let|var|await|async|try|catch|return|function|import|from|export|if|else|new)\b/;

/** Minimal highlighter: comments, strings, keywords — enough for short snippets. */
function highlight(code: string) {
  const out: ReactNode[] = [];
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b[A-Za-z_]+\b)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(code))) {
    if (m.index > last) out.push(code.slice(last, m.index));
    if (m[1]) out.push(<span key={k++} className="tok-c">{m[1]}</span>);
    else if (m[2]) out.push(<span key={k++} className="tok-s">{m[2]}</span>);
    else if (m[3] && KEYWORDS.test(m[3])) out.push(<span key={k++} className="tok-k">{m[3]}</span>);
    else out.push(m[0]);
    last = re.lastIndex;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i}>
                {b.items.map((it) => {
                  const [head, ...tail] = it.split(" — ");
                  return (
                    <li key={it}>
                      {tail.length ? (
                        <>
                          <strong className="font-semibold text-ink">{head}</strong> — {tail.join(" — ")}
                        </>
                      ) : (
                        it
                      )}
                    </li>
                  );
                })}
              </ul>
            );
          case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
          case "callout":
            return (
              <aside key={i} className="callout">
                <strong>{b.title}</strong>
                <p>{b.text}</p>
              </aside>
            );
          case "code":
            return (
              <pre key={i} aria-label={`${b.lang} example`}>
                <code>{highlight(b.code)}</code>
              </pre>
            );
        }
      })}
    </div>
  );
}
