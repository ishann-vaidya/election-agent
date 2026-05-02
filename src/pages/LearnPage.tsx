import { useEffect, useMemo, useState } from 'react';
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

const quiz = [
  {
    question: 'What should you check first?',
    options: ['Your voter roll details', 'The results', 'A campaign poster'],
    answer: 0,
    explanation: 'The first step is to confirm that your voter record is correct so the rest of the plan is built on the right details.',
    difficulty: 'easy',
  },
  {
    question: 'What should you save before election day?',
    options: ['Polling booth location', 'A random slogan', 'Only the weather forecast'],
    answer: 0,
    explanation: 'Knowing where to vote is essential because you need to arrive at the correct location before the booth closes.',
    difficulty: 'easy',
  },
  {
    question: 'Why is a glossary useful?',
    options: ['To explain civic terms', 'To change the ballot', 'To skip voting'],
    answer: 0,
    explanation: 'A glossary makes unfamiliar civic language easier to understand and helps first-time voters move faster.',
    difficulty: 'easy',
  },
  {
    question: 'What does a checklist reduce?',
    options: ['Confusion and missed steps', 'Election turnout', 'The number of terms'],
    answer: 0,
    explanation: 'A checklist reduces uncertainty by turning the voting journey into a clear sequence of actions.',
    difficulty: 'easy',
  },
  {
    question: 'What kind of information should a deadline card hold?',
    options: ['Date and action details', 'Only the title', 'A candidate photo'],
    answer: 0,
    explanation: 'A deadline card should tell the user what the date means and what to do before that date arrives.',
    difficulty: 'easy',
  },
  {
    question: 'What does adaptive support do?',
    options: ['Changes guidance based on the user', 'Deletes old history', 'Makes voting optional'],
    answer: 0,
    explanation: 'Adaptive guidance changes how much help is shown depending on the user’s answers and comfort level.',
    difficulty: 'medium',
  },
  {
    question: 'What should a first-time voter do after onboarding?',
    options: ['Review the tailored checklist', 'Ignore the dashboard', 'Skip the calendar'],
    answer: 0,
    explanation: 'The tailored checklist is the fastest way to turn onboarding answers into concrete next steps.',
    difficulty: 'medium',
  },
  {
    question: 'Why is a language selector important?',
    options: ['It improves access for more people', 'It changes election results', 'It replaces the chat'],
    answer: 0,
    explanation: 'Language support makes the product more inclusive and easier to use for more voters.',
    difficulty: 'medium',
  },
  {
    question: 'What should you verify before exporting a calendar reminder?',
    options: ['The event title and date', 'The quiz score', 'The theme color'],
    answer: 0,
    explanation: 'The reminder should match the real deadline so it helps instead of creating noise.',
    difficulty: 'medium',
  },
  {
    question: 'What makes live civic data better than hard-coded data?',
    options: ['It stays current', 'It hides the booth', 'It removes learning'],
    answer: 0,
    explanation: 'Live data updates as official records change, which is important for deadlines and polling information.',
    difficulty: 'medium',
  },
  {
    question: 'Why do AI guardrails matter?',
    options: ['They keep the assistant nonpartisan', 'They make the app slower', 'They hide the interface'],
    answer: 0,
    explanation: 'Guardrails keep the assistant focused on civic help and away from partisan recommendations.',
    difficulty: 'hard',
  },
  {
    question: 'What should a useful civic assistant remember?',
    options: ['The user’s context for the current session', 'Random campaign slogans', 'A vote count'],
    answer: 0,
    explanation: 'Remembering the user’s context lets the assistant give follow-up advice that fits the same journey.',
    difficulty: 'hard',
  },
  {
    question: 'What is the point of a visual explainer?',
    options: ['To make a complex process easier to follow', 'To replace all text', 'To reduce accessibility'],
    answer: 0,
    explanation: 'A visual explainer turns a hard concept into a clear sequence the user can scan and understand quickly.',
    difficulty: 'hard',
  },
  {
    question: 'What is the best reason to save progress locally?',
    options: ['So the user can return without redoing work', 'So the app can delete steps', 'So the browser can hide data'],
    answer: 0,
    explanation: 'Local persistence helps the user return later and continue from where they left off.',
    difficulty: 'hard',
  },
  {
    question: 'What is the planner trying to produce overall?',
    options: ['A civic companion, not just a chatbot', 'Only a static brochure', 'A campaign tool'],
    answer: 0,
    explanation: 'The project goal is a complete civic companion that combines guidance, tools, and learning.',
    difficulty: 'hard',
  },
];

type QuizStage = 'learn' | 'quiz' | 'complete';

type SavedQuizState = {
  stage: QuizStage;
  answers: Record<number, number>;
};

const QUIZ_STATE_KEY = 'elected-learn-quiz-state';

function loadQuizState(): SavedQuizState {
  if (typeof window === 'undefined') {
    return { stage: 'learn', answers: {} };
  }

  try {
    const rawState = window.sessionStorage.getItem(QUIZ_STATE_KEY);

    if (!rawState) {
      return { stage: 'learn', answers: {} };
    }

    const parsedState = JSON.parse(rawState) as Partial<SavedQuizState>;

    return {
      stage: parsedState.stage === 'quiz' || parsedState.stage === 'complete' ? parsedState.stage : 'learn',
      answers: parsedState.answers ?? {},
    };
  } catch {
    return { stage: 'learn', answers: {} };
  }
}

export function LearnPage() {
  const [quizState, setQuizState] = useState<SavedQuizState>(() => loadQuizState());

  const score = useMemo(
    () => quiz.reduce((total, item, index) => (quizState.answers[index] === item.answer ? total + 1 : total), 0),
    [quizState.answers],
  );

  const masteryLabel = score < 5 ? 'Foundations' : score < 10 ? 'Building confidence' : 'Ready for live data';

  useEffect(() => {
    window.sessionStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(quizState));
  }, [quizState]);

  function startQuiz() {
    setQuizState({ stage: 'quiz', answers: {} });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function finishQuiz() {
    setQuizState((current) => ({ ...current, stage: 'complete' }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function returnHome() {
    setQuizState({ stage: 'learn', answers: {} });
    window.sessionStorage.removeItem(QUIZ_STATE_KEY);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (quizState.stage !== 'learn') {
    return (
      <div className="page-stack">
        <section className="hero-panel">
          <div>
            <p className="eyebrow">{quizState.stage === 'complete' ? 'Quiz complete' : 'Quick quiz'}</p>
            <h2>{quizState.stage === 'complete' ? `Final score: ${score} / ${quiz.length}` : 'Test your civic knowledge.'}</h2>
            <p className="hero-copy">
              {quizState.stage === 'complete'
                ? 'Your answers are saved for this session. Use the return button to go back to the learning hub.'
                : 'Answer the questions below and finish when you are ready.'}
            </p>
          </div>
          <Badge tone={quizState.stage === 'complete' ? 'green' : 'gold'}>
            {quizState.stage === 'complete' ? 'Completed' : 'In progress'}
          </Badge>
        </section>

        <Card eyebrow="Quick quiz" title="Quiz questions">
          <div className="quiz-list">
            {quiz.map((item, questionIndex) => (
              <div key={item.question} className="quiz-item">
                <div className="quiz-item-head">
                  <strong>{item.question}</strong>
                  <Badge tone={item.difficulty === 'hard' ? 'gold' : item.difficulty === 'medium' ? 'blue' : 'green'}>
                    {item.difficulty}
                  </Badge>
                </div>
                <div className="choice-grid">
                  {item.options.map((option, optionIndex) => (
                    <button
                      key={option}
                      type="button"
                      className={`choice-chip ${quizState.answers[questionIndex] === optionIndex ? 'choice-chip-active' : ''}`}
                      onClick={() =>
                        setQuizState((current) => ({
                          ...current,
                          answers: { ...current.answers, [questionIndex]: optionIndex },
                        }))
                      }
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            {quizState.stage === 'quiz' ? (
              <Button type="button" onClick={finishQuiz}>
                Finish quiz
              </Button>
            ) : null}
            <Button type="button" variant="secondary" onClick={returnHome}>
              Return to home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Learn the process</p>
          <h2>Understand the voting journey in a simple, visual way.</h2>
          <p className="hero-copy">
            This hub teaches the basics, shows a simple timeline, and gives users a quick quiz to build confidence.
          </p>
        </div>
        <Badge tone="gold">{masteryLabel}</Badge>
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

      <div className="hero-actions">
        <Button type="button" onClick={startQuiz}>
          Take a quick quiz
        </Button>
      </div>

      <section className="card-grid compact">
        <Card eyebrow="Visual explainer" title="Ballot to result">
          <svg className="explainer-svg" viewBox="0 0 520 180" role="img" aria-label="Election journey diagram">
            <defs>
              <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            <path d="M50 90 H470" className="explainer-line" />
            <circle cx="50" cy="90" r="24" className="explainer-node" />
            <circle cx="190" cy="90" r="24" className="explainer-node" />
            <circle cx="330" cy="90" r="24" className="explainer-node" />
            <circle cx="470" cy="90" r="24" className="explainer-node" />
            <text x="50" y="95" textAnchor="middle" className="explainer-text">Roll</text>
            <text x="190" y="95" textAnchor="middle" className="explainer-text">Booth</text>
            <text x="330" y="95" textAnchor="middle" className="explainer-text">Count</text>
            <text x="470" y="95" textAnchor="middle" className="explainer-text">Result</text>
          </svg>
          <p className="card-subcopy">The app can use animated SVGs like this to explain the civic journey without adding a heavy dependency.</p>
        </Card>
      </section>
    </div>
  );
}
