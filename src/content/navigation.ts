// Every section on the page, in order. Each id matches a <section id>.
export const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

// The ones the top bar links to; education is reachable from search and the phone menu.
export const navigation = sections.filter((section) => section.id !== "education")

export const sectionIds = sections.map((section) => section.id)
