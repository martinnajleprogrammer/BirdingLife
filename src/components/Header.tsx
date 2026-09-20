import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/species", label: "Species" },
  { href: "/trip-planning", label: "Trip Planning" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="border-b border-primary/15">
      <div className="mx-auto flex max-w-5xl items-center justify-end px-6 py-2">
        <LanguageSwitcher />
      </div>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl text-primary">
          Pampas Birding Guide
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-foreground/70 sm:flex">
          {NAV_LINKS.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
