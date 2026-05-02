import { useEffect, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  buildGoogleCalendarUrl,
  buildIcsContent,
  buildMapUrl,
  type UserProfile,
} from '../lib/electionPlanner';
import { loadStoredProfile } from '../lib/storage';
import { buildMapsEmbedUrl, lookupPollingPlaces, type PollingLookupResult } from '../lib/liveServices';

type LookupState = {
  address: string;
};

const fallbackProfile: UserProfile = {
  state: 'Maharashtra',
  electionType: 'general',
  goal: 'Register to vote',
  experience: 'first-time',
};

export function ToolsPage() {
  const [profile, setProfile] = useState<UserProfile>(fallbackProfile);
  const [lookup, setLookup] = useState<LookupState>({ address: '' });
  const [result, setResult] = useState<PollingLookupResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedProfile = loadStoredProfile();
    setProfile(savedProfile ?? fallbackProfile);
  }, []);

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
  const mapUrl = buildMapUrl(profile, lookup.address);
  const mapEmbedUrl = buildMapsEmbedUrl(lookup.address || profile.state);

  async function handleLookup() {
    setLoading(true);

    try {
      const nextResult = await lookupPollingPlaces(profile, lookup.address);
      setResult(nextResult);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void handleLookup();
  }, [profile.state]);

  return (
    <div className="page-stack">
      <section className="hero-panel tools-hero">
        <div>
          <p className="eyebrow">Local tools</p>
          <h2>Find polling booths and save reminders for your civic plan.</h2>
          <p className="hero-copy">
            This page is ready for Google Civic, Maps, and Calendar keys. Until those are added it uses fallback local data so the UI still works.
          </p>
        </div>
        <Badge tone={result?.source === 'live' ? 'green' : 'gold'}>{result?.source === 'live' ? 'Live civic data' : 'Fallback data'}</Badge>
      </section>

      <section className="card-grid compact">
        <Card eyebrow="Lookup" title="Enter an address">
          <form
            className="lookup-form"
            onSubmit={(event) => {
              event.preventDefault();
              void handleLookup();
            }}
          >
            <label className="field-group">
              <span>Street address</span>
              <input
                value={lookup.address}
                onChange={(event) => setLookup((current) => ({ ...current, address: event.target.value }))}
                placeholder="123 Main St"
              />
            </label>
            <div className="inline-badges">
              <Badge tone="blue">{profile.state}</Badge>
              <Badge tone="green">India focus</Badge>
            </div>
            <Button type="submit" fullWidth>{loading ? 'Searching...' : 'Search polling places'}</Button>
          </form>
        </Card>

        <Card eyebrow="Map" title="Polling place preview">
          <p>Open a Google Maps search link now, or use the no-key embedded preview below.</p>
          <div className="hero-actions">
            <Button href={mapUrl} target="_blank" rel="noreferrer">
              Open maps search
            </Button>
          </div>
          {mapEmbedUrl ? (
            <iframe className="map-embed" title="Google Maps embed" src={mapEmbedUrl} loading="lazy" />
          ) : (
            <p className="map-note">The map preview uses a no-key Google Maps search embed.</p>
          )}
        </Card>
      </section>

      <Card eyebrow="Polling places" title={result?.electionName ? `${result.electionName}` : 'Polling place result set'}>
        {result?.electionDay ? <p className="card-subcopy">Election day: {result.electionDay}</p> : null}
        <p className="card-subcopy">{result?.note ?? 'Search an address to load polling place data.'}</p>
        <div className="tool-rows tool-rows-grid">
          {(result?.places ?? []).map((place) => (
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
            Add Google Civic, Groq, and Firebase values in <code>.env.local</code>. Maps and translation now use built-in no-key fallbacks.
          </p>
          <Badge tone="green">Ready for keys</Badge>
        </Card>
      </section>
    </div>
  );
}
