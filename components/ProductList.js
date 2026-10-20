"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
export default function ProductList({
  products,
  title = "সব পণ্য",
  subtitle,
  sortable = true,
}) {
  const [sort, setSort] = useState("default");
  const sorted = [...products];
  if (sort === "low") sorted.sort((a, b) => a.today - b.today);
  if (sort === "high") sorted.sort((a, b) => b.today - a.today);
  return (
    <section id={title === "সব পণ্য" ? "সব-পণ্য" : undefined}>
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {sortable && (
          <label className="sort-label">
            সাজান:{" "}
            <select
              className="select select-bordered"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>
          </label>
        )}
      </div>
      <div className="product-grid">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
