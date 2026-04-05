import Link from "next/link";
import { LockedSection } from "@/components/locked-section";
import { SectionCard } from "@/components/section-card";

const lockedCategories = [
  {
    title: "Romance",
    description: "Reveal attachment patterns, timing, and the style of emotional reciprocity.",
  },
  {
    title: "Career",
    description: "Frame role fit, work rhythm, and pressure-response tendencies in structured terms.",
  },
  {
    title: "Wealth",
    description: "Translate chart balance into money habits and value creation themes without financial advice.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Traditional aesthetics, modern reading</span>
            <h1>AI-assisted saju for people who pay for clarity.</h1>
            <p className="hero-copy">
              Dongyangui Sinbiroun Unmyeong combines rule-based saju structure with narrative AI
              interpretation. Users preview one paragraph for free, then unlock category-based
              reports for romance, compatibility, career, and wealth.
            </p>
            <div className="cta-row">
              <Link className="button-link" href="/input">
                Start the preview
              </Link>
              <Link className="button-link secondary" href="/checkout">
                View payment paths
              </Link>
            </div>
          </div>

          <aside className="stat-strip">
            <div className="kpi">
              <strong>1 paragraph</strong>
              <span className="muted">Free preview before payment</span>
            </div>
            <div className="mini-divider" />
            <div className="kpi">
              <strong>7 categories</strong>
              <span className="muted">Personality, romance, compatibility, career, wealth, health caution, major cycles</span>
            </div>
            <div className="mini-divider" />
            <div className="kpi">
              <strong>3 locales</strong>
              <span className="muted">Korean, English, Chinese planned from the start</span>
            </div>
          </aside>
        </div>
      </section>

      <div className="section-grid">
        <SectionCard
          eyebrow="Flow"
          title="The product loop is intentionally narrow."
          description="Home, input, preview, checkout, result, and history are the core screens. Everything else supports those screens."
        >
          <div className="tag-row">
            <span className="tag">Social login</span>
            <span className="tag">Simple payment</span>
            <span className="tag">Saved history</span>
            <span className="tag">1:1 inquiry board</span>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Rules"
          title="The calculation layer stays deterministic."
          description="Saju derivation belongs to the rule engine. LLM usage is limited to narration and must exclude medical, legal, and investment advice."
          accent
        >
          <div className="tag-row">
            <span className="tag">Llama primary</span>
            <span className="tag">OpenAI fallback</span>
            <span className="tag">Masked logs</span>
          </div>
        </SectionCard>
      </div>

      <section className="status-panel">
        <span className="eyebrow">Locked after preview</span>
        <h2>Premium categories</h2>
        <p className="section-copy">
          The preview only confirms tone and trust. Everything below remains gated until one-time
          purchase or bundle access.
        </p>
        <div className="locked-grid">
          {lockedCategories.map((category) => (
            <LockedSection
              key={category.title}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </section>
    </>
  );
}

