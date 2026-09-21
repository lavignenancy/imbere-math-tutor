"use client"

import { useState } from "react"
import LevelSelector from "./LevelSelector"
import QuestionInput from "./QuestionInput"
import SolutionCard from "./SolutionCard"

type Solution = {
  topic: string
  schoolLevel: string
  difficulty: string
  problem: string
  concept: string
  steps: {
    explanation: string
    expression?: string
  }[]
  finalAnswer: string
  verification: string
  practiceQuestion?: string
}

export default function Tutor() {
  const [level, setLevel] = useState("s2")
  const [difficulty, setDifficulty] = useState("medium")
  const [question, setQuestion] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [solution, setSolution] = useState<Solution | null>(null)

  async function solveQuestion() {
    if ((!question.trim() && !image) || loading) {
      return
    }

    setLoading(true)
    setError("")
    setSolution(null)

    try {
      const response = await fetch("/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
          schoolLevel: level,
          difficulty,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setSolution(data)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to solve the question.",
      )
    } finally {
      setLoading(false)
    }
  }

  function handleExample(example: string) {
    setQuestion(example)
    setImage(null)
    setSolution(null)
    setError("")
  }

  function startNewQuestion() {
    setQuestion("")
    setImage(null)
    setSolution(null)
    setError("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] text-[#24161d]">
      <header className="border-b border-[#eadce2] bg-white">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            type="button"
            onClick={startNewQuestion}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8c1946] shadow-sm transition group-hover:-rotate-2 group-hover:scale-105">
              <span className="font-brand text-xl font-bold text-white">
                I
              </span>
            </div>

            <div className="text-left">
              <div className="font-brand text-xl font-bold leading-none text-[#8c1946]">
                Imbere
              </div>

              <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#a18f97]">
                Mathematics
              </div>
            </div>
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="#how-it-works"
              className="rounded-xl px-4 py-2 text-sm font-bold text-[#756871] transition hover:bg-[#fff5fa] hover:text-[#8c1946]"
            >
              How it works
            </a>

            <a
              href="#topics"
              className="rounded-xl px-4 py-2 text-sm font-bold text-[#756871] transition hover:bg-[#fff5fa] hover:text-[#8c1946]"
            >
              Topics
            </a>
          </div>
        </div>
      </header>

      {!solution ? (
        <>
          <section className="relative overflow-hidden border-b border-[#eadce2]">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#ffb8dc]/30 blur-3xl" />

            <div className="absolute -right-32 top-24 h-96 w-96 rounded-full bg-[#fb6a2c]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
              <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center justify-center gap-2">
                  <span className="rounded-full bg-[#8c1946] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
                    Primary 5
                  </span>

                  <span className="text-sm font-bold text-[#b5a8ae]">
                    →
                  </span>

                  <span className="rounded-full bg-[#ffb8dc]/50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#8c1946]">
                    Senior 6
                  </span>
                </div>

                <h1 className="font-brand text-center text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[#8c1946] sm:text-7xl">
                  Mathematics should
                  <br />
                  <span className="text-[#fd3db5]">make sense.</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-7 text-[#756871] sm:text-lg">
                  Work through difficult questions, understand the method,
                  and build confidence one problem at a time.
                </p>
              </div>
            </div>
          </section>

          <section className="px-5 py-10 sm:px-8 sm:py-14">
            <div className="mx-auto max-w-5xl">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#fd3db5]">
                    Your workspace
                  </p>

                  <h2 className="font-brand mt-2 text-2xl font-bold text-[#8c1946] sm:text-3xl">
                    Work through a problem
                  </h2>
                </div>

                <span className="hidden text-sm font-bold text-[#a18f97] sm:block">
                  Learn • Practise • Improve
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <aside className="h-fit rounded-3xl border border-[#eadce2] bg-white p-5">
                  <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#8c1946]">
                    Your level
                  </p>

                  <LevelSelector
                    level={level}
                    difficulty={difficulty}
                    onLevelChange={setLevel}
                    onDifficultyChange={setDifficulty}
                  />
                </aside>

                <div>
                  <div className="rounded-[2rem] border border-[#eadce2] bg-white p-5 shadow-[0_18px_60px_rgba(140,25,70,0.08)] sm:p-7">
                    <QuestionInput
                      question={question}
                      image={image}
                      onQuestionChange={setQuestion}
                      onImageChange={setImage}
                      onSolve={solveQuestion}
                      loading={loading}
                      onExample={handleExample}
                    />
                  </div>

                  {error && (
                    <div className="mt-4 rounded-2xl border border-[#ffc7b4] bg-[#fff5f1] p-4 text-sm font-bold leading-6 text-[#9a3b20]">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section
            id="how-it-works"
            className="border-y border-[#eadce2] bg-white px-5 py-16 sm:px-8 sm:py-20"
          >
            <div className="mx-auto max-w-6xl">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#fd3db5]">
                  The Imbere approach
                </p>

                <h2 className="font-brand mt-3 text-3xl font-bold tracking-tight text-[#8c1946] sm:text-5xl">
                  Don't just get the answer.
                  <br />
                  Understand why.
                </h2>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {[
                  {
                    number: "01",
                    title: "Understand",
                    text: "See the idea behind the problem before jumping into calculations.",
                  },
                  {
                    number: "02",
                    title: "Work through it",
                    text: "Follow the important mathematical steps and see why each one works.",
                  },
                  {
                    number: "03",
                    title: "Practise",
                    text: "Try a similar problem so you can test whether you really understood it.",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="rounded-3xl border border-[#eadce2] bg-[#fffaf7] p-7"
                  >
                    <span className="font-brand text-sm font-bold text-[#fb6a2c]">
                      {item.number}
                    </span>

                    <h3 className="font-brand mt-8 text-xl font-bold text-[#8c1946]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#756871]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="topics"
            className="px-5 py-16 sm:px-8 sm:py-20"
          >
            <div className="mx-auto max-w-6xl">
              <div className="text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#fd3db5]">
                  Explore mathematics
                </p>

                <h2 className="font-brand mt-3 text-3xl font-bold text-[#8c1946] sm:text-4xl">
                  Whatever you're learning.
                </h2>
              </div>

              <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
                {[
                  "Arithmetic",
                  "Fractions",
                  "Percentages",
                  "Algebra",
                  "Equations",
                  "Geometry",
                  "Mensuration",
                  "Trigonometry",
                  "Statistics",
                  "Probability",
                  "Functions",
                  "Sequences",
                  "Vectors",
                  "Calculus",
                  "Financial Mathematics",
                  "Word Problems",
                ].map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-[#eadce2] bg-white px-5 py-3 text-sm font-bold text-[#8c1946] shadow-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <footer className="border-t border-[#eadce2] bg-white px-5 py-8 sm:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-brand font-bold text-[#8c1946]">
                Imbere
              </div>

              <p className="text-sm text-[#756871]">
                Mathematics made clearer.
              </p>
            </div>
          </footer>
        </>
      ) : (
        <section className="px-5 pb-20 pt-8 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <button
              type="button"
              onClick={startNewQuestion}
              className="mb-6 flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-extrabold text-[#8c1946] transition hover:bg-[#fff5fa] hover:text-[#fd3db5]"
            >
              <span>←</span>
              New question
            </button>

            <SolutionCard
              problem={solution.problem}
              topic={solution.topic}
              concept={solution.concept}
              steps={solution.steps}
              finalAnswer={solution.finalAnswer}
              verification={solution.verification}
              practiceQuestion={solution.practiceQuestion}
            />
          </div>
        </section>
      )}
    </main>
  )
}