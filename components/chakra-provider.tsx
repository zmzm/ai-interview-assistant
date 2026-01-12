"use client"

import type React from "react"

import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#e6f7f7",
      100: "#b3e6e6",
      200: "#80d5d5",
      300: "#4dc4c4",
      400: "#26b3b3",
      500: "#00a3a3",
      600: "#008282",
      700: "#006262",
      800: "#004141",
      900: "#002121",
    },
    gray: {
      50: "#f7f7f8",
      100: "#e8e8ea",
      200: "#d1d1d5",
      300: "#a9a9b0",
      400: "#81818a",
      500: "#5a5a65",
      600: "#3d3d45",
      700: "#2a2a30",
      800: "#1a1a1f",
      900: "#111114",
      950: "#0a0a0c",
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    mono: `'JetBrains Mono', 'Fira Code', Consolas, monospace`,
  },
  styles: {
    global: {
      body: {
        bg: "gray.950",
        color: "gray.100",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "gray.950",
          _hover: {
            bg: "brand.400",
            _disabled: {
              bg: "brand.500",
            },
          },
          _disabled: {
            opacity: 0.5,
            cursor: "not-allowed",
          },
        },
        outline: {
          borderColor: "gray.700",
          color: "gray.300",
          _hover: {
            bg: "gray.800",
          },
        },
      },
    },
  },
})

export function ChakraProviderWrapper({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
