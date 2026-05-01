import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">What ElectED does</p>
          <h2>Help people understand voting, find local guidance, and stay ready.</h2>
          <p className="hero-copy">
            ElectED explains the voting process, helps users understand their options, and points them to practical actions like finding a booth or saving reminders.
          </p>
        </div>
        <div className="hero-actions">
          <Button href="/onboarding">Start onboarding</Button>
          <Button href="/learn" variant="secondary">Explore the learning hub</Button>
        </div>
      </section>

      <section className="card-grid">
        <Card eyebrow="Personal guidance" title="Tailored for the user">
          <p>
            The app starts with a simple setup flow and uses that to shape the dashboard, chat, and tools pages.
          </p>
        </Card>
        <Card eyebrow="Local tools" title="Find and save the important steps">
          <p>
            Users can look up polling booth ideas, open map links, and export reminders into a calendar file.
          </p>
        </Card>
        <Card eyebrow="Learning hub" title="Understand the voting process">
          <p>
            The learning section covers a simple timeline, glossary, quiz, and visual explanation of the process.
          </p>
        </Card>
        <Card eyebrow="India focus" title="Maharashtra mock data">
          <p>
            The current mock flow is scoped to Maharashtra so the content stays consistent while the live integrations are built later.
          </p>
        </Card>
        <Card eyebrow="What comes next" title="Connect live services later">
          <p>
            Firebase and Google APIs can be added after the core experience is stable.
          </p>
        </Card>
        <Card eyebrow="Ready to explore" title="Use the site">
          <div className="inline-badges">
            <Badge tone="blue">Home</Badge>
            <Badge tone="green">Onboarding</Badge>
            <Badge tone="gold">Learn</Badge>
            <Badge tone="blue">Tools</Badge>
          </div>
        </Card>
      </section>
    </div>
  );
}
