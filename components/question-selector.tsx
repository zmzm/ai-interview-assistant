"use client"

import type { InterviewBlock, Question } from "@/lib/interview-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, RefreshCw } from "lucide-react"

interface QuestionSelectorProps {
  currentBlock: InterviewBlock
  selectedQuestion: Question | null
  onQuestionSelect: (question: Question) => void
  onFollowUp: () => void
  onSwitchQuestion: () => void
  onNextBlock: () => void
}

export function QuestionSelector({
  currentBlock,
  selectedQuestion,
  onQuestionSelect,
  onFollowUp,
  onSwitchQuestion,
  onNextBlock,
}: QuestionSelectorProps) {
  if (!selectedQuestion) {
    return (
      <div className="flex h-full flex-col">
        <div className="border-b border-border p-6">
          <Badge variant="outline" className="mb-3 font-mono text-xs">
            {currentBlock.timeRange}
          </Badge>
          <h1 className="text-2xl font-semibold text-foreground">{currentBlock.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{currentBlock.goal}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Select a Question
          </h2>
          <div className="space-y-3">
            {currentBlock.questions.map((question, index) => (
              <Card
                key={question.id}
                className="cursor-pointer border-border bg-card p-4 transition-all hover:border-primary hover:bg-accent"
                onClick={() => onQuestionSelect(question)}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground leading-relaxed">{question.textEN}</p>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{question.textRU}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-6">
        <Badge variant="outline" className="mb-3 font-mono text-xs">
          {currentBlock.timeRange}
        </Badge>
        <h1 className="text-2xl font-semibold text-foreground">{currentBlock.title}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Question */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Question (EN)</h3>
            <p className="text-base text-foreground leading-relaxed">{selectedQuestion.textEN}</p>
          </div>

          {/* Russian Translation */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Question (RU)</h3>
            <p className="text-base text-foreground leading-relaxed">{selectedQuestion.textRU}</p>
          </div>

          {/* Prompts */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Follow-up Prompts
            </h3>
            <ul className="space-y-2">
              {selectedQuestion.prompts.map((prompt, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="leading-relaxed">{prompt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expected Direction */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Expected Direction (Internal)
            </h3>
            <Card className="border-l-4 border-l-primary bg-accent/30 p-4">
              <p className="text-sm text-foreground leading-relaxed">{selectedQuestion.expectedDirection}</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-border p-4">
        <Button onClick={onFollowUp} variant="outline" size="sm" className="flex-1 bg-transparent">
          Follow-up
        </Button>
        <Button onClick={onSwitchQuestion} variant="outline" size="sm" className="flex-1 bg-transparent">
          <RefreshCw className="mr-2 h-4 w-4" />
          Switch Question
        </Button>
        <Button onClick={onNextBlock} size="sm" className="flex-1">
          Next Block
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
