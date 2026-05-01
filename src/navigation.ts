export type NavItem = {
  path: string;
  label: string;
  hint: string;
};

export const appNavItems: NavItem[] = [
  { path: '/', label: 'Home', hint: 'Project overview' },
  { path: '/onboarding', label: 'Onboarding', hint: 'Quiz setup' },
  { path: '/dashboard', label: 'Dashboard', hint: 'User checklist' },
  { path: '/chat', label: 'AI Guide', hint: 'Civic assistant' },
  { path: '/tools', label: 'Voter Tools', hint: 'Find and plan' },
  { path: '/learn', label: 'Learn', hint: 'Timeline and quiz' },
  { path: '/settings', label: 'Settings', hint: 'Language and access' },
];
