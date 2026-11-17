// The intro on the home and about pages.
export const profile = {
  role: "Software engineering student",
  location: "Bengaluru, India",
  availability: "Open to SDE internships and new-grad roles",
  headline: "I build full-stack software, from React and Next.js front ends to Java and Node.js services on AWS.",
  about:
    "I'm a final-year Information Science & Engineering student at JSS Academy of Technical Education, Bengaluru, graduating in 2027. I contribute to Kubernetes, and I'm open to SDE internships and new-grad roles.",
  contact: "Email is the fastest way to reach me.",
  // The "At a glance" card next to the intro. Icons are named in components/home/at-a-glance.tsx.
  glance: [
    { icon: "location", label: "Based in", value: "Bengaluru, India" },
    { icon: "education", label: "Studying", value: "B.E. Information Science & Engineering, JSSATE · 2027" },
    { icon: "focus", label: "Focus", value: "Full-stack: React, Next.js, Node.js, Java, Spring Boot, AWS" },
    { icon: "open-source", label: "Open source", value: "Contributor to Kubernetes SIG projects" },
  ],
} as const
