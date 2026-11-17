// Links to other sites open in a new tab; links within the site and mailto: do not.
export function externalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}
}
