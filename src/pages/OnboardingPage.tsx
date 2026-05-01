import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const steps = [
  {
    title: 'Choose your state',
    body: 'This decides which deadlines, rules, and election info the app should show first.',
  },
  {
    title: 'Pick your goal',
    body: 'We will tailor the path for registration, voting day prep, or learning the basics.',
  },
  {
    title: 'Tell us your experience',
    body: 'First-time voters get more guidance, while returning voters get a shorter checklist.',
  },
];

export function OnboardingPage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Next stage</p>
          <h2>Start the short setup flow that personalizes the app.</h2>
          <p className="hero-copy">
            This is the first user journey from the project plan. It will later
            save state and drive the dashboard.
          </p>
        </div>
        <Badge tone="green">3-step flow</Badge>
      </section>

      <section className="card-grid">
        {steps.map((step, index) => (
          <Card key={step.title} eyebrow={`Step ${index + 1}`} title={step.title}>
            <p>{step.body}</p>
          </Card>
        ))}
      </section>

      <Card eyebrow="Action" title="Ready to build the real quiz">
        <p>
          The next code pass can turn these placeholders into a working form and
          connect it to saved user data.
        </p>
        <Button>Begin onboarding</Button>
      </Card>
    </div>
  );
}