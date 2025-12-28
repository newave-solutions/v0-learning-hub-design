# AI Learning Hub - Interactive Learning Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/newave-solutions-projects/v0-learning-hub-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/pgG7kL2Sham)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)

## 🎯 Project Overview

AI Learning Hub is an interactive educational platform designed to teach developers how to effectively work with AI tools in the modern development landscape. The platform uses a comprehensive learning methodology that combines reading, practical exercises, quizzes, and interactive activities with gamification elements to maintain learner engagement.

### Key Features

- **📚 Four Comprehensive Learning Paths**: Structured curriculum covering BS Detection, AI Orchestration, Hybrid Workflow, and AI Tools Mastery
- **🎮 Gamification System**: Points, badges, levels, and streak tracking to motivate continuous learning
- **🔄 Progress Persistence**: LocalStorage-based progress tracking that survives page refreshes
- **📱 Responsive Design**: Mobile-first design that works seamlessly across all devices
- **♿ Accessibility**: Built with accessibility in mind using Radix UI components
- **🎨 Modern UI**: Beautiful dark theme with Tailwind CSS and shadcn/ui components

## 🏗️ Architecture

### Technology Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9 with custom animations
- **UI Components**: Radix UI primitives + shadcn/ui
- **Icons**: Lucide React
- **Markdown**: React Markdown for content rendering
- **Analytics**: Vercel Analytics

### Project Structure

```
v0-learning-hub-design/
├── app/                          # Next.js App Router pages
│   ├── learn/                    # Learning path routes
│   │   └── [pathId]/            # Dynamic path pages
│   │       ├── page.tsx         # Path overview page
│   │       └── [moduleId]/      # Module pages
│   │           └── page.tsx     # Module activities page
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home/dashboard page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── learning/                # Learning activity components
│   │   ├── expandable-activity.tsx     # Expandable cards with tracking
│   │   ├── expandable-card.tsx         # Individual expandable card
│   │   ├── image-vocabulary.tsx        # Image-based vocab matching
│   │   ├── learning-path-client.tsx    # Path overview UI
│   │   ├── module-client.tsx           # Module activities renderer
│   │   ├── open-text-activity.tsx      # Written response activity
│   │   ├── quiz-card.tsx               # Multiple choice quizzes
│   │   ├── reading-passage.tsx         # Reading comprehension
│   │   ├── video-lesson.tsx            # Video content
│   │   ├── vocabulary-drag-drop.tsx    # Drag-drop vocabulary
│   │   └── voice-recording-activity.tsx # Speaking practice
│   ├── gamification/            # Gamification components
│   │   ├── badge-display.tsx    # Badge showcase
│   │   ├── points-toast.tsx     # Point notifications
│   │   └── progress-bar.tsx     # Level progress bar
│   └── ui/                      # Base UI components (shadcn/ui)
├── lib/                         # Utilities and context
│   ├── auth-context.tsx         # Authentication context
│   ├── gamification.ts          # Badge and level logic
│   ├── learning-content.ts      # All learning path data
│   ├── progress-context.tsx     # Progress tracking context
│   └── utils.ts                 # Utility functions
└── hooks/                       # Custom React hooks
    └── use-toast.ts             # Toast notification hook
```

## 🎓 Learning Methodology

See [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for detailed information about the teaching methodology and learning framework.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or npm/yarn/pnpm
- Modern web browser with JavaScript enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/newave-solutions/v0-learning-hub-design.git
cd v0-learning-hub-design
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

### Authentication Setup

The application includes authentication pages with OAuth and email/password support. For detailed setup instructions, see [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md#-authentication--security).

**Quick Setup:**

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Configure Google OAuth (optional):
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add credentials to `.env.local`

3. Generate NextAuth secret:
```bash
openssl rand -base64 32
```
   - Add the generated secret to `.env.local` as `NEXTAUTH_SECRET`

**Note**: The current implementation uses mock authentication for demonstration. For production deployment, follow the complete setup guide in PROJECT_OVERVIEW.md.

## 📖 Learning Paths

### Phase 1: The BS Detector (280 XP)
Learn to identify when AI is hallucinating, writing insecure code, or making architectural mistakes. Master the fundamentals needed to audit AI output.

**Modules:**
- Code Literacy for the AI Era (85 XP)
- Security Fundamentals (90 XP)  
- System Design Basics (95 XP)

### Phase 2: AI Orchestration (270 XP)
Move from chatting with AI to engineering with it. Master context engineering, model selection, and professional AI workflows.

**Modules:**
- Context Engineering Mastery (90 XP)
- Model Routing & AI Selection (100 XP)
- Vibe Coding Maturity (85 XP)

### Phase 3: Hybrid Workflow (260 XP)
Prevent skill atrophy through deliberate practice. Learn to work both with and without AI assistance.

**Modules:**
- Understanding the Junior Gap (75 XP)
- The Sandwich Method (80 XP)
- No-AI Friday: Manual Practice (90 XP)

### Phase 4: AI Tools Mastery (270 XP)
Hands-on practice with specific AI coding tools, platforms, and automation systems.

**Modules:**
- Vibe Coding Platforms (85 XP)
- AI Code Editors (90 XP)
- Automation & AI Agents (80 XP)

## 🎮 Gamification Features

### Points & Levels
- Earn points by completing activities
- Level up every 50 points
- Track your progress on the dashboard

### Badges
- **First Steps**: Complete your first activity
- **Code Explorer**: Earn 100 points
- **Reading Novice**: Complete 5 reading activities
- **Vocabulary Master**: Complete 10 vocabulary exercises
- **Streak Warrior**: Maintain a 7-day learning streak
- And 6 more badges to unlock!

### Progress Tracking
- LocalStorage-based persistence
- Module completion tracking
- Activity completion status
- Daily streak tracking

## 🔧 Activity Types

The platform supports 9 different activity types:

1. **Reading Passages** - Content with markdown support
2. **Vocabulary Exercises** - Drag-and-drop term matching
3. **Expandable Cards** - Deep-dive exploration topics
4. **Video Lessons** - Video content with completion tracking
5. **Image Vocabulary** - Visual concept identification
6. **Quizzes** - Multiple choice assessments
7. **Open Text** - Written response activities
8. **Voice Recording** - Speaking practice activities
9. **Speaking Practice** - Additional oral exercises

Each activity type includes:
- Clear instructions and context
- Point rewards
- Completion tracking
- Visual feedback
- Progress persistence

## 🎨 Design System

The application uses a consistent design system built on:

- **Color Scheme**: Dark theme optimized for extended reading
- **Typography**: System fonts with carefully chosen hierarchy
- **Spacing**: Consistent spacing scale using Tailwind
- **Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React for consistent iconography
- **Animations**: Subtle transitions for better UX

## 🤝 Contributing

This project was generated by v0.app and is synchronized with deployed chats. Changes should be made through the v0 interface or directly in this repository.

**Contributing Guidelines:**
1. Follow existing code structure and patterns
2. Maintain TypeScript type safety
3. Test on multiple devices/browsers
4. Ensure accessibility standards
5. Update documentation for significant changes

## 📝 License

This project is private and proprietary to Newave Solutions.

## 🔗 Links

- **Live Application**: [Vercel Deployment](https://vercel.com/newave-solutions-projects/v0-learning-hub-design)
- **v0 Project**: [Continue building](https://v0.app/chat/pgG7kL2Sham)
- **Repository**: [GitHub](https://github.com/newave-solutions/v0-learning-hub-design)

## 📞 Support

For questions or issues, please open an issue in the GitHub repository or contact Newave Solutions.

---

**Built with ❤️ using v0.app, Next.js, and React**
