"use client"

import { useRef } from "react"

type ImageUploaderProps = {
  onImageSelected: (file: File) => void
  disabled?: boolean
}

export default function ImageUploader({
  onImageSelected,
  disabled = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (!file.type.startsWith("image/")) {
      return
    }

    onImageSelected(file)
    event.target.value = ""
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 rounded-2xl border border-[#eadce2] bg-white px-4 py-3 text-sm font-bold text-[#8c1946] transition hover:border-[#fd3db5] hover:bg-[#fff5fa] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#ffb8dc]/40 text-[#8c1946]">
          +
        </span>

        Add a photo
      </button>
    </>
  )
}