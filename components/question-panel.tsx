"use client"

import { Box, Text, Flex, Button, SimpleGrid, Separator } from "@chakra-ui/react"
import { MessageSquare, ArrowRight, RefreshCw } from "lucide-react"
import { useTheme } from "next-themes"
import type { InterviewBlock } from "@/lib/interview-data"

interface QuestionPanelProps {
  block: InterviewBlock
  selectedQuestionId: string | null
  onSelectQuestion: (questionId: string | null) => void
  onNextBlock: () => void
  isLastBlock: boolean
}

export function QuestionPanel({
  block,
  selectedQuestionId,
  onSelectQuestion,
  onNextBlock,
  isLastBlock,
}: QuestionPanelProps) {
  const { theme } = useTheme()
  const isLight = theme === "light"
  const selectedQuestion = block.questions.find((q) => q.id === selectedQuestionId)

  return (
    <Box h="full" display="flex" flexDirection="column">
      {/* Block Header - Fixed */}
      <Box
        p="8"
        pb="6"
        flexShrink={0}
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
            bgGradient="to-r"
  gradientFrom="transparent"
  gradientVia="gray.200"
  gradientTo="transparent"
          bgGradient: isLight
            ? "to-r, transparent, gray.200, transparent"
            : "to-r, transparent, gray.800, transparent",
        }}
      >
        <Flex justify="space-between" align="flex-start">
          <Box flex="1">
            <Text fontSize="xs" fontFamily="mono" color={isLight ? "gray.600" : "gray.500"} mb="3" fontWeight="medium">
              {block.timeRange} • {block.duration}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color={isLight ? "gray.900" : "gray.100"} mb="3" letterSpacing="tight">
              {block.title}
            </Text>
            <Text fontSize="md" color={isLight ? "gray.600" : "gray.400"} lineHeight="tall">
              {block.goal}
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
            {isLastBlock ? "Complete" : "Next Block"}
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
              Suggested Questions
            </Text>
            <SimpleGrid columns={1} gap="3">
              {block.questions.map((question) => (
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
                      <Text fontSize="md" fontWeight="semibold" color={isLight ? "gray.900" : "gray.100"} mb="2" lineHeight="tall">
                        {question.text.en}
                      </Text>
                      <Text fontSize="sm" color={isLight ? "gray.600" : "gray.500"} lineHeight="relaxed">
                        {question.text.ru}
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
                Active Question
              </Text>
              <Button
                size="sm"
                variant="ghost"
                color={isLight ? "gray.600" : "gray.400"}
                _hover={{ bg: isLight ? "gray.100" : "gray.800" }}
                onClick={() => onSelectQuestion(null)}
              >
                <RefreshCw size={14} />
                Switch Question
              </Button>
            </Flex>

            <Box
              p="6"
              borderRadius="lg"
              border="2px solid"
              borderColor="teal.500"
              bg={isLight ? "teal.50" : "gray.800"}
              mb="6"
            >
              <Text fontSize="lg" fontWeight="bold" color={isLight ? "gray.900" : "gray.50"} mb="3" lineHeight="tall">
                {selectedQuestion.text.en}
              </Text>
              <Text fontSize="md" color={isLight ? "gray.700" : "gray.300"} lineHeight="relaxed">
                {selectedQuestion.text.ru}
              </Text>
            </Box>

            {selectedQuestion.prompts && selectedQuestion.prompts.length > 0 && (
              <Box mb="6">
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={isLight ? "gray.600" : "gray.500"}
                  mb="4"
                >
                  Follow-up Prompts
                </Text>
                <Box display="flex" flexDirection="column" gap="3">
                  {selectedQuestion.prompts.map((prompt, index) => (
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

            {selectedQuestion.expectedDirection && (
              <Box mb="6">
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={isLight ? "gray.600" : "gray.500"}
                  mb="4"
                >
                  Expected Direction (Reference Only)
                </Text>
                <Box
                  p="5"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={isLight ? "gray.200" : "gray.800"}
                  bg={isLight ? "gray.50" : "gray.900"}
                  boxShadow={isLight ? "sm" : "none"}
                >
                  {selectedQuestion.expectedDirection.split("\n").map((line, index) => (
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
