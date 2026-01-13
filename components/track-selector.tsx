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
    <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4">
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
            flexDirection="column"
            alignItems="flex-start"
            textAlign="left"
            p="5"
            borderRadius="lg"
            border="1px solid"
            borderColor={isSelected ? "teal.500" : "gray.800"}
            _light={{
              borderColor: isSelected ? "teal.500" : "gray.300",
              bg: "white",
              shadow: isSelected ? "md" : "sm",
              _hover: {
                shadow: "md",
              },
            }}
            bg="gray.900"
            transition="all 0.2s"
            _hover={{
              borderColor: isSelected ? "teal.400" : "gray.700",
              _light: {
                borderColor: isSelected ? "teal.400" : "gray.400",
              },
            }}
            cursor="pointer"
          >
            {/* Icon container */}
            <Flex
              align="center"
              justify="center"
              w="10"
              h="10"
              mb="4"
              borderRadius="md"
              bg={isSelected ? "teal.500" : "gray.800"}
              _light={{ bg: isSelected ? "teal.500" : "teal.50" }}
              color={isSelected ? "gray.950" : "gray.400"}
              _light={{ color: isSelected ? "white" : "teal.600" }}
            >
              <TrackIcon size={20} />
            </Flex>

            {/* Title */}
            <Text fontWeight="medium" color="gray.100" _light={{ color: "gray.900" }} mb="1">
              {track.label}
            </Text>

            {/* Short label */}
            <Text fontSize="xs" fontFamily="mono" color="gray.500" _light={{ color: "gray.600" }} mb="2">
              {track.shortLabel}
            </Text>

            {/* Description */}
            <Text fontSize="sm" color="gray.400" _light={{ color: "gray.700" }} lineHeight="tall">
              {track.description}
            </Text>

            {/* Selected indicator */}
            {isSelected && <Box position="absolute" top="3" right="3" w="2" h="2" borderRadius="full" bg="teal.500" />}
          </Box>
        )
      })}
    </SimpleGrid>
  )
}
