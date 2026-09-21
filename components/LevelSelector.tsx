"use client"

import { difficulties, schoolLevels } from "@/lib/levels"

type LevelSelectorProps = {
  level: string
  difficulty: string
  onLevelChange: (level: string) => void
  onDifficultyChange: (difficulty: string) => void
}

export default function LevelSelector({
  level,
  difficulty,
  onLevelChange,
  onDifficultyChange,
}: LevelSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-[#8c1946]">
          My class
        </label>

        <select
          value={level}
          onChange={(event) => onLevelChange(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-[#eadce2] bg-[#fffdfc] px-4 py-3.5 text-sm font-bold text-[#24161d] outline-none transition focus:border-[#fd3db5] focus:ring-4 focus:ring-[#ffb8dc]/30"
        >
          {schoolLevels.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-extrabold uppercase tracking-[0.14em] text-[#8c1946]">
          Difficulty
        </label>

        <select
          value={difficulty}
          onChange={(event) => onDifficultyChange(event.target.value)}
          className="w-full appearance-none rounded-2xl border border-[#eadce2] bg-[#fffdfc] px-4 py-3.5 text-sm font-bold text-[#24161d] outline-none transition focus:border-[#fd3db5] focus:ring-4 focus:ring-[#ffb8dc]/30"
        >
          {difficulties.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}