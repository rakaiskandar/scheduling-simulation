import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { TeamMember } from "@/components/team-member";
import { Github, Instagram } from "lucide-react";
import Image from "next/image";

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
                We're a passionate group of computer science education dedicated
                to making complex scheduling algorithms easy to understand
                through interactive visualization.
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
                    href: "https://www.instagram.com/cikaalkautsar_",
                    label: "Instagram",
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
                    href: "https://www.instagram.com/zyy__ell",
                    label: "Instagram",
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
                    href: "https://www.instagram.com/rakaaaisk",
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
                    href: "https://www.instagram.com/susanindiii",
                    label: "Instagram",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="py-8 md:py-16 flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block rounded-lg bg-purple-100/80 dark:bg-purple-900/30 px-3 py-1 text-sm text-purple-800 dark:text-purple-300 backdrop-blur-sm">
                About Validator
              </div>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-5xl">
                Meet the Validator
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Validator is led by our lecturer, a passionate educator dedicated to making 
                complex computer science concepts easier to understand through interactive visualizations.
              </p>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col items-center justify-between text-center py-12">
                  <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full">
                    <Image
                      src={"/img/pak-jajang.jpeg?height=300&width=300"}
                      alt={"validator"}
                      width={160}
                      height={160}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Jajang Kusnendar, M.T</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
