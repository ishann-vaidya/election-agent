import { useMemo, useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const timeline = [
  {
    phase: '1',
    title: 'Check your details',
    body: 'Start by confirming your name, address, and voter roll details for Maharashtra.',
  },
  {
    phase: '2',
    title: 'Find your booth',
    body: 'Save the polling booth and travel plan before election day arrives.',
  },
  {
    phase: '3',
    title: 'Carry the right documents',
    body: 'Review what identification or supporting documents you should bring with you.',
  },
  {
    phase: '4',
    title: 'Vote and share the reminder',
    body: 'Vote on the day, then help someone else understand the same steps.',
  },
];

const glossary = [
  { term: 'Electoral roll', meaning: 'The list of registered voters for a polling area.' },
  { term: 'Polling booth', meaning: 'The location where a voter casts a ballot.' },
  { term: 'Postal voting', meaning: 'Voting by mail when eligible or allowed.' },
  { term: 'Elector', meaning: 'A person who is eligible to vote.' },
  { term: 'Ward', meaning: 'A local area used for civic administration.' },
];

const quiz = [
  {
    question: 'What should you check first?',
    options: ['Your voter roll details', 'The results', 'A campaign poster'],
    answer: 0,
  },
  {
    question: 'What should you save before election day?',
    options: ['Polling booth location', 'A random slogan', 'Only the weather forecast'],
    answer: 0,
  },
  {
    question: 'Why is a glossary useful?',
    options: ['To explain civic terms', 'To change the ballot', 'To skip voting'],
    answer: 0,
  },
];

export function LearnPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const score = useMemo(
    () => quiz.reduce((total, item, index) => (answers[index] === item.answer ? total + 1 : total), 0),
    [answers],
  );

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Learn the process</p>
          <h2>Understand the voting journey in a simple, visual way.</h2>
          <p className="hero-copy">
            This hub teaches the basics, shows a simple timeline, and gives users a quick quiz and glossary to build confidence.
          </p>
        </div>
        <Badge tone="gold">Maharashtra learning flow</Badge>
      </section>

      <section className="card-grid compact">
        {timeline.map((item) => (
          <Card key={item.phase} eyebrow={`Step ${item.phase}`} title={item.title}>
            <p>{item.body}</p>
          </Card>
        ))}
      </section>

      <Card eyebrow="Visual explainer" title="A simple voting flow">
        <div className="flow-grid">
          <div className="flow-step">Check details</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">Find booth</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">Vote</div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">Share the reminder</div>
        </div>
      </Card>

      <section className="card-grid compact">
        <Card eyebrow="Quick quiz" title={`Score: ${score} / ${quiz.length}`}>
          <div className="quiz-list">
            {quiz.map((item, questionIndex) => (
              <div key={item.question} className="quiz-item">
                <strong>{item.question}</strong>
                <div className="choice-grid">
                  {item.options.map((option, optionIndex) => (
                    <button
                      key={option}
                      type="button"
                      className={`choice-chip ${answers[questionIndex] === optionIndex ? 'choice-chip-active' : ''}`}
                      onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <Button type="button" variant="secondary" onClick={() => setAnswers({})}>
              Reset quiz
            </Button>
          </div>
        </Card>

        <Card eyebrow="Glossary" title="Useful civic terms">
          <div className="glossary-list">
            {glossary.map((entry) => (
              <div key={entry.term} className="glossary-item">
                <strong>{entry.term}</strong>
                <p>{entry.meaning}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
