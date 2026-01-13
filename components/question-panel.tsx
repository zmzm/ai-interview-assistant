"use client"

import { Box, Text, Flex, Button, SimpleGrid, Separator } from "@chakra-ui/react"
import { MessageSquare, ArrowRight, RefreshCw } from "lucide-react"
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
  const selectedQuestion = block.questions.find((q) => q.id === selectedQuestionId)

  return (
    <Box p="8">
      {/* Block Header */}
      <Box mb="8">
        <Text fontSize="xs" fontFamily="mono" color="gray.500" mb="2">
          {block.timeRange} • {block.duration}
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" color="gray.100" mb="2">
          {block.title}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {block.goal}
        </Text>
      </Box>

      {!selectedQuestion ? (
        <>
          {/* Question Cards */}
          <Box mb="6">
            <Text
              fontSize="sm"
              fontWeight="medium"
              textTransform="uppercase"
              letterSpacing="wider"
              color="gray.500"
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
                  p="4"
                  borderRadius="md"
                  border="1px solid"
                  borderColor="gray.800"
                  bg="gray.900"
                  textAlign="left"
                  transition="all 0.2s"
                  _hover={{ borderColor: "teal.500", bg: "gray.800" }}
                  cursor="pointer" // Added pointer cursor for clickable items
                >
                  <Flex gap="3">
                    <MessageSquare size={16} color="#6b7280" />
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="medium" color="gray.200" mb="1">
                        {question.text.en}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
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
              <Text fontSize="sm" fontWeight="medium" textTransform="uppercase" letterSpacing="wider" color="gray.500">
                Active Question
              </Text>
              <Button
                size="sm"
                variant="ghost"
                color="gray.400"
                _hover={{ bg: "gray.800" }}
                onClick={() => onSelectQuestion(null)}
              >
                <RefreshCw size={14} />
                Switch Question
              </Button>
            </Flex>

            <Box p="5" borderRadius="md" border="1px solid" borderColor="gray.800" bg="gray.900" mb="6">
              <Text fontSize="md" fontWeight="medium" color="gray.100" mb="2">
                {selectedQuestion.text.en}
              </Text>
              <Text fontSize="sm" color="gray.400" mb="4">
                {selectedQuestion.text.ru}
              </Text>
            </Box>

            {selectedQuestion.prompts && selectedQuestion.prompts.length > 0 && (
              <Box mb="6">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="gray.500"
                  mb="4"
                >
                  Follow-up Prompts
                </Text>
                <Box display="flex" flexDirection="column" gap="3">
                  {selectedQuestion.prompts.map((prompt, index) => (
                    <Box key={index} p="5" borderRadius="md" border="1px solid" borderColor="gray.800" bg="gray.900">
                      <Text fontSize="sm" color="gray.300">
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
                  fontSize="sm"
                  fontWeight="medium"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="gray.500"
                  mb="4"
                >
                  Expected Direction (Reference Only)
                </Text>
                <Box p="5" borderRadius="md" border="1px solid" borderColor="gray.800" bg="gray.900">
                  {selectedQuestion.expectedDirection.split("\n").map((line, index) => (
                    <Text
                      key={index}
                      fontSize="sm"
                      color="gray.400"
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

      <Separator borderColor="gray.800" mb="6" />

      {/* Actions */}
      <Flex gap="3">
        <Button
          size="md"
          bg="teal.500"
          color="gray.950"
          _hover={{ bg: "teal.400" }}
          onClick={onNextBlock}
          disabled={isLastBlock}
        >
          {isLastBlock ? "Interview Complete" : "Next Block"}
          {!isLastBlock && <ArrowRight size={16} />}
        </Button>
      </Flex>
    </Box>
  )
}
