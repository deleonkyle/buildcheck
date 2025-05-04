import { cn } from "@/lib/utils"

interface DiagramProps {
  src: string
  alt: string
  caption?: string
  className?: string
}

export function Diagram({ src, alt, caption, className }: DiagramProps) {
  return (
    <figure className={cn("bg-gray-50 p-3 rounded-md border border-gray-200", className)}>
      <div className="flex justify-center">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="max-w-full h-auto rounded-md object-contain"
          style={{ maxHeight: "250px" }}
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-center mt-2 text-gray-600 italic px-2 break-words">{caption}</figcaption>
      )}
    </figure>
  )
}
