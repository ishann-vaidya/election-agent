import type { UserProfile } from './electionPlanner';

const PROFILE_KEY = 'elected-profile';
const PROGRESS_KEY = 'elected-progress';
const CHAT_KEY = 'elected-chat-history';
const PREFERENCES_KEY = 'elected-preferences';

export type ProgressState = Record<string, boolean>;

export type LanguageCode = 'en' | 'hi' | 'mr' | 'gu' | 'bn' | 'ta' | 'te' | 'kn' | 'ml' | 'pa';

export type FontScale = 'normal' | 'large' | 'x-large';

export type PreferencesState = {
  language: LanguageCode;
  contrast: 'standard' | 'high';
  fontScale: FontScale;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const DEFAULT_PROFILE: UserProfile = {
  state: 'Maharashtra',
  electionType: 'general',
  goal: 'Register to vote',
  experience: 'first-time',
};

const DEFAULT_PREFERENCES: PreferencesState = {
  language: 'en',
  contrast: 'standard',
  fontScale: 'normal',
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadStoredProfile(): UserProfile | null {
  const profile = readJson<UserProfile | null>(PROFILE_KEY, null);

  if (!profile) {
    return null;
  }

  return {
    ...DEFAULT_PROFILE,
    ...profile,
  };
}

export function saveStoredProfile(profile: UserProfile) {
  writeJson(PROFILE_KEY, {
    ...DEFAULT_PROFILE,
    ...profile,
  });
}

export function loadStoredProgress(): ProgressState {
  return readJson<ProgressState>(PROGRESS_KEY, {});
}

export function saveStoredProgress(progress: ProgressState) {
  writeJson(PROGRESS_KEY, progress);
}

export function loadStoredChat(): ChatMessage[] {
  return readJson<ChatMessage[]>(CHAT_KEY, []);
}

export function saveStoredChat(messages: ChatMessage[]) {
  writeJson(CHAT_KEY, messages);
}

export function loadStoredPreferences(): PreferencesState {
  return {
    ...DEFAULT_PREFERENCES,
    ...readJson<Partial<PreferencesState>>(PREFERENCES_KEY, {}),
  };
}

export function saveStoredPreferences(preferences: PreferencesState) {
  writeJson(PREFERENCES_KEY, preferences);
}
