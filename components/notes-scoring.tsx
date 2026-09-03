"use client"

import { Box, Text, Flex, Textarea, Separator, Checkbox, RadioGroup } from "@chakra-ui/react"
import { FileText, Star } from "lucide-react"
import { useTheme } from "next-themes"
import type { RubricCriterion, ScoreAnchor, ScoreValue } from "@/lib/interview-data"
import { localizeCriterion, localizeRedFlag, localizeScoreAnchor, useLanguage } from "@/lib/i18n"

interface NotesScoringProps {
  notes: string
  onNotesChange: (notes: string) => void
  scores: Record<string, ScoreValue>
  onScoreChange: (scores: Record<string, ScoreValue>) => void
  redFlags: Record<string, boolean>
  onRedFlagChange: (redFlags: Record<string, boolean>) => void
  evidence: Record<string, string>
  onEvidenceChange: (evidence: Record<string, string>) => void
  rubric: {
    criteria: RubricCriterion[]
    redFlags: string[]
    scoreAnchors: ScoreAnchor[]
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
  const { locale, tr } = useLanguage()

  const handleScoreChange = (criterionId: string, value: string) => {
    const score: ScoreValue = value === "na" ? "na" : (Number(value) as ScoreValue)
    onScoreChange({ ...scores, [criterionId]: score })
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
            <FileText size={18} />
          </Box>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wider"
            color={isLight ? "gray.600" : "gray.400"}
          >
            {tr("Interview Notes", "Заметки интервью")}
          </Text>
        </Flex>
        <Textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={tr("Take notes during the interview...", "Фиксируйте наблюдения и конкретные примеры...")}
          rows={8}
          bg={isLight ? "white" : "gray.900"}
          border="1px solid"
          borderColor={isLight ? "gray.300" : "gray.800"}
          color={isLight ? "gray.900" : "gray.200"}
          fontSize="sm"
          borderRadius="lg"
          _placeholder={{ color: "gray.500" }}
          _focus={{ borderColor: "teal.500", outline: "none", shadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
        />
      </Box>

      <Separator borderColor={isLight ? "gray.200" : "gray.800"} mb="6" />

      {/* Scoring Rubric */}
      <Box mb="6">
        <Flex align="center" gap="2" mb="4">
          <Box color="teal.500">
            <Star size={18} />
          </Box>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wider"
            color={isLight ? "gray.600" : "gray.400"}
          >
            {tr("Scoring Rubric", "Критерии оценки")}
          </Text>
        </Flex>

        <Box display="flex" flexDirection="column" gap="3">
          {rubric.criteria.map((criterion) => {
            const localizedCriterion = localizeCriterion(criterion, locale)

            return (
            <Box
              key={criterion.id}
              p="4"
              borderRadius="lg"
              bg={isLight ? "white" : "gray.900"}
              border="1px solid"
              borderColor={isLight ? "gray.200" : "gray.800"}
            >
              <Text fontSize="sm" fontWeight="semibold" color={isLight ? "gray.900" : "gray.100"} mb="2">
                {localizedCriterion.name}
              </Text>
              <Text fontSize="xs" color={isLight ? "gray.600" : "gray.500"} mb="3" lineHeight="relaxed">
                {localizedCriterion.description}
              </Text>

              <RadioGroup.Root
                value={scores[criterion.id]?.toString() || ""}
                onValueChange={(details) => {
                  if (details.value !== null) handleScoreChange(criterion.id, details.value)
                }}
                colorPalette="teal"
                size="sm"
              >
                <Flex gap="3" mb="3" flexWrap="wrap">
                  {rubric.scoreAnchors.map((anchor) => {
                    const localizedAnchor = localizeScoreAnchor(anchor, locale)

                    return (
                    <RadioGroup.Item key={anchor.value} value={anchor.value.toString()}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText color={isLight ? "gray.700" : "gray.400"} fontSize="xs">
                        {anchor.value === "na" ? "N/A" : anchor.value} — {localizedAnchor.label}
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                    )
                  })}
                </Flex>
              </RadioGroup.Root>

              {scores[criterion.id] !== undefined && (
                <Text fontSize="xs" color={isLight ? "gray.600" : "gray.400"} mb="3" lineHeight="relaxed">
                  {(() => {
                    const anchor = rubric.scoreAnchors.find((item) => item.value === scores[criterion.id])
                    return anchor ? localizeScoreAnchor(anchor, locale).description : ""
                  })()}
                </Text>
              )}

              {/* Evidence input */}
              <Textarea
                value={evidence[criterion.id] || ""}
                onChange={(e) => handleEvidenceChange(criterion.id, e.target.value)}
                placeholder={tr("Evidence notes...", "Подтверждающие наблюдения...")}
                rows={2}
                bg={isLight ? "gray.50" : "gray.800"}
                border="1px solid"
                borderColor={isLight ? "gray.300" : "gray.700"}
                color={isLight ? "gray.900" : "gray.300"}
                fontSize="xs"
                borderRadius="md"
                _placeholder={{ color: "gray.500" }}
                _focus={{ borderColor: "teal.500", outline: "none", shadow: "0 0 0 3px rgba(20, 184, 166, 0.1)" }}
              />
            </Box>
            )
          })}
        </Box>
      </Box>

      <Separator borderColor={isLight ? "gray.200" : "gray.800"} mb="6" />

      {/* Red Flags */}
      <Box>
        <Text
          fontSize="xs"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="wider"
          color={isLight ? "gray.600" : "gray.400"}
          mb="3"
        >
          {tr("Red Flags", "Красные флаги")}
        </Text>
        <Text fontSize="xs" color={isLight ? "gray.600" : "gray.500"} mb="3">
          {tr(
            "Mark only observable behavior and capture a concrete example in the notes.",
            "Отмечайте только наблюдаемое поведение и фиксируйте конкретный пример в заметках.",
          )}
        </Text>
        <Box display="flex" flexDirection="column" gap="3">
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
                <Text fontSize="sm" color={isLight ? "gray.700" : "gray.300"} lineHeight="relaxed">
                  {localizeRedFlag(flag, locale)}
                </Text>
              </Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
