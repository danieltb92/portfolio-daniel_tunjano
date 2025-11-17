import { motion } from "motion/react"

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-95" />

      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-fuchsia-500/20 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] rounded-full bg-indigo-500/20 blur-3xl"
      />

      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}
