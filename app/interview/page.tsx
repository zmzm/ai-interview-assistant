"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Box, Grid, GridItem } from "@chakra-ui/react"
import { InterviewTimeline } from "@/components/interview-timeline"
import { QuestionPanel } from "@/components/question-panel"
import { NotesScoring } from "@/components/notes-scoring"
import type { InterviewTrack } from "@/app/page"
import { getInterviewPlan } from "@/lib/interview-data"

function InterviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const track = searchParams.get("track") as InterviewTrack

  const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const [scores, setScores] = useState<Record<string, number>>({})
  const [redFlags, setRedFlags] = useState<Record<string, boolean>>({})
  const [evidence, setEvidence] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!track || !["frontend", "backend", "fullstack"].includes(track)) {
      router.push("/")
    }
  }, [track, router])

  if (!track) return null

  const interviewPlan = getInterviewPlan(track)
  const currentBlock = interviewPlan.blocks[currentBlockIndex]

  const handleNextBlock = () => {
    if (currentBlockIndex < interviewPlan.blocks.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1)
      setSelectedQuestionId(null)
    }
  }

  const handleSelectQuestion = (questionId: string | null) => {
    setSelectedQuestionId(questionId)
  }

  const handleScoreChange = (criterion: string, score: number) => {
    setScores((prev) => ({ ...prev, [criterion]: score }))
  }

  const handleRedFlagChange = (criterion: string, checked: boolean) => {
    setRedFlags((prev) => ({ ...prev, [criterion]: checked }))
  }

  const handleEvidenceChange = (criterion: string, text: string) => {
    setEvidence((prev) => ({ ...prev, [criterion]: text }))
  }

  return (
    <Box h="100vh" bg="gray.950" overflow="hidden">
      <Grid templateColumns="280px 1fr 360px" h="100%" gap="0">
        {/* Left: Timeline */}
        <GridItem bg="gray.900" borderRight="1px solid" borderColor="gray.800" overflowY="auto">
          <InterviewTimeline
            blocks={interviewPlan.blocks}
            currentBlockIndex={currentBlockIndex}
            onSelectBlock={setCurrentBlockIndex}
          />
        </GridItem>

        {/* Center: Questions */}
        <GridItem bg="gray.950" overflowY="auto">
          <QuestionPanel
            block={currentBlock}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={handleSelectQuestion}
            onNextBlock={handleNextBlock}
            isLastBlock={currentBlockIndex === interviewPlan.blocks.length - 1}
          />
        </GridItem>

        {/* Right: Notes & Scoring */}
        <GridItem bg="gray.900" borderLeft="1px solid" borderColor="gray.800" overflowY="auto">
          <NotesScoring
            notes={notes}
            onNotesChange={setNotes}
            scores={scores}
            onScoreChange={handleScoreChange}
            redFlags={redFlags}
            onRedFlagChange={handleRedFlagChange}
            evidence={evidence}
            onEvidenceChange={handleEvidenceChange}
            rubric={interviewPlan.rubric}
          />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default function InterviewPage() {
  return (
    <Suspense fallback={<Box h="100vh" bg="gray.950" />}>
      <InterviewContent />
    </Suspense>
  )
}
