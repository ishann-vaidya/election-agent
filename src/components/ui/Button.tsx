import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type SharedButtonProps = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
};

type ButtonProps =
  | (SharedButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (SharedButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = ['button', `button-${variant}`, fullWidth ? 'button-full' : '', className]
    .filter(Boolean)
    .join(' ');

  if (href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  const buttonType = buttonProps.type ?? 'button';

  return (
    <button type={buttonType} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
