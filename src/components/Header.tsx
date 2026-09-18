import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/species", label: "Species" },
  { href: "/trip-planning", label: "Trip Planning" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Pampas Birding Guide
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:flex">
          {NAV_LINKS.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-zinc-950 dark:hover:text-zinc-50">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
