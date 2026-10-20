import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProducts, bn, units } from "@/lib/products";
import { ChangeBadge } from "@/components/ProductCard";
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?protected=1&next=${encodeURIComponent(`/product/${slug}`)}`);
  const markets = product.markets;
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const average = markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length;
  return <><div className="breadcrumbs"><Link href="/">হোম</Link> / <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link> / {product.nameBn}</div><section className="detail-summary card"><div className="detail-heading"><span className="detail-emoji">{product.image}</span><div><h1>{product.nameBn}</h1><p>দেশের বিভিন্ন বাজারে আজকের {product.nameBn}-এর দাম</p><div className="tags"><Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link><span>প্রতি {units[product.unit]}</span></div></div></div><div className="today-price"><p>আজকের দাম</p><strong>{bn(product.today)}</strong><p>টাকা / {units[product.unit]}</p><ChangeBadge change={product.change} /></div></section><section><h2>দামের সারসংক্ষেপ</h2><div className="summary-grid">{[["সর্বনিম্ন দাম", min], ["সর্বাধিক দাম", max], ["গড় দাম", average]].map(([label, price]) => <div className="stat-card card" key={label}><p>{label}</p><strong>{bn(price)} টাকা</strong><small>প্রতি {units[product.unit]}-এর হিসাবে</small></div>)}</div></section><section><h2>বাজারভিত্তিক আজকের দাম</h2><p className="muted">বাজার অনুযায়ী সর্বনিম্ন ও সর্বাধিক দাম</p><div className="table-wrap"><table className="table"><thead><tr><th>বাজার</th><th>বিভাগ</th><th>সর্বনিম্ন</th><th>সর্বাধিক</th></tr></thead><tbody>{markets.map((m) => <tr key={m.market}><td>{m.market}</td><td>{m.division}</td><td>{bn(m.min)} টাকা</td><td>{bn(m.max)} টাকা</td></tr>)}</tbody></table></div></section></>;
}

