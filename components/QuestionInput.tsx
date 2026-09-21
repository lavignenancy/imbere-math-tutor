"use client"

import ImageUploader from "./ImageUploader"

type QuestionInputProps = {
  question: string
  image: File | null
  onQuestionChange: (question: string) => void
  onImageChange: (file: File | null) => void
  onSolve: () => void
  loading: boolean
  onExample: (question: string) => void
}

const examples = [
  "Solve 3x + 5 = 20",
  "Find 25% of 480",
  "Find the area of a rectangle 8 cm by 5 cm",
  "Simplify 2(x + 3) - 4",
]

export default function QuestionInput({
  question,
  image,
  onQuestionChange,
  onImageChange,
  onSolve,
  loading,
  onExample,
}: QuestionInputProps) {
  const imagePreview = image ? URL.createObjectURL(image) : null

  return (
    <div>
      <div className="mb-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#8c1946]">
          Your workspace
        </p>

        <h2 className="font-brand mt-2 text-3xl font-bold tracking-tight text-[#8c1946]">
          What are you working on?
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-6 text-[#756871]">
          Type your question, paste it, or take a photo of your work.
        </p>
      </div>

      {imagePreview && (
        <div className="relative mb-4 overflow-hidden rounded-2xl border border-[#eadce2] bg-[#fffaf7]">
          <img
            src={imagePreview}
            alt="Uploaded mathematics question"
            className="max-h-80 w-full object-contain"
          />

          <button
            type="button"
            onClick={() => onImageChange(null)}
            className="absolute right-3 top-3 rounded-full bg-[#8c1946] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#701337]"
          >
            Remove
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-[1.75rem] border border-[#eadce2] bg-white">
        <textarea
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="Write your mathematics question here..."
          rows={6}
          className="w-full resize-none border-0 bg-transparent px-5 py-5 text-base leading-7 text-[#24161d] outline-none placeholder:text-[#b5a8ae] sm:px-6"
        />

        <div className="flex flex-col gap-3 border-t border-[#f0e7eb] bg-[#fffdfc] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ImageUploader
              onImageSelected={onImageChange}
              disabled={loading}
            />

            <span className="hidden text-xs text-[#9b8e94] sm:block">
              JPG, PNG or WebP
            </span>
          </div>

          <button
            type="button"
            onClick={onSolve}
            disabled={loading || (!question.trim() && !image)}
            className="rounded-2xl bg-[#fd3db5] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_8px_25px_rgba(253,61,181,0.2)] transition hover:-translate-y-0.5 hover:bg-[#e92ba3] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? "Working through it..." : "Solve with me →"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-[#756871]">
          Start with an example
        </p>

        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => onExample(example)}
              className="rounded-full border border-[#eadce2] bg-white px-4 py-2 text-xs font-bold text-[#8c1946] transition hover:border-[#fd3db5] hover:bg-[#ffb8dc]/20"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}