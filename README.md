# ElectED 2.0

ElectED 2.0 is a civic guidance app built with React, TypeScript, and Vite. It helps people understand voting in simple words, build a personalized voting checklist, ask a nonpartisan civic assistant questions, look up polling places, export reminders, and learn the basics with quizzes and visual explainers.

The app is designed to work even when API keys are missing. In that case it falls back to local content so the interface remains usable. Groq can power the chat assistant, Google Civic can power polling lookup, and maps and translation already have built-in no-key fallbacks.

## What is included

- A routed single-page app with a shared shell and top navigation.
- Local persistence for the user profile, checklist progress, chat history, accessibility preferences, and the learn-page quiz state.
- A Maharashtra-first civic flow that still supports other Indian states in the onboarding and planner logic.
- Fallback data so the app still demonstrates the full product when no external keys are configured.
- Production build and lint scripts for deployment checks.

## App tabs

### Home

The home page gives a quick overview of what the product does. It explains the civic guidance flow, highlights the main capabilities, and links into onboarding or the learning hub.

### Onboarding

The onboarding flow collects the user’s state, election type, goal, and experience level. That profile drives the dashboard checklist, chat responses, and tools page content. The available options are:

- States: Maharashtra, Karnataka, Delhi, Tamil Nadu, Gujarat
- Election types: general, state assembly, local body
- Goals: register to vote, vote on election day, learn the basics, request absentee voting
- Experience levels: first-time, returning, absentee / mail voter

### Dashboard

The dashboard shows the saved civic plan generated from the onboarding profile. It includes:

- The personalized plan title and summary.
- A checklist that can be marked complete and is saved locally.
- Deadline cards for important voting dates.
- Learning pillars that summarize the main topics to study.
- Quick links to the AI Guide and Voter Tools.

### AI Guide

The chat page is a nonpartisan assistant for civic logistics. It can answer questions about registration, deadlines, polling places, absentee voting, and voting basics. If a Groq key is not configured, the app uses a local reply generator so the assistant still works.

### Voter Tools

The tools page is for practical action. It lets the user:

- Enter an address and look up polling place information.
- Open a Google Maps search for the entered location or the selected state.
- View a no-key embedded map preview.
- Download an `.ics` calendar reminder for election day.
- Open a Google Calendar template link.

If the Google Civic API key is not present, the page shows fallback polling places and mock civic data. Maps also work without keys.

### Learn

The learning hub explains the voting journey in a structured way. It includes:

- A four-step timeline for checking details, finding the booth, carrying documents, and voting.
- A visual explainer showing the flow from voter roll to result.
- A quiz with saved session state.
- A completion state that keeps quiz progress for the current browser session.

### Settings

The settings page controls accessibility and language preferences. It supports:

- Interface language selection for English, Hindi, Marathi, Gujarati, Bengali, Tamil, Telugu, Kannada, Malayalam, and Punjabi.
- Contrast modes for standard or high contrast.
- Font scale options for normal, large, or extra-large text.
- A local translation preview that updates when the language changes.

## How to run locally

Requirements:

- Node.js 18 or newer
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the lint check:

```bash
npm run lint
```

## Environment variables

Create a `.env.local` file in the project root and add any values you want to use. The app reads these variables:

- `VITE_GROQ_API_KEY`
- `VITE_GROQ_MODEL`
- `VITE_GOOGLE_CIVIC_API_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Behavior with no keys:

- Chat falls back to local civic replies.
- Polling lookup falls back to mock polling places.
- Maps still work with search and embed fallbacks.
- Translation stays local and does not require an API key.

## Local storage and session data

The app stores a few things in the browser so the experience persists between visits:

- User profile: saved onboarding choices.
- Progress: dashboard checklist completion state.
- Chat history: AI Guide conversation messages.
- Preferences: language, contrast, and font size.
- Learn quiz state: saved in session storage for the current browser session.

## Project structure

- `src/App.tsx` - application routes
- `src/components/` - shared layout and UI pieces
- `src/lib/` - civic planner helpers, storage, live-service wrappers, and environment config
- `src/pages/` - the routed screens
- `src/styles.css` - the app styling
- `src/navigation.ts` - top navigation items
- `documentation/elected_project_plan.html` - project plan reference

## Stack

- React 18
- TypeScript
- Vite
- React Router
- ESLint

## Notes

- The current content is still Maharashtra-focused in its default examples, but the planner and onboarding support more state-aware behavior.
- Live Google and Firebase integrations are documented and ready to wire in once the relevant keys are provided.
- The project has been checked with `npm run build` and `npm run lint` before deployment.
