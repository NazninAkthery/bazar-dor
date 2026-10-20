export default function Loading() {
  return <div role="status" aria-label="পণ্যের তথ্য লোড হচ্ছে"><div className="skeleton skeleton-heading" /><div className="product-grid">{Array.from({ length: 9 }, (_, i) => <div key={i} className="skeleton skeleton-card" />)}</div><span className="sr-only">লোড হচ্ছে…</span></div>;
}
