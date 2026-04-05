import Link from "next/link";

type PageShellProps = Readonly<{
  children: React.ReactNode;
}>;

const navItems = [
  { href: "/", label: "Home" },
  { href: "/input", label: "Input" },
  { href: "/checkout", label: "Checkout" },
  { href: "/history", label: "History" },
  { href: "/support", label: "Support" },
];

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="page-shell">
      <header className="shell-header">
        <div className="brand-block">
          <span className="brand-kicker">AI fortune content</span>
          <Link className="brand-name" href="/">
            Dongyangui Sinbiroun Unmyeong
          </Link>
        </div>
        <nav className="shell-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="page-main">{children}</main>
    </div>
  );
}

