import Link from "next/link"
import { Box, Flex, Text } from "@chakra-ui/react"

export function Logo({ clickable = false }: { clickable?: boolean }) {
  const content = (
    <Flex align="center" gap="2">
      <Box position="relative" w="32px" h="32px">
        {/* Geometric mark representing interview/assessment */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Checkmark in circle - represents assessment/evaluation */}
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" opacity="0.3" />
          <path
            d="M10 16L14 20L22 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
      <Text fontWeight="600" fontSize="lg" letterSpacing="tight">
        Interview Assistant
      </Text>
    </Flex>
  )

  if (clickable) {
    return (
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Box cursor="pointer" _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
          {content}
        </Box>
      </Link>
    )
  }

  return content
}
