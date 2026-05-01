import { useEffect, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { buildChecklist, buildCivicPlan, buildDeadlines, type UserProfile } from '../lib/electionPlanner';
import { loadStoredProfile, loadStoredProgress, saveStoredProgress } from '../lib/storage';

const fallbackProfile: UserProfile = {
  state: 'Maharashtra',
  goal: 'Register to vote',
  experience: 'first-time',
};

export function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile>(fallbackProfile);
  const [progress, setProgress] = useState(loadStoredProgress());

  useEffect(() => {
    setProfile(loadStoredProfile() ?? fallbackProfile);
  }, []);

  const plan = buildCivicPlan(profile);
  const checklist = buildChecklist(profile);
  const deadlines = buildDeadlines(profile);
  const completedCount = checklist.filter((item) => progress[item]).length;
  const progressPercent = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  const toggleTask = (task: string) => {
    setProgress((current) => {
      const next = { ...current, [task]: !current[task] };
      saveStoredProgress(next);
      return next;
    });
  };

  return (
    <div className="page-stack">
      <section className="hero-panel dashboard-hero">
        <div>
          <p className="eyebrow">Your guide</p>
          <h2>{plan.title}</h2>
          <p className="hero-copy">{plan.summary}</p>
        </div>
        <Badge tone="blue">{completedCount} / {checklist.length} tasks complete</Badge>
      </section>

      <section className="card-grid compact">
        <Card eyebrow="Profile" title="Personalization snapshot">
          <p><strong>State:</strong> {profile.state}</p>
          <p><strong>Goal:</strong> {profile.goal}</p>
          <p><strong>Experience:</strong> {profile.experience}</p>
        </Card>
        <Card eyebrow="Progress" title="Checklist completion">
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <p>{progressPercent}% complete based on the saved checklist state.</p>
        </Card>
      </section>

      <Card eyebrow="Action plan" title="Your next steps">
        <div className="checklist">
          {checklist.map((item) => (
            <label key={item} className="checklist-item checklist-item-interactive">
              <span className="checkmark">{progress[item] ? '✓' : ' '}</span>
              <span>{item}</span>
              <input
                type="checkbox"
                checked={Boolean(progress[item])}
                onChange={() => toggleTask(item)}
                aria-label={item}
              />
            </label>
          ))}
        </div>
      </Card>

      <section className="card-grid compact">
        <Card eyebrow="Deadlines" title="Countdown cards">
          <div className="deadline-list">
            {deadlines.map((deadline) => (
              <div key={deadline.label} className="deadline-item">
                <strong>{deadline.label}</strong>
                <span>{deadline.date}</span>
                <p>{deadline.detail}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card eyebrow="Learning" title="Helpful topics">
          <div className="inline-badges">
            {plan.learningPillars.map((pillar) => (
              <Badge key={pillar} tone="gold">{pillar}</Badge>
            ))}
          </div>
          <p>Use these topics to drive the chat guide and the learn page next.</p>
        </Card>
      </section>

      <Card eyebrow="Next step" title="Move into the AI guide or voter tools">
        <div className="hero-actions">
          <Button onClick={() => (window.location.href = '/chat')}>Open AI guide</Button>
          <Button variant="secondary" onClick={() => (window.location.href = '/tools')}>
            Open voter tools
          </Button>
        </div>
      </Card>
    </div>
  );
}
