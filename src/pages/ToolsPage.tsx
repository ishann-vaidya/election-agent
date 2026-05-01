import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export function ToolsPage() {
  return (
    <div className="page-stack">
      <Card eyebrow="Voter tools" title="Polling place and calendar tools">
        <p>
          This is where address lookup, maps, and calendar export will live.
        </p>
        <div className="tool-rows">
          <div className="tool-row">
            <Badge tone="blue">Address lookup</Badge>
            <span>Find the nearest voting location.</span>
          </div>
          <div className="tool-row">
            <Badge tone="green">Calendar</Badge>
            <span>Save important election dates.</span>
          </div>
          <div className="tool-row">
            <Badge tone="gold">Language</Badge>
            <span>Make the same tools readable in more languages.</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
