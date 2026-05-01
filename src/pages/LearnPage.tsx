import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

const sections = [
  'Election timeline',
  'Voting basics',
  'Visual explainers',
  'Glossary and quiz',
];

export function LearnPage() {
  return (
    <div className="page-stack">
      <Card eyebrow="Education hub" title="Learning modules placeholder">
        <div className="section-pill-row">
          {sections.map((section) => (
            <Badge key={section}>{section}</Badge>
          ))}
        </div>
        <p>
          These sections will become the guided learning area for the app.
        </p>
      </Card>
    </div>
  );
}
