"use client"

import type React from "react"

import { IconButton } from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { forwardRef, useEffect, useState } from "react"

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return <ThemeProvider attribute="class" disableTransitionOnChange defaultTheme="dark" {...props} />
}

export function useColorMode() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleColorMode = () => {
    console.log("[v0] Toggling theme from:", theme)
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return {
    colorMode: mounted ? theme : undefined,
    setColorMode: setTheme,
    toggleColorMode,
    systemTheme,
    mounted,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { theme, systemTheme } = useTheme()
  const colorMode = theme === "system" ? systemTheme : theme
  return colorMode === "dark" ? dark : light
}

export const ColorModeButton = forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof IconButton>, "aria-label">
>(function ColorModeButton(props, ref) {
  const { toggleColorMode, colorMode, mounted } = useColorMode()

  if (!mounted) {
    return <IconButton variant="ghost" aria-label="Toggle color mode" size="sm" ref={ref} {...props} />
  }

  const isDark = colorMode === "dark"

  return (
    <IconButton onClick={toggleColorMode} variant="ghost" aria-label="Toggle color mode" size="sm" ref={ref} {...props}>
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </IconButton>
  )
})
