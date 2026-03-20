import {ButtonLink} from '@/components/button-link';

type CtaStripProps = {
  label: string;
  title: string;
  description: string;
  primary: {label: string; href: string};
  secondary?: {label: string; href: string};
};

export function CtaStrip({label, title, description, primary, secondary}: CtaStripProps) {
  return (
    <div className="cta-banner">
      <div>
        <p className="meta-kicker">{label}</p>
        <h2>{title}</h2>
      </div>
      <div className="page-copy">
        <p>{description}</p>
        <div className="button-row">
          <ButtonLink href={primary.href} variant="primary">
            {primary.label}
          </ButtonLink>
          {secondary ? (
            <ButtonLink href={secondary.href} variant="dark">
              {secondary.label}
            </ButtonLink>
          ) : null}
        </div>
      </div>
    </div>
  );
}

