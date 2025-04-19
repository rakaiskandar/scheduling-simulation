import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { ReactNode } from "react"

interface SocialLink {
  icon: ReactNode
  href: string
  label: string
}

interface TeamMemberProps {
  name: string
  id: string
  imageSrc: string
  socialLinks: SocialLink[]
}

export function TeamMember({ name, id, imageSrc, socialLinks }: TeamMemberProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 mb-4 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 p-6 shadow-sm transition-all hover:shadow-md backdrop-blur-sm">
      <div className="flex flex-col items-center justify-between text-center">
        <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={name}
            width={160}
            height={160}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>
        <p className="mb-3 text-sm font-medium text-purple-600 dark:text-purple-400">{id}</p>
        <div className="mt-auto flex space-x-2">
          {socialLinks.map((link, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              asChild
              className="h-8 w-8 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                {link.icon}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
