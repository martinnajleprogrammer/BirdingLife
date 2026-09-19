import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const SECTIONS = [
  { href: "/species", key: "species", accent: "border-l-accent-terracotta" },
  { href: "/trip-planning", key: "tripPlanning", accent: "border-l-accent-gold" },
  { href: "/journal", key: "journal", accent: "border-l-accent-sky" },
  { href: "/about", key: "about", accent: "border-l-primary" },
] as const;

export default function Home() {
  const t = useTranslations("HomePage");
  const tSections = useTranslations("Sections");

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <section className="max-w-2xl">
        <h1 className="font-display text-4xl leading-tight text-primary sm:text-5xl">{t("title")}</h1>
        <p className="mt-6 text-lg leading-8 text-foreground/70">{t("description")}</p>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`rounded-lg border-l-4 bg-white/60 p-6 shadow-sm transition-shadow hover:shadow-md ${section.accent}`}
          >
            <h2 className="font-display text-lg text-foreground">{tSections(`${section.key}.title`)}</h2>
            <p className="mt-2 text-sm text-foreground/70">{tSections(`${section.key}.description`)}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
