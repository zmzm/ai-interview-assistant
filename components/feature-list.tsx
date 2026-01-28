import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react"
import { Clock, MessageSquare, FileText, ClipboardCheck } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "60-Minute Interview Plan",
    description: "Structured timeline with dedicated blocks for each interview phase",
  },
  {
    icon: MessageSquare,
    title: "Guided Questions",
    description: "Curated questions per block tailored to seniority level",
  },
  {
    icon: ClipboardCheck,
    title: "Notes & Scoring",
    description: "Track observations and score against a predefined rubric",
  },
  {
    icon: FileText,
    title: "Interview Summary",
    description: "Generate a structured summary for hiring decisions",
  },
]

export function FeatureList() {
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
      p="6"
    >
      <Text
        fontSize="sm"
        fontWeight="medium"
        textTransform="uppercase"
        letterSpacing="wider"
        color="gray.500"
        _light={{ color: "gray.600" }}
        mb="5"
      >
        What This Tool Does
      </Text>

      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="6">
        {features.map((feature) => {
          const FeatureIcon = feature.icon
          return (
            <Flex key={feature.title} gap="4">
              <Flex
                align="center"
                justify="center"
                w="9"
                h="9"
                flexShrink={0}
                borderRadius="md"
                bg="gray.800"
                _light={{ bg: "gray.800" }}
                color="gray.400"
                _light={{ color: "teal.400" }}
              >
                <FeatureIcon size={16} />
              </Flex>
              <Box>
                <Text fontWeight="medium" color="gray.100" _light={{ color: "gray.900" }} mb="1">
                  {feature.title}
                </Text>
                <Text fontSize="sm" color="gray.400" _light={{ color: "gray.700" }} lineHeight="tall">
                  {feature.description}
                </Text>
              </Box>
            </Flex>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}
