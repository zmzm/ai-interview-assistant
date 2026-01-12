"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TrackSelector } from "@/components/track-selector"
import { FeatureList } from "@/components/feature-list"
import { Box, Container, Heading, Text, Button, HStack, Badge, Separator } from "@chakra-ui/react"
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
    <Box minH="100vh" maxH="100vh" bg="gray.950" display="flex" flexDirection="column">
      <Container maxW="4xl" px="6" py={{ base: "8", lg: "12" }} flex="1" display="flex" flexDirection="column">
        {/* Header */}
        <Box mb="8">
          <Badge
            bg="gray.800"
            color="gray.400"
            fontSize="xs"
            fontWeight="medium"
            letterSpacing="wider"
            textTransform="uppercase"
            px="2"
            py="1"
            borderRadius="md"
            mb="2"
          >
            Internal Tool
          </Badge>
          <Heading as="h1" size="3xl" fontWeight="semibold" letterSpacing="tight" color="gray.50" mb="3">
            Interview Assistant
          </Heading>
          <Text fontSize="md" color="gray.400" maxW="2xl" lineHeight="relaxed">
            A structured technical interview tool for evaluating Senior Engineer candidates. For interviewers only.
          </Text>
        </Box>

        {/* Track Selection */}
        <Box mb="8">
          <Text
            fontSize="sm"
            fontWeight="medium"
            textTransform="uppercase"
            letterSpacing="wider"
            color="gray.500"
            mb="4"
          >
            Select Interview Track
          </Text>
          <TrackSelector selectedTrack={selectedTrack} onSelectTrack={setSelectedTrack} />
        </Box>

        {/* Feature List */}
        <Box mb="8">
          <FeatureList />
        </Box>

        {/* Actions */}
        <Box mb="6">
          <HStack gap="4" flexWrap="wrap">
            <Button
              size="lg"
              bg="teal.500"
              color="gray.950"
              _hover={{ bg: "teal.400" }}
              _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
              disabled={!selectedTrack}
              onClick={handleStartInterview}
            >
              Start Interview
              <ArrowRight size={16} />
            </Button>
            {!selectedTrack && (
              <Text fontSize="sm" color="gray.500">
                Select a track to begin
              </Text>
            )}
          </HStack>
        </Box>

        {/* Footer */}
        <Box mt="auto">
          <Separator borderColor="gray.800" mb="4" />
          <Text fontSize="sm" color="gray.600">
            This tool runs locally. No data is stored or shared externally.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
