import { useEffect, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { buildAssistantReply, buildCivicPlan, type UserProfile } from '../lib/electionPlanner';
import { loadStoredChat, loadStoredProfile, saveStoredChat, type ChatMessage } from '../lib/storage';

const quickPrompts = [
  'What should I do first?',
  'How do I check voter roll details?',
  'Can you explain absentee voting?',
  'How do I find my polling booth?',
];

const fallbackProfile: UserProfile = {
  state: 'Maharashtra',
  goal: 'Register to vote',
  experience: 'first-time',
};

export function ChatPage() {
  const [profile, setProfile] = useState<UserProfile>(fallbackProfile);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const storedMessages = loadStoredChat();
    return storedMessages.length > 0
      ? storedMessages
      : [
          {
            role: 'assistant',
            content: 'I can help with registration, deadlines, polling places, and voting basics.',
          },
        ];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    setProfile(loadStoredProfile() ?? fallbackProfile);
  }, []);

  useEffect(() => {
    saveStoredChat(messages);
  }, [messages]);

  const plan = buildCivicPlan(profile);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    const reply = buildAssistantReply(trimmed, profile);
    setMessages((current) => [
      ...current,
      { role: 'user', content: trimmed },
      { role: 'assistant', content: reply },
    ]);
    setInput('');
  };

  return (
    <div className="page-stack">
      <section className="hero-panel chat-hero">
        <div>
          <p className="eyebrow">Ask anything</p>
          <h2>Conversation mode with local memory and clear guardrails.</h2>
          <p className="hero-copy">
            The assistant remembers the current session, applies nonpartisan guardrails, and adapts to the Maharashtra profile saved in onboarding.
          </p>
        </div>
        <Badge tone="green">Maharashtra</Badge>
      </section>

      <section className="chat-layout">
        <Card eyebrow="AI guide" title="Conversation area">
          <div className="chat-thread">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}-${message.content.slice(0, 18)}`}
                className={`chat-bubble ${message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'}`}
              >
                {message.content}
              </div>
            ))}
          </div>

          <form
            className="chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about deadlines, polling places, or voting basics"
              rows={3}
            />
            <div className="hero-actions">
              <Button type="submit">Send</Button>
              <Button type="button" variant="secondary" onClick={() => setMessages(messages.slice(0, 1))}>
                Clear thread
              </Button>
            </div>
          </form>

          <div className="section-pill-row">
            {quickPrompts.map((prompt) => (
              <Button key={prompt} type="button" variant="secondary" onClick={() => sendMessage(prompt)}>
                {prompt}
              </Button>
            ))}
          </div>
        </Card>

        <section className="card-grid compact">
          <Card eyebrow="Guardrails" title="Nonpartisan prompt">
            <Badge tone="gold">Safety first</Badge>
            <p>The assistant explains voting logistics and declines partisan recommendations.</p>
          </Card>
          <Card eyebrow="Memory" title="Context available">
            <Badge tone="blue">Session state</Badge>
            <p>We have a Maharashtra profile for the current session.</p>
          </Card>
        </section>
      </section>
    </div>
  );
}
