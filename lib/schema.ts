import { z } from "zod"

export const tutorRequestSchema = z.object({
  question: z.string().max(5000),
  schoolLevel: z.enum([
    "p5",
    "p6",
    "p7",
    "s1",
    "s2",
    "s3",
    "s4",
    "s5",
    "s6",
  ]),
  difficulty: z.enum(["easy", "medium", "hard", "exam"]),
})

export const tutorResponseSchema = z.object({
  topic: z.string(),
  schoolLevel: z.string(),
  difficulty: z.string(),
  problem: z.string(),
  concept: z.string(),
  steps: z.array(
    z.object({
      explanation: z.string(),
      expression: z.string(),
    }),
  ),
  finalAnswer: z.string(),
  verification: z.string(),
  practiceQuestion: z.string(),
})

export type TutorRequest = z.infer<typeof tutorRequestSchema>
export type TutorResponse = z.infer<typeof tutorResponseSchema>