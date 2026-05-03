import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  ELECTION_TYPE_OPTIONS,
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  STATE_OPTIONS,
  type ElectionType,
  type ExperienceLevel,
  type UserProfile,
} from '../lib/electionPlanner';
import { loadStoredProfile, saveStoredProfile } from '../lib/storage';

const initialProfile: UserProfile = loadStoredProfile() ?? {
  state: 'Maharashtra',
  electionType: 'general',
  goal: 'Register to vote',
  experience: 'first-time',
};

export function OnboardingPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveStoredProfile(profile);
    navigate('/dashboard');
  };

  return (
    <div className="page-stack">
      <section className="hero-panel onboarding-hero">
        <div>
          <p className="eyebrow">Get started</p>
          <h2>Set up your voter guide in a few quick steps.</h2>
          <p className="hero-copy">
            Choose your state, election type, and experience so the dashboard, chat, and tools can adapt to you.
          </p>
        </div>
        <Badge tone="green">Personalized civic flow</Badge>
      </section>

      <form className="onboarding-layout" onSubmit={handleSubmit}>
        <Card eyebrow="Location" title="Choose your state">
          <p>Pick the state you want the guide to use. The live data layer will use this selection when keys are added.</p>
          <label className="field-group">
            <span>State</span>
            <select
              value={profile.state}
              onChange={(event) => setProfile((current) => ({ ...current, state: event.target.value }))}
            >
              {STATE_OPTIONS.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <div className="inline-badges">
            <Badge tone="blue">India focus</Badge>
            <Badge tone="gold">State-specific guidance</Badge>
          </div>
        </Card>

        <Card eyebrow="Step 1" title="Pick your goal">
          <div className="choice-grid">
            {GOAL_OPTIONS.map((goal) => (
              <label key={goal} className={`choice-chip ${profile.goal === goal ? 'choice-chip-active' : ''}`}>
                <input
                  type="radio"
                  name="goal"
                  value={goal}
                  checked={profile.goal === goal}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, goal: event.target.value }))
                  }
                />
                <span>{goal}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card eyebrow="Step 2" title="Pick the election type">
          <div className="choice-grid">
            {ELECTION_TYPE_OPTIONS.map((item) => (
              <label key={item.value} className={`choice-chip ${profile.electionType === item.value ? 'choice-chip-active' : ''}`}>
                <input
                  type="radio"
                  name="electionType"
                  value={item.value}
                  checked={profile.electionType === item.value}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, electionType: event.target.value as ElectionType }))
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card eyebrow="Step 3" title="Tell us your experience">
          <div className="choice-grid">
            {EXPERIENCE_OPTIONS.map((item) => (
              <label key={item.value} className={`choice-chip ${profile.experience === item.value ? 'choice-chip-active' : ''}`}>
                <input
                  type="radio"
                  name="experience"
                  value={item.value}
                  checked={profile.experience === item.value}
                  onChange={(event) =>
                    setProfile((current) => ({
                      ...current,
                      experience: event.target.value as ExperienceLevel,
                    }))
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card eyebrow="Preview" title="What the app will remember">
          <div className="profile-preview">
            <div>
              <strong>{profile.state}</strong>
              <p>State-specific deadlines and booth guidance.</p>
            </div>
            <div>
              <strong>{ELECTION_TYPE_OPTIONS.find((item) => item.value === profile.electionType)?.label}</strong>
              <p>Shapes the checklist and guide context.</p>
            </div>
            <div>
              <strong>{profile.goal}</strong>
              <p>Shapes the dashboard checklist and prompts.</p>
            </div>
            <div>
              <strong>{EXPERIENCE_OPTIONS.find((item) => item.value === profile.experience)?.label}</strong>
              <p>Adjusts the amount of guidance shown.</p>
            </div>
          </div>
          <div className="hero-actions">
            <Button type="submit">Save and continue</Button>
            <Button variant="secondary" type="button" onClick={() => navigate('/learn')}>
              Explore the learning hub
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}