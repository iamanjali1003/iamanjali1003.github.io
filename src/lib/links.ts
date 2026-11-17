// Links to other sites open in a new tab without access to this one;
// links within the site and mailto: links do not.
export function isExternal(href: string) {
  return /^https?:\/\//.test(href)
}

export function externalProps(href: string) {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {}
}
