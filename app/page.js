import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/products";
export default async function Home() {
  const products = await getProducts();
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
  return (
    <>
      <section className="hero-banner">
        <div>
          <span className="eyebrow">প্রতিদিনের বাজার, প্রতিদিনের খবর</span>
          <h1>আজকের বাজারের দাম এক নজরে</h1>
          <p>
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম
            <br className="desktop-break" /> জানুন সহজেই। সঠিক দামে, সচেতন
            কেনাকাটা করুন।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary">
            সব পণ্য দেখুন
          </a>
        </div>
        <img
          className="hero-image"
          src="/bazar-hero.png"
          alt="তাজা সবজি ও নিত্যপ্রয়োজনীয় পণ্যের বাজারের ব্যাগ"
          width="315"
          height="263"
        />
      </section>
      <ProductList
        title="▲ আজ দাম বেড়েছে"
        products={risers}
        sortable={false}
      />
      <ProductList title="▼ আজ দাম কমেছে" products={fallers} sortable={false} />
      <ProductList
        products={products}
        subtitle="নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর"
      />
    </>
  );
}
