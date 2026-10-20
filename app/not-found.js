import Link from "next/link";
export default function NotFound() {
  return (
    <section className="empty-state">
      <span>🧺</span>
      <h1>৪০৪ — খুঁজে পাওয়া যায়নি</h1>
      <p>এই পণ্য, বিভাগ বা পেজটি পাওয়া যায়নি।</p>
      <Link className="btn btn-primary" href="/">
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
}
