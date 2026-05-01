export type ExperienceLevel = 'first-time' | 'returning' | 'absentee';

export type UserProfile = {
  state: string;
  goal: string;
  experience: ExperienceLevel;
};

export type DeadlineItem = {
  label: string;
  date: string;
  detail: string;
};

export type PollingPlace = {
  name: string;
  address: string;
  hours: string;
  distance: string;
};

export type CivicPlan = {
  title: string;
  summary: string;
  checklist: string[];
  deadlines: DeadlineItem[];
  learningPillars: string[];
};

export const STATE_OPTIONS = [
  'California',
  'Florida',
  'Georgia',
  'New York',
  'Texas',
  'Virginia',
];

export const GOAL_OPTIONS = [
  'Register to vote',
  'Vote on election day',
  'Learn the basics',
  'Request absentee voting',
];

export const EXPERIENCE_OPTIONS: Array<{ value: ExperienceLevel; label: string }> = [
  { value: 'first-time', label: 'First-time voter' },
  { value: 'returning', label: 'Returning voter' },
  { value: 'absentee', label: 'Absentee / mail voter' },
];

const planMap: Record<string, CivicPlan> = {
  California: {
    title: 'California civic path',
    summary: 'Fast-track registration, then confirm polling or vote-by-mail status.',
    checklist: [
      'Confirm your registration status with your current address',
      'Check whether you are already on the vote-by-mail list',
      'Save the county election office contact details',
      'Review what ID or signature check your county uses',
    ],
    deadlines: [
      { label: 'Registration check', date: '2026-09-15', detail: 'Confirm your address and party preference if needed.' },
      { label: 'Mail ballot request', date: '2026-10-20', detail: 'Request or verify your ballot by mail if you want that path.' },
      { label: 'Election day', date: '2026-11-03', detail: 'Plan your voting window and reminder schedule.' },
    ],
    learningPillars: ['How vote-by-mail works', 'County election office basics', 'Find your polling place'],
  },
  Florida: {
    title: 'Florida civic path',
    summary: 'Registration and polling-day planning are the biggest early wins.',
    checklist: [
      'Verify your registration and party status',
      'Check the early voting window for your county',
      'Look up your polling location and travel time',
      'Set reminders for ballot deadlines and election day',
    ],
    deadlines: [
      { label: 'Registration deadline', date: '2026-10-05', detail: 'Make sure your voter record is current.' },
      { label: 'Early voting window', date: '2026-10-20', detail: 'Plan the day you want to vote in person early.' },
      { label: 'Election day', date: '2026-11-03', detail: 'Double-check your polling place before heading out.' },
    ],
    learningPillars: ['Early voting', 'Polling place lookup', 'Ballot tracking'],
  },
  Georgia: {
    title: 'Georgia civic path',
    summary: 'Focus on registration status, ID prep, and county-specific reminders.',
    checklist: [
      'Confirm your registration with county records',
      'Check accepted ID forms before you go',
      'Review absentee request timing if needed',
      'Save your election office phone number',
    ],
    deadlines: [
      { label: 'Registration deadline', date: '2026-10-06', detail: 'Last day to update your voter record for the cycle.' },
      { label: 'Absentee request deadline', date: '2026-10-24', detail: 'Submit any mail ballot request before the cutoff.' },
      { label: 'Election day', date: '2026-11-03', detail: 'Plan for in-person voting or ballot return.' },
    ],
    learningPillars: ['Photo ID basics', 'Absentee voting', 'County election contacts'],
  },
  'New York': {
    title: 'New York civic path',
    summary: 'Use the long lead time to understand your options and deadlines.',
    checklist: [
      'Confirm your enrollment and address',
      'Review early vote locations in your borough or county',
      'Save ballot delivery or drop-off info',
      'Mark the key dates in your calendar',
    ],
    deadlines: [
      { label: 'Registration deadline', date: '2026-10-09', detail: 'Submit changes before the cutoff.' },
      { label: 'Early voting begins', date: '2026-10-24', detail: 'Choose an in-person slot that fits your schedule.' },
      { label: 'Election day', date: '2026-11-03', detail: 'Confirm your polling place the day before.' },
    ],
    learningPillars: ['Early voting map', 'Ballot drop-off', 'Registration status'],
  },
  Texas: {
    title: 'Texas civic path',
    summary: 'Start with registration and then choose the most reliable voting route.',
    checklist: [
      'Check registration and county details',
      'Identify the nearest polling location',
      'Review absentee eligibility if travel is a factor',
      'Set reminders for every important date',
    ],
    deadlines: [
      { label: 'Registration deadline', date: '2026-10-05', detail: 'Confirm your record before the cutoff.' },
      { label: 'Early voting window', date: '2026-10-20', detail: 'Pick a convenient day for in-person voting.' },
      { label: 'Election day', date: '2026-11-03', detail: 'Leave buffer time in case lines are long.' },
    ],
    learningPillars: ['County lookup', 'Early vote planning', 'Ballot tracking'],
  },
  Virginia: {
    title: 'Virginia civic path',
    summary: 'Use flexible voting options and keep the reminders close.',
    checklist: [
      'Check your registration and district',
      'Review early voting and absentee options',
      'Find your nearest voting center',
      'Save election office and reminder details',
    ],
    deadlines: [
      { label: 'Registration deadline', date: '2026-10-13', detail: 'Update your registration if anything changed.' },
      { label: 'Early voting begins', date: '2026-09-19', detail: 'Plan whether you want to vote early or on election day.' },
      { label: 'Election day', date: '2026-11-03', detail: 'Verify your polling place before you go.' },
    ],
    learningPillars: ['Early voting', 'District lookup', 'Reminder planning'],
  },
};

export function buildCivicPlan(profile: UserProfile): CivicPlan {
  return planMap[profile.state] ?? planMap['California'];
}

export function buildChecklist(profile: UserProfile): string[] {
  const plan = buildCivicPlan(profile);
  const checklist = [...plan.checklist];

  if (profile.goal === 'Learn the basics') {
    checklist.unshift('Read the guided overview of how voting works in your state');
  }

  if (profile.goal === 'Request absentee voting') {
    checklist.unshift('Check eligibility rules for absentee or mail voting');
  }

  if (profile.experience === 'first-time') {
    checklist.push('Use the beginner glossary to understand unfamiliar terms');
  }

  if (profile.experience === 'returning') {
    checklist.push('Review what changed since your last election cycle');
  }

  return checklist;
}

export function buildDeadlines(profile: UserProfile): DeadlineItem[] {
  const plan = buildCivicPlan(profile);
  return plan.deadlines;
}

export function buildPollingPlaces(profile: UserProfile, address: string): PollingPlace[] {
  const baseAddress = address.trim() || `${profile.state} voter address`;

  return [
    {
      name: `${profile.state} Central Voting Center`,
      address: `${baseAddress} - Downtown civic center`,
      hours: '7:00 AM - 7:00 PM',
      distance: '1.2 mi',
    },
    {
      name: `${profile.state} Community Library`,
      address: `${baseAddress} - Near the public library branch`,
      hours: '8:00 AM - 6:00 PM',
      distance: '2.8 mi',
    },
    {
      name: `${profile.state} Recreation Hall`,
      address: `${baseAddress} - Neighborhood rec center`,
      hours: '9:00 AM - 5:00 PM',
      distance: '3.4 mi',
    },
  ];
}

export function buildGoogleCalendarUrl(deadline: DeadlineItem): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: deadline.label,
    details: deadline.detail,
    dates: `${deadline.date.replace(/-/g, '')}/${deadline.date.replace(/-/g, '')}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(deadline: DeadlineItem): string {
  const dateStamp = deadline.date.replace(/-/g, '');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ElectED 2.0//Civic Planner//EN',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${dateStamp}`,
    `DTEND;VALUE=DATE:${dateStamp}`,
    `SUMMARY:${deadline.label}`,
    `DESCRIPTION:${deadline.detail}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n');
}

export function buildMapUrl(profile: UserProfile, address: string): string {
  const query = encodeURIComponent(`${address.trim() || profile.state} polling place`);
  return `https://www.google.com/maps/search/${query}`;
}

export function buildAssistantReply(message: string, profile: UserProfile | null): string {
  const normalized = message.toLowerCase();
  const state = profile?.state ?? 'your state';

  if (normalized.includes('who should i vote for') || normalized.includes('which party should i choose')) {
    return 'I can help with registration, deadlines, and voting logistics, but I cannot recommend a candidate or party. If you want, I can explain how to compare ballot issues in ' + state + '.';
  }

  if (normalized.includes('first') || normalized.includes('start')) {
    return `Start by confirming your registration in ${state}, then note the registration deadline and the nearest polling location.`;
  }

  if (normalized.includes('absentee') || normalized.includes('mail')) {
    return 'For mail voting, check eligibility first, then request the ballot early and track the return deadline.';
  }

  if (normalized.includes('deadline')) {
    return 'The fastest way to stay on track is to save the registration deadline, early voting window, and election day in one place.';
  }

  return 'I can help with election basics, deadlines, ballot logistics, and local voting steps. Tell me your state or the topic you want to understand next.';
}
