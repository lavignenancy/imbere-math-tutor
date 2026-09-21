type SolutionStep = {
  explanation: string
  expression?: string
}

type SolutionCardProps = {
  problem: string
  topic: string
  concept: string
  steps: SolutionStep[]
  finalAnswer: string
  verification?: string
  practiceQuestion?: string
}

export default function SolutionCard({
  problem,
  topic,
  concept,
  steps,
  finalAnswer,
  verification,
  practiceQuestion,
}: SolutionCardProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#eadce2] bg-white shadow-[0_16px_50px_rgba(140,25,70,0.08)]">
      <div className="bg-[#8c1946] px-6 py-6 text-white sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#ffb8dc] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#8c1946]">
            {topic}
          </span>

          <span className="text-sm text-white/70">
            Let&apos;s work through it
          </span>
        </div>

        <p className="mt-4 text-lg font-extrabold leading-8">{problem}</p>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
        <div className="rounded-2xl bg-[#fff5fa] p-5">
          <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#8c1946]">
            Understand
          </p>

          <p className="mt-2 text-sm leading-7 text-[#4f4248]">
            {concept}
          </p>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[#fd3db5]" />

            <h2 className="font-brand text-xl font-bold text-[#24161d]">
              Step by step
            </h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ffb8dc]/50 text-sm font-extrabold text-[#8c1946]">
                  {index + 1}
                </div>

                <div className="min-w-0 pt-1">
                  <p className="text-sm leading-7 text-[#4f4248]">
                    {step.explanation}
                  </p>

                  {step.expression && (
                    <div className="mt-3 overflow-x-auto rounded-xl bg-[#f8f5f6] px-4 py-3 font-mono text-sm font-bold text-[#8c1946]">
                      {step.expression}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[#fd3db5] p-6 text-white shadow-[0_12px_35px_rgba(253,61,181,0.2)]">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/75">
            Answer
          </p>

          <p className="mt-2 text-3xl font-extrabold tracking-tight">
            {finalAnswer}
          </p>
        </div>

        {verification && (
          <div className="rounded-2xl border border-[#ffd8c9] bg-[#fff8f4] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#fb6a2c]">
              Check
            </p>

            <p className="mt-2 text-sm leading-7 text-[#594943]">
              {verification}
            </p>
          </div>
        )}

        {practiceQuestion && (
          <div className="rounded-2xl border border-[#eadce2] bg-[#fffdfc] p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#8c1946]">
              Try one yourself
            </p>

            <p className="mt-2 text-sm leading-7 text-[#594943]">
              {practiceQuestion}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}