// Site-wide settings: who the site is for, where it lives, and where it links.
// Page titles and descriptions are in ./pages.ts; everything the pages say is
// in src/content/.

export const siteConfig = {
  name: "Anjali",
  url: "https://iamanjali1003.github.io",
  locale: "en_IN",
  language: "en",
  title: "Anjali · Software engineering student in Bengaluru",
  description:
    "Anjali is a software engineering student in Bengaluru and a Kubernetes contributor who builds full-stack products with React, Next.js, Node.js, Java and Spring Boot on AWS.",
  keywords: [
    "Anjali",
    "software engineer",
    "software engineering student",
    "full stack developer",
    "Kubernetes contributor",
    "open source",
    "React",
    "Next.js",
    "Node.js",
    "Java",
    "Spring Boot",
    "AWS",
    "Bengaluru",
  ],
  author: {
    name: "Anjali",
    jobTitle: "Software Engineering Student",
    email: "iamanjali1003@gmail.com",
  },
  links: {
    resume: "https://drive.google.com/file/d/1KDk7v-9up1t4L8n-G9C0HnLWMaej5W5T/view",
    github: "https://github.com/iamanjali1003",
    linkedin: "https://www.linkedin.com/in/iamanjali1003",
    leetcode: "https://leetcode.com/u/iamanjali1003",
    codechef: "https://www.codechef.com/users/iamanjali1003",
    email: "mailto:iamanjali1003@gmail.com",
  },
} as const

export type NavItem = { title: string; href: string }

// The top bar, the phone menu and the ⌘K search all read this list.
export const mainNav: NavItem[] = [
  { title: "Projects", href: "/projects/" },
  { title: "Open source", href: "/open-source/" },
  { title: "Blog", href: "/blog/" },
  { title: "About", href: "/about/" },
]

export const footerLinks: NavItem[] = [
  { title: "GitHub", href: siteConfig.links.github },
  { title: "LinkedIn", href: siteConfig.links.linkedin },
  { title: "LeetCode", href: siteConfig.links.leetcode },
  { title: "CodeChef", href: siteConfig.links.codechef },
  { title: "RSS", href: "/feed.xml" },
]

export const absoluteUrl = (path = "/") => new URL(path, siteConfig.url).toString()
