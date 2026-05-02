import { useEffect, useMemo, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { translateSnippet } from '../lib/liveServices';
import { loadStoredPreferences, saveStoredPreferences, type LanguageCode, type PreferencesState } from '../lib/storage';

const languageLabels: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  gu: 'Gujarati',
  bn: 'Bengali',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
  pa: 'Punjabi',
};

export function SettingsPage() {
  const [preferences, setPreferences] = useState<PreferencesState>(() => loadStoredPreferences());
  const [preview, setPreview] = useState('ElectED helps people understand voting, find local guidance, and stay ready.');

  useEffect(() => {
    saveStoredPreferences(preferences);

    const root = document.documentElement;
    root.dataset.contrast = preferences.contrast;
    root.dataset.fontScale = preferences.fontScale;
    root.lang = preferences.language;
  }, [preferences]);

  useEffect(() => {
    let active = true;

    void translateSnippet('ElectED helps people understand voting, find local guidance, and stay ready.', preferences.language).then((result) => {
      if (!active) {
        return;
      }

      setPreview(result.text);
    });

    return () => {
      active = false;
    };
  }, [preferences.language]);

  const languageName = useMemo(() => languageLabels[preferences.language], [preferences.language]);

  return (
    <div className="page-stack">
      <Card eyebrow="Settings" title="Accessibility and language">
        <div className="setting-list">
          <div className="setting-item setting-item-stack">
            <div>
              <strong>Language</strong>
              <p>Choose the language for the interface. Translation is handled locally so it works without an API key.</p>
            </div>
            <select value={preferences.language} onChange={(event) => setPreferences((current) => ({ ...current, language: event.target.value as LanguageCode }))}>
              {Object.entries(languageLabels).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="setting-item">
            <div>
              <strong>Translation preview</strong>
              <p>This preview shows what the selected language can look like in the product.</p>
            </div>
            <Badge tone="blue">Local translation</Badge>
          </div>
          <div className="setting-preview">{preview}</div>
          <div className="setting-item setting-item-stack">
            <div>
              <strong>Contrast</strong>
              <p>Pick the accessibility contrast level for the interface.</p>
            </div>
            <select value={preferences.contrast} onChange={(event) => setPreferences((current) => ({ ...current, contrast: event.target.value as PreferencesState['contrast'] }))}>
              <option value="standard">Standard</option>
              <option value="high">High contrast</option>
            </select>
          </div>
          <div className="setting-item setting-item-stack">
            <div>
              <strong>Font size</strong>
              <p>Increase text size when you want a more readable layout.</p>
            </div>
            <select value={preferences.fontScale} onChange={(event) => setPreferences((current) => ({ ...current, fontScale: event.target.value as PreferencesState['fontScale'] }))}>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
              <option value="x-large">Extra large</option>
            </select>
          </div>
          <div className="setting-item">
            <div>
              <strong>Saved local data</strong>
              <p>Keep your profile, checklist items, chat history, and accessibility preferences between visits.</p>
            </div>
            <Badge tone="gold">On</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
