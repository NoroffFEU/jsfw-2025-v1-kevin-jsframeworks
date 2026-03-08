import Image from "next/image";
import Link from "next/link";
import CartLink from "@/components/cart/cartLink";
import pengWinLogo from "@/assets/PengWin-logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-6">
          <Image
            src={pengWinLogo}
            alt="PengWin logo"
            width={80}
            height={80}
            priority
          />
          <span className="text-lg font-bold">
            PengWin 
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CartLink />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}