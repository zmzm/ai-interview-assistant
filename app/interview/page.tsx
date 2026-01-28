"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
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
  const { theme } = useTheme()
  const isLight = theme === "light"

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
    const summaryData = {
      track,
      notes,
      scores,
      redFlags,
      evidence,
      rubric: interviewPlan.rubric,
      blocks: interviewPlan.blocks,
      date: new Date().toISOString(),
      duration: "60 minutes",
    }

    sessionStorage.setItem("interviewSummary", JSON.stringify(summaryData))
    router.push("/summary")
  }

  return (
    <Box h="100vh" bg={isLight ? "gray.50" : "gray.950"} overflow="hidden" display="flex" flexDirection="column">
      <Box
        bg={isLight ? "white" : "gray.900"}
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
              size="md"
              bg="teal.600"
              color="white"
              _hover={{ bg: "teal.500", transform: "translateY(-1px)" }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
              fontWeight="semibold"
              px="6"
            >
              Finish Interview
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Grid templateColumns="280px 1fr 360px" h="100%" gap="0" flex="1" overflow="hidden">
        {/* Left: Timeline */}
        <GridItem
          bg={isLight ? "white" : "gray.900"}
          boxShadow={isLight ? "sm" : "none"}
          borderRight="1px solid"
          borderColor={isLight ? "gray.200" : "gray.800"}
          overflowY="auto"
        >
          <InterviewTimeline
            blocks={interviewPlan.blocks}
            currentBlockIndex={currentBlockIndex}
            onSelectBlock={setCurrentBlockIndex}
          />
        </GridItem>

        {/* Center: Questions */}
        <GridItem 
          bg={isLight ? "gray.50" : "gray.950"}
          overflowY="auto"
          bgGradient="0deg"
          gradientFrom="gray.100"
          gradientVia="gray.50"
          gradientTo="white"
        >
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
          bg={isLight ? "white" : "gray.900"}
          boxShadow={isLight ? "sm" : "none"}
          borderLeft="1px solid"
          borderColor={isLight ? "gray.200" : "gray.800"}
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
    <Suspense fallback={<Box h="100vh" bg="gray.950" />}>
      <InterviewContent />
    </Suspense>
  )
}
