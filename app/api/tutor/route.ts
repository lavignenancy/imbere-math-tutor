import OpenAI from "openai"
import { tutorRequestSchema, tutorResponseSchema } from "@/lib/schema"
import { tutorSystemPrompt } from "@/lib/tutor-prompt"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://openrouter.ai/api/v1",
  timeout: 30000,
  maxRetries: 1,
})

const tutorJsonSchema = {
  type: "object",
  properties: {
    topic: {
      type: "string",
    },
    schoolLevel: {
      type: "string",
    },
    difficulty: {
      type: "string",
    },
    problem: {
      type: "string",
    },
    concept: {
      type: "string",
    },
    steps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          explanation: {
            type: "string",
          },
          expression: {
            type: "string",
          },
        },
        required: ["explanation", "expression"],
        additionalProperties: false,
      },
    },
    finalAnswer: {
      type: "string",
    },
    verification: {
      type: "string",
    },
    practiceQuestion: {
      type: "string",
    },
  },
  required: [
    "topic",
    "schoolLevel",
    "difficulty",
    "problem",
    "concept",
    "steps",
    "finalAnswer",
    "verification",
    "practiceQuestion",
  ],
  additionalProperties: false,
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const parsedRequest = tutorRequestSchema.safeParse(body)

    if (!parsedRequest.success) {
      return Response.json(
        {
          error: "Please enter a mathematics question.",
        },
        {
          status: 400,
        },
      )
    }

    const { question, schoolLevel, difficulty } = parsedRequest.data

    if (!question.trim()) {
      return Response.json(
        {
          error: "Please enter a mathematics question.",
        },
        {
          status: 400,
        },
      )
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "openrouter/free",
      messages: [
        {
          role: "system",
          content: tutorSystemPrompt,
        },
        {
          role: "user",
          content: `
Student school level: ${schoolLevel}
Difficulty: ${difficulty}

Mathematics question:
${question}
`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "math_tutor_response",
          strict: true,
          schema: tutorJsonSchema,
        },
      },
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      return Response.json(
        {
          error: "The tutor did not return a solution. Please try again.",
        },
        {
          status: 502,
        },
      )
    }

    let parsedOutput: unknown

    try {
      parsedOutput = JSON.parse(content)
    } catch {
      return Response.json(
        {
          error: "The tutor returned an invalid solution. Please try again.",
        },
        {
          status: 502,
        },
      )
    }

    const validatedResponse = tutorResponseSchema.safeParse(parsedOutput)

    if (!validatedResponse.success) {
      return Response.json(
        {
          error: "The tutor solution could not be validated. Please try again.",
        },
        {
          status: 502,
        },
      )
    }

    return Response.json(validatedResponse.data)
  } catch (error) {
    console.error("Tutor API error:", error)

    if (error instanceof Error && error.name === "AbortError") {
      return Response.json(
        {
          error:
            "The mathematics service took too long to respond. Please try again.",
        },
        {
          status: 504,
        },
      )
    }

    if (
      error instanceof Error &&
      (error.message.includes("ETIMEDOUT") ||
        error.message.includes("fetch failed") ||
        error.message.includes("Connection error"))
    ) {
      return Response.json(
        {
          error:
            "The mathematics service is temporarily unavailable. Please try again in a moment.",
        },
        {
          status: 503,
        },
      )
    }

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while solving the question.",
      },
      {
        status: 500,
      },
    )
  }
}