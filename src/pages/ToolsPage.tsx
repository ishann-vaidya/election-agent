import { useEffect, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  buildGoogleCalendarUrl,
  buildIcsContent,
  buildMapUrl,
  buildPollingPlaces,
  STATE_OPTIONS,
  type UserProfile,
} from '../lib/electionPlanner';
import { loadStoredProfile } from '../lib/storage';

type LookupState = {
  address: string;
  state: string;
};

export function ToolsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lookup, setLookup] = useState<LookupState>({
    address: '',
    state: 'California',
  });

  useEffect(() => {
    const savedProfile = loadStoredProfile();
    setProfile(savedProfile);
    if (savedProfile) {
      setLookup({ address: '', state: savedProfile.state });
    }
  }, []);

  const activeProfile: UserProfile = profile ?? {
    state: lookup.state,
    goal: 'Register to vote',
    experience: 'first-time',
  };

  const places = buildPollingPlaces(activeProfile, lookup.address);
  const calendarTarget = buildGoogleCalendarUrl({
    label: 'Election day reminder',
    date: '2026-11-03',
    detail: 'Keep the key voting date visible in your calendar.',
  });
  const calendarDataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(
    buildIcsContent({
      label: 'Election day reminder',
      date: '2026-11-03',
      detail: 'Keep the key voting date visible in your calendar.',
    }),
  )}`;
  const mapUrl = buildMapUrl(activeProfile, lookup.address);

  return (
    <div className="page-stack">
      <section className="hero-panel tools-hero">
        <div>
          <p className="eyebrow">Day 3</p>
          <h2>Google Civic, Maps, and Calendar are scaffolded around local civic data.</h2>
          <p className="hero-copy">
            This page works without API keys for now by showing mock polling places, a map link, and calendar export actions. Live Google APIs can be wired in later.
          </p>
        </div>
        <Badge tone="gold">API keys optional for live data</Badge>
      </section>

      <section className="card-grid compact">
        <Card eyebrow="Lookup" title="Enter an address">
          <form className="lookup-form" onSubmit={(event) => event.preventDefault()}>
            <label className="field-group">
              <span>State</span>
              <select
                value={lookup.state}
                onChange={(event) => setLookup((current) => ({ ...current, state: event.target.value }))}
              >
                {STATE_OPTIONS.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-group">
              <span>Street address</span>
              <input
                value={lookup.address}
                onChange={(event) => setLookup((current) => ({ ...current, address: event.target.value }))}
                placeholder="123 Main St"
              />
            </label>
          </form>
        </Card>

        <Card eyebrow="Map" title="Polling place preview">
          <p>Open a Google Maps search link now, or wire the Maps JS API later for an embedded map.</p>
          <div className="hero-actions">
            <Button href={mapUrl} target="_blank" rel="noreferrer">
              Open maps search
            </Button>
          </div>
        </Card>
      </section>

      <Card eyebrow="Polling places" title="Mock civic data result set">
        <div className="tool-rows tool-rows-grid">
          {places.map((place) => (
            <div key={place.name} className="tool-row tool-row-card">
              <div>
                <strong>{place.name}</strong>
                <span>{place.address}</span>
              </div>
              <Badge tone="blue">{place.distance}</Badge>
              <p>{place.hours}</p>
            </div>
          ))}
        </div>
      </Card>

      <section className="card-grid compact">
        <Card eyebrow="Calendar" title="Export deadlines">
          <p>Download an .ics file or use the Google Calendar template link.</p>
          <div className="hero-actions">
            <Button href={calendarDataUrl} download="elected-election-day.ics">
              Download .ics
            </Button>
            <Button variant="secondary" href={calendarTarget} target="_blank" rel="noreferrer">
              Add to Google Calendar
            </Button>
          </div>
        </Card>
        <Card eyebrow="API note" title="What still needs keys">
          <p>
            Live Google Civic Information API, Maps embed, Calendar auth, and Translate calls will need your credentials.
          </p>
          <Badge tone="green">Ready for future keys</Badge>
        </Card>
      </section>
    </div>
  );
}
