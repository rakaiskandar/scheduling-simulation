// Define a set of distinct colors for processes
const processColors = [
    "bg-red-200 border-red-400 dark:bg-red-900/30 dark:border-red-700",
    "bg-blue-200 border-blue-400 dark:bg-blue-900/30 dark:border-blue-700",
    "bg-green-200 border-green-400 dark:bg-green-900/30 dark:border-green-700",
    "bg-yellow-200 border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-700",
    "bg-purple-200 border-purple-400 dark:bg-purple-900/30 dark:border-purple-700",
    "bg-pink-200 border-pink-400 dark:bg-pink-900/30 dark:border-pink-700",
    "bg-indigo-200 border-indigo-400 dark:bg-indigo-900/30 dark:border-indigo-700",
    "bg-teal-200 border-teal-400 dark:bg-teal-900/30 dark:border-teal-700",
    "bg-orange-200 border-orange-400 dark:bg-orange-900/30 dark:border-orange-700",
    "bg-cyan-200 border-cyan-400 dark:bg-cyan-900/30 dark:border-cyan-700",
  ]
  
  // Define matching text colors for each process color
  export const processTextColors = [
    "text-red-500 dark:text-red-400",
    "text-blue-500 dark:text-blue-400",
    "text-green-500 dark:text-green-400",
    "text-yellow-500 dark:text-yellow-400",
    "text-purple-500 dark:text-purple-400",
    "text-pink-500 dark:text-pink-400",
    "text-indigo-500 dark:text-indigo-400",
    "text-teal-500 dark:text-teal-400",
    "text-orange-500 dark:text-orange-400",
    "text-cyan-500 dark:text-cyan-400",
  ]
  
  // Get a consistent color based on process ID
  export function getProcessColor(id: number): string {
    return processColors[(id - 1) % processColors.length]
  }
  
  // Get a consistent text color based on process ID
  export function getProcessTextColor(id: number): string {
    return processTextColors[(id - 1) % processTextColors.length]
  }
  
  // Get a character based on process ID
  export function getProcessCharacter(id: number): { name: string; emoji: string } {
    const characters = [
      { name: "robot", emoji: "🤖" },
      { name: "ghost", emoji: "👻" },
      { name: "alien", emoji: "👽" },
      { name: "ninja", emoji: "🥷" },
      { name: "zombie", emoji: "🧟" },
      { name: "pirate", emoji: "🏴‍☠️" },
      { name: "knight", emoji: "🛡️" },
      { name: "wizard", emoji: "🧙" },
      { name: "robot2", emoji: "🦾" },
      { name: "alien2", emoji: "👾" },
    ]
  
    return characters[(id - 1) % characters.length]
  }
  