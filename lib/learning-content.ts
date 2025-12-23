export interface Activity {
  id: string
  type:
    | "reading"
    | "vocabulary"
    | "expandable"
    | "video"
    | "image-vocab"
    | "quiz"
    | "speaking"
    | "writing"
    | "open-text"
    | "voice-recording"
  title: string
  points: number
  data: any
}

export interface Module {
  id: string
  title: string
  description: string
  points: number
  activities: Activity[]
  estimatedTime: number
}

export interface LearningPath {
  id: string
  title: string
  description: string
  modules: Module[]
}

export const learningPaths: Record<string, LearningPath> = {
  // =============================================
  // PHASE 1: THE "BS DETECTOR" (New Fundamentals)
  // =============================================
  "bs-detector": {
    id: "bs-detector",
    title: "Phase 1: The BS Detector",
    description:
      "Learn enough to know when the AI is lying, hallucinating, or writing insecure code. Master the new fundamentals.",
    modules: [
      {
        id: "code-literacy",
        title: "Code Literacy for the AI Era",
        description: "Understand code well enough to audit AI output",
        points: 85,
        estimatedTime: 40,
        activities: [
          {
            id: "read-code-literacy",
            type: "reading",
            title: "Why Code Literacy Still Matters",
            points: 15,
            data: {
              content: `# The AI-Augmented Architect: Code Literacy

The era of "Syntax" is giving way to the era of "Semantics." But this doesn't mean you can ignore code—it means your relationship with it fundamentally changes.

## The Shift: From Writer to Auditor

For 40 years, a developer's value was tied to their ability to recall syntax and implement logic manually. By 2030, that will be largely obsolete. Your new role is not to *write* every line—it's to *read, validate, and curate* what AI generates.

## The "Black Box" Liability

Here's the danger: If you build an app by prompting an LLM but don't understand the underlying code, you are **one bug away from total blockage**. You cannot debug what you do not understand.

Consider this scenario:
- AI generates a beautiful authentication system
- It works perfectly in development
- In production, it leaks session tokens
- You can't fix it because you don't understand how sessions work

## The New Literacy

You don't need to memorize every syntax detail. Instead, you need:

**Pattern Recognition**: Spotting common structures like loops, conditionals, and data transformations at a glance.

**Security Intuition**: Knowing that user input should never be trusted, SQL queries need parameterization, and secrets shouldn't be in code.

**Architecture Understanding**: Grasping how databases, APIs, and services connect—this is harder for AI to hallucinate correctly than a single function.

**Mental Models**: Understanding *why* code is structured a certain way, not just *what* it does.

## Your Goal

You're not becoming a syntax expert. You're becoming a **Code Detective**—someone who can glance at AI-generated code and spot the subtle logic error, the security flaw, or the performance trap.`,
              estimatedTime: 10,
            },
          },
          {
            id: "vocab-fundamentals",
            type: "vocabulary",
            title: "Core Programming Concepts",
            points: 15,
            data: {
              items: [
                { term: "Variable", definition: "A named container that stores data values in memory" },
                { term: "Function", definition: "A reusable block of code that performs a specific task" },
                { term: "API", definition: "Application Programming Interface - how software components communicate" },
                { term: "Database", definition: "Organized collection of structured data stored electronically" },
                { term: "Authentication", definition: "The process of verifying a user's identity" },
                { term: "Authorization", definition: "Determining what actions an authenticated user can perform" },
                { term: "Endpoint", definition: "A specific URL where an API receives requests" },
                { term: "State", definition: "Data that can change over time in an application" },
              ],
            },
          },
          {
            id: "expand-code-smells",
            type: "expandable",
            title: "Red Flags in AI-Generated Code",
            points: 20,
            data: {
              cards: [
                {
                  title: "Hardcoded Secrets",
                  summary: "API keys and passwords visible in code",
                  content:
                    "AI often generates code with placeholder secrets like 'your-api-key-here' or even real-looking fake keys. Never commit these. Use environment variables instead. Look for: API_KEY = '...', password = '...', secret = '...'",
                },
                {
                  title: "SQL Injection Vulnerabilities",
                  summary: "User input directly in database queries",
                  content:
                    "If you see user input concatenated into SQL strings like `SELECT * FROM users WHERE id = '${userId}'`, that's a critical security flaw. Always use parameterized queries or an ORM.",
                },
                {
                  title: "Missing Error Handling",
                  summary: "No try/catch or error boundaries",
                  content:
                    "AI often generates the 'happy path' only. Real applications need error handling for network failures, invalid data, and edge cases. Look for missing try/catch blocks and unhandled promise rejections.",
                },
                {
                  title: "Unnecessary Dependencies",
                  summary: "Libraries imported for simple tasks",
                  content:
                    "AI might suggest installing a library to format a date when native methods work fine. More dependencies = more security risks and bundle size. Question every import.",
                },
                {
                  title: "Inefficient Algorithms",
                  summary: "O(n²) solutions for O(n) problems",
                  content:
                    "Watch for nested loops over large datasets, repeated database calls in loops, or loading entire datasets when you need one item. AI prioritizes 'getting it to work' over efficiency.",
                },
              ],
            },
          },
          {
            id: "quiz-code-literacy",
            type: "quiz",
            title: "Code Literacy Assessment",
            points: 20,
            data: {
              questions: [
                {
                  question: "Why is code literacy still important in the AI era?",
                  options: [
                    "AI always writes perfect code",
                    "You need to audit and debug AI output",
                    "Code will be obsolete soon",
                    "Only for getting jobs",
                  ],
                  correctAnswer: "You need to audit and debug AI output",
                  explanation:
                    "You cannot debug what you do not understand. Code literacy lets you catch AI mistakes and security flaws.",
                },
                {
                  question: "What is the 'Black Box' liability?",
                  options: [
                    "Using dark mode",
                    "Building apps you can't debug because you don't understand the code",
                    "Encrypted databases",
                    "Closed-source software",
                  ],
                  correctAnswer: "Building apps you can't debug because you don't understand the code",
                  explanation:
                    "If you rely on AI without understanding the output, you're one bug away from being completely stuck.",
                },
                {
                  question: "Which is a security red flag in AI-generated code?",
                  options: [
                    "Using TypeScript",
                    "Hardcoded API keys in source files",
                    "Component-based architecture",
                    "Using async/await",
                  ],
                  correctAnswer: "Hardcoded API keys in source files",
                  explanation: "Secrets should never be in code. They belong in environment variables.",
                },
              ],
            },
          },
          {
            id: "open-text-audit",
            type: "open-text",
            title: "Practice: Audit This Code",
            points: 15,
            data: {
              prompt:
                "Review this AI-generated code snippet and identify at least 3 problems:\n\n```javascript\nasync function getUser(userId) {\n  const query = `SELECT * FROM users WHERE id = '${userId}'`;\n  const result = await db.query(query);\n  const apiKey = 'sk-1234567890abcdef';\n  const response = await fetch('https://api.example.com/enrich', {\n    headers: { 'Authorization': apiKey }\n  });\n  return result[0];\n}\n```\n\nDescribe each problem and how to fix it.",
              placeholder:
                "Problem 1: I notice that...\n\nProblem 2: There's also...\n\nProblem 3: Additionally...\n\nFixes would include...",
              minWords: 80,
            },
          },
        ],
      },
      {
        id: "security-foundations",
        title: "Security Fundamentals",
        description: "Spot vulnerabilities before they reach production",
        points: 90,
        estimatedTime: 45,
        activities: [
          {
            id: "read-security-basics",
            type: "reading",
            title: "The Security Mindset",
            points: 15,
            data: {
              content: `# Security for the AI-Augmented Developer

AI tends to prioritize "getting it to work" over security. This creates a dangerous situation: you can build functional applications filled with vulnerabilities because the AI didn't consider attack vectors.

## The OWASP Top 10 (Simplified)

**1. Injection Attacks**
When user input is executed as code. SQL injection is the classic example, but it includes XSS (JavaScript injection) and command injection.

*AI Red Flag*: Any code that concatenates user input into queries or commands.

**2. Broken Authentication**
Weak password policies, exposed session tokens, missing rate limiting on login attempts.

*AI Red Flag*: Authentication code without password hashing, sessions stored insecurely.

**3. Sensitive Data Exposure**
Logging passwords, exposing API keys, sending sensitive data without encryption.

*AI Red Flag*: console.log() statements with user data, hardcoded credentials.

**4. Broken Access Control**
Users accessing data they shouldn't. The AI might generate an endpoint that returns all user data without checking permissions.

*AI Red Flag*: Missing authorization checks, assuming frontend validation is enough.

## The Trust Boundary

Never trust:
- User input (forms, URLs, headers)
- Data from external APIs
- AI-generated code without review

Always validate, sanitize, and verify at the **server** level. Frontend validation is for UX, not security.

## Your Security Checklist

Before shipping AI-generated code:
1. Are credentials in environment variables?
2. Is user input validated and sanitized?
3. Are database queries parameterized?
4. Are authorization checks on every endpoint?
5. Is sensitive data encrypted in transit and at rest?`,
              estimatedTime: 12,
            },
          },
          {
            id: "image-vocab-security",
            type: "image-vocab",
            title: "Security Concepts Visual Guide",
            points: 20,
            data: {
              items: [
                {
                  id: "sql-injection",
                  imageUrl: "/database-security-shield-lock.jpg",
                  correctLabel: "SQL Injection",
                  options: ["SQL Injection", "XSS Attack", "CSRF Token", "API Gateway"],
                },
                {
                  id: "encryption",
                  imageUrl: "/encrypted-data-padlock-secure.jpg",
                  correctLabel: "Encryption",
                  options: ["Encryption", "Hashing", "Tokenization", "Compression"],
                },
                {
                  id: "authentication",
                  imageUrl: "/user-login-identity-verification.jpg",
                  correctLabel: "Authentication",
                  options: ["Authentication", "Authorization", "Validation", "Verification"],
                },
                {
                  id: "firewall",
                  imageUrl: "/firewall-network-protection-barrier.jpg",
                  correctLabel: "Firewall",
                  options: ["Firewall", "Load Balancer", "CDN", "Proxy"],
                },
              ],
            },
          },
          {
            id: "expand-attack-vectors",
            type: "expandable",
            title: "Common Attack Vectors",
            points: 20,
            data: {
              cards: [
                {
                  title: "Cross-Site Scripting (XSS)",
                  summary: "Injecting malicious scripts into web pages",
                  content:
                    "Attackers inject JavaScript that runs in other users' browsers. This can steal cookies, session tokens, or perform actions as the victim. Prevention: Always escape user-generated content, use Content Security Policy headers.",
                },
                {
                  title: "Cross-Site Request Forgery (CSRF)",
                  summary: "Tricking users into unintended actions",
                  content:
                    "Attackers craft requests that execute actions using the victim's authenticated session. Example: A hidden form that transfers money when a user visits a malicious page. Prevention: CSRF tokens, SameSite cookies.",
                },
                {
                  title: "Insecure Direct Object References",
                  summary: "Accessing unauthorized resources by ID",
                  content:
                    "When URLs contain IDs like /api/users/123, attackers try /api/users/124 to access other users' data. Prevention: Always verify authorization, not just authentication.",
                },
                {
                  title: "Dependency Vulnerabilities",
                  summary: "Security flaws in third-party packages",
                  content:
                    "AI often suggests popular packages without checking for known vulnerabilities. Prevention: Use npm audit, Snyk, or Dependabot. Keep dependencies updated.",
                },
              ],
            },
          },
          {
            id: "quiz-security",
            type: "quiz",
            title: "Security Knowledge Check",
            points: 20,
            data: {
              questions: [
                {
                  question: "Where should API keys be stored?",
                  options: [
                    "In the source code for easy access",
                    "In environment variables",
                    "In a comment for documentation",
                    "In localStorage",
                  ],
                  correctAnswer: "In environment variables",
                  explanation: "Environment variables keep secrets out of your codebase and version control.",
                },
                {
                  question: "What's the primary purpose of input validation?",
                  options: [
                    "Better user experience",
                    "Preventing malicious data from entering your system",
                    "Faster processing",
                    "Reducing database size",
                  ],
                  correctAnswer: "Preventing malicious data from entering your system",
                  explanation:
                    "Input validation is a critical security measure to prevent injection attacks and data corruption.",
                },
                {
                  question: "Why is frontend validation not enough for security?",
                  options: [
                    "It's too slow",
                    "Users might have JavaScript disabled",
                    "Attackers can bypass it by sending requests directly to the API",
                    "It uses too much bandwidth",
                  ],
                  correctAnswer: "Attackers can bypass it by sending requests directly to the API",
                  explanation:
                    "Anyone can send requests to your API without going through your frontend. Server-side validation is essential.",
                },
              ],
            },
          },
          {
            id: "voice-security-explain",
            type: "voice-recording",
            title: "Speaking: Explain a Security Concept",
            points: 15,
            data: {
              prompt:
                "Choose one security vulnerability (SQL injection, XSS, or CSRF) and explain it as if you're teaching a junior developer. Describe what it is, why it's dangerous, and how to prevent it.",
              minDuration: 45,
            },
          },
        ],
      },
      {
        id: "system-design-basics",
        title: "System Design Fundamentals",
        description: "Understanding how databases, APIs, and services connect",
        points: 95,
        estimatedTime: 50,
        activities: [
          {
            id: "read-system-design",
            type: "reading",
            title: "Why System Design Matters for AI Users",
            points: 20,
            data: {
              content: `# System Design: The AI's Weak Point

System design—understanding how databases, APIs, and microservices talk to each other—is harder for AI to hallucinate correctly than a single function. This is your competitive advantage.

## The 2030 Developer Persona

**Old Role**: "I write code."
**New Role**: "I define problems, architect solutions, and audit the automated implementation."

You're becoming an **AI Orchestrator**—supervising a team of AI agents (specialized in frontend, backend, testing, and security) to execute your architectural vision.

## Core Concepts

### Client-Server Architecture
The browser (client) sends requests to your server. The server processes them and returns responses. Simple, but foundational.

### Databases
**SQL (Relational)**: Tables with relationships. PostgreSQL, MySQL. Best for structured data with clear relationships.
**NoSQL (Document)**: Flexible JSON-like documents. MongoDB, Firebase. Best for rapidly changing schemas.
**Key-Value**: Simple lookups. Redis, DynamoDB. Best for caching and sessions.

### APIs
**REST**: Resources as URLs. GET /users, POST /orders. Stateless and widely understood.
**GraphQL**: Single endpoint, flexible queries. Client specifies exactly what data it needs.
**WebSocket**: Real-time bidirectional communication. Chat, live updates, gaming.

### Scaling Patterns
**Horizontal**: Add more servers (harder but more powerful)
**Vertical**: Bigger server (easier but has limits)
**Caching**: Store frequently accessed data closer to users
**CDN**: Distribute static content globally

## Why AI Struggles Here

AI excels at writing individual functions. It struggles with:
- Understanding data flow across multiple services
- Making trade-offs between consistency and availability
- Designing for scale before it's needed
- Anticipating failure modes

This is why **you** need to understand system design—to catch when AI architects something that will collapse under real-world load.`,
              estimatedTime: 15,
            },
          },
          {
            id: "vocab-system-design",
            type: "vocabulary",
            title: "System Design Vocabulary",
            points: 15,
            data: {
              items: [
                { term: "Latency", definition: "Time delay between request and response" },
                { term: "Throughput", definition: "Number of requests a system can handle per unit time" },
                { term: "Load Balancer", definition: "Distributes traffic across multiple servers" },
                { term: "CDN", definition: "Content Delivery Network - caches content near users globally" },
                {
                  term: "Microservices",
                  definition: "Architecture where applications are built as independent services",
                },
                { term: "Monolith", definition: "Single unified codebase for the entire application" },
                { term: "Message Queue", definition: "Asynchronous communication between services" },
                { term: "Cache", definition: "Fast storage layer for frequently accessed data" },
              ],
            },
          },
          {
            id: "expand-architecture-patterns",
            type: "expandable",
            title: "Architecture Patterns Deep Dive",
            points: 25,
            data: {
              cards: [
                {
                  title: "Monolith vs Microservices",
                  summary: "When to use each approach",
                  content:
                    "Monoliths are simpler to develop, deploy, and debug. Start here. Microservices add complexity but enable independent scaling and deployment. Only split when you have clear bounded contexts and team boundaries. AI often suggests microservices when a monolith would be better.",
                },
                {
                  title: "Event-Driven Architecture",
                  summary: "Services communicate through events",
                  content:
                    "Instead of direct API calls, services publish events ('OrderCreated') and others subscribe. Enables loose coupling and better scalability. Tools: Kafka, RabbitMQ, AWS EventBridge. AI may not understand eventual consistency implications.",
                },
                {
                  title: "CQRS Pattern",
                  summary: "Separate read and write operations",
                  content:
                    "Command Query Responsibility Segregation uses different models for reading and writing data. Enables optimized read models for queries and write models for commands. Use when read and write patterns differ significantly.",
                },
                {
                  title: "API Gateway Pattern",
                  summary: "Single entry point for all clients",
                  content:
                    "One service handles authentication, rate limiting, routing, and request transformation. Simplifies client code and centralizes cross-cutting concerns. Tools: Kong, AWS API Gateway, nginx.",
                },
                {
                  title: "Database per Service",
                  summary: "Each microservice owns its data",
                  content:
                    "In true microservices, each service has its own database. No shared database access. Services communicate through APIs or events. This is hard to implement correctly and AI often generates shared database patterns.",
                },
              ],
            },
          },
          {
            id: "open-text-design",
            type: "open-text",
            title: "Practice: Design a Simple System",
            points: 20,
            data: {
              prompt:
                "Design the architecture for a simple URL shortener (like bit.ly). Describe:\n\n1. What database type would you use and why?\n2. What happens when a user creates a short URL?\n3. What happens when a user visits a short URL?\n4. How would you handle high traffic?\n\nThink about the data flow and potential bottlenecks.",
              placeholder:
                "For the database, I would choose... because...\n\nWhen creating a short URL:\n1. ...\n\nWhen visiting a short URL:\n1. ...\n\nFor high traffic, I would...",
              minWords: 100,
            },
          },
          {
            id: "quiz-system-design",
            type: "quiz",
            title: "System Design Assessment",
            points: 15,
            data: {
              questions: [
                {
                  question: "Why is system design harder for AI to get right?",
                  options: [
                    "AI doesn't know programming languages",
                    "It requires understanding trade-offs and data flow across services",
                    "System design is obsolete",
                    "AI always gets it right",
                  ],
                  correctAnswer: "It requires understanding trade-offs and data flow across services",
                  explanation:
                    "AI excels at individual functions but struggles with architectural decisions that require balancing multiple constraints.",
                },
                {
                  question: "When should you start with microservices?",
                  options: [
                    "Always, they're always better",
                    "When AI suggests them",
                    "When you have clear bounded contexts and team boundaries",
                    "For any project over 1000 lines of code",
                  ],
                  correctAnswer: "When you have clear bounded contexts and team boundaries",
                  explanation:
                    "Microservices add complexity. Start with a monolith and split only when the benefits clearly outweigh the costs.",
                },
              ],
            },
          },
        ],
      },
    ],
  },

  // =============================================
  // PHASE 2: AI ORCHESTRATION (The "Speed")
  // =============================================
  "ai-orchestration": {
    id: "ai-orchestration",
    title: "Phase 2: AI Orchestration",
    description:
      "Move from 'chatting' with AI to 'engineering' with it. Master context engineering, model routing, and professional AI workflows.",
    modules: [
      {
        id: "context-engineering",
        title: "Context Engineering Mastery",
        description: "Provide AI with the information it needs to succeed",
        points: 90,
        estimatedTime: 45,
        activities: [
          {
            id: "read-context-engineering",
            type: "reading",
            title: "The Art of Context Engineering",
            points: 20,
            data: {
              content: `# Context Engineering: Your Secret Weapon

The difference between frustrating AI interactions and magical ones is **context**. Don't just paste an error message. Learn to provide the full picture.

## Bad vs Good Context

**Bad**: "Fix this error: Cannot read property 'map' of undefined"

**Good**: "I am using Next.js 14 with the App Router. Here is my folder structure. Here is the error. Here is the component where it occurs. Fix it while preserving the 'use client' directive."

## The CONTEXT Framework

**C - Codebase**: What framework? What version? What folder structure?
**O - Objective**: What are you trying to achieve? What should the end result look like?
**N - Now**: What's the current state? What error or behavior are you seeing?
**T - Technology**: What libraries, APIs, and tools are involved?
**E - Examples**: Can you show working code that's similar?
**X - eXceptions**: What shouldn't change? What constraints exist?
**T - Test**: How will you verify it works?

## Real Example

Instead of: "Add authentication to my app"

Try: "I'm building a SaaS dashboard with Next.js 14 App Router. I need:
- Email/password authentication
- Supabase as the backend
- Protected routes under /dashboard/*
- Public routes for /login and /signup
- Redirect to /dashboard after successful login
- Session persistence using cookies

Here's my current folder structure: [attach]
Here's my current middleware.ts: [attach]

Please implement authentication while preserving my existing API routes."

## Tools That Understand Context

Modern AI coding tools read your entire project:

**Cursor**: Indexes your codebase for context-aware suggestions
**GitHub Copilot**: Uses open tabs and recent files as context
**v0**: Understands your project structure and dependencies

The better context you provide, the better results you get.`,
              estimatedTime: 12,
            },
          },
          {
            id: "vocab-context",
            type: "vocabulary",
            title: "Context Engineering Terms",
            points: 15,
            data: {
              items: [
                { term: "Context Window", definition: "The maximum amount of text an AI model can consider at once" },
                { term: "Token", definition: "A piece of text (roughly 4 characters) that AI models process" },
                { term: "System Prompt", definition: "Instructions that define the AI's behavior and constraints" },
                { term: "Few-Shot Learning", definition: "Providing examples to show the AI what you want" },
                { term: "Chain of Thought", definition: "Asking AI to explain its reasoning step by step" },
                { term: "Grounding", definition: "Connecting AI responses to specific source documents" },
              ],
            },
          },
          {
            id: "expand-prompting-patterns",
            type: "expandable",
            title: "Advanced Prompting Patterns",
            points: 20,
            data: {
              cards: [
                {
                  title: "The SPECS Framework",
                  summary: "Structure for effective code prompts",
                  content:
                    "**S**pecific: What exactly do you want?\n**P**urpose: Why do you need it?\n**E**xamples: Show similar code\n**C**onstraints: Technologies, limitations\n**S**tyle: Coding conventions to follow",
                },
                {
                  title: "Iterative Refinement",
                  summary: "Build complexity gradually",
                  content:
                    "Start simple: 'Build a login form'\nThen refine: 'Add email validation'\nThen enhance: 'Show errors below each field'\nThen polish: 'Add loading state during submission'\n\nDon't try to get everything in one prompt.",
                },
                {
                  title: "Self-Critique Pattern",
                  summary: "Make AI review its own work",
                  content:
                    "After AI generates code, ask: 'Are there any edge cases this misses?' or 'What security vulnerabilities might exist?' or 'How could this be more performant?' Forces deeper analysis.",
                },
                {
                  title: "Role Assignment",
                  summary: "Give AI a specific persona",
                  content:
                    "Instead of: 'Write a function'\nTry: 'You are a senior security engineer. Review this authentication code for vulnerabilities.'\n\nRoles activate relevant knowledge patterns.",
                },
              ],
            },
          },
          {
            id: "open-text-context",
            type: "open-text",
            title: "Practice: Write a Context-Rich Prompt",
            points: 20,
            data: {
              prompt:
                "You need to add a dark mode toggle to an existing React application. Write a detailed, context-rich prompt using the CONTEXT framework that would help an AI implement this feature correctly.\n\nInclude:\n- Technical context (framework, styling approach)\n- Current state\n- Desired behavior\n- Constraints\n- How you'll verify it works",
              placeholder:
                "CONTEXT for Dark Mode Implementation:\n\nCodebase: I'm using...\n\nObjective: I want to...\n\nNow: Currently the app...\n\nTechnology: For styling, I'm using...\n\nExamples: Similar to how... works\n\neXceptions: Don't change...\n\nTest: I'll verify by...",
              minWords: 100,
            },
          },
          {
            id: "quiz-context",
            type: "quiz",
            title: "Context Engineering Check",
            points: 15,
            data: {
              questions: [
                {
                  question: "What's the main benefit of providing detailed context to AI?",
                  options: [
                    "AI works faster with less context",
                    "It makes you look more professional",
                    "AI can give more accurate, relevant responses",
                    "It's required by the AI terms of service",
                  ],
                  correctAnswer: "AI can give more accurate, relevant responses",
                  explanation:
                    "Better context leads to better results. AI can't read your mind—it needs information to help effectively.",
                },
                {
                  question: "What does the 'X' in CONTEXT stand for?",
                  options: ["eXtra information", "eXceptions (constraints)", "eXamples", "eXternal APIs"],
                  correctAnswer: "eXceptions (constraints)",
                  explanation: "eXceptions are things that shouldn't change—constraints the AI must work within.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "model-routing",
        title: "Model Routing & AI Selection",
        description: "Use the right AI model for each task",
        points: 100,
        estimatedTime: 50,
        activities: [
          {
            id: "read-model-routing",
            type: "reading",
            title: "Stop Using One Model for Everything",
            points: 20,
            data: {
              content: `# Model Routing: The Right Tool for Each Task

A master carpenter doesn't use a hammer for every task. Similarly, you shouldn't use the same AI model for everything. Each model has strengths.

## The Model Categories

### Reasoning Models (Deep Thinking)
**Examples**: OpenAI o1/o3, Claude with extended thinking
**Best for**: Architecture decisions, complex logic, planning, debugging tricky issues
**When to use**: "Design the data model for this feature" or "Why is this algorithm not working?"
**Trade-off**: Slower, more expensive, but more accurate for complex tasks

### Coding Models (Syntax Experts)
**Examples**: Claude 3.5/4 Sonnet, GPT-4, Gemini Pro
**Best for**: Writing actual code, refactoring, implementing features
**When to use**: "Implement this React component" or "Convert this to TypeScript"
**Trade-off**: Fast and capable for most coding tasks

### Fast Models (Quick Helpers)
**Examples**: GPT-4o-mini, Gemini Flash, Claude Haiku
**Best for**: Simple explanations, regex generation, documentation lookups, quick questions
**When to use**: "What does this regex do?" or "Explain this error message"
**Trade-off**: Less capable but very fast and cheap

## Real Workflow Example

Building a new feature:

1. **Planning (Reasoning Model)**: "Design the architecture for a notification system that needs to handle 10K messages/minute"

2. **Implementation (Coding Model)**: "Implement the NotificationService class based on this design"

3. **Quick Fixes (Fast Model)**: "What's wrong with this import statement?" or "Generate a regex for email validation"

## AI Coding Tools Landscape

**Full IDE Experience**:
- **Cursor**: AI-first code editor, multi-model support
- **GitHub Copilot**: Integrated in VS Code, excellent autocomplete
- **Kiro**: Amazon's spec-driven development IDE
- **Firebase Studio**: Google's full-stack AI development environment

**Vibe Coding Platforms**:
- **v0 by Vercel**: Generate UI from prompts, iterate visually
- **Lovable**: Full-stack app generation with backend
- **bolt.new**: Rapid prototyping in browser
- **Replit Agent**: Autonomous coding agent

**Specialized Tools**:
- **GitHub Copilot Workspace**: Multi-file editing with planning
- **Jules**: Asynchronous coding agent by Google
- **Gemini Code Assist**: Google's coding assistant with large context`,
              estimatedTime: 15,
            },
          },
          {
            id: "image-vocab-tools",
            type: "image-vocab",
            title: "AI Development Tools",
            points: 20,
            data: {
              items: [
                {
                  id: "cursor",
                  imageUrl: "/code-editor-dark-theme-ai-assistant.jpg",
                  correctLabel: "AI Code Editor",
                  options: ["AI Code Editor", "Design Tool", "Database Manager", "Version Control"],
                },
                {
                  id: "vibe-coding",
                  imageUrl: "/natural-language-to-code-generation-interface.jpg",
                  correctLabel: "Vibe Coding Platform",
                  options: ["Vibe Coding Platform", "Terminal", "Documentation Site", "Testing Framework"],
                },
                {
                  id: "automation",
                  imageUrl: "/workflow-automation-nodes-connected-pipeline.jpg",
                  correctLabel: "Automation Platform",
                  options: ["Automation Platform", "Code Editor", "Design System", "Analytics Dashboard"],
                },
                {
                  id: "agents",
                  imageUrl: "/ai-agent-autonomous-robot-assistant.jpg",
                  correctLabel: "AI Agent",
                  options: ["AI Agent", "Chatbot", "Search Engine", "File Manager"],
                },
              ],
            },
          },
          {
            id: "expand-tool-deep-dive",
            type: "expandable",
            title: "Tool Deep Dives",
            points: 25,
            data: {
              cards: [
                {
                  title: "Cursor & Copilot",
                  summary: "AI-powered code editors",
                  content:
                    "**Cursor**: Fork of VS Code with AI at the core. Features Composer for multi-file edits, @ mentions to include files, and custom AI rules.\n\n**GitHub Copilot**: The original AI pair programmer. Excellent autocomplete, now has Workspace for larger edits and chat for explanations. Enterprise version reads your entire codebase.",
                },
                {
                  title: "v0, Lovable, bolt.new",
                  summary: "Vibe coding platforms",
                  content:
                    "**v0**: Vercel's UI generator. Describe what you want, get React/Next.js code. Excellent for rapid prototyping and learning.\n\n**Lovable**: Generates full-stack apps with backend integration. Good for MVPs.\n\n**bolt.new**: Browser-based rapid prototyping. Edit code and see results instantly.",
                },
                {
                  title: "Firebase Studio & Kiro",
                  summary: "Next-generation AI IDEs",
                  content:
                    "**Firebase Studio** (formerly Project IDX): Google's cloud-based IDE with Gemini integration. Full-stack development with Firebase backend.\n\n**Kiro**: Amazon's spec-driven IDE. Write specifications, AI generates implementation. Focuses on maintaining architectural intent.",
                },
                {
                  title: "n8n & Zapier",
                  summary: "Workflow automation",
                  content:
                    "**n8n**: Open-source workflow automation. Connect APIs, transform data, build automations visually. Self-hostable.\n\n**Zapier**: The automation giant. 5000+ integrations. AI features for natural language automation creation. Best for non-technical users.",
                },
                {
                  title: "AI Agents: Jules, GitHub Agents, Vertex AI Agents",
                  summary: "Autonomous coding agents",
                  content:
                    "**Jules** (Google): Asynchronous agent that works on issues while you're away. Submit a bug, come back to a PR.\n\n**GitHub Agents**: Copilot-powered agents for automated workflows.\n\n**Vertex AI Agents**: Google Cloud's enterprise agent building platform. Create custom agents for specific tasks.",
                },
              ],
            },
          },
          {
            id: "quiz-models",
            type: "quiz",
            title: "Model Selection Quiz",
            points: 20,
            data: {
              questions: [
                {
                  question: "Which model type is best for designing system architecture?",
                  options: [
                    "Fast models like GPT-4o-mini",
                    "Reasoning models like o1/o3",
                    "Any model works the same",
                    "Image generation models",
                  ],
                  correctAnswer: "Reasoning models like o1/o3",
                  explanation:
                    "Reasoning models excel at complex planning and architectural decisions that require deep thinking.",
                },
                {
                  question: "When should you use a fast model like Gemini Flash?",
                  options: [
                    "For all coding tasks",
                    "For complex debugging",
                    "For quick questions and simple explanations",
                    "Never, always use the best model",
                  ],
                  correctAnswer: "For quick questions and simple explanations",
                  explanation: "Fast models are perfect for simple tasks where speed matters more than deep reasoning.",
                },
                {
                  question: "What is 'vibe coding'?",
                  options: [
                    "Coding while listening to music",
                    "Iterating with natural language until the app feels right",
                    "Writing code without testing",
                    "Using only dark mode",
                  ],
                  correctAnswer: "Iterating with natural language until the app feels right",
                  explanation:
                    "Vibe coding describes the workflow of describing what you want in natural language and iterating until it matches your vision.",
                },
              ],
            },
          },
          {
            id: "voice-tool-recommendation",
            type: "voice-recording",
            title: "Speaking: Recommend a Tool",
            points: 15,
            data: {
              prompt:
                "A friend wants to build their first web app—a simple task manager. They have no coding experience. Which AI coding tool(s) would you recommend and why? Consider their skill level and goals.",
              minDuration: 45,
            },
          },
        ],
      },
      {
        id: "vibe-coding-maturity",
        title: "Vibe Coding Maturity",
        description: "Move beyond 'it looks right' to professional AI-assisted development",
        points: 85,
        estimatedTime: 40,
        activities: [
          {
            id: "read-vibe-maturity",
            type: "reading",
            title: "From Amateur to Professional Vibe Coding",
            points: 20,
            data: {
              content: `# Professional Vibe Coding

The concept of "vibe coding"—iterating with natural language until the application "feels" right—is maturing from an experimental workflow into a professional standard. But there's a difference between amateur and professional vibe coding.

## Amateur Vibe Coding
- "It looks right, ship it"
- No code review
- Trust AI output completely
- No testing
- Hoping for the best

## Professional Vibe Coding
- Iterative refinement with verification
- Systematic code review
- Healthy skepticism of AI output
- Testing at each stage
- Understanding what you're shipping

## The Self-Critique Pattern

Stop accepting the first response. Ask the AI to critique its own work:

**After generation**:
- "Are there any edge cases this misses?"
- "What security vulnerabilities might exist in this code?"
- "How could this be more performant?"
- "What happens if the API call fails?"
- "Are there any accessibility issues?"

**Before shipping**:
- "Review this code as if you were a senior engineer doing a code review"
- "What would you change if this needed to handle 10x the traffic?"

## The 10x Developer is Now Baseline

AI tools make average developers 10x more productive in output volume. But this creates responsibility:

- More code = more potential bugs
- Faster development = less time thinking
- Easy features = temptation to skip fundamentals

**Your competitive advantage** isn't generating more code—it's generating *better* code by combining AI speed with human judgment.

## The Solitary Unicorn

Individual developers can now build "unicorn-level" software that previously required teams of ten. But with great power comes great responsibility:

- You're the architect
- You're the security reviewer
- You're the QA team
- You're the ops engineer

If you skip any of these roles, your "unicorn" becomes a liability.`,
              estimatedTime: 12,
            },
          },
          {
            id: "expand-critique-patterns",
            type: "expandable",
            title: "Self-Critique Prompts",
            points: 20,
            data: {
              cards: [
                {
                  title: "Security Review",
                  summary: "Find vulnerabilities",
                  content:
                    "After AI generates code, ask:\n\n'Review this code for security vulnerabilities. Check for: injection attacks, authentication flaws, authorization bypasses, data exposure, and insecure dependencies. List each issue with severity and fix.'",
                },
                {
                  title: "Edge Case Analysis",
                  summary: "What could go wrong?",
                  content:
                    "Ask AI:\n\n'What edge cases does this code not handle? Consider: empty inputs, null values, network failures, concurrent access, very large inputs, malicious inputs, and unexpected data types. For each, show how the code would fail.'",
                },
                {
                  title: "Performance Review",
                  summary: "Will it scale?",
                  content:
                    "Ask AI:\n\n'Analyze this code for performance issues. Check for: O(n²) algorithms, unnecessary re-renders, missing caching opportunities, N+1 queries, memory leaks, and blocking operations. Suggest optimizations.'",
                },
                {
                  title: "Accessibility Audit",
                  summary: "Can everyone use it?",
                  content:
                    "Ask AI:\n\n'Review this UI code for accessibility issues. Check for: missing ARIA labels, poor color contrast, keyboard navigation gaps, missing alt text, and screen reader compatibility. Reference WCAG guidelines.'",
                },
                {
                  title: "Code Quality Review",
                  summary: "Is it maintainable?",
                  content:
                    "Ask AI:\n\n'Review this code as a senior engineer. Check for: unclear naming, missing types, duplicated logic, god functions, tight coupling, missing error handling, and poor separation of concerns. How would you refactor it?'",
                },
              ],
            },
          },
          {
            id: "open-text-critique",
            type: "open-text",
            title: "Practice: Self-Critique Workflow",
            points: 25,
            data: {
              prompt:
                "Imagine AI generated this authentication function for you:\n\n```javascript\nfunction login(username, password) {\n  const user = db.query(`SELECT * FROM users WHERE username = '${username}'`);\n  if (user && user.password === password) {\n    return { success: true, token: generateToken(user) };\n  }\n  return { success: false };\n}\n```\n\nWrite out the self-critique questions you would ask the AI, then answer them yourself. Identify at least 4 issues and explain how to fix each one.",
              placeholder:
                "Self-Critique Questions I would ask:\n\n1. Security: ...\n2. Edge cases: ...\n3. Best practices: ...\n\nIssues I found:\n\nIssue 1: ...\nFix: ...\n\nIssue 2: ...\nFix: ...",
              minWords: 120,
            },
          },
          {
            id: "quiz-vibe-maturity",
            type: "quiz",
            title: "Vibe Coding Maturity Check",
            points: 20,
            data: {
              questions: [
                {
                  question: "What distinguishes professional from amateur vibe coding?",
                  options: [
                    "Using more expensive AI models",
                    "Systematic review, testing, and healthy skepticism",
                    "Writing prompts faster",
                    "Accepting the first AI response",
                  ],
                  correctAnswer: "Systematic review, testing, and healthy skepticism",
                  explanation:
                    "Professional vibe coding involves verification at each step, not blind trust in AI output.",
                },
                {
                  question: "What's the purpose of the self-critique pattern?",
                  options: [
                    "To make AI feel bad",
                    "To force deeper analysis of potential issues",
                    "To generate more code",
                    "To avoid using AI",
                  ],
                  correctAnswer: "To force deeper analysis of potential issues",
                  explanation:
                    "Self-critique prompts help AI identify edge cases, security issues, and improvements it might have missed initially.",
                },
              ],
            },
          },
        ],
      },
    ],
  },

  // =============================================
  // PHASE 3: THE HYBRID WORKFLOW (The "Gym")
  // =============================================
  "hybrid-workflow": {
    id: "hybrid-workflow",
    title: "Phase 3: The Hybrid Workflow",
    description: "Prevent your brain from atrophying. Practice manual coding to stay sharp and avoid the 'Junior Gap'.",
    modules: [
      {
        id: "junior-gap",
        title: "Understanding the Junior Gap",
        description: "Why deliberate practice matters in the AI era",
        points: 75,
        estimatedTime: 35,
        activities: [
          {
            id: "read-junior-gap",
            type: "reading",
            title: "The Junior Developer Crisis",
            points: 20,
            data: {
              content: `# The Junior Gap: The Most Dangerous Aspect of the AI Shift

AI is exceptionally good at the tasks usually assigned to juniors: writing boilerplate, unit tests, simple bug fixes. This creates a "broken rung" in the career ladder.

## The Problem

**Traditional Career Path**:
Junior → Mid → Senior → Staff

Each level builds on experience from the previous one. Juniors learn by:
- Writing lots of boilerplate code
- Fixing simple bugs
- Implementing small features
- Making mistakes and learning from them

**AI-Disrupted Career Path**:
??? → Senior expectations immediately

If AI handles all junior tasks, how do developers build intuition?

## The "Black Box" Generation

We risk creating a generation of developers who:
- Can prompt AI to build applications
- Cannot debug when AI fails
- Don't understand why code is structured certain ways
- Can't optimize or refactor without AI assistance

This is like being able to drive a car but having no idea what to do when it breaks down.

## The Knowledge Cliff

Consider this scenario:
1. You've been using AI for all coding
2. AI generates code with a subtle race condition
3. The bug only manifests under production load
4. AI can't help because it doesn't have access to production logs
5. You're stuck because you never learned how race conditions work

## The Solution: Deliberate Practice

Just as athletes lift weights even when they won't use barbells in competition, developers must practice manual coding to build and maintain fundamental skills.

This isn't about being anti-AI. It's about being **AI-augmented** rather than **AI-dependent**.

## Your Responsibility

If you're a senior developer, mentor juniors in fundamentals.
If you're a junior developer, insist on learning fundamentals.
If you're self-taught with AI, deliberately practice without it.

The future belongs to those who can use AI **and** work without it.`,
              estimatedTime: 12,
            },
          },
          {
            id: "vocab-career",
            type: "vocabulary",
            title: "Career Development Terms",
            points: 15,
            data: {
              items: [
                {
                  term: "Deliberate Practice",
                  definition: "Intentional, focused practice designed to improve specific skills",
                },
                { term: "T-Shaped Developer", definition: "Broad knowledge across many areas, deep expertise in one" },
                { term: "Technical Debt", definition: "Future cost of shortcuts taken during development" },
                { term: "Code Smell", definition: "Surface indication of a deeper problem in code" },
                { term: "Refactoring", definition: "Restructuring code without changing external behavior" },
                { term: "Mental Model", definition: "Internal representation of how something works" },
              ],
            },
          },
          {
            id: "quiz-junior-gap",
            type: "quiz",
            title: "Understanding the Challenge",
            points: 20,
            data: {
              questions: [
                {
                  question: "What is the 'Junior Gap'?",
                  options: [
                    "Junior developers getting paid less",
                    "The broken career ladder when AI handles all junior tasks",
                    "Junior developers being better than seniors",
                    "A gap year before starting a career",
                  ],
                  correctAnswer: "The broken career ladder when AI handles all junior tasks",
                  explanation:
                    "If juniors don't practice fundamentals, they can't build the intuition needed to become seniors.",
                },
                {
                  question: "Why is manual practice important even when AI can write code?",
                  options: [
                    "To show off to employers",
                    "Because AI will be banned soon",
                    "To build debugging skills and fundamental understanding",
                    "Manual code is always better",
                  ],
                  correctAnswer: "To build debugging skills and fundamental understanding",
                  explanation:
                    "Like athletes training with weights, manual practice builds the mental muscles needed when AI can't help.",
                },
              ],
            },
          },
          {
            id: "voice-junior-gap",
            type: "voice-recording",
            title: "Speaking: Advice for New Developers",
            points: 20,
            data: {
              prompt:
                "A friend just starting their coding journey asks: 'Should I just learn to use AI tools, or do I need to learn actual programming?' What advice would you give them and why?",
              minDuration: 60,
            },
          },
        ],
      },
      {
        id: "sandwich-method",
        title: "The Sandwich Method",
        description: "A framework for learning with AI assistance",
        points: 80,
        estimatedTime: 40,
        activities: [
          {
            id: "read-sandwich",
            type: "reading",
            title: "The Sandwich Method Explained",
            points: 20,
            data: {
              content: `# The Sandwich Method for AI-Assisted Learning

When learning new concepts or technologies, use the Sandwich Method to ensure you're building understanding, not just copying output.

## The Three Layers

### Top Bun (Human): Define the Problem
**You do this part.**

Before touching AI:
1. Break the problem into steps
2. Identify what you need to learn
3. Write pseudocode or a plain-English description
4. List the inputs and expected outputs

*Example*: "I need to build a form that validates email format, checks password strength, and shows errors inline. Steps: 1) Create form structure, 2) Add validation logic, 3) Display error states, 4) Handle submission."

### Meat (AI): Implementation
**AI helps with this part.**

Now ask AI to implement your plan:
- Provide your breakdown as context
- Ask for explanations, not just code
- Request comments in complex sections
- Ask about alternative approaches

*Example*: "Based on my breakdown above, implement a React form component with these validations. Explain why you chose this validation approach."

### Bottom Bun (Human): Review & Understand
**You do this part.**

The critical step most people skip:
1. Read every line of generated code
2. If you don't understand a line, stop
3. Ask AI to explain that specific part
4. Verify the explanation makes sense
5. Only then commit the code

**The Rule**: You are not allowed to commit code you don't understand.

## Why This Works

The Sandwich Method ensures:
- You practice problem decomposition
- AI handles tedious implementation
- You verify and understand the result
- Your mental models improve over time

## Example Walkthrough

**Problem**: Add dark mode to a website

**Top Bun (You)**:
- Need to: Toggle between light/dark themes
- Store: User preference in localStorage  
- Apply: CSS variables for colors
- Handle: System preference as default

**Meat (AI)**:
"Implement a dark mode toggle for a React app. Use CSS variables for theming, localStorage for persistence, and respect system preferences. Explain your approach."

**Bottom Bun (You)**:
- Review the CSS variable structure
- Understand the useEffect for system preference
- Trace the toggle logic
- Ask: "Why use CSS variables instead of Tailwind dark: classes?"
- Commit only after understanding`,
              estimatedTime: 14,
            },
          },
          {
            id: "expand-sandwich-examples",
            type: "expandable",
            title: "Sandwich Method Examples",
            points: 20,
            data: {
              cards: [
                {
                  title: "Example: Building an API Endpoint",
                  summary: "Backend feature walkthrough",
                  content:
                    "**Top Bun**: I need an endpoint that accepts POST requests with user data, validates the input, saves to database, and returns the created resource with proper status codes.\n\n**Meat**: Ask AI to implement with your ORM and framework.\n\n**Bottom Bun**: Verify input validation is complete, error handling exists, and SQL injection is prevented.",
                },
                {
                  title: "Example: Implementing Search",
                  summary: "Feature implementation walkthrough",
                  content:
                    "**Top Bun**: Search box that filters a list of items as user types, with debouncing, loading states, and 'no results' handling.\n\n**Meat**: Request React implementation with explanation of debouncing approach.\n\n**Bottom Bun**: Understand debounce timing, verify performance with large lists, check accessibility of search input.",
                },
                {
                  title: "Example: Adding Authentication",
                  summary: "Security feature walkthrough",
                  content:
                    "**Top Bun**: Need login, logout, protected routes, session persistence. Using JWT tokens stored in httpOnly cookies.\n\n**Meat**: Request implementation with security explanations.\n\n**Bottom Bun**: Critical review - verify password hashing, token expiration, CSRF protection, secure cookie flags. This is where AI most commonly makes security mistakes.",
                },
                {
                  title: "Example: Database Migration",
                  summary: "Data structure change walkthrough",
                  content:
                    "**Top Bun**: Need to add a 'status' field to orders table with default value, update existing records, and maintain backwards compatibility.\n\n**Meat**: Request migration script with rollback capability.\n\n**Bottom Bun**: Test migration on copy of production data, verify rollback works, check application handles old and new schema during transition.",
                },
              ],
            },
          },
          {
            id: "open-text-sandwich",
            type: "open-text",
            title: "Practice: Plan Your Sandwich",
            points: 25,
            data: {
              prompt:
                "You need to build a 'forgot password' feature for a web application. Write out the complete Sandwich Method plan:\n\n1. Top Bun: Break down the problem into clear steps. What needs to happen? What are the security considerations?\n\n2. Meat: Write the prompt you would give to AI, including all relevant context.\n\n3. Bottom Bun: List the specific things you would verify in the AI's output before committing.",
              placeholder:
                'TOP BUN (My Problem Breakdown):\n\nStep 1: ...\nStep 2: ...\nStep 3: ...\n\nSecurity considerations:\n- ...\n\nMEAT (My AI Prompt):\n\n"..."\n\nBOTTOM BUN (My Verification Checklist):\n\n[ ] Check that...\n[ ] Verify...\n[ ] Understand why...',
              minWords: 150,
            },
          },
          {
            id: "quiz-sandwich",
            type: "quiz",
            title: "Sandwich Method Check",
            points: 15,
            data: {
              questions: [
                {
                  question: "What's the golden rule of the Bottom Bun step?",
                  options: [
                    "Always refactor the code",
                    "Never commit code you don't understand",
                    "Add more comments",
                    "Test in production",
                  ],
                  correctAnswer: "Never commit code you don't understand",
                  explanation: "If you can't explain what every line does, you can't debug it when it breaks.",
                },
                {
                  question: "Why is the Top Bun (problem definition) done before asking AI?",
                  options: [
                    "To waste time",
                    "AI can't understand problems",
                    "To practice problem decomposition and provide better context",
                    "It's not necessary, skip to AI",
                  ],
                  correctAnswer: "To practice problem decomposition and provide better context",
                  explanation:
                    "Breaking down problems yourself builds skills and gives AI better context for implementation.",
                },
              ],
            },
          },
        ],
      },
      {
        id: "no-ai-friday",
        title: "No-AI Friday: Manual Practice",
        description: "Deliberate practice without AI assistance",
        points: 90,
        estimatedTime: 45,
        activities: [
          {
            id: "read-no-ai",
            type: "reading",
            title: "Training with the Weights On",
            points: 20,
            data: {
              content: `# No-AI Friday: Your Mental Gym

Once a week, or for one specific feature per project, turn off Copilot and Cursor. Code it manually. It will feel slow and painful—like running with weights on—but it forces your brain to reconnect with syntax and logic.

## Why This Matters

When you always have AI assistance:
- Your autocomplete muscle weakens
- You forget common patterns and syntax
- Debugging skills atrophy
- You lose the ability to work without internet

**No-AI Friday** is like a fire drill for your brain. When the AI services go down (and they will), you're not helpless.

## How to Practice

### Option 1: Weekly No-AI Day
Pick one day where you disable all AI assistance:
- Turn off Copilot
- Close Cursor
- Don't open ChatGPT
- Use only documentation

Build a small feature or fix bugs. Feel the struggle. That struggle is growth.

### Option 2: One Manual Feature Per Project
For each project, implement at least one feature completely manually:
- No AI code generation
- Documentation and Stack Overflow only
- Take notes on what you had to look up

### Option 3: The Reconstruction Exercise
Take AI-generated code you've already shipped. Delete it. Rewrite it from memory/understanding. Compare your version to the original. What did you miss? What did you do better?

## What You'll Learn

During manual practice, you'll discover:
- Syntax you always relied on AI to remember
- Patterns you understand conceptually but can't implement
- Gaps in your knowledge you didn't know existed
- How documentation is organized

## The Discomfort is the Point

If No-AI Friday feels comfortable, you're not challenging yourself enough. Choose harder tasks. Work with unfamiliar technologies.

**The goal isn't to be faster without AI.** The goal is to be capable without AI, so you can be exceptional with it.

## Building Your Safety Net

Think of this as building a safety net:
- AI services have outages
- Some environments restrict AI tools
- Client projects may prohibit AI
- Interview coding tests are often AI-free

Developers who only know AI-assisted coding will struggle in these situations. You won't.`,
              estimatedTime: 12,
            },
          },
          {
            id: "expand-practice-ideas",
            type: "expandable",
            title: "No-AI Practice Ideas",
            points: 20,
            data: {
              cards: [
                {
                  title: "Beginner Challenges",
                  summary: "Start here if manual coding feels very difficult",
                  content:
                    "- Implement a function to reverse a string\n- Create a counter component in React\n- Build a simple form with validation\n- Parse JSON and display data\n- Implement array filter/map/reduce manually",
                },
                {
                  title: "Intermediate Challenges",
                  summary: "For developers with some experience",
                  content:
                    "- Build a todo list with localStorage persistence\n- Implement debouncing from scratch\n- Create a modal component with focus trapping\n- Build a simple REST API endpoint\n- Implement pagination for a list view",
                },
                {
                  title: "Advanced Challenges",
                  summary: "Push your limits",
                  content:
                    "- Implement JWT authentication flow\n- Build a rate limiter\n- Create a drag-and-drop interface\n- Implement optimistic updates\n- Build a real-time feature with WebSockets",
                },
                {
                  title: "The Reconstruction Challenge",
                  summary: "Test your understanding",
                  content:
                    "Take a complex component you built with AI:\n1. Read through it and understand it\n2. Close the file\n3. Rewrite it from scratch without looking\n4. Compare the two versions\n5. Note what you missed or improved\n\nThis reveals true understanding vs. surface familiarity.",
                },
              ],
            },
          },
          {
            id: "open-text-manual",
            type: "open-text",
            title: "Reflection: Your Manual Coding Gaps",
            points: 25,
            data: {
              prompt:
                "Think about your recent coding experience. Answer these questions honestly:\n\n1. What syntax or patterns do you always rely on AI/autocomplete to write?\n\n2. If all AI tools went offline tomorrow, what tasks would you struggle with most?\n\n3. What's one feature you've built with AI that you couldn't explain line-by-line?\n\n4. What's your plan for deliberate practice? How will you structure your 'No-AI Friday'?",
              placeholder:
                "1. I always rely on AI for:\n- ...\n- ...\n\n2. Without AI, I would struggle with:\n- ...\n\n3. A feature I couldn't fully explain:\n- ...\n\n4. My deliberate practice plan:\n- ...",
              minWords: 100,
            },
          },
          {
            id: "quiz-practice",
            type: "quiz",
            title: "Practice Philosophy Check",
            points: 15,
            data: {
              questions: [
                {
                  question: "What's the main purpose of No-AI Friday?",
                  options: [
                    "To prove AI is useless",
                    "To maintain fundamental skills and build a safety net",
                    "To be faster at coding",
                    "To impress employers",
                  ],
                  correctAnswer: "To maintain fundamental skills and build a safety net",
                  explanation:
                    "Like physical training, manual practice maintains capabilities you need when AI isn't available.",
                },
                {
                  question: "If No-AI Friday feels easy, what should you do?",
                  options: [
                    "Celebrate and skip it",
                    "Choose harder challenges or unfamiliar technologies",
                    "Do it less often",
                    "Just use AI again",
                  ],
                  correctAnswer: "Choose harder challenges or unfamiliar technologies",
                  explanation:
                    "The discomfort of struggle is where learning happens. Easy practice doesn't build new skills.",
                },
              ],
            },
          },
          {
            id: "voice-commitment",
            type: "voice-recording",
            title: "Speaking: Your Practice Commitment",
            points: 10,
            data: {
              prompt:
                "Record a commitment to yourself: When will you practice manual coding? What specific skills will you focus on? Why is this important to your career development?",
              minDuration: 30,
            },
          },
        ],
      },
    ],
  },

  // =============================================
  // PRACTICAL APPLICATION: AI TOOLS DEEP DIVE
  // =============================================
  "ai-tools-mastery": {
    id: "ai-tools-mastery",
    title: "AI Tools Mastery",
    description: "Hands-on practice with specific AI coding tools and platforms",
    modules: [
      {
        id: "vibe-coding-platforms",
        title: "Vibe Coding Platforms",
        description: "Master v0, Lovable, bolt.new and similar tools",
        points: 85,
        estimatedTime: 45,
        activities: [
          {
            id: "read-vibe-platforms",
            type: "reading",
            title: "The Vibe Coding Landscape",
            points: 20,
            data: {
              content: `# Vibe Coding Platforms: Build at the Speed of Thought

Vibe coding platforms let you describe what you want and iterate until it feels right. They're transforming how we prototype and build.

## v0 by Vercel

**What it is**: AI-powered UI generation that outputs production-ready React/Next.js code.

**Best for**:
- Rapid UI prototyping
- Learning React patterns
- Building components quickly
- Iterating on designs

**Workflow**:
1. Describe what you want: "A pricing page with three tiers"
2. Review the generated code and preview
3. Iterate: "Make the middle tier stand out more"
4. Export to your project

**Pro Tips**:
- Be specific about styling: "using Tailwind, dark theme, rounded corners"
- Mention frameworks: "for Next.js App Router"
- Iterate in small steps rather than trying to get everything perfect in one prompt

## Lovable

**What it is**: Full-stack application generator with backend integration.

**Best for**:
- MVPs and prototypes
- Applications needing a database
- Non-technical founders
- Rapid validation of ideas

**Workflow**:
1. Describe your application concept
2. Lovable generates frontend, backend, and database
3. Iterate on features and design
4. Deploy with integrated hosting

## bolt.new

**What it is**: Browser-based rapid prototyping environment.

**Best for**:
- Quick experiments
- Learning and tutorials
- Sharing interactive examples
- No-setup development

**Key Feature**: Everything runs in the browser. No local setup, instant sharing.

## When to Use Each

| Tool | Best Use Case |
|------|---------------|
| v0 | UI components, learning React, design iteration |
| Lovable | Full-stack MVPs, database-backed apps |
| bolt.new | Quick experiments, sharing, learning |

## The Professional Approach

Remember: these tools generate starting points, not finished products. Always:
1. Review generated code for security issues
2. Test edge cases the AI might have missed
3. Ensure accessibility standards are met
4. Understand what you're shipping`,
              estimatedTime: 15,
            },
          },
          {
            id: "expand-platform-features",
            type: "expandable",
            title: "Platform Feature Comparison",
            points: 20,
            data: {
              cards: [
                {
                  title: "v0 Features",
                  summary: "Vercel's UI generator",
                  content:
                    "**Strengths**:\n- High-quality React/Next.js output\n- shadcn/ui components built-in\n- Excellent Tailwind CSS usage\n- Direct Vercel deployment\n\n**Limitations**:\n- Focused on frontend/UI\n- No database integration\n- Requires coding knowledge to extend",
                },
                {
                  title: "Lovable Features",
                  summary: "Full-stack app builder",
                  content:
                    "**Strengths**:\n- Complete applications from prompts\n- Database integration (Supabase)\n- Authentication built-in\n- Rapid MVP creation\n\n**Limitations**:\n- Less control over code structure\n- May need refactoring for production\n- Learning curve for customization",
                },
                {
                  title: "bolt.new Features",
                  summary: "Browser-based prototyping",
                  content:
                    "**Strengths**:\n- Zero setup required\n- Instant sharing\n- Multiple framework support\n- Great for learning\n\n**Limitations**:\n- Browser-based limitations\n- Not for large projects\n- Limited backend capabilities",
                },
                {
                  title: "Google AI Studio",
                  summary: "Gemini-powered development",
                  content:
                    "**Strengths**:\n- Access to Gemini models\n- Long context window\n- Multimodal capabilities\n- Integration with Google Cloud\n\n**Best for**: Prototyping AI features, testing prompts, building Gemini-powered applications.",
                },
              ],
            },
          },
          {
            id: "quiz-platforms",
            type: "quiz",
            title: "Platform Selection Quiz",
            points: 20,
            data: {
              questions: [
                {
                  question:
                    "Which tool is best for building a quick UI component to add to an existing Next.js project?",
                  options: [
                    "Lovable - it has full-stack support",
                    "v0 - it generates production-ready React/Next.js code",
                    "Google AI Studio - it has Gemini",
                    "n8n - it's for automation",
                  ],
                  correctAnswer: "v0 - it generates production-ready React/Next.js code",
                  explanation:
                    "v0 specializes in UI components and outputs clean React/Next.js code ready for integration.",
                },
                {
                  question:
                    "You need to quickly build an MVP with user authentication and a database. Which tool is most appropriate?",
                  options: [
                    "v0 - for the UI",
                    "bolt.new - for quick experiments",
                    "Lovable - for full-stack MVPs with database",
                    "GitHub Copilot - for autocomplete",
                  ],
                  correctAnswer: "Lovable - for full-stack MVPs with database",
                  explanation:
                    "Lovable generates complete applications including backend, database, and authentication.",
                },
              ],
            },
          },
          {
            id: "open-text-platform-plan",
            type: "open-text",
            title: "Practice: Plan Your Tool Stack",
            points: 25,
            data: {
              prompt:
                "You're starting a new project: a simple SaaS application for tracking habits. Plan which AI tools you would use for each phase:\n\n1. Initial prototyping and validation\n2. UI design and iteration\n3. Backend development\n4. Day-to-day coding\n5. Workflow automation\n\nFor each phase, explain which tool(s) you'd use and why.",
              placeholder:
                "Phase 1 - Prototyping:\nTool: ...\nWhy: ...\n\nPhase 2 - UI Design:\nTool: ...\nWhy: ...\n\nPhase 3 - Backend:\nTool: ...\nWhy: ...\n\nPhase 4 - Daily Coding:\nTool: ...\nWhy: ...\n\nPhase 5 - Automation:\nTool: ...\nWhy: ...",
              minWords: 100,
            },
          },
        ],
      },
      {
        id: "ai-code-editors",
        title: "AI Code Editors",
        description: "Master Cursor, GitHub Copilot, and AI-powered IDEs",
        points: 90,
        estimatedTime: 45,
        activities: [
          {
            id: "read-code-editors",
            type: "reading",
            title: "AI Code Editors Deep Dive",
            points: 20,
            data: {
              content: `# AI Code Editors: Your Daily Drivers

These are the tools you'll use every day. Understanding their strengths helps you work more effectively.

## GitHub Copilot

**The Pioneer**: The original AI pair programmer, now mature and widely adopted.

**Key Features**:
- **Autocomplete**: Suggests code as you type
- **Chat**: Ask questions about your code
- **Workspace**: Multi-file editing with AI
- **CLI**: AI in your terminal

**Best Practices**:
- Write clear comments before functions—Copilot uses them as prompts
- Use descriptive variable names
- Keep relevant files open for context
- Review suggestions carefully, don't blindly accept

## Cursor

**The Challenger**: Built AI-first, not bolted on.

**Key Features**:
- **Composer**: Multi-file edits with natural language
- **@ Mentions**: Reference specific files, docs, or code
- **Custom Rules**: Configure AI behavior per project
- **Multiple Models**: Switch between GPT-4, Claude, etc.

**Best Practices**:
- Use @ mentions to provide precise context
- Create .cursorrules files for project conventions
- Use Composer for larger refactors
- Combine with manual coding for best results

## Firebase Studio (formerly Project IDX)

**Google's Entry**: Cloud-based IDE with Gemini integration.

**Key Features**:
- Full development environment in browser
- Gemini AI assistance
- Firebase backend integration
- Collaborative features

**Best for**: Google Cloud projects, Firebase apps, collaborative development

## Kiro (Amazon)

**Spec-Driven Development**: A different approach to AI coding.

**Concept**: Write specifications, AI generates implementation. The specs become documentation and the source of truth.

**Best for**: Teams wanting to maintain architectural intent, documentation-heavy projects

## Choosing Your Editor

| If you want... | Use... |
|----------------|--------|
| Seamless VS Code experience | GitHub Copilot |
| Maximum AI control | Cursor |
| Cloud development | Firebase Studio |
| Spec-driven approach | Kiro |
| All of the above | Mix and match based on task |`,
              estimatedTime: 15,
            },
          },
          {
            id: "vocab-editor-features",
            type: "vocabulary",
            title: "AI Editor Terminology",
            points: 15,
            data: {
              items: [
                { term: "Autocomplete", definition: "Real-time code suggestions as you type" },
                { term: "Ghost Text", definition: "Faded suggestion text shown inline before accepting" },
                { term: "Multi-file Edit", definition: "AI modifications spanning multiple files at once" },
                { term: "Context Window", definition: "The code and files AI can see when making suggestions" },
                { term: "Rules File", definition: "Configuration that customizes AI behavior for a project" },
                { term: "Codebase Indexing", definition: "AI scanning your entire project to understand it" },
              ],
            },
          },
          {
            id: "expand-editor-tips",
            type: "expandable",
            title: "Power User Tips",
            points: 20,
            data: {
              cards: [
                {
                  title: "Copilot Power Tips",
                  summary: "Get more from GitHub's AI",
                  content:
                    "1. **Comment-driven development**: Write detailed comments, let Copilot implement\n2. **Example-driven**: Show one example, Copilot follows the pattern\n3. **Keyboard shortcuts**: Learn Accept (Tab), Next (Alt+]), Reject (Esc)\n4. **Partial accepts**: Use Ctrl+Right to accept word by word",
                },
                {
                  title: "Cursor Power Tips",
                  summary: "Master the AI-first editor",
                  content:
                    "1. **@codebase**: Search entire project for context\n2. **@docs**: Reference documentation sites\n3. **@file**: Include specific files in context\n4. **Cmd+K**: Quick inline edits\n5. **Composer**: Complex multi-file changes\n6. **.cursorrules**: Project-specific AI instructions",
                },
                {
                  title: "Context Management",
                  summary: "Help AI help you",
                  content:
                    "AI quality depends on context. Improve it by:\n\n1. Keep relevant files open/tabbed\n2. Use clear, descriptive names\n3. Maintain consistent code style\n4. Write documentation comments\n5. Use type annotations\n6. Structure code logically",
                },
                {
                  title: "When to Switch Models",
                  summary: "Different models for different tasks",
                  content:
                    "**Use Claude** for: Complex refactoring, code review, explanations\n\n**Use GPT-4** for: General coding, creative solutions\n\n**Use Fast Models** for: Simple completions, quick questions\n\nMost editors let you switch. Use it strategically.",
                },
              ],
            },
          },
          {
            id: "quiz-editors",
            type: "quiz",
            title: "Editor Knowledge Check",
            points: 20,
            data: {
              questions: [
                {
                  question: "What is the purpose of a .cursorrules file?",
                  options: [
                    "To store API keys",
                    "To customize AI behavior for your project",
                    "To list dependencies",
                    "To configure Git",
                  ],
                  correctAnswer: "To customize AI behavior for your project",
                  explanation:
                    "Rules files let you specify project conventions, preferred patterns, and constraints for AI suggestions.",
                },
                {
                  question: "What's the best way to get good Copilot suggestions?",
                  options: [
                    "Just start typing and hope",
                    "Write clear comments and use descriptive names",
                    "Disable all other extensions",
                    "Use only short variable names",
                  ],
                  correctAnswer: "Write clear comments and use descriptive names",
                  explanation:
                    "Copilot uses your code context—comments, names, and patterns—to generate relevant suggestions.",
                },
              ],
            },
          },
          {
            id: "voice-editor-preference",
            type: "voice-recording",
            title: "Speaking: Explain Your Preference",
            points: 15,
            data: {
              prompt:
                "Which AI code editor interests you most (Copilot, Cursor, Firebase Studio, or Kiro) and why? What features appeal to your workflow? Are there any concerns you have about AI-assisted coding?",
              minDuration: 45,
            },
          },
        ],
      },
      {
        id: "automation-agents",
        title: "Automation & AI Agents",
        description: "Leverage n8n, Zapier, and autonomous AI agents",
        points: 80,
        estimatedTime: 40,
        activities: [
          {
            id: "read-automation",
            type: "reading",
            title: "Automation and AI Agents",
            points: 20,
            data: {
              content: `# Automation & AI Agents: Extending Your Capabilities

Beyond writing code, AI can automate workflows and even work autonomously on tasks.

## Workflow Automation

### n8n
**Open-source workflow automation**

**What it does**: Connect APIs, transform data, and automate processes visually.

**Key Features**:
- Self-hostable (data stays yours)
- 400+ integrations
- Code nodes for custom logic
- AI nodes for intelligent processing

**Use Cases**:
- Sync data between services
- Process webhooks
- Transform and route data
- Schedule automated tasks

### Zapier
**The automation giant**

**What it does**: Connect 5000+ apps with no code.

**Key Features**:
- Massive integration library
- AI features for natural language automation
- Paths and filters for complex logic
- Enterprise-ready

**Use Cases**:
- Marketing automation
- Sales workflow
- Customer support routing
- Data synchronization

## AI Agents

### Jules (Google)
**Asynchronous coding agent**

**Concept**: Submit a bug or feature request, Jules works on it while you do other things, then presents a PR for review.

**Best for**: Bug fixes, routine features, working across time zones

### GitHub Agents
**Copilot-powered automation**

**Concept**: Agents that respond to GitHub events—issues opened, PRs submitted, etc.

**Best for**: Automated code review, issue triage, documentation updates

### Vertex AI Agents (Google Cloud)
**Enterprise agent platform**

**Concept**: Build custom AI agents for specific business tasks with enterprise security and compliance.

**Best for**: Customer service, internal tools, domain-specific automation

## The Agent Workflow

1. **Define the task**: Clear specification of what needs to be done
2. **Provide context**: Codebase access, documentation, constraints
3. **Let agent work**: Agent decomposes task and executes
4. **Review output**: Human verifies and approves changes

## Caution with Agents

Agents are powerful but require oversight:
- Review all agent-generated code
- Start with low-risk tasks
- Monitor for hallucinations
- Keep humans in the loop for critical systems`,
              estimatedTime: 12,
            },
          },
          {
            id: "image-vocab-automation",
            type: "image-vocab",
            title: "Automation Concepts",
            points: 15,
            data: {
              items: [
                {
                  id: "workflow",
                  imageUrl: "/workflow-automation-nodes-connected-flowchart.jpg",
                  correctLabel: "Workflow Automation",
                  options: ["Workflow Automation", "Database Schema", "Network Diagram", "File System"],
                },
                {
                  id: "agent",
                  imageUrl: "/ai-agent-robot-assistant-autonomous.jpg",
                  correctLabel: "AI Agent",
                  options: ["AI Agent", "Chatbot", "Search Engine", "API Endpoint"],
                },
                {
                  id: "trigger",
                  imageUrl: "/trigger-event-webhook-lightning-bolt.jpg",
                  correctLabel: "Trigger/Webhook",
                  options: ["Trigger/Webhook", "Database", "User Interface", "Cache"],
                },
                {
                  id: "integration",
                  imageUrl: "/api-integration-puzzle-pieces-connecting.jpg",
                  correctLabel: "API Integration",
                  options: ["API Integration", "Code Editor", "Version Control", "Testing"],
                },
              ],
            },
          },
          {
            id: "expand-automation-examples",
            type: "expandable",
            title: "Automation Examples",
            points: 20,
            data: {
              cards: [
                {
                  title: "Developer Workflow",
                  summary: "Automate your dev processes",
                  content:
                    "**Example**: On new GitHub issue labeled 'bug':\n1. Send Slack notification to team\n2. Create Jira ticket\n3. Assign to on-call developer\n4. Track resolution time\n\n**Tools**: Zapier or n8n + GitHub + Slack + Jira",
                },
                {
                  title: "Content Pipeline",
                  summary: "Automate content processing",
                  content:
                    "**Example**: When blog post is published:\n1. Generate social media posts with AI\n2. Schedule to Twitter/LinkedIn\n3. Send newsletter digest\n4. Update sitemap\n\n**Tools**: n8n + OpenAI + Buffer + Mailchimp",
                },
                {
                  title: "Data Sync",
                  summary: "Keep systems in sync",
                  content:
                    "**Example**: When Stripe payment succeeds:\n1. Create/update customer in CRM\n2. Provision access in your app\n3. Send welcome email\n4. Log to analytics\n\n**Tools**: Zapier + Stripe + HubSpot + SendGrid",
                },
                {
                  title: "AI Agent Workflow",
                  summary: "Let agents handle routine tasks",
                  content:
                    "**Example**: Using Jules for bug fixes:\n1. Triage incoming bug reports\n2. Submit clear ones to Jules\n3. Agent investigates and proposes fix\n4. Review PR and merge if correct\n5. Agent learns from feedback\n\nStart with low-risk bugs, expand as you trust the output.",
                },
              ],
            },
          },
          {
            id: "quiz-automation",
            type: "quiz",
            title: "Automation Quiz",
            points: 15,
            data: {
              questions: [
                {
                  question: "What's the key difference between n8n and Zapier?",
                  options: [
                    "n8n is open-source and self-hostable; Zapier is cloud-only",
                    "Zapier is free; n8n is expensive",
                    "n8n is newer than Zapier",
                    "There's no significant difference",
                  ],
                  correctAnswer: "n8n is open-source and self-hostable; Zapier is cloud-only",
                  explanation:
                    "n8n can be self-hosted for data privacy, while Zapier offers a larger integration library but runs only in their cloud.",
                },
                {
                  question: "What's the recommended approach when starting with AI agents like Jules?",
                  options: [
                    "Give them access to everything immediately",
                    "Start with low-risk tasks and review all output",
                    "Use them only for critical systems",
                    "Never use agents",
                  ],
                  correctAnswer: "Start with low-risk tasks and review all output",
                  explanation:
                    "Agents require human oversight. Start small, review carefully, and expand trust as you verify quality.",
                },
              ],
            },
          },
          {
            id: "open-text-automation-plan",
            type: "open-text",
            title: "Practice: Design an Automation",
            points: 10,
            data: {
              prompt:
                "Design an automation workflow for a developer team. Describe:\n\n1. What trigger starts the automation?\n2. What steps happen automatically?\n3. What tools/integrations are needed?\n4. Where does a human need to review/approve?\n\nBe specific about the workflow and why each step adds value.",
              placeholder:
                "Automation: [Name your automation]\n\nTrigger: When...\n\nSteps:\n1. ...\n2. ...\n3. ...\n\nTools needed:\n- ...\n\nHuman review points:\n- ...\n\nValue added: This automation saves time by...",
              minWords: 80,
            },
          },
        ],
      },
    ],
  },
}

// Helper functions
export function getLearningPath(pathId: string): LearningPath | undefined {
  return learningPaths[pathId]
}

export function getModule(pathId: string, moduleId: string): Module | undefined {
  const path = learningPaths[pathId]
  return path?.modules.find((m) => m.id === moduleId)
}

export function getNextModule(pathId: string, currentModuleId: string): Module | undefined {
  const path = learningPaths[pathId]
  if (!path) return undefined
  const currentIndex = path.modules.findIndex((m) => m.id === currentModuleId)
  if (currentIndex === -1 || currentIndex >= path.modules.length - 1) return undefined
  return path.modules[currentIndex + 1]
}

export function getTotalPathPoints(pathId: string): number {
  const path = learningPaths[pathId]
  if (!path) return 0
  return path.modules.reduce((sum, module) => sum + module.points, 0)
}

export function getAllPaths(): LearningPath[] {
  return Object.values(learningPaths)
}
