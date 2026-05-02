const env = import.meta.env;

function hasValue(value: string | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeEnvValue(value: string | undefined): string {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();

  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

export const appConfig = {
  groqApiKey: normalizeEnvValue(env.VITE_GROQ_API_KEY),
  groqModel: normalizeEnvValue(env.VITE_GROQ_MODEL) || 'llama-3.1-70b-versatile',
  googleCivicApiKey: normalizeEnvValue(env.VITE_GOOGLE_CIVIC_API_KEY),
  firebaseApiKey: normalizeEnvValue(env.VITE_FIREBASE_API_KEY),
  firebaseAuthDomain: normalizeEnvValue(env.VITE_FIREBASE_AUTH_DOMAIN),
  firebaseProjectId: normalizeEnvValue(env.VITE_FIREBASE_PROJECT_ID),
  firebaseStorageBucket: normalizeEnvValue(env.VITE_FIREBASE_STORAGE_BUCKET),
  firebaseMessagingSenderId: normalizeEnvValue(env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  firebaseAppId: normalizeEnvValue(env.VITE_FIREBASE_APP_ID),
};

export const hasGroqKey = () => hasValue(appConfig.groqApiKey);
export const hasCivicKey = () => hasValue(appConfig.googleCivicApiKey);
