type InfoCardProps = {
  index?: string;
  title: string;
  description: string;
  meta?: string;
  tone?: 'default' | 'accent' | 'dark';
};

export function InfoCard({index, title, description, meta, tone = 'default'}: InfoCardProps) {
  const className =
    tone === 'accent' ? 'tile-card tile-card-accent' : tone === 'dark' ? 'tile-card tile-card-dark' : 'info-card';

  return (
    <article className={className}>
      {index ? <p className="card-index">{index}</p> : null}
      {meta ? <p className="tile-meta">{meta}</p> : null}
      <h3 className="tile-title">{title}</h3>
      <p>{description}</p>
    </article>
  );
}

