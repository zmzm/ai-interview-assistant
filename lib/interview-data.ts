import type { InterviewTrack } from "@/app/page"
import frontendData from "./tracks/fe.json"
import backendData from "./tracks/be.json"
import fullstackData from "./tracks/fs.json"

export interface InterviewBlock {
  id: string
  title: string
  timeRange: string
  duration: string
  goal: string
  selectionMode?: "core_and_optional" | "choose_one"
  instructions?: string
  questions: Question[]
}

export interface Question {
  id: string
  priority?: "core" | "optional"
  text: {
    en: string
    ru: string
  }
  prompts?: string[]
  promptsEn?: string[]
  expectedDirection?: string
  expectedDirectionEn?: string
  artifact?: {
    type: "code_review" | "production_trace" | "architecture" | "migration" | "code_analysis"
    title: string
    content: string
    language?: string
  }
}

export interface RubricCriterion {
  id: string
  name: string
  description: string
}

export type ScoreValue = 0 | 1 | 2 | 3 | "na"

export interface ScoreAnchor {
  value: ScoreValue
  label: string
  description: string
}

export interface InterviewPlan {
  track: InterviewTrack
  durationMinutes: number
  blocks: InterviewBlock[]
  rubric: {
    criteria: RubricCriterion[]
    redFlags: string[]
    scoreAnchors: ScoreAnchor[]
  }
}

export function getInterviewPlan(track: NonNullable<InterviewTrack>): InterviewPlan {
  // Map track names to JSON data
  const trackDataMap = {
    frontend: frontendData,
    backend: backendData,
    fullstack: fullstackData,
  }

  const trackData = trackDataMap[track]

  if (!trackData) {
    throw new Error(`Unknown track: ${track}`)
  }

  return {
    track,
    durationMinutes: trackData.blocks.reduce((total, block) => total + Number.parseInt(block.duration, 10), 0),
    blocks: trackData.blocks as InterviewBlock[],
    rubric: {
      criteria: trackData.rubric.criteria as RubricCriterion[],
      redFlags: trackData.rubric.redFlags,
      scoreAnchors: trackData.rubric.scoreAnchors as ScoreAnchor[],
    },
  }
}
