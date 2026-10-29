import { SectionLabel } from "@/components/ui/Section";

const PRINCIPLES = [
  { title: "Strategy", body: "Every product starts with clarity — the problem, the opportunity and the business goal." },
  { title: "Design", body: "Experiences designed around people: usable, clear and purposeful." },
  { title: "Engineering", body: "Clean architecture, performance, security and scale, built in from day one." },
  { title: "Partnership", body: "An extension of your team, focused on outcomes beyond delivery." },
];

export function Manifesto() {
  return (
    <section className="section">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-9 lg:col-start-4">
          <h2 className="manifesto" data-anim="words">
            We turn ambitious ideas into <span className="text-grad">intelligent digital products</span>, powerful brands,
            and technology built for measurable growth.
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:max-w-4xl" data-anim="stagger">
            <p className="text-soft">
              From strategy to launch, we combine design, software development and technology to create digital
              experiences that perform.
            </p>
            <p className="text-soft">
              We work with startups and established companies to solve complex problems, unlock opportunities and
              build for what comes next.
            </p>
          </div>
        </div>
      </div>

      <div className="shell mt-20 lg:mt-28">
        <ol className="principles" data-anim="stagger" data-stagger="0.1">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="spot">
              <span className="t-label text-cyan">0{i + 1}</span>
              <h3 className="t-h3 mt-10">{p.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
