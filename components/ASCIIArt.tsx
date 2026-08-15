"use client"

import { useState, useEffect } from "react"

export function ASCIIArt({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          const currentText = text.slice(0, currentIndex + 1).replace(/\\n/g, '\n')
          setDisplayedText(currentText)
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 8)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div className="w-full">
      <div className="hidden sm:block overflow-x-auto">
        <pre className="inline-block max-w-full text-[6px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] font-mono text-emerald-500 dark:text-emerald-400 whitespace-pre animate-pulse">
          {displayedText}
        </pre>
      </div>
      <div className="block sm:hidden">
        <p className="font-mono text-[11px] text-emerald-400">
          [ascii condensed] Best viewed on desktop/laptop
        </p>
      </div>
    </div>
  )
}
