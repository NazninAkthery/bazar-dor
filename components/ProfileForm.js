"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function ProfileForm() {
  const { data: session, isPending } = authClient.useSession();
  const [pending, setPending] = useState(false);
  useEffect(() => {
    if (!isPending && !session) window.location.replace("/signin?protected=1");
  }, [isPending, session]);
  if (isPending || !session)
    return <div className="skeleton auth-card" aria-label="লোড হচ্ছে" />;
  async function submit(e) {
    e.preventDefault();
    setPending(true);
    const name = new FormData(e.currentTarget).get("name").trim();
    if (!name) {
      toast.error("আপনার নাম লিখুন");
      setPending(false);
      return;
    }
    try {
      const result = await authClient.updateUser({ name });
      if (result.error) throw new Error(result.error.message);
      toast.success("তথ্য আপডেট হয়েছে");
      window.location.assign("/profile");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPending(false);
    }
  }
  return (
    <section className="auth-card card">
      <h1>তথ্য আপডেট করুন</h1>
      <p className="muted">আপনার প্রোফাইলের নাম পরিবর্তন করুন</p>
      <form onSubmit={submit}>
        <label>
          আপনার নাম
          <input
            className="input input-bordered"
            name="name"
            defaultValue={session.user.name}
            required
            maxLength={80}
            autoComplete="name"
          />
        </label>
        <button className="btn btn-primary" disabled={pending}>
          {pending ? "অপেক্ষা করুন…" : "তথ্য আপডেট করুন"}
        </button>
      </form>
      <Link className="back-link" href="/profile">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </section>
  );
}
