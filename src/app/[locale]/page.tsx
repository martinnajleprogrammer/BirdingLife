import Link from "next/link";

const SECTIONS = [
  {
    href: "/species",
    title: "Species",
    description:
      "A growing, photo-led checklist of colorful birds found in the Tandil sierra and the surrounding pampa grassland.",
    accent: "border-l-accent-terracotta",
  },
  {
    href: "/trip-planning",
    title: "Trip Planning",
    description:
      "Practical notes for birders visiting the Buenos Aires pampas: when to go, where to look, what to bring.",
    accent: "border-l-accent-gold",
  },
  {
    href: "/journal",
    title: "Journal",
    description:
      "A first-person learning log of birding trips, sightings, and mistakes — written as the knowledge builds, not pretending it's already there.",
    accent: "border-l-accent-sky",
  },
  {
    href: "/about",
    title: "About",
    description: "Who's behind this site, and the sources it leans on: Aves Argentinas, eBird, and the Cornell Lab.",
    accent: "border-l-primary",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <section className="max-w-2xl">
        <h1 className="font-display text-4xl leading-tight text-primary sm:text-5xl">
          Birding the Argentine pampas, one sighting at a time
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/70">
          A field guide and learning journal for the colorful bird species of Tandil and the
          Buenos Aires pampa grassland &mdash; built for visiting birders, and for anyone
          curious about the region's wildlife.
        </p>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`rounded-lg border-l-4 bg-white/60 p-6 shadow-sm transition-shadow hover:shadow-md ${section.accent}`}
          >
            <h2 className="font-display text-lg text-foreground">{section.title}</h2>
            <p className="mt-2 text-sm text-foreground/70">{section.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
