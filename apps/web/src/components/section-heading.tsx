type SectionHeadingProps = {
  index: string;
  title: string;
};

export function SectionHeading({index, title}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span>{index}</span>
      <h2>{title}</h2>
    </div>
  );
}

