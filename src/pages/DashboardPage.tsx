import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

const checklist = [
  'Pick a state and election type',
  'Show the right deadlines',
  'Save progress in Firestore',
  'Guide the user to the next step',
];

export function DashboardPage() {
  return (
    <div className="page-stack">
      <Card eyebrow="Dashboard" title="Personalized checklist placeholder">
        <p>
          This will become the user-specific home base after onboarding is in
          place.
        </p>
        <div className="checklist">
          {checklist.map((item) => (
            <div key={item} className="checklist-item">
              <span className="checkmark">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <section className="card-grid compact">
        <Card eyebrow="Deadlines" title="Countdown cards">
          <Badge tone="green">Registration</Badge>
          <p>Shows the important dates for the user’s state.</p>
        </Card>
        <Card eyebrow="Progress" title="Saved state">
          <Badge tone="blue">Firestore</Badge>
          <p>Tracks what the user has already done.</p>
        </Card>
      </section>
    </div>
  );
}
