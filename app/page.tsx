"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TrackSelector } from "@/components/track-selector"
import { FeatureList } from "@/components/feature-list"
import { ColorModeButton } from "@/components/ui/color-mode"
import { Box, Container, Heading, Text, Button, HStack, Badge, Separator, Flex } from "@chakra-ui/react"
import { ArrowRight } from "lucide-react"

export type InterviewTrack = "frontend" | "backend" | "fullstack" | null

export default function HomePage() {
  const [selectedTrack, setSelectedTrack] = useState<InterviewTrack>(null)
  const router = useRouter()

  const handleStartInterview = () => {
    if (selectedTrack) {
      router.push(`/interview?track=${selectedTrack}`)
    }
  }

  return (
    <Box minH="100vh" maxH="100vh" bg="gray.950" _light={{ bg: "gray.50" }} display="flex" flexDirection="column" overflow="hidden">
      <Container maxW="5xl" px={{ base: "6", lg: "8" }} py={{ base: "8", lg: "10" }} flex="1" display="flex" flexDirection="column" overflow="auto">
        {/* Header */}
        <Box mb="8">
          <Flex justify="space-between" align="center" mb="4">
            <Badge
              bg="gray.800"
              color="gray.400"
              _light={{ bg: "teal.50", borderColor: "teal.200", border: "1px solid", color: "teal.700" }}
              fontSize="xs"
              fontWeight="semibold"
              letterSpacing="wider"
              textTransform="uppercase"
              px="3"
              py="1.5"
              borderRadius="full"
            >
              Internal Tool
            </Badge>
            <ColorModeButton />
          </Flex>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            lineHeight="1.1"
            color="gray.50"
            _light={{ color: "gray.900" }}
            mb="3"
          >
            Interview Assistant
          </Heading>
          <Text fontSize="md" color="gray.400" _light={{ color: "gray.600" }} maxW="2xl" lineHeight="relaxed">
            A structured technical interview tool for evaluating Senior Engineer candidates. For interviewers only.
          </Text>
        </Box>

        {/* Track Selection */}
        <Box mb="6">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wider"
            color="gray.500"
            _light={{ color: "gray.600" }}
            mb="4"
          >
            Select Interview Track
          </Text>
          <TrackSelector selectedTrack={selectedTrack} onSelectTrack={setSelectedTrack} />
        </Box>

        {/* Feature List */}
        <Box mb="6">
          <FeatureList />
        </Box>

        {/* Actions */}
        <Box mb="8">
          <Flex gap="4" flexWrap="wrap" align="center">
            <Button
              size="lg"
              height="12"
              px="6"
              bg="teal.500"
              color="white"
              fontSize="md"
              fontWeight="semibold"
              _hover={{ bg: "teal.400", transform: "translateY(-1px)", shadow: "lg" }}
              _active={{ transform: "translateY(0)", shadow: "md" }}
              _disabled={{ opacity: 0.4, cursor: "not-allowed" }}
              _light={{
                bg: "teal.600",
                _hover: { bg: "teal.700", transform: "translateY(-1px)", shadow: "lg" },
              }}
              transition="all 0.2s"
              shadow="md"
              disabled={!selectedTrack}
              onClick={handleStartInterview}
            >
              Start Interview
              <ArrowRight size={16} />
            </Button>
            {!selectedTrack && (
              <Text fontSize="sm" color="gray.500" _light={{ color: "gray.600" }}>
                Select a track to begin
              </Text>
            )}
          </Flex>
        </Box>

        {/* Footer */}
        <Box>
          <Separator borderColor="gray.800" _light={{ borderColor: "gray.200" }} mb="4" />
          <Text fontSize="sm" color="gray.500" _light={{ color: "gray.600" }}>
            This tool runs locally. No data is stored or shared externally.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
