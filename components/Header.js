"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
const categories = [["chal", "🍚", "চাল"], ["dal", "🫘", "ডাল"], ["tel", "🛢️", "তেল"], ["sobji", "🥬", "সবজি"], ["mach", "🐟", "মাছ"], ["mangsho", "🍗", "মাংস"], ["dim-dui", "🥛", "ডিম-দুধ"], ["mosla", "🌶️", "মসলা"]];
export default function Header() {
  const path = usePathname();
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState("");
  useEffect(() => setDate(new Intl.DateTimeFormat("bn-BD", { dateStyle: "full", timeZone: "Asia/Dhaka" }).format(new Date())), []);
  async function logout() {
    const result = await authClient.signOut();
    if (result.error) return toast.error(result.error.message);
    toast.success("সাইন আউট সফল হয়েছে");
    window.location.assign("/");
  }
  return <header><div className="container header-top"><Link href="/" className="brand"><span className="brand-icon"><img src="/logo-icon.png" alt="" width="24" height="24" /></span><span><strong>বাজার দর</strong><small>{date || "আজকের বাজার দর"}</small></span></Link><div className="auth-links">{session ? <><Link className="btn btn-ghost" href="/profile">👤 {session.user.name}</Link><button className="btn btn-ghost" onClick={logout}>সাইন আউট</button></> : <><Link className="btn btn-ghost" href="/signin">সাইন ইন</Link><Link className="btn btn-primary" href="/signup">সাইন আপ</Link></>}</div></div><div className="nav-wrap"><nav aria-label="পণ্যের বিভাগ" className="container category-nav">{categories.map(([slug, icon, label]) => <Link className={path === `/category/${slug}` ? "active" : ""} key={slug} href={`/category/${slug}`}>{icon} {label}</Link>)}</nav></div><div className="ticker" aria-label="আজকের বাজার দরের সংবাদ"><div className="ticker-track">{[0, 1].map((copy) => <div className="ticker-group" key={copy} aria-hidden={copy === 1}>{["🍚 স্বর্ণমাছি চাল · ১৪৮ টাকা/কেজি · ▲ ২.১%", "🍚 মিনিকেট চাল · ৯৯ টাকা/কেজি · ▼ ২.৯%", "🫘 মসুর ডাল · ১৪২ টাকা/কেজি · ▲ ২.৯%", "🧅 পেঁয়াজ · ৫৪ টাকা/কেজি · ▲ ১২.৫%"].map((item) => <span key={item}>{item}</span>)}</div>)}</div></div></header>;
}

