import { Section } from "@/components/sections/section"
import { TextLink } from "@/components/shared/text-link"
import { profile } from "@/content/profile"

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-[40ch] text-[20px] leading-[1.45] tracking-[-0.015em] text-balance">{profile.contact}</p>
      <TextLink href={`mailto:${profile.email}`} className="mt-4 inline-block text-[15px] font-medium">
        {profile.email}
      </TextLink>
    </Section>
  )
}
