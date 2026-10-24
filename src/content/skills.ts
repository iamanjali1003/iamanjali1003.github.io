import { Cloud, Database, Layers, Terminal } from "lucide-react"

import type { SkillGroup } from "./types"

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    icon: Terminal,
    items: ["Java", "TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    items: ["React", "Next.js", "Node.js", "Express.js", "Spring Boot", "Tailwind CSS", "shadcn/ui", "TanStack Query", "Zustand", "Zod", "React Hook Form"],
  },
  {
    title: "Databases & Messaging",
    icon: Database,
    items: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "H2", "Spring Data JPA", "Apache Kafka", "REST APIs"],
  },
  {
    title: "Cloud & Tools",
    icon: Cloud,
    items: ["AWS S3", "CloudFront", "Elastic Beanstalk", "EC2", "IAM", "Docker", "Git", "Maven", "JUnit 5", "GitHub Actions", "JWT"],
  },
]
