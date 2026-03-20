import Link from 'next/link';
import {ComponentProps, ReactNode} from 'react';

type ButtonLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = 'secondary',
  className,
  ...rest
}: ButtonLinkProps) {
  const classes = ['button', `button-${variant}`, className].filter(Boolean).join(' ');

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
