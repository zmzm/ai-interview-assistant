"use client"

import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react"
import { Clock, MessageSquare, FileText, ClipboardCheck } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

const features = [
  {
    icon: Clock,
    title: "60–90 Minute Interview Plans",
    titleRu: "Планы интервью на 60–90 минут",
    description: "Track-specific timelines with dedicated blocks for each interview phase",
    descriptionRu: "Отдельный тайминг для каждого направления и этапа интервью",
  },
  {
    icon: MessageSquare,
    title: "Guided Questions",
    titleRu: "Вопросы с подсказками",
    description: "Curated questions per block tailored to seniority level",
    descriptionRu: "Подобранные вопросы и follow-up prompts уровня Senior",
  },
  {
    icon: ClipboardCheck,
    title: "Notes & Scoring",
    titleRu: "Заметки и оценка",
    description: "Track observations and score against a predefined rubric",
    descriptionRu: "Фиксация наблюдений и оценка по единой шкале",
  },
  {
    icon: FileText,
    title: "Interview Summary",
    titleRu: "Итог интервью",
    description: "Generate a structured summary for hiring decisions",
    descriptionRu: "Структурированный отчёт для принятия решения",
  },
]

export function FeatureList() {
  const { locale, tr } = useLanguage()

  return (
    <Box
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.800"
      _light={{
        borderColor: "gray.300",
        bg: "white",
        shadow: "sm",
      }}
      bg="gray.900"
      p="5"
    >
      <Text
        fontSize="xs"
        fontWeight="semibold"
        textTransform="uppercase"
        letterSpacing="wider"
        color="gray.500"
        _light={{ color: "gray.600" }}
        mb="4"
      >
        {tr("What This Tool Does", "Возможности инструмента")}
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
        {features.map((feature) => {
          const FeatureIcon = feature.icon
          return (
            <Flex key={feature.title} gap="3">
              <Flex
                align="center"
                justify="center"
                w="8"
                h="8"
                flexShrink={0}
                borderRadius="md"
                bg="gray.800"
                color="gray.400"
                _light={{
                  bg: "teal.100",
                  color: "teal.700",
                }}
              >
                <FeatureIcon size={14} />
              </Flex>
              <Box flex="1" minW="0">
                <Text fontWeight="semibold" color="gray.100" _light={{ color: "gray.900" }} mb="0.5" fontSize="sm">
                  {locale === "ru" ? feature.titleRu : feature.title}
                </Text>
                <Text fontSize="xs" color="gray.400" _light={{ color: "gray.700" }} lineHeight="relaxed">
                  {locale === "ru" ? feature.descriptionRu : feature.description}
                </Text>
              </Box>
            </Flex>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}
