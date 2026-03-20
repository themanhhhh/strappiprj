import {SectionHeading} from '@/components/section-heading';

type SectionIntroProps = {
  index: string;
  title: string;
  description?: string;
};

export function SectionIntro({index, title, description}: SectionIntroProps) {
  return (
    <div className="section-intro">
      <SectionHeading index={index} title={title} />
      {description ? <p>{description}</p> : null}
    </div>
  );
}

