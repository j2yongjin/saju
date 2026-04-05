type SectionCardProps = Readonly<{
  title: string;
  eyebrow?: string;
  description?: string;
  accent?: boolean;
  children?: React.ReactNode;
}>;

export function SectionCard({
  title,
  eyebrow,
  description,
  accent = false,
  children,
}: SectionCardProps) {
  return (
    <section className={accent ? "section-card accent" : "section-card"}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {description ? <p className="section-copy">{description}</p> : null}
      {children}
    </section>
  );
}

