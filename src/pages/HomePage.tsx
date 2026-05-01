import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Current status</p>
          <h2>The civic app now has onboarding, dashboard, chat, and tools flows.</h2>
          <p className="hero-copy">
            The Day 1 shell is still intact, and the next two days now have real
            local interactions instead of placeholders.
          </p>
        </div>
        <Badge tone="green">Day 2 + Day 3 built</Badge>
      </section>

      <section className="card-grid">
        <Card eyebrow="What we built" title="The app shell is ready">
          <p>
            Routes, layout, shared UI pieces, and a responsive frame now exist.
          </p>
        </Card>
        <Card eyebrow="Next step" title="Connect live Google and Firebase services">
          <p>
            After this, the app can swap the mock civic data for live APIs and
            Firestore persistence.
          </p>
        </Card>
        <Card eyebrow="Current status" title="Safe to extend">
          <div className="inline-badges">
            <Badge tone="blue">Router</Badge>
            <Badge tone="green">Layout</Badge>
            <Badge tone="gold">Onboarding</Badge>
            <Badge tone="blue">Chat memory</Badge>
          </div>
        </Card>
      </section>
    </div>
  );
}
