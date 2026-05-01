import type { ReactNode } from 'react';

type CardProps = {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
};

export function Card({ title, eyebrow, children }: CardProps) {
  return (
    <section className="card">
      {eyebrow ? <p className="card-eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="card-title">{title}</h2> : null}
      <div className="card-body">{children}</div>
    </section>
  );
}
