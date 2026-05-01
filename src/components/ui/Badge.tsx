import type { ReactNode } from 'react';

type BadgeTone = 'blue' | 'gold' | 'green' | 'slate';

type BadgeProps = {
  tone?: BadgeTone;
  children: ReactNode;
};

export function Badge({ tone = 'slate', children }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
