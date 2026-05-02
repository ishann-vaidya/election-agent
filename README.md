# ElectED 2.0

ElectED 2.0 is a civic guidance app built with React, TypeScript, and Vite. It helps people understand voting in simple words, build a personalized voting checklist, ask a nonpartisan civic assistant questions, look up polling places, export reminders, and learn the basics with quizzes and visual explainers.

The project is designed to work even when API keys are missing. In that case it uses local fallback data so the UI still works. Chat and polling lookup can use live Google services when you add keys, while maps and translation now use built-in no-key fallbacks.

## What the app does

- Onboarding: collects the user’s state, election type, goal, and experience level.
- Dashboard: shows a saved civic plan, checklist, and important deadlines.
- AI Guide: chats with the user and stays nonpartisan.
- Voter Tools: looks up polling places, opens map links, and exports calendar reminders.
- Learn: includes a timeline, quiz, glossary, and simple visual explainers.
- Settings: lets the user change language, contrast, and text size.

## Requirements

- Node.js 18 or newer
- npm

## Run the project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## API keys and environment file

Create a file named `.env.local` in the project root and add the values from `.env.example`.

The app reads these variables:

- `VITE_GEMINI_API_KEY`
- `VITE_GEMINI_MODEL`
- `VITE_GOOGLE_CIVIC_API_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

If you do not add keys, the app will keep using local fallback content. Maps and translation do not require extra keys.

## Project structure

- `src/pages/` - the main screens
- `src/lib/` - civic helpers, storage, and live-service wrappers
- `src/components/` - shared UI pieces
- `src/styles.css` - the app styling
- `.env.example` - sample environment variables

## Notes

- The current app is scoped to a Maharashtra-focused mock flow, but the onboarding and helpers now support more state-aware behavior.
- Live Google and Firebase integrations are ready to be wired in once you add the keys.
