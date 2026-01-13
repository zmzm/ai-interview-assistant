"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Box, Text, Flex, Button, Heading } from "@chakra-ui/react"
import { AlertTriangle, Calendar, Clock, Download, Home } from "lucide-react"
import { Logo } from "@/components/logo"
import type { InterviewTrack } from "@/app/page"

interface SummaryData {
  track: InterviewTrack
  notes: string
  scores: Record<string, number>
  redFlags: Record<string, boolean>
  evidence: Record<string, string>
  rubric: any
  blocks: any[]
  date: string
  duration: string
}

function SummaryContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Parse data from URL params
  const data: SummaryData = {
    track: searchParams.get("track") as InterviewTrack,
    notes: searchParams.get("notes") || "",
    scores: JSON.parse(searchParams.get("scores") || "{}"),
    redFlags: JSON.parse(searchParams.get("redFlags") || "{}"),
    evidence: JSON.parse(searchParams.get("evidence") || "{}"),
    rubric: JSON.parse(searchParams.get("rubric") || "{}"),
    blocks: JSON.parse(searchParams.get("blocks") || "[]"),
    date: new Date().toLocaleDateString(),
    duration: "60 minutes",
  }

  // Calculate total score
  const totalScore = Object.values(data.scores).reduce((sum, score) => sum + score, 0)
  const maxScore = data.rubric.criteria?.length * 3 || 12
  const hasRedFlags = Object.values(data.redFlags).some((flag) => flag)

  // Determine verdict based on score
  const getVerdict = () => {
    const percentage = (totalScore / maxScore) * 100
    if (hasRedFlags) return { text: "Strong Maybe", color: "orange.500" }
    if (percentage >= 85) return { text: "Strong Hire", color: "green.500" }
    if (percentage >= 70) return { text: "Hire", color: "teal.500" }
    if (percentage >= 50) return { text: "Strong Maybe", color: "orange.500" }
    return { text: "No Hire", color: "red.500" }
  }

  const verdict = getVerdict()

  const exportAsMarkdown = () => {
    let markdown = `# Interview Summary\n\n`
    markdown += `## Interview Overview\n`
    markdown += `- **Track:** ${data.track.toUpperCase()}\n`
    markdown += `- **Date:** ${data.date}\n`
    markdown += `- **Duration:** ${data.duration}\n\n`

    markdown += `## Final Decision\n`
    markdown += `**Verdict:** ${verdict.text}\n\n`
    markdown += `**Score:** ${totalScore}/${maxScore}\n\n`
    if (hasRedFlags) {
      markdown += `⚠️ **Red Flags Identified**\n\n`
    }

    markdown += `## Scoring Rubric Breakdown\n\n`
    data.rubric.criteria?.forEach((criterion: any) => {
      const score = data.scores[criterion.id] || 0
      const evidenceText = data.evidence[criterion.id] || "No evidence provided"
      markdown += `### ${criterion.name}\n`
      markdown += `**Score:** ${score}/3\n\n`
      markdown += `**Evidence:** ${evidenceText}\n\n`
    })

    markdown += `## Interview Notes\n\n`
    markdown += data.notes || "No notes taken.\n\n"

    markdown += `## Red Flags\n\n`
    const selectedFlags = Object.entries(data.redFlags)
      .filter(([_, checked]) => checked)
      .map(([flag]) => flag)
    if (selectedFlags.length > 0) {
      selectedFlags.forEach((flag) => {
        markdown += `- ${flag}\n`
      })
    } else {
      markdown += `No red flags identified.\n`
    }

    // Download
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `interview-summary-${data.track}-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Box h="100vh" bg="gray.950" overflow="hidden" display="flex" flexDirection="column">
      {/* Header */}
      <Box bg="gray.900" borderBottom="1px solid" borderColor="gray.800" px="6" py="4" flexShrink={0}>
        <Logo clickable={true} />
      </Box>

      {/* Content */}
      <Box flex="1" overflowY="auto" px="8" py="8">
        <Box maxW="900px" mx="auto">
          <Heading size="lg" color="gray.100" mb="8">
            Interview Summary
          </Heading>

          {/* Section 1: Interview Overview */}
          <Box mb="8" p="6" bg="gray.900" borderRadius="lg" border="1px solid" borderColor="gray.800">
            <Text
              fontSize="sm"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wider"
              color="gray.400"
              mb="4"
            >
              Interview Overview
            </Text>
            <Flex gap="6" flexWrap="wrap">
              <Flex align="center" gap="2">
                <Text fontSize="sm" color="gray.500">
                  Track:
                </Text>
                <Text fontSize="sm" color="gray.200" fontWeight="medium">
                  {data.track.toUpperCase()}
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Clock size={14} color="#6b7280" />
                <Text fontSize="sm" color="gray.500">
                  Duration:
                </Text>
                <Text fontSize="sm" color="gray.200">
                  {data.duration}
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Calendar size={14} color="#6b7280" />
                <Text fontSize="sm" color="gray.500">
                  Date:
                </Text>
                <Text fontSize="sm" color="gray.200">
                  {data.date}
                </Text>
              </Flex>
            </Flex>
          </Box>

          {/* Section 2: Final Decision */}
          <Box mb="8" p="6" bg="gray.900" borderRadius="lg" border="1px solid" borderColor="gray.800">
            <Text
              fontSize="sm"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wider"
              color="gray.400"
              mb="4"
            >
              Final Decision
            </Text>
            <Flex align="center" gap="4" mb="4">
              <Text fontSize="2xl" fontWeight="bold" color={verdict.color}>
                {verdict.text}
              </Text>
              {hasRedFlags && (
                <Flex
                  align="center"
                  gap="2"
                  px="3"
                  py="1"
                  bg="orange.900"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="orange.700"
                >
                  <AlertTriangle size={16} color="#f59e0b" />
                  <Text fontSize="xs" color="orange.300" fontWeight="medium">
                    Red Flags Present
                  </Text>
                </Flex>
              )}
            </Flex>
            <Text fontSize="sm" color="gray.400">
              Total Score:{" "}
              <Text as="span" color="gray.200" fontWeight="medium">
                {totalScore}/{maxScore}
              </Text>
            </Text>
          </Box>

          {/* Section 3: Scoring Rubric Breakdown */}
          <Box mb="8" p="6" bg="gray.900" borderRadius="lg" border="1px solid" borderColor="gray.800">
            <Text
              fontSize="sm"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wider"
              color="gray.400"
              mb="4"
            >
              Scoring Rubric Breakdown
            </Text>
            <Box display="flex" flexDirection="column" gap="4">
              {data.rubric.criteria?.map((criterion: any) => {
                const score = data.scores[criterion.id] || 0
                const evidenceText = data.evidence[criterion.id] || ""
                return (
                  <Box
                    key={criterion.id}
                    p="4"
                    bg="gray.950"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.800"
                  >
                    <Flex justify="space-between" align="center" mb="2">
                      <Text fontSize="sm" fontWeight="medium" color="gray.200">
                        {criterion.name}
                      </Text>
                      <Text fontSize="lg" fontWeight="bold" color="teal.400">
                        {score}/3
                      </Text>
                    </Flex>
                    {evidenceText && (
                      <Text fontSize="xs" color="gray.500" mt="2">
                        Evidence: {evidenceText}
                      </Text>
                    )}
                  </Box>
                )
              })}
            </Box>
          </Box>

          {/* Section 4: Interview Notes */}
          {data.notes && (
            <Box mb="8" p="6" bg="gray.900" borderRadius="lg" border="1px solid" borderColor="gray.800">
              <Text
                fontSize="sm"
                fontWeight="medium"
                textTransform="uppercase"
                letterSpacing="wider"
                color="gray.400"
                mb="4"
              >
                Interview Notes
              </Text>
              <Text fontSize="sm" color="gray.300" whiteSpace="pre-wrap" lineHeight="tall">
                {data.notes}
              </Text>
            </Box>
          )}

          {/* Section 5: Questions Covered */}
          <Box mb="8" p="6" bg="gray.900" borderRadius="lg" border="1px solid" borderColor="gray.800">
            <Text
              fontSize="sm"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wider"
              color="gray.400"
              mb="4"
            >
              Questions Covered
            </Text>
            <Box display="flex" flexDirection="column" gap="4">
              {data.blocks.map((block: any) => (
                <Box key={block.id}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.200" mb="2">
                    {block.title} ({block.timeRange})
                  </Text>
                  <Box as="ul" pl="5" display="flex" flexDirection="column" gap="1">
                    {block.questions.map((q: any) => (
                      <Box as="li" key={q.id} fontSize="xs" color="gray.500">
                        {q.text.en}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Actions */}
          <Flex gap="3" justify="center">
            <Button onClick={exportAsMarkdown} colorPalette="teal" size="lg" leftIcon={<Download size={18} />}>
              Export as Markdown
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              size="lg"
              leftIcon={<Home size={18} />}
              borderColor="gray.700"
              color="gray.300"
              _hover={{ bg: "gray.800" }}
            >
              Start New Interview
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default function SummaryPage() {
  return <SummaryContent />
}
