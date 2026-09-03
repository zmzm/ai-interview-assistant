"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./color-mode"
import type { ReactNode } from "react"
import { LanguageProvider } from "@/lib/i18n"

export function Provider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
