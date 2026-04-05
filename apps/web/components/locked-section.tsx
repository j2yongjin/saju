type LockedSectionProps = Readonly<{
  title: string;
  description: string;
}>;

export function LockedSection({ title, description }: LockedSectionProps) {
  return (
    <article className="locked-card">
      <span className="eyebrow">Premium</span>
      <h3>{title}</h3>
      <p className="muted">{description}</p>
      <div className="tag-row">
        <span className="tag locked">Locked until purchase</span>
      </div>
    </article>
  );
}

