"use client"

import type { ScoringCriterion, RedFlag } from "@/lib/interview-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ScoringPanelProps {
  criteria: ScoringCriterion[]
  redFlags: RedFlag[]
  notes: string
  onCriteriaUpdate: (criteria: ScoringCriterion[]) => void
  onRedFlagsUpdate: (redFlags: RedFlag[]) => void
  onNotesUpdate: (notes: string) => void
}

const scoreLabels = ["N/A", "Poor", "Fair", "Good", "Strong"]

export function ScoringPanel({
  criteria,
  redFlags,
  notes,
  onCriteriaUpdate,
  onRedFlagsUpdate,
  onNotesUpdate,
}: ScoringPanelProps) {
  const [expandedCriteria, setExpandedCriteria] = useState<string | null>(null)

  const updateScore = (criterionId: string, score: number) => {
    onCriteriaUpdate(criteria.map((c) => (c.id === criterionId ? { ...c, score } : c)))
  }

  const updateEvidence = (criterionId: string, evidence: string) => {
    onCriteriaUpdate(criteria.map((c) => (c.id === criterionId ? { ...c, evidence } : c)))
  }

  const toggleRedFlag = (flagId: string) => {
    onRedFlagsUpdate(redFlags.map((f) => (f.id === flagId ? { ...f, checked: !f.checked } : f)))
  }

  return (
    <div className="flex h-full flex-col">
      {/* Notes Section */}
      <div className="border-b border-border p-4">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Interview Notes</h2>
        <Textarea
          value={notes}
          onChange={(e) => onNotesUpdate(e.target.value)}
          placeholder="Take notes during the interview..."
          className="min-h-[150px] resize-none bg-card text-sm leading-relaxed"
        />
      </div>

      {/* Scoring Rubric */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Scoring Rubric (0-3)
        </h2>
        <div className="space-y-3">
          {criteria.map((criterion) => (
            <Card key={criterion.id} className="border-border bg-card p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{criterion.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{criterion.description}</p>
                </div>

                {/* Score Buttons */}
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((score) => (
                    <Button
                      key={score}
                      onClick={() => updateScore(criterion.id, score)}
                      variant={criterion.score === score ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "flex-1 text-xs",
                        criterion.score === score && "bg-primary text-primary-foreground",
                      )}
                    >
                      {score}
                    </Button>
                  ))}
                </div>

                {/* Evidence Field */}
                <div>
                  <Button
                    onClick={() => setExpandedCriteria(expandedCriteria === criterion.id ? null : criterion.id)}
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-primary hover:bg-transparent"
                  >
                    {expandedCriteria === criterion.id ? "− Hide" : "+ Add"} evidence
                  </Button>

                  {expandedCriteria === criterion.id && (
                    <Textarea
                      value={criterion.evidence}
                      onChange={(e) => updateEvidence(criterion.id, e.target.value)}
                      placeholder="Add specific examples or evidence..."
                      className="mt-2 min-h-[60px] resize-none bg-accent/30 text-xs"
                    />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Red Flags */}
        <div className="mt-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Red Flags</h2>
          <Card className="border-border bg-card p-4">
            <div className="space-y-3">
              {redFlags.map((flag) => (
                <label key={flag.id} className="flex cursor-pointer items-start gap-3 text-sm">
                  <Checkbox checked={flag.checked} onCheckedChange={() => toggleRedFlag(flag.id)} className="mt-0.5" />
                  <span
                    className={cn(
                      "leading-relaxed transition-colors",
                      flag.checked ? "text-destructive font-medium" : "text-foreground",
                    )}
                  >
                    {flag.label}
                  </span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
