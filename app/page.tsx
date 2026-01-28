"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TrackSelector } from "@/components/track-selector"
import { ColorModeButton } from "@/components/ui/color-mode"
import { Box, Container, Heading, Text, Button, Badge, Flex, SimpleGrid } from "@chakra-ui/react"
import { ArrowRight, Clock, FileCheck, MessageSquare, FileText } from "lucide-react"

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
    <Box minH="100vh" maxH="100vh" bg="gray.950" _light={{ bg: "white" }} overflow="hidden">
      {/* Header */}
      <Box
        borderBottom="1px solid"
        borderColor="gray.800"
        _light={{ borderColor: "gray.200" }}
        px={{ base: "6", lg: "8" }}
        py="4"
      >
        <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
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
      </Box>

      {/* Main Content */}
      <Container maxW="7xl" px={{ base: "6", lg: "8" }} h="calc(100vh - 73px)" display="flex" alignItems="center">
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "12", lg: "16" }} w="full" alignItems="center">
          {/* Left Column - Hero */}
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="1"
              color="gray.50"
              _light={{ color: "gray.900" }}
              mb="6"
            >
              Interview
              <br />
              Assistant
            </Heading>
            <Text fontSize={{ base: "lg", lg: "xl" }} color="gray.400" _light={{ color: "gray.600" }} mb="8" lineHeight="tall" maxW="lg">
              Conduct structured technical interviews for Senior Engineers with guided questions, scoring rubrics, and
              comprehensive summaries
            </Text>

            {/* Quick Features */}
            <SimpleGrid columns={2} gap="4" mb="10">
              <Flex gap="2" align="center">
                <Box color="teal.400" _light={{ color: "teal.600" }}>
                  <Clock size={18} />
                </Box>
                <Text fontSize="sm" color="gray.400" _light={{ color: "gray.700" }}>
                  60-min structure
                </Text>
              </Flex>
              <Flex gap="2" align="center">
                <Box color="teal.400" _light={{ color: "teal.600" }}>
                  <MessageSquare size={18} />
                </Box>
                <Text fontSize="sm" color="gray.400" _light={{ color: "gray.700" }}>
                  Guided questions
                </Text>
              </Flex>
              <Flex gap="2" align="center">
                <Box color="teal.400" _light={{ color: "teal.600" }}>
                  <FileCheck size={18} />
                </Box>
                <Text fontSize="sm" color="gray.400" _light={{ color: "gray.700" }}>
                  Scoring rubric
                </Text>
              </Flex>
              <Flex gap="2" align="center">
                <Box color="teal.400" _light={{ color: "teal.600" }}>
                  <FileText size={18} />
                </Box>
                <Text fontSize="sm" color="gray.400" _light={{ color: "gray.700" }}>
                  Auto summary
                </Text>
              </Flex>
            </SimpleGrid>

            {/* CTA */}
            <Flex gap="4" align="center">
              <Button
                size="xl"
                height="14"
                px="8"
                bg="teal.500"
                color="white"
                fontSize="md"
                fontWeight="semibold"
                _hover={{ bg: "teal.400" }}
                _disabled={{ opacity: 0.5, cursor: "not-allowed", _hover: { bg: "teal.500" } }}
                _light={{
                  bg: "teal.600",
                  _hover: { bg: "teal.700" },
                }}
                disabled={!selectedTrack}
                onClick={handleStartInterview}
              >
                Start Interview
                <ArrowRight size={20} />
              </Button>
              {!selectedTrack && (
                <Text fontSize="sm" color="gray.500" _light={{ color: "gray.600" }}>
                  Select a track to begin
                </Text>
              )}
            </Flex>

            {/* Footer */}
            <Text fontSize="xs" color="gray.600" _light={{ color: "gray.500" }} mt="8">
              Runs locally. No data stored externally.
            </Text>
          </Box>

          {/* Right Column - Track Selection */}
          <Box>
            <Text
              fontSize="xs"
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
        </SimpleGrid>
      </Container>
    </Box>
  )
}
