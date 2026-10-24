import type { Entry } from "./types"

const github = (repo: string) => `https://github.com/iamanjali1003/${repo}`

export const projects: Entry[] = [
  {
    title: "pixStory",
    href: github("pixstory"),
    badge: { label: "Live" },
    action: { label: "Visit", href: "http://Pixstory-env-1.eba-55bqi3ks.ap-south-1.elasticbeanstalk.com" },
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "AWS"],
    points: [
      "**Deployed** a photo gallery on **AWS Elastic Beanstalk**, serving the React app and REST API from one origin",
      "Designed direct-to-**S3** uploads with **presigned URLs** so image bytes bypass the server, delivered over a **CloudFront** CDN fronting a private bucket locked by Origin Access Control",
      "Implemented **JWT** auth with bcrypt, full-text search on MongoDB text indexes, and likes/comments that patch the **TanStack Query** cache in place instead of refetching the feed",
    ],
  },
  {
    title: "datacheck",
    href: github("datacheck"),
    action: { label: "Source", href: github("datacheck") },
    tech: ["Java 21", "Maven", "JUnit 5", "GitHub Actions"],
    points: [
      "Built a **CLI** that validates CSV files against YAML rules and exits non-zero on failure, so it can gate a **CI** build",
      "Designed a plugin architecture on Java’s **ServiceLoader**: **5 validation rules** and **4 report formats** (text, JSON, HTML, LaTeX) are discovered at runtime, so adding one never touches the engine",
      "Covered the parser, engine, rules and reporters with **31 JUnit 5 tests**, run on every push by **GitHub Actions**",
    ],
  },
  {
    title: "monoCV",
    href: github("monocv"),
    action: { label: "Source", href: github("monocv") },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand", "Zod"],
    points: [
      "Built an **ATS-friendly resume builder** with live preview and **PDF export**, both rendered from one data model",
      "Validated every form with **Zod** and React Hook Form; **Zustand** state persists to localStorage across reloads",
    ],
  },
  {
    title: "Midas",
    href: github("forage-midas"),
    suffix: "— JPMorgan Chase Software Engineering Simulation",
    action: { label: "Certificate", href: "https://drive.google.com/file/d/1I1JZLDGKprwv0Qwg48M_Yq4-xte1_kWC/view" },
    tech: ["Java", "Spring Boot", "Kafka", "JPA"],
    points: [
      "Integrated **Kafka**, H2 persistence and a REST Incentive API into one **Spring Boot** service tracking user balances",
      "Wrote Kafka consumers that deserialize and validate transactions, tested against **embedded Kafka**",
    ],
  },
  {
    title: "Student Attendance Management System",
    href: github("student-attendance-management-system"),
    action: { label: "Source", href: github("student-attendance-management-system") },
    tech: ["MySQL 8.0", "SQL", "Stored Procedures", "Triggers"],
    points: [
      "Designed a **3NF** schema of **7 tables**, with a composite unique key allowing one mark per student, course and date",
      "Wrote **6 stored procedures** for reporting and bulk marking, and **4 audit triggers** that log every change",
    ],
  },
]
