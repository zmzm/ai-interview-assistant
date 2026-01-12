export interface Question {
  id: string
  textEN: string
  textRU: string
  prompts: string[]
  expectedDirection: string
}

export interface InterviewBlock {
  id: string
  title: string
  goal: string
  timeRange: string
  startMinute: number
  endMinute: number
  questions: Question[]
}

export interface ScoringCriterion {
  id: string
  name: string
  description: string
  score: number | null
  evidence: string
}

export interface RedFlag {
  id: string
  label: string
  checked: boolean
}

export const interviewBlocks: InterviewBlock[] = [
  {
    id: "intro",
    title: "Introduction",
    goal: "Build rapport, explain interview structure, understand candidate background",
    timeRange: "0-5 min",
    startMinute: 0,
    endMinute: 5,
    questions: [
      {
        id: "intro-1",
        textEN: "Tell me about your recent work and what you're most proud of",
        textRU: "Расскажите о вашей недавней работе и о чём вы больше всего гордитесь",
        prompts: ["What technologies did you use?", "What was your specific role?"],
        expectedDirection: "Should demonstrate clear communication and passion for their work",
      },
      {
        id: "intro-2",
        textEN: "What motivated you to apply for this senior engineering role?",
        textRU: "Что мотивировало вас подать заявку на эту должность старшего инженера?",
        prompts: ["What are you looking for in your next role?", "What excites you about this opportunity?"],
        expectedDirection: "Should show alignment with role expectations and career goals",
      },
      {
        id: "intro-3",
        textEN: "Walk me through your approach to learning new technologies",
        textRU: "Расскажите о вашем подходе к изучению новых технологий",
        prompts: ["Give me a recent example", "How do you stay current?"],
        expectedDirection: "Should demonstrate continuous learning mindset",
      },
    ],
  },
  {
    id: "technical-depth",
    title: "Technical Depth",
    goal: "Assess deep technical knowledge in their primary stack and problem-solving",
    timeRange: "5-20 min",
    startMinute: 5,
    endMinute: 20,
    questions: [
      {
        id: "tech-1",
        textEN: "Explain how you would optimize a slow database query in production",
        textRU: "Объясните, как бы вы оптимизировали медленный запрос к базе данных в продакшене",
        prompts: [
          "What metrics would you look at first?",
          "Walk me through your debugging process",
          "When would you add indexes vs denormalize?",
        ],
        expectedDirection: "Should show systematic approach, knowledge of query optimization, indexing strategies",
      },
      {
        id: "tech-2",
        textEN: "Describe a complex architectural decision you made and its trade-offs",
        textRU: "Опишите сложное архитектурное решение, которое вы приняли, и его компромиссы",
        prompts: [
          "What alternatives did you consider?",
          "How did you evaluate the options?",
          "What would you do differently now?",
        ],
        expectedDirection:
          "Should demonstrate architectural thinking, consideration of trade-offs, learning from experience",
      },
      {
        id: "tech-3",
        textEN: "How do you approach testing in a microservices architecture?",
        textRU: "Как вы подходите к тестированию в архитектуре микросервисов?",
        prompts: [
          "Unit vs integration vs e2e testing?",
          "How do you handle service dependencies?",
          "Contract testing approach?",
        ],
        expectedDirection: "Should understand testing pyramid, service isolation, contract testing concepts",
      },
    ],
  },
  {
    id: "system-design",
    title: "System Design",
    goal: "Evaluate ability to design scalable systems and make architectural decisions",
    timeRange: "20-35 min",
    startMinute: 20,
    endMinute: 35,
    questions: [
      {
        id: "design-1",
        textEN: "Design a real-time notification system for 10M users",
        textRU: "Спроектируйте систему уведомлений в реальном времени для 10 млн пользователей",
        prompts: [
          "How would you handle connection management?",
          "What about message delivery guarantees?",
          "How would you scale this?",
        ],
        expectedDirection: "Should consider WebSockets/SSE, message queues, scalability, failure handling",
      },
      {
        id: "design-2",
        textEN: "Design a rate limiting system for an API",
        textRU: "Спроектируйте систему ограничения скорости для API",
        prompts: [
          "What algorithms would you consider?",
          "Distributed vs local rate limiting?",
          "How to handle edge cases?",
        ],
        expectedDirection: "Should know token bucket/sliding window, Redis for distributed, consider edge cases",
      },
      {
        id: "design-3",
        textEN: "How would you design a caching strategy for a content-heavy application?",
        textRU: "Как бы вы спроектировали стратегию кэширования для приложения с большим объёмом контента?",
        prompts: [
          "CDN vs application cache vs database cache?",
          "Cache invalidation strategy?",
          "How to handle cache stampede?",
        ],
        expectedDirection: "Should understand multi-layer caching, invalidation patterns, common pitfalls",
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership & Collaboration",
    goal: "Assess mentorship ability, code review skills, and team collaboration",
    timeRange: "35-50 min",
    startMinute: 35,
    endMinute: 50,
    questions: [
      {
        id: "lead-1",
        textEN: "Tell me about a time you mentored a junior engineer through a challenging problem",
        textRU: "Расскажите о случае, когда вы помогли младшему инженеру решить сложную проблему",
        prompts: [
          "How did you balance guidance vs letting them figure it out?",
          "What did they learn?",
          "What did you learn?",
        ],
        expectedDirection: "Should show patience, teaching ability, balance between helping and letting them grow",
      },
      {
        id: "lead-2",
        textEN: "Describe how you conduct code reviews and give feedback",
        textRU: "Опишите, как вы проводите code review и даёте обратную связь",
        prompts: [
          "What do you look for first?",
          "How do you handle disagreements?",
          "How do you make reviews educational?",
        ],
        expectedDirection: "Should show constructive approach, focus on learning, balance criticism with positivity",
      },
      {
        id: "lead-3",
        textEN: "How do you handle technical disagreements with other senior engineers?",
        textRU: "Как вы справляетесь с техническими разногласиями с другими старшими инженерами?",
        prompts: ["Give me a specific example", "How did you reach consensus?", "What was the outcome?"],
        expectedDirection: "Should demonstrate collaboration, data-driven decision making, respect for others",
      },
    ],
  },
  {
    id: "closing",
    title: "Questions & Closing",
    goal: "Answer candidate questions, explain next steps, gather final signals",
    timeRange: "50-60 min",
    startMinute: 50,
    endMinute: 60,
    questions: [
      {
        id: "close-1",
        textEN: "What questions do you have for me about the role, team, or company?",
        textRU: "Какие вопросы у вас есть ко мне о роли, команде или компании?",
        prompts: ["Note the quality and depth of questions", "Assess genuine interest"],
        expectedDirection: "Good questions show research, strategic thinking, genuine interest",
      },
      {
        id: "close-2",
        textEN: "Is there anything we didn't cover that you'd like to share?",
        textRU: "Есть ли что-то, что мы не затронули, чем вы хотели бы поделиться?",
        prompts: ["Any projects or skills you want to highlight?"],
        expectedDirection: "Opportunity to share additional relevant experience",
      },
      {
        id: "close-3",
        textEN: "What timeline are you working with for your job search?",
        textRU: "В какие сроки вы ищете работу?",
        prompts: ["Any other processes?", "When can you start?"],
        expectedDirection: "Understand urgency and other offers",
      },
    ],
  },
]

export const initialScoringCriteria: ScoringCriterion[] = [
  {
    id: "technical-depth",
    name: "Technical Depth",
    description: "Deep knowledge of core technologies, debugging, optimization",
    score: null,
    evidence: "",
  },
  {
    id: "system-design",
    name: "System Design",
    description: "Ability to design scalable systems, consider trade-offs",
    score: null,
    evidence: "",
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Structured approach, asks clarifying questions, considers edge cases",
    score: null,
    evidence: "",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Clear explanations, listens well, adapts to audience",
    score: null,
    evidence: "",
  },
  {
    id: "leadership",
    name: "Leadership",
    description: "Mentorship, code reviews, collaboration, influence",
    score: null,
    evidence: "",
  },
  {
    id: "growth-mindset",
    name: "Growth Mindset",
    description: "Continuous learning, openness to feedback, curiosity",
    score: null,
    evidence: "",
  },
]

export const initialRedFlags: RedFlag[] = [
  { id: "poor-communication", label: "Poor communication / hard to follow", checked: false },
  { id: "defensive", label: "Defensive / not receptive to feedback", checked: false },
  { id: "shallow-knowledge", label: "Shallow technical knowledge", checked: false },
  { id: "no-tradeoffs", label: "Doesn't consider trade-offs", checked: false },
  { id: "ego-issues", label: "Ego issues / talks over others", checked: false },
  { id: "no-production", label: "Limited production experience", checked: false },
]
