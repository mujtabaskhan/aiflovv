import { SERVICES, SERVICE_GROUPS } from "@/content/services";
import { TLink } from "@/components/shell/TLink";
import { PixelArrow, ServiceGlyph } from "@/components/ui/Pixels";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";

/**
 * Every service as a card: its live visual on top, what it is underneath.
 * Grouped by what the work is for.
 */
export function ServiceIndex() {
  return (
    <div className="si">
      {SERVICE_GROUPS.map((g) => {
        const items = SERVICES.filter((s) => s.group === g.id);
        return (
          <div key={g.id} className="si-group" data-count={items.length}>
            <div className="si-head" data-anim="up">
              <p className="t-label label-px text-ink">{g.label}</p>
              <p className="text-sm text-muted">{g.note}</p>
            </div>
            <ul className="si-grid" data-anim="stagger" data-stagger="0.08">
              {items.map((s) => (
                <li key={s.slug}>
                  <TLink href={`/services/${s.slug}`} className="si-card group" data-cursor="Explore">
                    <ServiceVisual slug={s.slug} className="si-vis" />
                    <div className="si-body">
                      <span className="si-glyph">
                        <ServiceGlyph slug={s.slug} size={16} />
                      </span>
                      <h2 className="si-title">{s.title}</h2>
                      <p className="text-soft">{s.tagline}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {s.capabilities.slice(0, 3).map((c) => (
                          <li key={c.title} className="chip">
                            {c.title}
                          </li>
                        ))}
                      </ul>
                      <span className="si-more t-label">
                        Explore {s.short.toLowerCase()} <PixelArrow size={10} />
                      </span>
                    </div>
                  </TLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
