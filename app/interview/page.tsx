"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Box, Grid, GridItem, Flex, Button } from "@chakra-ui/react"
import { Logo } from "@/components/logo"
import { ColorModeButton } from "@/components/ui/color-mode"
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

  const handleScoreChange = (newScores: Record<string, number>) => {
    setScores(newScores)
  }

  const handleRedFlagChange = (newRedFlags: Record<string, boolean>) => {
    setRedFlags(newRedFlags)
  }

  const handleEvidenceChange = (newEvidence: Record<string, string>) => {
    setEvidence(newEvidence)
  }

  const handleFinishInterview = () => {
    const params = new URLSearchParams({
      track,
      notes,
      scores: JSON.stringify(scores),
      redFlags: JSON.stringify(redFlags),
      evidence: JSON.stringify(evidence),
      rubric: JSON.stringify(interviewPlan.rubric),
      blocks: JSON.stringify(interviewPlan.blocks),
    })
    router.push(`/summary?${params.toString()}`)
  }

  return (
    <Box h="100vh" bg="gray.950" _light={{ bg: "white" }} overflow="hidden" display="flex" flexDirection="column">
      <Box
        bg="gray.900"
        _light={{ bg: "gray.100" }}
        borderBottom="1px solid"
        borderColor="gray.800"
        _light={{ borderColor: "gray.300" }}
        px="6"
        py="4"
        flexShrink={0}
      >
        <Flex justify="space-between" align="center">
          <Logo clickable={true} />
          <Flex align="center" gap="3">
            <ColorModeButton />
            <Button
              onClick={handleFinishInterview}
              size="sm"
              bg="teal.600"
              color="white"
              _hover={{ bg: "teal.500" }}
              fontWeight="semibold"
            >
              Finish Interview
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Grid templateColumns="280px 1fr 360px" h="100%" gap="0" flex="1" overflow="hidden">
        {/* Left: Timeline */}
        <GridItem
          bg="gray.900"
          _light={{ bg: "gray.50" }}
          borderRight="1px solid"
          borderColor="gray.800"
          _light={{ borderColor: "gray.300" }}
          overflowY="auto"
        >
          <InterviewTimeline
            blocks={interviewPlan.blocks}
            currentBlockIndex={currentBlockIndex}
            onSelectBlock={setCurrentBlockIndex}
          />
        </GridItem>

        {/* Center: Questions */}
        <GridItem bg="gray.950" _light={{ bg: "white" }} overflowY="auto">
          <QuestionPanel
            block={currentBlock}
            selectedQuestionId={selectedQuestionId}
            onSelectQuestion={handleSelectQuestion}
            onNextBlock={handleNextBlock}
            isLastBlock={currentBlockIndex === interviewPlan.blocks.length - 1}
          />
        </GridItem>

        {/* Right: Notes & Scoring */}
        <GridItem
          bg="gray.900"
          _light={{ bg: "gray.50" }}
          borderLeft="1px solid"
          borderColor="gray.800"
          _light={{ borderColor: "gray.300" }}
          overflowY="auto"
        >
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
    <Suspense fallback={<Box h="100vh" bg="gray.950" _light={{ bg: "white" }} />}>
      <InterviewContent />
    </Suspense>
  )
}
