"use client"

import { Badge, Box, Text, Flex, Button, SimpleGrid } from "@chakra-ui/react"
import { MessageSquare, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react"
import { useTheme } from "next-themes"
import type { InterviewBlock } from "@/lib/interview-data"
import {
  localizeBlockGoal,
  localizeBlockTitle,
  localizeExpectedDirection,
  localizePrompts,
  localizeQuestionText,
  useLanguage,
} from "@/lib/i18n"

interface QuestionPanelProps {
  block: InterviewBlock
  selectedQuestionId: string | null
  onSelectQuestion: (questionId: string | null) => void
  onNextBlock: () => void
  isLastBlock: boolean
  coveredQuestionIds: string[]
  onToggleCovered: (questionId: string) => void
}

export function QuestionPanel({
  block,
  selectedQuestionId,
  onSelectQuestion,
  onNextBlock,
  isLastBlock,
  coveredQuestionIds,
  onToggleCovered,
}: QuestionPanelProps) {
  const { theme } = useTheme()
  const isLight = theme === "light"
  const { locale, tr } = useLanguage()
  const selectedQuestion = block.questions.find((q) => q.id === selectedQuestionId)
  const selectedPrompts = selectedQuestion ? localizePrompts(selectedQuestion, locale) : []
  const selectedExpectedDirection = selectedQuestion ? localizeExpectedDirection(selectedQuestion, locale) : undefined
  const artifactTypeLabel = selectedQuestion?.artifact
    ? {
        code_review: tr("code review", "ревью кода"),
        production_trace: tr("production trace", "production trace"),
        architecture: tr("architecture", "архитектура"),
        migration: tr("migration", "миграция"),
        code_analysis: tr("code analysis", "анализ кода"),
      }[selectedQuestion.artifact.type]
    : ""
  const orderedQuestions = [...block.questions].sort(
    (left, right) => Number(right.priority === "core") - Number(left.priority === "core"),
  )

  return (
    <Box h="full" display="flex" flexDirection="column">
      {/* Block Header - Fixed */}
      <Box
        p="8"
        pb="6"
        flexShrink={0}
        position="relative"
      >
        <Flex justify="space-between" align="flex-start">
          <Box flex="1">
            <Text fontSize="xs" fontFamily="mono" color={isLight ? "gray.600" : "gray.500"} mb="3" fontWeight="medium">
              {block.timeRange} • {block.duration}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color={isLight ? "gray.900" : "gray.100"} mb="3" letterSpacing="tight">
              {localizeBlockTitle(block, locale)}
            </Text>
            <Text fontSize="md" color={isLight ? "gray.600" : "gray.400"} lineHeight="tall">
              {localizeBlockGoal(block, locale)}
            </Text>
          </Box>
          <Button
            size="lg"
            bg="teal.600"
            color="white"
            _hover={{ bg: "teal.500", transform: "translateY(-1px)" }}
            _active={{ transform: "translateY(0)" }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
            transition="all 0.2s"
            onClick={onNextBlock}
            disabled={isLastBlock}
            px="6"
            fontWeight="semibold"
            flexShrink={0}
          >
            {isLastBlock ? tr("Complete", "Готово") : tr("Next Block", "Следующий блок")}
            {!isLastBlock && <ArrowRight size={18} />}
          </Button>
        </Flex>
      </Box>

      {/* Scrollable Content */}
      <Box flex="1" overflowY="auto" px="8" pb="8" pt="6">
        {!selectedQuestion ? (
          <>
            {/* Question Cards */}
            <Box mb="6">
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wider"
              color={isLight ? "gray.600" : "gray.500"}
              mb="4"
            >
              {tr("Interview Questions", "Вопросы интервью")}
            </Text>
            <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"} mb="4">
              {block.selectionMode === "choose_one"
                ? tr(
                    "Choose exactly one artifact. Give the candidate quiet reading time, then ask them to think aloud.",
                    "Выберите ровно один артефакт. Дайте кандидату время прочитать его, затем попросите рассуждать вслух.",
                  )
                : tr(
                    "Ask every Core question. Use Optional questions only for a relevant deep-dive or remaining time.",
                    "Задайте все Core-вопросы. Optional используйте только для релевантного углубления или если осталось время.",
                  )}
            </Text>
            <SimpleGrid columns={1} gap="3">
              {orderedQuestions.map((question) => (
                <Box
                  key={question.id}
                  as="button"
                  onClick={() => onSelectQuestion(question.id)}
                  p="5"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={isLight ? "gray.200" : "gray.800"}
                  bg={isLight ? "white" : "gray.900"}
                  boxShadow={isLight ? "sm" : "none"}
                  textAlign="left"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "teal.500",
                    transform: "translateY(-2px)",
                    boxShadow: isLight ? "md" : "lg",
                  }}
                  cursor="pointer"
                >
                  <Flex gap="3">
                    <Box color="teal.500" flexShrink={0} mt="0.5">
                      <MessageSquare size={18} />
                    </Box>
                    <Box flex="1">
                      <Flex gap="2" mb="2" align="center">
                        <Badge colorPalette={block.selectionMode === "choose_one" || question.priority === "core" ? "teal" : "gray"} size="sm">
                          {block.selectionMode === "choose_one" ? tr("Option", "Вариант") : question.priority === "core" ? "Core" : "Optional"}
                        </Badge>
                        {coveredQuestionIds.includes(question.id) && (
                          <Flex align="center" gap="1" color="green.500">
                            <CheckCircle2 size={14} />
                            <Text fontSize="xs">{tr("Covered", "Пройден")}</Text>
                          </Flex>
                        )}
                      </Flex>
                      <Text fontSize="md" fontWeight="semibold" color={isLight ? "gray.900" : "gray.100"} mb="2" lineHeight="tall">
                        {localizeQuestionText(question, locale)}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </>
      ) : (
        <>
          {/* Selected Question Detail */}
          <Box mb="6">
            <Flex justify="space-between" align="center" mb="4">
              <Text
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                letterSpacing="wider"
                color="teal.500"
              >
                {tr("Active Question", "Активный вопрос")}
              </Text>
              <Button
                size="sm"
                variant="ghost"
                color={isLight ? "gray.600" : "gray.400"}
                _hover={{ bg: isLight ? "gray.100" : "gray.800" }}
                onClick={() => onSelectQuestion(null)}
              >
                <RefreshCw size={14} />
                {tr("Switch Question", "Сменить вопрос")}
              </Button>
            </Flex>

            <Button
              size="sm"
              mb="4"
              variant={coveredQuestionIds.includes(selectedQuestion.id) ? "solid" : "outline"}
              colorPalette={coveredQuestionIds.includes(selectedQuestion.id) ? "green" : "teal"}
              onClick={() => onToggleCovered(selectedQuestion.id)}
            >
              <CheckCircle2 size={14} />
              {coveredQuestionIds.includes(selectedQuestion.id) ? tr("Covered", "Пройден") : tr("Mark as covered", "Отметить пройденным")}
            </Button>

            <Box
              p="6"
              borderRadius="lg"
              border="2px solid"
              borderColor="teal.500"
              bg={isLight ? "teal.50" : "gray.800"}
              mb="6"
            >
              <Text fontSize="lg" fontWeight="bold" color={isLight ? "gray.900" : "gray.50"} mb="3" lineHeight="tall">
                {localizeQuestionText(selectedQuestion, locale)}
              </Text>
            </Box>

            {selectedQuestion.artifact && (
              <Box mb="6">
                <Flex justify="space-between" align="center" mb="3" gap="3">
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color={isLight ? "gray.600" : "gray.500"}
                  >
                    {tr("Working Artifact", "Рабочий артефакт")}
                  </Text>
                  <Badge colorPalette="purple" size="sm">
                    {artifactTypeLabel}
                  </Badge>
                </Flex>
                <Text fontSize="sm" fontWeight="semibold" color={isLight ? "gray.800" : "gray.200"} mb="2">
                  {selectedQuestion.artifact.title}
                </Text>
                <Box
                  as="pre"
                  p="5"
                  overflowX="auto"
                  whiteSpace="pre-wrap"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={isLight ? "gray.300" : "gray.700"}
                  bg={isLight ? "gray.900" : "black"}
                  color="gray.100"
                  fontFamily="mono"
                  fontSize="xs"
                  lineHeight="tall"
                >
                  {selectedQuestion.artifact.content}
                </Box>
              </Box>
            )}

            {selectedPrompts.length > 0 && (
              <Box mb="6">
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={isLight ? "gray.600" : "gray.500"}
                  mb="4"
                >
                  {tr("Follow-up Prompts", "Уточняющие вопросы")}
                </Text>
                <Box display="flex" flexDirection="column" gap="3">
                  {selectedPrompts.map((prompt, index) => (
                    <Box
                      key={index}
                      p="4"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor={isLight ? "gray.200" : "gray.800"}
                      bg={isLight ? "white" : "gray.900"}
                      boxShadow={isLight ? "sm" : "none"}
                    >
                      <Text fontSize="sm" color={isLight ? "gray.700" : "gray.300"} lineHeight="tall">
                        {prompt}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {selectedExpectedDirection && (
              <Box mb="6">
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={isLight ? "gray.600" : "gray.500"}
                  mb="4"
                >
                  {tr("Evaluation Signals (Not a Checklist)", "Сигналы оценки (не чеклист)")}
                </Text>
                <Box
                  p="5"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={isLight ? "gray.200" : "gray.800"}
                  bg={isLight ? "gray.50" : "gray.900"}
                  boxShadow={isLight ? "sm" : "none"}
                >
                  {selectedExpectedDirection.split("\n").map((line, index) => (
                    <Text
                      key={index}
                      fontSize="sm"
                      color={isLight ? "gray.700" : "gray.400"}
                      lineHeight="tall"
                      mb={line.trim() === "" ? "3" : "0"}
                    >
                      {line || "\u00A0"}
                    </Text>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </>
        )}
      </Box>
    </Box>
  )
}
