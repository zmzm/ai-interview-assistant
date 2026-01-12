"use client"

import type { InterviewBlock } from "@/lib/interview-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronRight, Clock } from "lucide-react"

interface InterviewTimelineProps {
  blocks: InterviewBlock[]
  currentBlockId: string
  elapsedMinutes: number
  onBlockSelect: (blockId: string) => void
  onNextBlock: () => void
}

export function InterviewTimeline({
  blocks,
  currentBlockId,
  elapsedMinutes,
  onBlockSelect,
  onNextBlock,
}: InterviewTimelineProps) {
  const currentBlock = blocks.find((b) => b.id === currentBlockId)
  const timeRemaining = currentBlock ? Math.max(0, currentBlock.endMinute - elapsedMinutes) : 0

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Interview Timeline</h2>
        <div className="mt-3 flex items-center gap-2 text-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-mono">{elapsedMinutes} / 60 min</span>
          <span className="ml-auto text-sm text-muted-foreground">{timeRemaining}m left in block</span>
        </div>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {blocks.map((block, index) => {
          const isActive = block.id === currentBlockId
          const isPast = block.endMinute <= elapsedMinutes
          const isCurrent = elapsedMinutes >= block.startMinute && elapsedMinutes < block.endMinute

          return (
            <button
              key={block.id}
              onClick={() => onBlockSelect(block.id)}
              className={cn(
                "w-full rounded-lg border p-3 text-left transition-all",
                isActive && "border-primary bg-accent",
                !isActive && "border-border bg-card hover:border-primary/50 hover:bg-accent/50",
                isPast && !isActive && "opacity-60",
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">{block.title}</h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{block.goal}</p>
                </div>
                {isCurrent && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
                  </div>
                )}
              </div>
              <div className="mt-2 text-xs font-mono text-muted-foreground">{block.timeRange}</div>
            </button>
          )
        })}
      </div>

      <div className="border-t border-border p-4">
        <Button onClick={onNextBlock} className="w-full" size="sm">
          Next Block
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
