import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export function ChatPage() {
  return (
    <div className="page-stack">
      <Card eyebrow="AI guide" title="Conversation area placeholder">
        <div className="chat-thread">
          <div className="chat-bubble chat-bubble-user">
            I just moved to a new state. What should I do first?
          </div>
          <div className="chat-bubble chat-bubble-assistant">
            Start with registration, then check deadlines and polling places.
          </div>
        </div>
      </Card>

      <section className="card-grid compact">
        <Card eyebrow="Guardrails" title="Nonpartisan prompt">
          <Badge tone="gold">Safety first</Badge>
          <p>The assistant should explain, not push a political side.</p>
        </Card>
        <Card eyebrow="Experience" title="Quick replies">
          <Badge tone="blue">Chips later</Badge>
          <p>We can add suggested prompts and typing states next.</p>
        </Card>
      </section>
    </div>
  );
}
