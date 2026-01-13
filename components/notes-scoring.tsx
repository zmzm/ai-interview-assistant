"use client"

import { Box, Text, Flex, Textarea, Separator, Checkbox, RadioGroup } from "@chakra-ui/react"
import { FileText, Star } from "lucide-react"
import { useTheme } from "next-themes"
import type { RubricCriterion } from "@/lib/interview-data"

interface NotesScoringProps {
  notes: string
  onNotesChange: (notes: string) => void
  scores: Record<string, number>
  onScoreChange: (scores: Record<string, number>) => void
  redFlags: Record<string, boolean>
  onRedFlagChange: (redFlags: Record<string, boolean>) => void
  evidence: Record<string, string>
  onEvidenceChange: (evidence: Record<string, string>) => void
  rubric: {
    criteria: RubricCriterion[]
    redFlags: string[]
  }
}

export function NotesScoring({
  notes,
  onNotesChange,
  scores,
  onScoreChange,
  redFlags,
  onRedFlagChange,
  evidence,
  onEvidenceChange,
  rubric,
}: NotesScoringProps) {
  const { theme } = useTheme()
  const isLight = theme === "light"

  const handleScoreChange = (criterionId: string, value: string) => {
    onScoreChange({ ...scores, [criterionId]: Number(value) })
  }

  const handleRedFlagToggle = (flag: string, checked: boolean) => {
    onRedFlagChange({ ...redFlags, [flag]: checked })
  }

  const handleEvidenceChange = (criterionId: string, value: string) => {
    onEvidenceChange({ ...evidence, [criterionId]: value })
  }

  return (
    <Box p="6">
      {/* Notes Section */}
      <Box mb="6">
        <Flex align="center" gap="2" mb="3">
          <Box color="teal.500">
            <FileText size={16} />
          </Box>
          <Text
            fontSize="sm"
            fontWeight="medium"
            textTransform="uppercase"
            letterSpacing="wider"
            color={isLight ? "gray.600" : "gray.400"}
          >
            Interview Notes
          </Text>
        </Flex>
        <Textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Take notes during the interview..."
          rows={8}
          bg={isLight ? "white" : "gray.900"}
          border="1px solid"
          borderColor={isLight ? "gray.300" : "gray.800"}
          color={isLight ? "gray.900" : "gray.200"}
          fontSize="sm"
          _placeholder={{ color: "gray.600" }}
          _focus={{ borderColor: "teal.500", outline: "none" }}
        />
      </Box>

      <Separator borderColor={isLight ? "gray.200" : "gray.800"} mb="6" />

      {/* Scoring Rubric */}
      <Box mb="6">
        <Flex align="center" gap="2" mb="4">
          <Box color="teal.500">
            <Star size={16} />
          </Box>
          <Text
            fontSize="sm"
            fontWeight="medium"
            textTransform="uppercase"
            letterSpacing="wider"
            color={isLight ? "gray.600" : "gray.400"}
          >
            Scoring Rubric
          </Text>
        </Flex>

        <Box display="flex" flexDirection="column" gap="4">
          {rubric.criteria.map((criterion) => (
            <Box
              key={criterion.id}
              p="4"
              borderRadius="md"
              bg={isLight ? "white" : "gray.900"}
              border="1px solid"
              borderColor={isLight ? "gray.200" : "gray.800"}
            >
              <Text fontSize="sm" fontWeight="medium" color={isLight ? "gray.900" : "gray.200"} mb="2">
                {criterion.name}
              </Text>
              <Text fontSize="xs" color={isLight ? "gray.600" : "gray.500"} mb="3">
                {criterion.description}
              </Text>

              <RadioGroup.Root
                value={scores[criterion.id]?.toString() || ""}
                onValueChange={(details) => handleScoreChange(criterion.id, details.value)}
                colorPalette="teal"
                size="sm"
              >
                <Flex gap="3" mb="3">
                  {[0, 1, 2, 3].map((score) => (
                    <RadioGroup.Item key={score} value={score.toString()}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText color={isLight ? "gray.700" : "gray.400"} fontSize="xs">
                        {score}
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </Flex>
              </RadioGroup.Root>

              {/* Evidence input */}
              <Textarea
                value={evidence[criterion.id] || ""}
                onChange={(e) => handleEvidenceChange(criterion.id, e.target.value)}
                placeholder="Evidence notes..."
                rows={2}
                bg={isLight ? "gray.50" : "gray.800"}
                border="1px solid"
                borderColor={isLight ? "gray.300" : "gray.700"}
                color={isLight ? "gray.900" : "gray.300"}
                fontSize="xs"
                _placeholder={{ color: "gray.600" }}
                _focus={{ borderColor: "teal.500", outline: "none" }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Separator borderColor={isLight ? "gray.200" : "gray.800"} mb="6" />

      {/* Red Flags */}
      <Box>
        <Text
          fontSize="sm"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="wider"
          color={isLight ? "gray.600" : "gray.400"}
          mb="3"
        >
          Red Flags
        </Text>
        <Box display="flex" flexDirection="column" gap="2">
          {rubric.redFlags.map((flag) => (
            <Checkbox.Root
              key={flag}
              checked={redFlags[flag] || false}
              onCheckedChange={(details) => handleRedFlagToggle(flag, details.checked === true)}
              colorPalette="red"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>
                <Text fontSize="sm" color={isLight ? "gray.700" : "gray.300"}>
                  {flag}
                </Text>
              </Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
