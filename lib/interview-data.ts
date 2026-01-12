import type { InterviewTrack } from "@/app/page"

export interface InterviewBlock {
  id: string
  title: string
  timeRange: string
  duration: string
  goal: string
  questions: Question[]
}

export interface Question {
  id: string
  text: {
    en: string
    ru: string
  }
  prompts?: string[]
  expectedDirection?: string
}

export interface RubricCriterion {
  id: string
  name: string
  description: string
}

export interface InterviewPlan {
  track: InterviewTrack
  blocks: InterviewBlock[]
  rubric: {
    criteria: RubricCriterion[]
    redFlags: string[]
  }
}

export function getInterviewPlan(track: InterviewTrack): InterviewPlan {
  // Mock data - will be replaced with real interview plans
  const commonRubric = {
    criteria: [
      {
        id: "technical-depth",
        name: "Technical Depth",
        description: "Understanding of core concepts and ability to go deep",
      },
      {
        id: "problem-solving",
        name: "Problem Solving",
        description: "Approach to breaking down and solving complex problems",
      },
      {
        id: "communication",
        name: "Communication",
        description: "Clarity in explaining technical concepts",
      },
      {
        id: "experience",
        name: "Experience & Judgment",
        description: "Real-world experience and decision-making quality",
      },
    ],
    redFlags: [
      "Unable to explain past work",
      "Blames others consistently",
      "No questions about role/team",
      "Unclear communication",
    ],
  }

  const frontendBlocks: InterviewBlock[] = [
    {
      id: "intro",
      title: "Introduction",
      timeRange: "0-5 min",
      duration: "5 min",
      goal: "Build rapport and understand candidate background",
      questions: [
        {
          id: "intro-1",
          text: {
            en: "Tell me about your most recent frontend project",
            ru: "Расскажите о вашем последнем фронтенд-проекте",
          },
          prompts: ["What was your specific role?", "What technologies did you use?"],
          expectedDirection: "Looking for clarity on scope, tech stack, and individual contributions",
        },
        {
          id: "intro-2",
          text: {
            en: "What interests you about this role?",
            ru: "Что вас интересует в этой позиции?",
          },
          expectedDirection: "Assessing motivation and cultural fit",
        },
        {
          id: "intro-3",
          text: {
            en: "Walk me through your frontend development experience",
            ru: "Расскажите о вашем опыте frontend-разработки",
          },
          prompts: ["Which frameworks have you worked with?", "What size teams?"],
          expectedDirection: "Understanding breadth of experience and growth trajectory",
        },
      ],
    },
    {
      id: "react-deep-dive",
      title: "React & State Management",
      timeRange: "5-20 min",
      duration: "15 min",
      goal: "Assess deep React knowledge and state management patterns",
      questions: [
        {
          id: "react-1",
          text: {
            en: "How do you approach state management in large React applications?",
            ru: "Как вы подходите к управлению состоянием в больших React-приложениях?",
          },
          prompts: [
            "When would you use Context vs Redux vs Zustand?",
            "How do you handle server state?",
            "What about form state?",
          ],
          expectedDirection: "Looking for nuanced understanding of different state solutions and their tradeoffs",
        },
        {
          id: "react-2",
          text: {
            en: "Explain React rendering behavior and optimization techniques",
            ru: "Объясните поведение рендеринга React и методы оптимизации",
          },
          prompts: ["When would you use useMemo vs useCallback?", "What causes unnecessary re-renders?"],
          expectedDirection: "Deep knowledge of React internals and performance optimization",
        },
        {
          id: "react-3",
          text: {
            en: "How do you structure components in a large codebase?",
            ru: "Как вы структурируете компоненты в большой кодовой базе?",
          },
          prompts: ["Smart vs presentational?", "Composition patterns?"],
          expectedDirection: "Architectural thinking and code organization skills",
        },
      ],
    },
    {
      id: "performance",
      title: "Web Performance",
      timeRange: "20-35 min",
      duration: "15 min",
      goal: "Evaluate performance optimization knowledge",
      questions: [
        {
          id: "perf-1",
          text: {
            en: "How do you approach performance optimization in a web application?",
            ru: "Как вы подходите к оптимизации производительности веб-приложения?",
          },
          prompts: ["What metrics do you track?", "How do you measure performance?", "Tools?"],
          expectedDirection: "Understanding of Core Web Vitals, measurement tools, and systematic approach",
        },
        {
          id: "perf-2",
          text: {
            en: "Describe a performance problem you solved",
            ru: "Опишите проблему производительности, которую вы решили",
          },
          prompts: ["How did you identify it?", "What was the solution?", "What was the impact?"],
          expectedDirection: "Real-world problem-solving experience with measurable outcomes",
        },
        {
          id: "perf-3",
          text: {
            en: "What bundling and code-splitting strategies do you use?",
            ru: "Какие стратегии бандлинга и разделения кода вы используете?",
          },
          expectedDirection: "Knowledge of webpack/vite/rollup, lazy loading, and bundle optimization",
        },
      ],
    },
    {
      id: "accessibility",
      title: "Accessibility & Best Practices",
      timeRange: "35-45 min",
      duration: "10 min",
      goal: "Check commitment to accessibility and web standards",
      questions: [
        {
          id: "a11y-1",
          text: {
            en: "How do you ensure your applications are accessible?",
            ru: "Как вы обеспечиваете доступность ваших приложений?",
          },
          prompts: ["ARIA usage?", "Keyboard navigation?", "Screen reader testing?"],
          expectedDirection: "Practical a11y knowledge and testing approaches",
        },
        {
          id: "a11y-2",
          text: {
            en: "What accessibility issues have you encountered and fixed?",
            ru: "Какие проблемы доступности вы встречали и исправляли?",
          },
          expectedDirection: "Real experience dealing with accessibility challenges",
        },
        {
          id: "a11y-3",
          text: {
            en: "How do you stay up to date with frontend best practices?",
            ru: "Как вы следите за лучшими практиками фронтенда?",
          },
          expectedDirection: "Continuous learning mindset",
        },
      ],
    },
    {
      id: "questions-close",
      title: "Candidate Questions & Close",
      timeRange: "45-60 min",
      duration: "15 min",
      goal: "Answer candidate questions and close interview",
      questions: [
        {
          id: "close-1",
          text: {
            en: "What questions do you have for me?",
            ru: "Какие у вас есть вопросы ко мне?",
          },
          expectedDirection: "Quality of questions shows interest and thoughtfulness",
        },
        {
          id: "close-2",
          text: {
            en: "What would you want to work on in your first 3 months?",
            ru: "Над чем вы хотели бы работать в первые 3 месяца?",
          },
          expectedDirection: "Ambition and alignment with role expectations",
        },
        {
          id: "close-3",
          text: {
            en: "Explain next steps in the process",
            ru: "Объясните следующие шаги в процессе",
          },
          expectedDirection: "Close the interview professionally",
        },
      ],
    },
  ]

  // For now, using frontend blocks for all tracks - will be customized per track
  return {
    track,
    blocks: frontendBlocks,
    rubric: commonRubric,
  }
}
