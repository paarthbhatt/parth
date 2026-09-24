"use client"

export function NameDisplay({ glitch = false, className = "" }: { glitch?: boolean; className?: string }) {
  return (
    <span
      className={[
        "font-extrabold font-mono tracking-tight",
        // keep sizes consistent across loader and hero for a seamless transition
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl",
        "bg-clip-text text-transparent",
        glitch ? "glitch glitch-once" : "",
        className,
      ].join(" ")}
      data-text="Parth Bhatt"
      style={{ backgroundImage: "linear-gradient(90deg,#06b6d4,#10b981,#22c55e,#06b6d4)" }}
    >
      Parth Bhatt
    </span>
  )
}
