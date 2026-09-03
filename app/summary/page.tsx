"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Box, Text, Flex, Button, Heading } from "@chakra-ui/react"
import { AlertTriangle, Calendar, Clock, Download, Home } from "lucide-react"
import { Logo } from "@/components/logo"
import { ColorModeButton } from "@/components/ui/color-mode"
import { LanguageToggle } from "@/components/language-toggle"
import type { InterviewTrack } from "@/app/page"
import type { InterviewBlock, InterviewPlan, ScoreValue } from "@/lib/interview-data"
import {
  localizeBlockTitle,
  localizeCriterion,
  localizeQuestionText,
  localizeRedFlag,
  useLanguage,
} from "@/lib/i18n"

interface SummaryData {
  track: NonNullable<InterviewTrack>
  notes: string
  scores: Record<string, ScoreValue>
  redFlags: Record<string, boolean>
  evidence: Record<string, string>
  rubric: InterviewPlan["rubric"]
  blocks: InterviewBlock[]
  coveredQuestionIds: string[]
  date: string
  duration: string
}

function SummaryContent() {
  const router = useRouter()
  const [data, setData] = useState<SummaryData | null>(null)

  const { theme } = useTheme()
  const isLight = theme === "light"
  const { locale, tr } = useLanguage()

  useEffect(() => {
    const storedData = sessionStorage.getItem("interviewSummary")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setData({
        ...parsedData,
        date: new Date(parsedData.date).toLocaleDateString(locale === "ru" ? "ru-RU" : "en-GB"),
      })
    } else {
      // Redirect to home if no data found
      router.push("/")
    }
  }, [locale, router])

  if (!data) {
    return (
      <Box
        h="100vh"
        bg="gray.950"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="gray.400">{tr("Loading summary...", "Загрузка итогов...")}</Text>
      </Box>
    )
  }

  const assessedScores = Object.values(data.scores).filter(
    (score): score is Exclude<ScoreValue, "na"> => typeof score === "number",
  )
  const totalScore = assessedScores.reduce<number>((sum, score) => sum + score, 0)
  const maxScore = assessedScores.length * 3
  const minimumEvidence = Math.ceil((data.rubric.criteria?.length || 0) * 0.6)
  const hasRedFlags = Object.values(data.redFlags).some((flag) => flag)

  // Determine verdict based on score
  const getVerdict = () => {
    if (hasRedFlags) return { text: tr("Review Required", "Требуется обсуждение"), color: "orange.500" }
    if (assessedScores.length < minimumEvidence) return { text: tr("Insufficient Evidence", "Недостаточно данных"), color: "gray.500" }
    const percentage = (totalScore / maxScore) * 100
    if (percentage >= 85) return { text: tr("Strong Hire", "Однозначно нанимать"), color: "green.500" }
    if (percentage >= 70) return { text: tr("Hire", "Нанимать"), color: "teal.500" }
    if (percentage >= 50) return { text: tr("Strong Maybe", "Скорее дополнительная оценка"), color: "orange.500" }
    return { text: tr("No Hire", "Не нанимать"), color: "red.500" }
  }

  const verdict = getVerdict()
  const localizedDuration = data.duration.replace("minutes", tr("minutes", "минут"))

  const exportAsMarkdown = () => {
    let markdown = `# ${tr("Interview Summary", "Итоги интервью")}\n\n`
    markdown += `## ${tr("Interview Overview", "Обзор интервью")}\n`
    markdown += `- **${tr("Track", "Направление")}:** ${data.track.toUpperCase()}\n`
    markdown += `- **${tr("Date", "Дата")}:** ${data.date}\n`
    markdown += `- **${tr("Duration", "Продолжительность")}:** ${localizedDuration}\n\n`

    markdown += `## ${tr("Final Decision", "Итоговое решение")}\n`
    markdown += `**${tr("Verdict", "Вердикт")}:** ${verdict.text}\n\n`
    markdown += `**${tr("Score", "Балл")}:** ${maxScore > 0 ? `${totalScore}/${maxScore}` : tr("Not assessed", "Не оценено")}\n\n`
    if (hasRedFlags) {
      markdown += `⚠️ **${tr("Red Flags Identified", "Обнаружены красные флаги")}**\n\n`
    }

    markdown += `## ${tr("Scoring Rubric Breakdown", "Оценка по критериям")}\n\n`
    data.rubric.criteria?.forEach((criterion) => {
      const localizedCriterion = localizeCriterion(criterion, locale)
      const score = data.scores[criterion.id]
      const evidenceText = data.evidence[criterion.id] || tr("No evidence provided", "Подтверждающие данные не указаны")
      markdown += `### ${localizedCriterion.name}\n`
      markdown += `**${tr("Score", "Балл")}:** ${typeof score === "number" ? `${score}/3` : "N/A"}\n\n`
      markdown += `**${tr("Evidence", "Подтверждение")}:** ${evidenceText}\n\n`
    })

    markdown += `## ${tr("Interview Notes", "Заметки интервью")}\n\n`
    markdown += data.notes || tr("No notes taken.\n\n", "Заметки отсутствуют.\n\n")

    markdown += `## ${tr("Red Flags", "Красные флаги")}\n\n`
    const selectedFlags = Object.entries(data.redFlags)
      .filter(([, checked]) => checked)
      .map(([flag]) => flag)
    if (selectedFlags.length > 0) {
      selectedFlags.forEach((flag) => {
        markdown += `- ${localizeRedFlag(flag, locale)}\n`
      })
    } else {
      markdown += `${tr("No red flags identified.", "Красные флаги не обнаружены.")}\n`
    }

    markdown += `\n## ${tr("Questions Covered", "Пройденные вопросы")}\n\n`
    const coveredQuestions = data.blocks.flatMap((block) =>
      block.questions.filter((question) => data.coveredQuestionIds?.includes(question.id)),
    )
    if (coveredQuestions.length > 0) {
      coveredQuestions.forEach((question) => {
        markdown += `- ${localizeQuestionText(question, locale)}\n`
      })
    } else {
      markdown += `${tr("No questions marked as covered.", "Нет вопросов, отмеченных как пройденные.")}\n`
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
    <Box 
      h="100vh" 
      bg={isLight ? "white" : "gray.950"}
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box
        px="6"
        py="4"
        flexShrink={0}
        bg={isLight ? "white" : "gray.900"}
      >
        <Flex justify="space-between" align="center">
          <Logo clickable={true} />
          <Flex align="center" gap="3">
            <LanguageToggle />
            <ColorModeButton />
          </Flex>
        </Flex>
      </Box>

      {/* Content */}
      <Box flex="1" overflowY="auto" px="8" py="12">
        <Box maxW="1000px" mx="auto">
          <Heading size="4xl" fontWeight="bold" color="gray.50" _light={{ color: "gray.900" }} mb="12" letterSpacing="tight">
            {tr("Interview Summary", "Итоги интервью")}
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
              {tr("Interview Overview", "Обзор интервью")}
            </Text>
            <Flex gap="8" flexWrap="wrap">
              <Flex align="center" gap="2">
                <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"}>
                  {tr("Track:", "Направление:")}
                </Text>
                <Text fontSize="md" color={isLight ? "gray.900" : "gray.100"} fontWeight="semibold">
                  {data.track.toUpperCase()}
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box as={Clock} boxSize="16px" color="teal.500" />
                <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"}>
                  {tr("Duration:", "Продолжительность:")}
                </Text>
                <Text fontSize="md" color={isLight ? "gray.900" : "gray.100"}>
                  {localizedDuration}
                </Text>
              </Flex>
              <Flex align="center" gap="2">
                <Box as={Calendar} boxSize="16px" color="teal.500" />
                <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"}>
                  {tr("Date:", "Дата:")}
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
              {tr("Final Decision", "Итоговое решение")}
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
                    {tr("Red Flags Present", "Есть красные флаги")}
                  </Text>
                </Flex>
              )}
            </Flex>
            <Text fontSize="lg" color={isLight ? "gray.600" : "gray.400"}>
              {tr("Total Score:", "Общий балл:")}{" "}
              <Text as="span" color={isLight ? "gray.900" : "gray.100"} fontWeight="bold" fontSize="xl">
                {maxScore > 0 ? `${totalScore}/${maxScore}` : tr("Not assessed", "Не оценено")}
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
              {tr("Scoring Rubric Breakdown", "Оценка по критериям")}
            </Text>
            <Box display="flex" flexDirection="column" gap="3">
              {data.rubric.criteria?.map((criterion) => {
                const localizedCriterion = localizeCriterion(criterion, locale)
                const score = data.scores[criterion.id]
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
                        {localizedCriterion.name}
                      </Text>
                      <Text fontSize="2xl" fontWeight="bold" color={isLight ? "gray.600" : "gray.400"}>
                        {typeof score === "number" ? `${score}/3` : "N/A"}
                      </Text>
                    </Flex>
                    {evidenceText && (
                      <Text fontSize="sm" color={isLight ? "gray.700" : "gray.400"} lineHeight="tall">
                        <Text as="span" fontWeight="medium" color={isLight ? "gray.600" : "gray.300"}>{tr("Evidence:", "Подтверждение:")}</Text> {evidenceText}
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
                {tr("Interview Notes", "Заметки интервью")}
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
              {tr("Questions Covered", "Пройденные вопросы")}
            </Text>
            <Box display="flex" flexDirection="column" gap="5">
              {data.blocks.map((block) => {
                const coveredQuestions = block.questions.filter((question) =>
                  data.coveredQuestionIds?.includes(question.id),
                )

                if (coveredQuestions.length === 0) return null

                return (
                <Box key={block.id}>
                  <Text fontSize="md" fontWeight="semibold" borderColor={isLight ? "gray.900" : "gray.100"} mb="3">
                    {localizeBlockTitle(block, locale)} <Text as="span" fontSize="sm" color={isLight ? "gray.600" : "gray.500"} fontWeight="normal">({block.timeRange})</Text>
                  </Text>
                  <Box as="ul" pl="5" display="flex" flexDirection="column" gap="2">
                    {coveredQuestions.map((q) => (
                      <Box as="li" key={q.id} fontSize="sm" color={isLight ? "gray.700" : "gray.400"} lineHeight="tall">
                        {localizeQuestionText(q, locale)}
                      </Box>
                    ))}
                  </Box>
                </Box>
                )
              })}
              {!data.coveredQuestionIds?.length && (
                <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"}>
                  {tr("No questions were marked as covered.", "Нет вопросов, отмеченных как пройденные.")}
                </Text>
              )}
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
              {tr("Export as Markdown", "Экспортировать Markdown")}
            </Button>
            <Button
              onClick={() => router.push("/")}
              size="xl"
              height="14"
              px="8"
              bg={isLight ? "white" : "gray.800"}
              borderWidth="2px"
              borderColor={isLight ? "gray.300" : "gray.700"}
              color={isLight ? "gray.900" : "gray.200"}
              fontWeight="semibold"
              _hover={{
                bg: isLight ? "gray.50" : "gray.700",
                borderColor: isLight ? "gray.400" : "gray.600",
                transform: "translateY(-1px)",
              }}
              _active={{ transform: "translateY(0)" }}
              transition="all 0.2s"
            >
              <Box as={Home} boxSize="20px" mr="2" />
              {tr("Start New Interview", "Новое интервью")}
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
