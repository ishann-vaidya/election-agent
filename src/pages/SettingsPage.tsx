import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export function SettingsPage() {
  return (
    <div className="page-stack">
      <Card eyebrow="Settings" title="Accessibility and language">
        <div className="setting-list">
          <div className="setting-item">
            <div>
              <strong>Language</strong>
              <p>Choose the language for the interface.</p>
            </div>
            <Badge tone="blue">English</Badge>
          </div>
          <div className="setting-item">
            <div>
              <strong>Contrast</strong>
              <p>Prepare a stronger mode for easier reading.</p>
            </div>
            <Badge tone="green">Standard</Badge>
          </div>
          <div className="setting-item">
            <div>
              <strong>Saved progress</strong>
              <p>Keep quizzes and checklist items between visits.</p>
            </div>
            <Badge tone="gold">On</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
