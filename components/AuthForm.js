"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
export default function AuthForm({ signup = false }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("protected"))
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন", { id: "protected" });
  }, []);
  function destination() {
    const next = new URLSearchParams(window.location.search).get("next");
    return next?.startsWith("/product/") && !next.includes("\\") ? next : "/";
  }
  async function submit(e) {
    e.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const values = {
        email: form.get("email").trim(),
        password: form.get("password"),
      };
      const result = signup
        ? await authClient.signUp.email({
            ...values,
            name: form.get("name").trim(),
          })
        : await authClient.signIn.email(values);
      if (result.error)
        throw new Error(result.error.message || "আবার চেষ্টা করুন");
      toast.success(
        signup ? "অ্যাকাউন্ট তৈরি হয়েছে। সাইন ইন করুন।" : "সাইন ইন সফল হয়েছে",
      );
      window.location.assign(signup ? "/signin?registered=1" : destination());
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setPending(false);
    }
  }
  async function social(provider) {
    setPending(true);
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: destination(),
      });
      if (result.error) throw new Error(result.error.message);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="auth-card card">
      <div className="auth-intro">
        <span className="auth-symbol">🛒</span>
        <h1>{signup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}</h1>
        <p>
          {signup
            ? "বাজার দর-এর সঙ্গে সচেতন কেনাকাটা শুরু করুন"
            : "আপনার অ্যাকাউন্টে আবারও স্বাগতম"}
        </p>
      </div>
      <form onSubmit={submit}>
        {signup && (
          <label>
            আপনার নাম
            <input
              className="input input-bordered"
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              placeholder="সম্পূর্ণ নাম"
            />
          </label>
        )}
        <label>
          ইমেইল
          <input
            className="input input-bordered"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </label>
        <label>
          পাসওয়ার্ড
          <input
            className="input input-bordered"
            type="password"
            name="password"
            autoComplete={signup ? "new-password" : "current-password"}
            minLength={8}
            maxLength={128}
            required
            placeholder="কমপক্ষে ৮ অক্ষর"
          />
        </label>
        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}
        <button className="btn btn-primary full-width" disabled={pending}>
          {pending ? "অপেক্ষা করুন…" : signup ? "সাইন আপ" : "সাইন ইন"}
        </button>
      </form>
      <div className="divider">অথবা</div>
      <div className="social-buttons">
        <button
          className="btn btn-outline"
          disabled={pending}
          onClick={() => social("google")}
        >
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          className="btn btn-outline"
          disabled={pending}
          onClick={() => social("github")}
        >
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
      <p className="auth-switch">
        {signup ? "আগেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"}{" "}
        <Link href={signup ? "/signin" : "/signup"}>
          {signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
        </Link>
      </p>
    </div>
  );
}
