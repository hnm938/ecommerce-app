import Link from "next/link";
import {useRouter} from "next/router";

export default function Navbar() {
  const inactiveLink = "flex gap-1 p-1 pr-4";
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-l-lg";

  const router = useRouter();
  const {pathname} = router;

  return (
    <aside className="text-white p-4 pr-0">
      <nav className="flex flex-col gap-3">
        <Link href={"/"}>
          <span className={pathname === "/" ? activeLink : inactiveLink}>
            Home
          </span>
        </Link>
        <Link href={"/"}>
          <span className={pathname === "/" ? activeLink : inactiveLink}>
            Dashboard
          </span>
        </Link>
        <Link href={"/products"}>
          <span
            className={
              pathname.includes("/products") ? activeLink : inactiveLink
            }
          >
            Products
          </span>
        </Link>
        <Link href={"/orders"}>
          <span
            className={pathname.includes("/orders") ? activeLink : inactiveLink}
          >
            Orders
          </span>
        </Link>
        <Link href={"/settings"}>
          <span
            className={
              pathname.includes("/settings") ? activeLink : inactiveLink
            }
          >
            Settings
          </span>
        </Link>
      </nav>
    </aside>
  );
}