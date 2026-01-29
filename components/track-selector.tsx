"use client"

import type { InterviewTrack } from "@/app/page"
import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react"
import { Monitor, Server, Layers } from "lucide-react"

interface TrackSelectorProps {
  selectedTrack: InterviewTrack
  onSelectTrack: (track: InterviewTrack) => void
}

const tracks = [
  {
    id: "frontend" as const,
    label: "Senior Frontend",
    shortLabel: "FE",
    description: "React, TypeScript, Web Performance, Accessibility",
    icon: Monitor,
  },
  {
    id: "backend" as const,
    label: "Senior Backend",
    shortLabel: "Node.js + NestJS",
    description: "Node.js, NestJS, APIs, Databases, System Design",
    icon: Server,
  },
  {
    id: "fullstack" as const,
    label: "Senior Fullstack",
    shortLabel: "FE + BE",
    description: "Full-stack architecture, End-to-end ownership",
    icon: Layers,
  },
]

export function TrackSelector({ selectedTrack, onSelectTrack }: TrackSelectorProps) {
  return (
    <Flex direction="column" gap="3">
      {tracks.map((track) => {
        const TrackIcon = track.icon
        const isSelected = selectedTrack === track.id

        return (
          <Box
            key={track.id}
            as="button"
            onClick={() => onSelectTrack(isSelected ? null : track.id)}
            position="relative"
            display="flex"
            alignItems="center"
            gap="4"
            textAlign="left"
            p="5"
            borderRadius="xl"
            border="2px solid"
            borderColor={isSelected ? "teal.500" : "gray.800"}
            _light={{
              borderColor: isSelected ? "teal.500" : "gray.200",
              bg: isSelected ? "teal.50" : "gray.50",
              _hover: {
                borderColor: isSelected ? "teal.600" : "gray.300",
                bg: isSelected ? "teal.100" : "white",
              },
            }}
            bg={isSelected ? "gray.800" : "gray.900"}
            transition="all 0.2s"
            _hover={{
              borderColor: isSelected ? "teal.400" : "gray.700",
              bg: isSelected ? "gray.700" : "gray.850",
            }}
            cursor="pointer"
          >
            {/* Icon container */}
            <Flex
              align="center"
              justify="center"
              w="12"
              h="12"
              flexShrink={0}
              borderRadius="lg"
              bg={isSelected ? "teal.500" : "gray.800"}
              color={isSelected ? "white" : "gray.400"}
              _light={{
                bg: isSelected ? "teal.600" : "white",
                color: isSelected ? "white" : "teal.600",
              }}
            >
              <TrackIcon size={24} />
            </Flex>

            {/* Content */}
            <Box flex="1" minW="0">
              <Text fontWeight="bold" color="gray.50" _light={{ color: "gray.900" }} mb="1" fontSize="md">
                {track.label}
              </Text>
              <Text fontSize="sm" color="gray.400" _light={{ color: "gray.600" }} lineHeight="relaxed">
                {track.description}
              </Text>
            </Box>

            {/* Selected checkmark */}
            {isSelected && (
              <Flex
                align="center"
                justify="center"
                w="6"
                h="6"
                borderRadius="full"
                bg="teal.500"
                color="white"
                flexShrink={0}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.6667 3.5L5.25004 9.91667L2.33337 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Flex>
            )}
          </Box>
        )
      })}
    </Flex>
  )
}
