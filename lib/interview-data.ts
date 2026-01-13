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
    blocks: trackData.blocks as InterviewBlock[],
    rubric: {
      criteria: trackData.rubric.criteria as RubricCriterion[],
      redFlags: trackData.rubric.redFlags,
    },
  }
}
