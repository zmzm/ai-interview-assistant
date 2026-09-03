"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { InterviewBlock, Question, RubricCriterion, ScoreAnchor } from "@/lib/interview-data"

export type Locale = "ru" | "en"

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  tr: (english: string, russian: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = "interview-language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru")

  useEffect(() => {
    const storedLocale = localStorage.getItem(STORAGE_KEY)
    if (storedLocale === "ru" || storedLocale === "en") setLocaleState(storedLocale)
  }, [])

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale)
    localStorage.setItem(STORAGE_KEY, nextLocale)
    document.documentElement.lang = nextLocale
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(
    () => ({ locale, setLocale, tr: (english: string, russian: string) => (locale === "ru" ? russian : english) }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider")
  return context
}

const BLOCK_TITLES_RU: Record<string, string> = {
  "Warm-up & Context Calibration": "Разогрев и контекст",
  "Architecture & State (CORE)": "Архитектура и состояние (CORE)",
  "Quality, Performance & Runtime": "Качество, производительность и runtime",
  "Async, Network, UX under Pressure": "Асинхронность, сеть и UX при сбоях",
  "Ownership & Decision Making": "Ответственность и принятие решений",
  "Backend Architecture & NestJS (CORE)": "Backend-архитектура и NestJS (CORE)",
  "Async, Load & Runtime": "Асинхронность, нагрузка и runtime",
  "Data, Consistency & Reliability": "Данные, консистентность и надёжность",
  "API Design, Security & Contracts": "API, безопасность и контракты",
  "Production, Testing & Incidents": "Продакшен, тестирование и инциденты",
  "System Architecture (FE+BE)": "Системная архитектура (FE+BE)",
  "Runtime & Performance (FE+BE)": "Runtime и производительность (FE+BE)",
  "API, Data & Consistency": "API, данные и консистентность",
  "Ownership, Production & Incidents": "Ответственность, продакшен и инциденты",
  "Reflection & Maturity": "Рефлексия и зрелость",
  "Practical Work Sample — Choose One": "Практическое задание — выберите одно",
  "Wrap-up": "Завершение",
}

const BLOCK_GOALS_EN: Record<string, string> = {
  "Снять напряжение, понять контекст проекта, масштаб, роль и уровень ответственности.": "Establish project context, scale, role, and the candidate's actual level of responsibility.",
  "Понять масштаб систем, уровень ответственности кандидата и контекст продакшена (нагрузка/критичность/домен).": "Understand system scale, production criticality, domain, and the candidate's actual ownership.",
  "Понять end-to-end контекст, подтвердить реальный вклад по обе стороны контракта и выбрать основной профиль deep-dive (FE или BE).": "Establish end-to-end context, verify contributions on both sides of the contract, and select the primary FE or BE deep-dive.",
  "Стандартизированный сценарий: проверить уточнение требований, архитектурные границы, эволюцию решения и реакцию на новые ограничения.": "Use a standardized scenario to assess requirement discovery, architectural boundaries, solution evolution, and adaptation to new constraints.",
  "Стандартизированный сценарий: проверить уточнение требований, границы системы, надёжность и реакцию на новые ограничения; NestJS — дополнительный stack-specific deep-dive.": "Use a standardized scenario to assess discovery, system boundaries, reliability, and adaptation; use NestJS only as an optional stack-specific deep-dive.",
  "Стандартизированный end-to-end сценарий: границы системы, контракты между слоями и эволюция решения при новых ограничениях.": "Assess system boundaries, cross-layer contracts, and solution evolution through a standardized end-to-end scenario.",
  "Отделить React-разработчика от Front-End инженера: измерения, профилинг, браузерный пайплайн.": "Assess measurement, profiling, and browser fundamentals beyond framework-level React knowledge.",
  "Отделить “Node.js developer” от backend engineer: поведение под нагрузкой, backpressure, каскадные отказы.": "Assess behavior under load, backpressure, and cascading failures beyond framework knowledge.",
  "Пройти весь latency path, затем углубиться минимум в одну FE и одну BE гипотезу; дополнительную глубину дать в основном профиле кандидата.": "Trace the full latency path, test at least one FE and one BE hypothesis, then go deeper in the candidate's primary profile.",
  "Проверить асинхронность, устойчивость UI при деградации сети, зрелость UX-решений.": "Assess asynchronous behavior, UI resilience under network degradation, and mature UX decisions.",
  "Проверить зрелость работы с данными и отказами: транзакции, eventual consistency, миграции, lifecycle процесса.": "Assess data and failure handling: transactions, eventual consistency, migrations, and process lifecycle.",
  "Проверить зрелость по контрактам и данным: обязательная идемпотентность плюс один deep-dive по API evolution, транзакциям или frontend async consistency.": "Assess contracts and data through mandatory idempotency plus one deep-dive into API evolution, transactions, or frontend async consistency.",
  "Понять, как кандидат проектирует контракты, устойчивость к ретраям и безопасность как процесс.": "Assess contract design, retry safety, and security as an engineering process.",
  "Отличить Senior от strong Middle: ответственность, аргументация, компромиссы с бизнесом.": "Distinguish Senior from strong Middle through ownership, reasoning, and business trade-offs.",
  "Разобрать один инцидент до конкретных действий и системных изменений, затем проверить решение под бизнес-ограничениями.": "Take one incident down to concrete actions and systemic changes, then assess decision-making under business constraints.",
  "Подтвердить Senior через продакшен-опыт: observability, тестирование как инструмент уверенности, инциденты и постмортемы.": "Validate Senior-level production experience through observability, risk-based testing, incidents, and postmortems.",
  "Подтвердить уровень через опыт ошибок, принципы и работу с техническим долгом.": "Validate seniority through mistakes, principles, learning, and technical-debt decisions.",
  "Подтвердить зрелость через рефлексию, ошибки и работу с техдолгом.": "Validate maturity through reflection, mistakes, and technical-debt decisions.",
  "Получить наблюдаемый сигнал на незнакомом материале. Оценивай приоритизацию, ход рассуждения и проверку решения, а не количество найденных замечаний.": "Collect observable evidence from unfamiliar material. Assess prioritization, reasoning, and validation—not the number of issues found.",
  "Получить наблюдаемый сигнал на незнакомом материале. Оценивай приоритизацию, reasoning и безопасность изменений, а не знание конкретного framework API.": "Collect observable evidence from unfamiliar material. Assess prioritization, reasoning, and change safety—not framework API recall.",
  "Получить наблюдаемый end-to-end сигнал на незнакомом материале. Оценивай границы доверия, приоритет рисков и связь между слоями.": "Collect observable end-to-end evidence from unfamiliar material. Assess trust boundaries, risk prioritization, and cross-layer reasoning.",
  "Дать кандидату задать вопросы и зафиксировать финальные сигналы.": "Give the candidate time for questions and capture final evidence.",
  "Дать кандидату задать вопросы и собрать финальные сигналы зрелости.": "Give the candidate time for questions and capture final evidence.",
  "Собрать вопросы кандидата и финальные сигналы (интерес к продукту/системе/процессам).": "Answer the candidate's questions and capture final evidence about the conversation.",
}

const DEFAULT_ENGLISH_PROMPTS = [
  "Which assumptions and constraints matter most?",
  "What alternatives did you consider, and what trade-offs drive the choice?",
  "How would you validate the decision and detect failure in production?",
]

const DEFAULT_ENGLISH_SIGNALS = "- Clarifies assumptions and material constraints before committing to a solution.\n- Compares alternatives and explains trade-offs rather than naming a preferred tool.\n- Anticipates failure modes and operational consequences.\n- Proposes a measurable way to validate the decision."

export function localizeBlockTitle(block: InterviewBlock, locale: Locale) {
  return locale === "ru" ? BLOCK_TITLES_RU[block.title] || block.title : block.title
}

export function localizeBlockGoal(block: InterviewBlock, locale: Locale) {
  return locale === "en" ? BLOCK_GOALS_EN[block.goal] || block.goal : block.goal
}

export function localizeQuestionText(question: Question, locale: Locale) {
  return question.text[locale]
}

export function localizePrompts(question: Question, locale: Locale) {
  if (locale === "ru") return question.prompts || []
  return question.promptsEn || (question.prompts?.length ? DEFAULT_ENGLISH_PROMPTS : [])
}

export function localizeExpectedDirection(question: Question, locale: Locale) {
  if (locale === "ru") return question.expectedDirection
  return question.expectedDirectionEn || (question.expectedDirection ? DEFAULT_ENGLISH_SIGNALS : undefined)
}

const CRITERION_RU: Record<string, string> = {
  architecture: "Архитектура и системный дизайн",
  technical_depth: "Техническая глубина",
  decision_making: "Решения и компромиссы",
  ownership: "Ответственность за результат",
  production: "Продакшен-опыт",
  communication: "Коммуникация и ясность",
  reflection: "Рефлексия и обучение",
}

const CRITERION_DESCRIPTION_EN: Record<string, string> = {
  architecture: "Boundaries, scaling decisions, and long-term consequences.",
  technical_depth: "Role-specific runtime, performance, data, reliability, and engineering depth.",
  decision_making: "Choices under constraints and uncertainty, including explicit risk management.",
  ownership: "End-to-end responsibility, outcomes, and response to failures.",
  production: "Incidents, degradation, observability, testing, and postmortems.",
  communication: "Clear, structured reasoning, clarification, and explanation.",
  reflection: "Learning, honest reflection, and the ability to revise prior decisions.",
}

export function localizeCriterion(criterion: RubricCriterion, locale: Locale) {
  return {
    name: locale === "ru" ? CRITERION_RU[criterion.id] || criterion.name : criterion.name,
    description: locale === "en" ? CRITERION_DESCRIPTION_EN[criterion.id] || criterion.description : criterion.description,
  }
}

const SCORE_LABEL_RU: Record<string, string> = {
  na: "Не оценивалось",
  "0": "Негативный сигнал",
  "1": "Нужна поддержка",
  "2": "Senior-сигнал",
  "3": "Сильный Senior-сигнал",
}

const SCORE_DESCRIPTION_EN: Record<string, string> = {
  na: "There was no fair opportunity to assess this criterion; exclude it from the total score.",
  "0": "The answer contains a material error or unacceptable risk even after follow-up questions.",
  "1": "Shows basic understanding but needs guidance and misses important risks or consequences.",
  "2": "Provides an independent, workable solution with clear assumptions, trade-offs, and validation.",
  "3": "Compares alternatives deeply, anticipates failure and evolution, and accounts for product and team impact.",
}

export function localizeScoreAnchor(anchor: ScoreAnchor, locale: Locale) {
  const key = String(anchor.value)
  return {
    label: locale === "ru" ? SCORE_LABEL_RU[key] || anchor.label : anchor.label,
    description: locale === "en" ? SCORE_DESCRIPTION_EN[key] || anchor.description : anchor.description,
  }
}

const RED_FLAG_RU: Record<string, string> = {
  "Claims ownership but cannot identify personal decisions or actions": "Заявляет об ownership, но не может назвать собственные решения или действия",
  "Repeatedly assigns blame without examining system or process causes": "Регулярно обвиняет других, не анализируя системные или процессные причины",
  "Dismisses material risks after they are made explicit": "Игнорирует существенные риски даже после того, как они явно обозначены",
  "Cannot adapt a proposal when constraints change": "Не способен адаптировать решение при изменении ограничений",
  "Uses demeaning, hostile, or exclusionary communication": "Использует унизительную, враждебную или исключающую коммуникацию",
}

export function localizeRedFlag(flag: string, locale: Locale) {
  return locale === "ru" ? RED_FLAG_RU[flag] || flag : flag
}
