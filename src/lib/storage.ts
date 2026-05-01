import type { UserProfile } from './electionPlanner';

const PROFILE_KEY = 'elected-profile';
const PROGRESS_KEY = 'elected-progress';
const CHAT_KEY = 'elected-chat-history';

export type ProgressState = Record<string, boolean>;

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
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
  return readJson<UserProfile | null>(PROFILE_KEY, null);
}

export function saveStoredProfile(profile: UserProfile) {
  writeJson(PROFILE_KEY, profile);
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
