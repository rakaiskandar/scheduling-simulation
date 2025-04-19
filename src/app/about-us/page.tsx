import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { TeamMember } from "@/components/team-member";
import { Github, Instagram } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-8 md:py-16 flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block rounded-lg bg-purple-100/80 dark:bg-purple-900/30 px-3 py-1 text-sm text-purple-800 dark:text-purple-300 backdrop-blur-sm">
                About Us
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
                Meet the Team
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                We're a passionate group of developers and computer science
                enthusiasts dedicated to making complex scheduling algorithms
                easy to understand through interactive visualization.
              </p>
            </div>
          </div>
        </section>

        <section className="py-6 md:py-12 flex items-center justify-center">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <TeamMember
                name="Cikal Kautsar Qadri"
                id="2306115"
                imageSrc="/img/al.jpg?height=300&width=300"
                socialLinks={[
                  {
                    icon: <Github className="h-5 w-5" />,
                    href: "https://github.com/cikalkautsar",
                    label: "GitHub",
                  },
                  {
                    icon: <Instagram className="h-5 w-5" />,
                    href: "#",
                    label: "LinkedIn",
                  },
                ]}
              />
              <TeamMember
                name="Ellyazar Swastiko"
                id="2309749"
                imageSrc="/img/el.jpg?height=300&width=300"
                socialLinks={[
                  {
                    icon: <Github className="h-5 w-5" />,
                    href: "https://github.com/EllyazarS",
                    label: "GitHub",
                  },
                  {
                    icon: <Instagram className="h-5 w-5" />,
                    href: "#",
                    label: "LinkedIn",
                  },
                ]}
              />
              <TeamMember
                name="Raka Iskandar"
                id="2306068"
                imageSrc="/img/raka.jpg?height=300&width=300"
                socialLinks={[
                  {
                    icon: <Github className="h-5 w-5" />,
                    href: "https://github.com/rakaiskandar",
                    label: "Github",
                  },
                  {
                    icon: <Instagram className="h-5 w-5" />,
                    href: "#",
                    label: "Instagram",
                  },
                ]}
              />
              <TeamMember
                name="Susan Indi"
                id="2310171"
                imageSrc="/img/susan.jpg?height=300&width=300"
                socialLinks={[
                  {
                    icon: <Github className="h-5 w-5" />,
                    href: "https://github.com/susanindiii",
                    label: "GitHub",
                  },
                  {
                    icon: <Instagram className="h-5 w-5" />,
                    href: "#",
                    label: "Instagram",
                  },
                ]}
              />
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
