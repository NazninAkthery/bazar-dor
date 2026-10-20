"use client";
export default function ErrorPage({ reset }) {
  return (
    <section className="empty-state">
      <span>🧺</span>
      <h1>তথ্য লোড করা যায়নি</h1>
      <p>ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
      <button className="btn btn-primary" onClick={reset}>
        আবার চেষ্টা করুন
      </button>
    </section>
  );
}
