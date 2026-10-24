import { Cloud, Database, PanelsTopLeft, Server, Terminal, Wrench } from "lucide-react"

import type { SkillGroup } from "./types"

export const skills: SkillGroup[] = [
  { title: "Languages", icon: Terminal, items: ["Java", "TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"] },
  { title: "Backend", icon: Server, items: ["Spring Boot", "Node.js", "Express.js", "REST APIs", "Apache Kafka", "JWT"] },
  { title: "Frontend", icon: PanelsTopLeft, items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Zustand", "Zod"] },
  { title: "Databases", icon: Database, items: ["MySQL", "PostgreSQL", "MongoDB", "Spring Data JPA", "Mongoose"] },
  { title: "Cloud", icon: Cloud, items: ["AWS S3", "CloudFront", "Elastic Beanstalk", "EC2", "IAM"] },
  { title: "Tools & Testing", icon: Wrench, items: ["Git", "GitHub Actions (CI/CD)", "Docker", "Maven", "JUnit 5"] },
]
