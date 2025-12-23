export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  requirement: number
  category: "reading" | "writing" | "speaking" | "listening" | "general"
  earned: boolean
}

export interface UserProgress {
  totalPoints: number
  level: number
  badges: Badge[]
  completedActivities: string[]
  streakDays: number
}

export const badges: Badge[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first learning activity",
    icon: "🎯",
    requirement: 1,
    category: "general",
    earned: false,
  },
  {
    id: "reading-novice",
    name: "Reading Novice",
    description: "Complete 5 reading activities",
    icon: "📖",
    requirement: 5,
    category: "reading",
    earned: false,
  },
  {
    id: "code-explorer",
    name: "Code Explorer",
    description: "Earn 100 points",
    icon: "🚀",
    requirement: 100,
    category: "general",
    earned: false,
  },
  {
    id: "vocabulary-master",
    name: "Vocabulary Master",
    description: "Complete 10 vocabulary exercises",
    icon: "💡",
    requirement: 10,
    category: "writing",
    earned: false,
  },
  {
    id: "ai-architect",
    name: "AI Architect",
    description: "Complete all architecture modules",
    icon: "🏗️",
    requirement: 8,
    category: "reading",
    earned: false,
  },
  {
    id: "streak-warrior",
    name: "Streak Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    requirement: 7,
    category: "general",
    earned: false,
  },
  {
    id: "low-code-builder",
    name: "Low-Code Builder",
    description: "Earn 300 points in Low-Code Architecture",
    icon: "🔧",
    requirement: 300,
    category: "general",
    earned: false,
  },
  {
    id: "vibe-master",
    name: "Vibe Master",
    description: "Complete 20 activities in Vibe Coding",
    icon: "✨",
    requirement: 20,
    category: "general",
    earned: false,
  },
  {
    id: "polyglot-learner",
    name: "Polyglot Learner",
    description: "Earn 500 total points across all paths",
    icon: "🌟",
    requirement: 500,
    category: "general",
    earned: false,
  },
  {
    id: "voice-pioneer",
    name: "Voice Pioneer",
    description: "Complete 5 voice recording activities",
    icon: "🎤",
    requirement: 5,
    category: "speaking",
    earned: false,
  },
  {
    id: "writer-extraordinaire",
    name: "Writer Extraordinaire",
    description: "Complete 5 open-text writing activities",
    icon: "✍️",
    requirement: 5,
    category: "writing",
    earned: false,
  },
]

export function calculateLevel(points: number): number {
  return Math.floor(points / 50) + 1
}

export function getPointsForNextLevel(currentPoints: number): number {
  const currentLevel = calculateLevel(currentPoints)
  return currentLevel * 50
}
