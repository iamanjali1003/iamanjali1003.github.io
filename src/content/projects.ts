import type { Project } from "./types"

const github = (repo: string) => `https://github.com/iamanjali1003/${repo}`

// In the order they appear. featured: true puts a project on the home page.
export const projects: Project[] = [
  {
    name: "pixStory",
    area: "Full-stack",
    featured: true,
    summary: "A shared photo gallery, deployed on AWS.",
    href: github("pixstory"),
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "AWS"],
    points: [
      "**Deployed** a photo gallery on **AWS Elastic Beanstalk**, serving the React app and REST API from one origin",
      "Designed direct-to-**S3** uploads with **presigned URLs** that skip the server, served via a **CloudFront** CDN",
      "Implemented **JWT** auth and MongoDB full-text search, and made likes **atomic** to prevent race conditions",
    ],
  },
  {
    name: "datacheck",
    area: "Backend",
    featured: true,
    summary: "A command-line tool that validates CSV files against rules written in YAML.",
    href: github("datacheck"),
    tech: ["Java 21", "Maven", "JUnit 5", "GitHub Actions"],
    points: [
      "Built a **CLI** that validates CSV files against YAML rules and exits non-zero on failure, so it can gate a **CI** build",
      "Designed a **plugin system** for **5 validation rules** and **4 report formats**, so new ones need no core changes",
      "Covered the parser, engine, rules and reporters with **35 JUnit 5 tests**, run on every push by **GitHub Actions**",
    ],
  },
  {
    name: "monoCV",
    area: "Frontend",
    featured: true,
    summary: "A free, ATS-friendly resume builder with PDF export.",
    href: github("monocv"),
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand", "Zod"],
    points: [
      "Built an **ATS-friendly resume builder** with live preview and **PDF export**, both rendered from one data model",
      "Fixed an autosave loop that rewrote state every **300 ms** by replacing five duplicated effects with **one hook**",
      "Validated every form with **Zod** and React Hook Form; **Zustand** keeps drafts in localStorage across reloads",
    ],
  },
  {
    name: "Midas",
    area: "Backend",
    summary: "A Spring Boot service that processes transactions from Kafka, built for the JPMorgan Chase software engineering simulation.",
    href: github("forage-midas"),
    links: [{ label: "Certificate", href: "https://drive.google.com/file/d/1I1JZLDGKprwv0Qwg48M_Yq4-xte1_kWC/view" }],
    tech: ["Java", "Spring Boot", "Kafka", "JPA"],
    points: [
      "Integrated **Kafka**, an H2 database and a **REST API** into one **Spring Boot** microservice",
      "Wrote Kafka consumers that deserialize and validate transactions, tested against **embedded Kafka**",
    ],
  },
  {
    name: "Student Attendance Management System",
    area: "Database",
    summary: "A MySQL database for tracking student attendance.",
    href: github("student-attendance-management-system"),
    tech: ["MySQL 8.0", "SQL", "Stored Procedures", "Triggers"],
    points: [
      "Designed a **3NF** schema of **7 tables**, with a composite unique key allowing one mark per student, course and date",
      "Wrote **6 stored procedures** for reporting and bulk marking, and **4 audit triggers** that log every change",
      "Enforced rules in the database itself, with a **BEFORE INSERT** trigger that rejects future-dated attendance",
    ],
  },
]
