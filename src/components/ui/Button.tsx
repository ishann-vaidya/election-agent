import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = ['button', `button-${variant}`, fullWidth ? 'button-full' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
