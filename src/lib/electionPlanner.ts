export type ExperienceLevel = 'first-time' | 'returning' | 'absentee';

export type ElectionType = 'general' | 'state-assembly' | 'local-body';

export type UserProfile = {
  state: string;
  electionType: ElectionType;
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
  'Maharashtra',
  'Karnataka',
  'Delhi',
  'Tamil Nadu',
  'Gujarat',
];

export const ELECTION_TYPE_OPTIONS: Array<{ value: ElectionType; label: string }> = [
  { value: 'general', label: 'General election' },
  { value: 'state-assembly', label: 'State assembly election' },
  { value: 'local-body', label: 'Local body election' },
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
  Maharashtra: {
    title: 'Maharashtra civic path',
    summary: 'Learn how to verify your voter record, find your booth, and plan voting day in Maharashtra.',
    checklist: [
      'Confirm your name and address in the electoral roll',
      'Check your polling booth and ward details',
      'Save the local election office or helpline number',
      'Review the documents you should carry to the booth',
    ],
    deadlines: [
      { label: 'Roll verification', date: '2026-09-15', detail: 'Check that your voter details are correct before the election period.' },
      { label: 'Booth planning', date: '2026-10-15', detail: 'Save the polling station address and travel plan.' },
      { label: 'Voting day', date: '2026-11-03', detail: 'Keep the day free and recheck your booth before you leave.' },
    ],
    learningPillars: ['Voter roll basics', 'Booth lookup', 'Voting day planning'],
  },
  Karnataka: {
    title: 'Karnataka civic path',
    summary: 'Learn how to verify your voter record, find your booth, and plan voting day in Karnataka.',
    checklist: [
      'Confirm your name and address in the electoral roll',
      'Check your polling booth and ward details',
      'Save the local election office or helpline number',
      'Review the documents you should carry to the booth',
    ],
    deadlines: [
      { label: 'Roll verification', date: '2026-09-15', detail: 'Check that your voter details are correct before the election period.' },
      { label: 'Booth planning', date: '2026-10-15', detail: 'Save the polling station address and travel plan.' },
      { label: 'Voting day', date: '2026-11-03', detail: 'Keep the day free and recheck your booth before you leave.' },
    ],
    learningPillars: ['Voter roll basics', 'Booth lookup', 'Voting day planning'],
  },
  Delhi: {
    title: 'Delhi civic path',
    summary: 'Learn how to verify your voter record, find your booth, and plan voting day in Delhi.',
    checklist: [
      'Confirm your name and address in the electoral roll',
      'Check your polling booth and ward details',
      'Save the local election office or helpline number',
      'Review the documents you should carry to the booth',
    ],
    deadlines: [
      { label: 'Roll verification', date: '2026-09-15', detail: 'Check that your voter details are correct before the election period.' },
      { label: 'Booth planning', date: '2026-10-15', detail: 'Save the polling station address and travel plan.' },
      { label: 'Voting day', date: '2026-11-03', detail: 'Keep the day free and recheck your booth before you leave.' },
    ],
    learningPillars: ['Voter roll basics', 'Booth lookup', 'Voting day planning'],
  },
  'Tamil Nadu': {
    title: 'Tamil Nadu civic path',
    summary: 'Learn how to verify your voter record, find your booth, and plan voting day in Tamil Nadu.',
    checklist: [
      'Confirm your name and address in the electoral roll',
      'Check your polling booth and ward details',
      'Save the local election office or helpline number',
      'Review the documents you should carry to the booth',
    ],
    deadlines: [
      { label: 'Roll verification', date: '2026-09-15', detail: 'Check that your voter details are correct before the election period.' },
      { label: 'Booth planning', date: '2026-10-15', detail: 'Save the polling station address and travel plan.' },
      { label: 'Voting day', date: '2026-11-03', detail: 'Keep the day free and recheck your booth before you leave.' },
    ],
    learningPillars: ['Voter roll basics', 'Booth lookup', 'Voting day planning'],
  },
  Gujarat: {
    title: 'Gujarat civic path',
    summary: 'Learn how to verify your voter record, find your booth, and plan voting day in Gujarat.',
    checklist: [
      'Confirm your name and address in the electoral roll',
      'Check your polling booth and ward details',
      'Save the local election office or helpline number',
      'Review the documents you should carry to the booth',
    ],
    deadlines: [
      { label: 'Roll verification', date: '2026-09-15', detail: 'Check that your voter details are correct before the election period.' },
      { label: 'Booth planning', date: '2026-10-15', detail: 'Save the polling station address and travel plan.' },
      { label: 'Voting day', date: '2026-11-03', detail: 'Keep the day free and recheck your booth before you leave.' },
    ],
    learningPillars: ['Voter roll basics', 'Booth lookup', 'Voting day planning'],
  },
};

function createFallbackPlan(profile: UserProfile): CivicPlan {
  const electionTypeLabel =
    profile.electionType === 'state-assembly'
      ? 'state assembly election'
      : profile.electionType === 'local-body'
        ? 'local body election'
        : 'general election';

  return {
    title: `${profile.state} civic path`,
    summary: `Learn how to verify your voter record, find your booth, and plan voting day for your ${electionTypeLabel}.`,
    checklist: [
      'Confirm your name and address in the electoral roll',
      'Check your polling booth and ward details',
      'Save the local election office or helpline number',
      'Review the documents you should carry to the booth',
    ],
    deadlines: [
      { label: 'Roll verification', date: '2026-09-15', detail: 'Check that your voter details are correct before the election period.' },
      { label: 'Booth planning', date: '2026-10-15', detail: 'Save the polling station address and travel plan.' },
      { label: 'Voting day', date: '2026-11-03', detail: 'Keep the day free and recheck your booth before you leave.' },
    ],
    learningPillars: ['Voter roll basics', 'Booth lookup', 'Voting day planning'],
  };
}

export function buildCivicPlan(profile: UserProfile): CivicPlan {
  return planMap[profile.state] ?? createFallbackPlan(profile);
}

export function buildChecklist(profile: UserProfile): string[] {
  const plan = buildCivicPlan(profile);
  const checklist = [...plan.checklist];

  if (profile.electionType === 'general') {
    checklist.unshift('Review the national election timeline and the main dates that affect your area');
  }

  if (profile.electionType === 'state-assembly') {
    checklist.unshift(`Check the ${profile.state} assembly schedule and ballot details`);
  }

  if (profile.electionType === 'local-body') {
    checklist.unshift('Confirm your ward, council, and local body polling details');
  }

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
  const baseAddress = address.trim() || 'Maharashtra voter address';
  const stateName = profile.state || 'Maharashtra';

  return [
    {
      name: `${stateName} South Polling Booth`,
      address: `${baseAddress} - Central civic school`,
      hours: '7:00 AM - 6:00 PM',
      distance: '1.2 km',
    },
    {
      name: `${stateName} Cantonment Booth`,
      address: `${baseAddress} - Municipal community hall`,
      hours: '7:00 AM - 6:00 PM',
      distance: '2.8 km',
    },
    {
      name: `${stateName} Ward Office Booth`,
      address: `${baseAddress} - Ward office campus`,
      hours: '7:00 AM - 6:00 PM',
      distance: '3.4 km',
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
  const query = encodeURIComponent(`${address.trim() || 'Maharashtra'} polling booth`);
  return `https://www.google.com/maps/search/${query}`;
}

export function buildAssistantReply(message: string, profile: UserProfile | null): string {
  const normalized = message.toLowerCase();
  const state = profile?.state ?? 'Maharashtra';
  const electionType =
    profile?.electionType === 'state-assembly'
      ? 'state assembly election'
      : profile?.electionType === 'local-body'
        ? 'local body election'
        : 'general election';

  if (normalized.includes('who should i vote for') || normalized.includes('which party should i choose')) {
    return 'I can help with registration, deadlines, and voting logistics, but I cannot recommend a candidate or party. If you want, I can explain how to compare ballot issues in ' + state + '.';
  }

  if (normalized.includes('first') || normalized.includes('start')) {
    return `Start by confirming your voter roll details in ${state} for your ${electionType}, then note your polling booth and voting day plan.`;
  }

  if (normalized.includes('absentee') || normalized.includes('mail')) {
    return 'For absentee or postal voting, check eligibility first, then request the ballot early and track the return deadline.';
  }

  if (normalized.includes('deadline')) {
    return 'The fastest way to stay on track is to save the roll check, booth details, and voting day in one place.';
  }

  return 'I can help with election basics, voter roll checks, booth details, and local voting steps. Tell me the topic you want to understand next.';
}
