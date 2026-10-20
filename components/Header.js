"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Ticker from "./Ticker";
const categories = [
  ["chal", "🍚", "চাল"],
  ["dal", "🫘", "ডাল"],
  ["tel", "🛢️", "তেল"],
  ["sobji", "🥬", "সবজি"],
  ["mach", "🐟", "মাছ"],
  ["mangsho", "🍗", "মাংস"],
  ["dim-dui", "🥛", "ডিম-দুধ"],
  ["mosla", "🌶️", "মসলা"],
];
export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState("");
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("auth") === "success") {
      toast.success("সাইন ইন সফল হয়েছে", { id: "social-success" });
      url.searchParams.delete("auth");
      window.history.replaceState(
        null,
        "",
        url.pathname + url.search + url.hash,
      );
    }
  }, []);
  useEffect(
    () =>
      setDate(
        new Intl.DateTimeFormat("bn-BD", {
          dateStyle: "full",
          timeZone: "Asia/Dhaka",
        }).format(new Date()),
      ),
    [],
  );
  async function logout() {
    const result = await authClient.signOut();
    if (result.error) return toast.error(result.error.message);
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  }
  return (
    <header>
      <div className="container header-top">
        <Link href="/" className="brand">
          <span className="brand-icon">
            <img src="/logo-icon.png" alt="" width="24" height="24" />
          </span>
          <span>
            <strong>বাজার দর</strong>
            <small>{date || "আজকের বাজার দর"}</small>
          </span>
        </Link>
        <div className="auth-links">
          {session ? (
            <>
              <Link className="btn btn-ghost" href="/profile">
                👤 {session.user.name}
              </Link>
              <button className="btn btn-ghost" onClick={logout}>
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-ghost" href="/signin">
                সাইন ইন
              </Link>
              <Link className="btn btn-primary" href="/signup">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="nav-wrap">
        <nav aria-label="পণ্যের বিভাগ" className="container category-nav">
          {categories.map(([slug, icon, label]) => (
            <Link
              className={path === `/category/${slug}` ? "active" : ""}
              key={slug}
              href={`/category/${slug}`}
            >
              {icon} {label}
            </Link>
          ))}
        </nav>
      </div>
      <Ticker />
    </header>
  );
}
