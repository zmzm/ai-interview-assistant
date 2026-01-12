"use client"

import { useState, useEffect } from "react"
import {
  interviewBlocks,
  initialScoringCriteria,
  initialRedFlags,
  type Question,
  type ScoringCriterion,
  type RedFlag,
} from "@/lib/interview-data"
import { InterviewTimeline } from "@/components/interview-timeline"
import { QuestionSelector } from "@/components/question-selector"
import { ScoringPanel } from "@/components/scoring-panel"

export default function InterviewAssistantPage() {
  const [currentBlockId, setCurrentBlockId] = useState(interviewBlocks[0].id)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [elapsedMinutes, setElapsedMinutes] = useState(0)
  const [notes, setNotes] = useState("")
  const [criteria, setCriteria] = useState<ScoringCriterion[]>(initialScoringCriteria)
  const [redFlags, setRedFlags] = useState<RedFlag[]>(initialRedFlags)

  const currentBlock = interviewBlocks.find((b) => b.id === currentBlockId) || interviewBlocks[0]

  // Simulate time passage (1 minute per 5 seconds for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMinutes((prev) => (prev < 60 ? prev + 1 : prev))
    }, 5000) // 5 seconds = 1 minute in demo

    return () => clearInterval(interval)
  }, [])

  const handleNextBlock = () => {
    const currentIndex = interviewBlocks.findIndex((b) => b.id === currentBlockId)
    if (currentIndex < interviewBlocks.length - 1) {
      setCurrentBlockId(interviewBlocks[currentIndex + 1].id)
      setSelectedQuestion(null)
    }
  }

  const handleBlockSelect = (blockId: string) => {
    setCurrentBlockId(blockId)
    setSelectedQuestion(null)
  }

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question)
  }

  const handleSwitchQuestion = () => {
    setSelectedQuestion(null)
  }

  const handleFollowUp = () => {
    // In a real app, this might show a toast or add a note marker
    console.log("[v0] Follow-up clicked")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Column: Timeline */}
      <div className="w-80 border-r border-border bg-card">
        <InterviewTimeline
          blocks={interviewBlocks}
          currentBlockId={currentBlockId}
          elapsedMinutes={elapsedMinutes}
          onBlockSelect={handleBlockSelect}
          onNextBlock={handleNextBlock}
        />
      </div>

      {/* Center Column: Questions */}
      <div className="flex-1 border-r border-border bg-background">
        <QuestionSelector
          currentBlock={currentBlock}
          selectedQuestion={selectedQuestion}
          onQuestionSelect={handleQuestionSelect}
          onFollowUp={handleFollowUp}
          onSwitchQuestion={handleSwitchQuestion}
          onNextBlock={handleNextBlock}
        />
      </div>

      {/* Right Column: Scoring & Notes */}
      <div className="w-96 bg-card">
        <ScoringPanel
          criteria={criteria}
          redFlags={redFlags}
          notes={notes}
          onCriteriaUpdate={setCriteria}
          onRedFlagsUpdate={setRedFlags}
          onNotesUpdate={setNotes}
        />
      </div>
    </div>
  )
}
