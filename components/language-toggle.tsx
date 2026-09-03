"use client"

import { Button, Flex } from "@chakra-ui/react"
import { Languages } from "lucide-react"
import { useLanguage, type Locale } from "@/lib/i18n"

export function LanguageToggle() {
  const { locale, setLocale, tr } = useLanguage()

  return (
    <Flex align="center" gap="1" aria-label={tr("Interface language", "Язык интерфейса")}>
      <Languages size={16} />
      {(["ru", "en"] as Locale[]).map((option) => (
        <Button
          key={option}
          size="xs"
          variant={locale === option ? "solid" : "ghost"}
          colorPalette={locale === option ? "teal" : "gray"}
          onClick={() => setLocale(option)}
          aria-pressed={locale === option}
        >
          {option.toUpperCase()}
        </Button>
      ))}
    </Flex>
  )
}
