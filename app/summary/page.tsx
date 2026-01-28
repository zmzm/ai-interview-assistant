"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Box, Text, Flex, Button, Heading } from "@chakra-ui/react"
import { AlertTriangle, Calendar, Clock, Download, Home } from "lucide-react"
import { Logo } from "@/components/logo"
import { ColorModeButton } from "@/components/ui/color-mode"
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
  const router = useRouter()
  const [data, setData] = useState<SummaryData | null>(null)

  const { theme } = useTheme()
  const isLight = theme === "light"

  useEffect(() => {
    const storedData = sessionStorage.getItem("interviewSummary")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setData({
        ...parsedData,
        date: new Date(parsedData.date).toLocaleDateString(),
      })
    } else {
      // Redirect to home if no data found
      router.push("/")
    }
  }, [router])

  if (!data) {
    return (
      <Box
        h="100vh"
        bg="gray.950"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="gray.400">Loading summary...</Text>
      </Box>
    )
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
    <Box h="100vh" 
              bg={isLight ? "white" : "gray.900"}
              borderColor={isLight ? "gray.200" : "gray.800"} overflow="hidden" display="flex" flexDirection="column">
      {/* Header */}
      <Box
        bg="gray.900"
        _light={{ bg: "white" }}
        px="6"
        py="4"
        flexShrink={0}
        bg={isLight ? "white" : "gray.900"}
      >
        <Flex justify="space-between" align="center">
          <Logo clickable={true} />
          <ColorModeButton />
        </Flex>
      </Box>

      {/* Content */}
      <Box flex="1" overflowY="auto" px="8" py="12">
        <Box maxW="1000px" mx="auto">
          <Heading size="4xl" fontWeight="bold" color="gray.50" _light={{ color: "gray.900" }} mb="12" letterSpacing="tight">
            Interview Summary
          </Heading>

          {/* Section 1: Interview Overview */}
          <Box
            mb="8"
            p="6"
            borderRadius="xl"
            border="1px solid"
            borderColor={isLight ? "gray.200" : "gray.800"}
            bg={isLight ? "white" : "gray.900"}
            boxShadow={isLight ? "sm" : "none"}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color={isLight ? "gray.600" : "gray.500"}
              mb="5"
            >
              Interview Overview
            </Text>
            <Flex gap="8" flexWrap="wrap">
              <Flex align="center" gap="2">
                <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"}>
                  Track:
                </Text>
                <Text fontSize="md" color={isLight ? "gray.900" : "gray.100"} fontWeight="semibold">
                  {data.track.toUpperCase()}
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box as={Clock} boxSize="16px" color="teal.500" />
                <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"}>
                  Duration:
                </Text>
                <Text fontSize="md" color={isLight ? "gray.900" : "gray.100"}>
                  {data.duration}
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box as={Calendar} boxSize="16px" color="teal.500" />
                <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"}>
                  Date:
                </Text>
                <Text fontSize="md" color={isLight ? "gray.900" : "gray.100"}>
                  {data.date}
                </Text>
              </Flex>
            </Flex>
          </Box>

          {/* Section 2: Final Decision */}
          <Box
            mb="8"
            p="8"
            borderRadius="xl"
            border="2px solid"
            borderColor={verdict.color}
            bg={isLight ? "white" : "gray.900"}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color={isLight ? "gray.600" : "gray.500"}
              mb="6"
            >
              Final Decision
            </Text>
            <Flex align="center" gap="4" mb="5">
              <Text fontSize="4xl" fontWeight="bold" color={verdict.color} letterSpacing="tight">
                {verdict.text}
              </Text>
              {hasRedFlags && (
                <Flex
                  align="center"
                  gap="2"
                  px="3"
                  py="2"
                  borderRadius="lg"
                  border="1px solid"
                  bg={isLight ? "orange.100" : "orange.900"}
                  borderColor={isLight ? "orange.300" : "orange.700"}
                >
                  <Box as={AlertTriangle} boxSize="18px" color={isLight ? "orange.700" : "orange.300"} />
                  <Text fontSize="sm" color={isLight ? "orange.700" : "orange.300"} fontWeight="semibold">
                    Red Flags Present
                  </Text>
                </Flex>
              )}
            </Flex>
            <Text fontSize="lg" color={isLight ? "gray.600" : "gray.400"}>
              Total Score:{" "}
              <Text as="span" color={isLight ? "gray.900" : "gray.100"} fontWeight="bold" fontSize="xl">
                {totalScore}/{maxScore}
              </Text>
            </Text>
          </Box>

          {/* Section 3: Scoring Rubric Breakdown */}
          <Box
            mb="8"
            p="6"
            borderRadius="xl"
            border="1px solid"
            bg={isLight ? "white" : "gray.900"}
            borderColor={isLight ? "gray.200" : "gray.800"}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color={isLight ? "gray.600" : "gray.500"}
              mb="5"
            >
              Scoring Rubric Breakdown
            </Text>
            <Box display="flex" flexDirection="column" gap="3">
              {data.rubric.criteria?.map((criterion: any) => {
                const score = data.scores[criterion.id] || 0
                const evidenceText = data.evidence[criterion.id] || ""
                return (
                  <Box
                    key={criterion.id}
                    p="5"
                    borderRadius="lg"
                    border="1px solid"
                    bg={isLight ? "gray.50" : "gray.800"}
                    borderColor={isLight ? "gray.200" : "gray.700"}
                  >
                    <Flex justify="space-between" align="center" mb="3">
                      <Text fontSize="md" fontWeight="semibold" color={isLight ? "gray.900" : "gray.100"}>
                        {criterion.name}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" color={isLight ? "gray.600" : "gray.400"}>
                        {score}/3
                      </Text>
                    </Flex>
                    {evidenceText && (
                      <Text fontSize="sm" color={isLight ? "gray.700" : "gray.400"} lineHeight="tall">
                        <Text as="span" fontWeight="medium" color={isLight ? "gray.600" : "gray.300"}>Evidence:</Text> {evidenceText}
                      </Text>
                    )}
                  </Box>
                )
              })}
            </Box>
          </Box>

          {/* Section 4: Interview Notes */}
          {data.notes && (
            <Box
              mb="8"
              p="6"
              borderRadius="xl"
              border="1px solid"
              bg={isLight ? "white" : "gray.900"}
              borderColor={isLight ? "gray.200" : "gray.800"}
            >
              <Text
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                color={isLight ? "gray.600" : "gray.500"}
                mb="5"
              >
                Interview Notes
              </Text>
              <Text
                fontSize="sm"
                color={isLight ? "gray.700" : "gray.300"}
                whiteSpace="pre-wrap"
                lineHeight="tall"
              >
                {data.notes}
              </Text>
            </Box>
          )}

          {/* Section 5: Questions Covered */}
          <Box
            mb="8"
            p="6"
            borderRadius="xl"
            border="1px solid"
            bg={isLight ? "white" : "gray.900"}
            borderColor={isLight ? "gray.200" : "gray.800"}
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color={isLight ? "gray.600" : "gray.500"}
              mb="5"
            >
              Questions Covered
            </Text>
            <Box display="flex" flexDirection="column" gap="5">
              {data.blocks.map((block: any) => (
                <Box key={block.id}>
                  <Text fontSize="md" fontWeight="semibold" borderColor={isLight ? "gray.900" : "gray.100"} mb="3">
                    {block.title} <Text as="span" fontSize="sm" color={isLight ? "gray.600" : "gray.500"} fontWeight="normal">({block.timeRange})</Text>
                  </Text>
                  <Box as="ul" pl="5" display="flex" flexDirection="column" gap="2">
                    {block.questions.map((q: any) => (
                      <Box as="li" key={q.id} fontSize="sm" color={isLight ? "gray.700" : "gray.400"} lineHeight="tall">
                        {q.text.en}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Actions */}
          <Flex gap="4" justify="center" mb="8">
            <Button
              onClick={exportAsMarkdown}
              colorPalette="teal"
              size="xl"
              height="14"
              px="8"
              fontWeight="semibold"
              _hover={{ transform: "translateY(-1px)", shadow: "lg" }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
            >
              <Box as={Download} boxSize="20px" mr="2" />
              Export as Markdown
            </Button>
            <Button
              onClick={() => router.push("/")}
              size="xl"
              height="14"
              px="8"
              bg="gray.800"
              _light={{ bg: "white" }}
              borderWidth="2px"
              borderColor="gray.700"
              _light={{ borderColor: "gray.300" }}
              color="gray.200"
              _light={{ color: "gray.900" }}
              fontWeight="semibold"
              _hover={{ bg: "gray.700", borderColor: "gray.600", transform: "translateY(-1px)" }}
              _light={{ _hover: { bg: "gray.50", borderColor: "gray.400" } }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
            >
              <Box as={Home} boxSize="20px" mr="2" />
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
