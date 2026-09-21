export const schoolLevels = [
  {
    id: "p5",
    name: "Primary 5",
    shortName: "P5",
  },
  {
    id: "p6",
    name: "Primary 6",
    shortName: "P6",
  },
  {
    id: "p7",
    name: "Primary 7",
    shortName: "P7",
  },
  {
    id: "s1",
    name: "Senior 1",
    shortName: "S1",
  },
  {
    id: "s2",
    name: "Senior 2",
    shortName: "S2",
  },
  {
    id: "s3",
    name: "Senior 3",
    shortName: "S3",
  },
  {
    id: "s4",
    name: "Senior 4",
    shortName: "S4",
  },
  {
    id: "s5",
    name: "Senior 5",
    shortName: "S5",
  },
  {
    id: "s6",
    name: "Senior 6",
    shortName: "S6",
  },
] as const

export type SchoolLevel = (typeof schoolLevels)[number]["id"]

export const difficulties = [
  {
    id: "easy",
    name: "Easy",
  },
  {
    id: "medium",
    name: "Medium",
  },
  {
    id: "hard",
    name: "Hard",
  },
  {
    id: "exam",
    name: "Exam Level",
  },
] as const

export type Difficulty = (typeof difficulties)[number]["id"]