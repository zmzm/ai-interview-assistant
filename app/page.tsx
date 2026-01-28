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
      <Container maxW="5xl" px={{ base: "5", lg: "8" }} py={{ base: "6", lg: "8" }} flex="1" display="flex" flexDirection="column">
        {/* Header */}
        <Box mb="6">
          <Flex justify="space-between" align="center" mb="3">
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
            mb="2"
          >
            Interview Assistant
          </Heading>
          <Text fontSize="md" color="gray.400" _light={{ color: "gray.600" }} maxW="2xl" lineHeight="relaxed">
            Structured technical interviews for evaluating Senior Engineer candidates
          </Text>
        </Box>

        {/* Track Selection */}
        <Box mb="5">
          <Text
            fontSize="xs"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wider"
            color="gray.500"
            _light={{ color: "gray.600" }}
            mb="3"
          >
            Select Interview Track
          </Text>
          <TrackSelector selectedTrack={selectedTrack} onSelectTrack={setSelectedTrack} />
        </Box>

        {/* Feature List */}
        <Box mb="5">
          <FeatureList />
        </Box>

        {/* Actions & Footer Combined */}
        <Box mt="auto">
          <Flex gap="3" flexWrap="wrap" align="center" mb="5">
            <Button
              size="lg"
              height="12"
              px="7"
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
              <ArrowRight size={18} />
            </Button>
            {!selectedTrack && (
              <Text fontSize="sm" color="gray.500" _light={{ color: "gray.600" }} fontWeight="medium">
                Select a track to begin
              </Text>
            )}
          </Flex>

          <Box
            pt="4"
            borderTop="1px solid"
            borderColor="gray.800"
            _light={{ borderColor: "gray.200" }}
          >
            <Flex align="center" justify="space-between" gap="4" flexWrap="wrap">
              <Text fontSize="xs" color="gray.600" _light={{ color: "gray.500" }}>
                This tool runs locally. No data is stored or shared externally.
              </Text>
              {selectedTrack && (
                <Badge
                  bg="gray.800"
                  _light={{ bg: "gray.100" }}
                  color="gray.400"
                  _light={{ color: "gray.600" }}
                  fontSize="xs"
                  px="2"
                  py="1"
                  borderRadius="md"
                  fontFamily="mono"
                >
                  {selectedTrack.toUpperCase()} Selected
                </Badge>
              )}
            </Flex>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
