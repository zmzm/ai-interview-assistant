"use client"

import { Box, Text, Flex, Badge } from "@chakra-ui/react"
import { Clock, CheckCircle2 } from "lucide-react"
import type { InterviewBlock } from "@/lib/interview-data"

interface InterviewTimelineProps {
  blocks: InterviewBlock[]
  currentBlockIndex: number
  onSelectBlock: (index: number) => void
}

export function InterviewTimeline({ blocks, currentBlockIndex, onSelectBlock }: InterviewTimelineProps) {
  return (
    <Box p="6">
      <Flex align="center" gap="2" mb="6">
        <Box color="teal.500">
          <Clock size={16} />
        </Box>
        <Text
          fontSize="sm"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="wider"
          color="gray.400"
          _light={{ color: "gray.600" }}
        >
          Interview Timeline
        </Text>
      </Flex>

      <Box display="flex" flexDirection="column" gap="2">
        {blocks.map((block, index) => {
          const isCurrent = index === currentBlockIndex
          const isPast = index < currentBlockIndex
          const isFuture = index > currentBlockIndex

          return (
            <Box
              key={block.id}
              as="button"
              onClick={() => onSelectBlock(index)}
              p="4"
              borderRadius="md"
              border="1px solid"
              borderColor={isCurrent ? "teal.500" : isPast ? "gray.700" : "gray.800"}
              _light={{
                borderColor: isCurrent ? "teal.500" : isPast ? "gray.300" : "gray.200",
                bg: isCurrent ? "teal.50" : isPast ? "gray.50" : "white",
              }}
              bg={isCurrent ? "gray.800" : isPast ? "gray.900" : "gray.950"}
              textAlign="left"
              transition="all 0.2s"
              _hover={{ borderColor: isCurrent ? "teal.400" : "gray.700" }}
              _light={{ _hover: { borderColor: isCurrent ? "teal.400" : "gray.300" } }}
              opacity={isFuture ? 0.6 : 1}
            >
              <Flex justify="space-between" align="start" mb="2">
                <Text fontSize="xs" fontFamily="mono" color="gray.500" _light={{ color: "gray.600" }}>
                  {block.timeRange}
                </Text>
                {isPast && (
                  <Box color="teal.500">
                    <CheckCircle2 size={14} />
                  </Box>
                )}
                {isCurrent && (
                  <Badge bg="teal.500" color="white" fontSize="xs" px="2" py="0.5">
                    Now
                  </Badge>
                )}
              </Flex>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={isCurrent ? "gray.100" : "gray.300"}
                _light={{ color: isCurrent ? "gray.900" : "gray.700" }}
                mb="1"
              >
                {block.title}
              </Text>
              <Text fontSize="xs" color="gray.500" _light={{ color: "gray.600" }} lineHeight="tall">
                {block.goal}
              </Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
