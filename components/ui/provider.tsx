"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import type { ReactNode } from "react"

export function Provider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  )
}
