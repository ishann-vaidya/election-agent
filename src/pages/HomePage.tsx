import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Day 1 foundation</p>
          <h2>Set the project up before any feature work starts.</h2>
          <p className="hero-copy">
            This screen gives the app a clear starting point while the deeper
            civic features are built over the next days.
          </p>
        </div>
        <div className="hero-actions">
          <Button>Start the journey</Button>
          <Button variant="secondary">See the plan</Button>
        </div>
      </section>

      <section className="card-grid">
        <Card eyebrow="What we built" title="The app shell is ready">
          <p>
            Routes, layout, shared UI pieces, and a responsive frame now exist.
          </p>
        </Card>
        <Card eyebrow="Next step" title="Connect the first real data">
          <p>
            After this, we can plug in onboarding state, Firestore, and the AI
            guide.
          </p>
        </Card>
        <Card eyebrow="Current status" title="Safe to extend">
          <div className="inline-badges">
            <Badge tone="blue">Router</Badge>
            <Badge tone="green">Layout</Badge>
            <Badge tone="gold">Design tokens</Badge>
          </div>
        </Card>
      </section>
    </div>
  );
}
