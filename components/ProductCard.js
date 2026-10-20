import Link from "next/link";
import { bn, units } from "@/lib/products";
export function ChangeBadge({ change }) {
  return <span className={`change ${change.dir}`}>{change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—"} {bn(Math.abs(change.pct))}%</span>;
}
export default function ProductCard({ product }) {
  return <Link href={`/product/${product.slug}`} className="product-card card"><div className="product-title"><span className="product-emoji">{product.image}</span><div><h3>{product.nameBn}</h3><p>প্রতি {units[product.unit] || product.unit}</p></div></div><div className="price-row"><div><small>আজকের দাম</small><strong>{bn(product.today)} টাকা</strong></div><ChangeBadge change={product.change} /></div></Link>;
}
