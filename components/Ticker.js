"use client";
import { useEffect, useState } from "react";
import { bn, units } from "@/lib/products";
export default function Ticker() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/ticker")
      .then((response) => (response.ok ? response.json() : []))
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);
  return (
    <div className="ticker" aria-label="আজকের বাজার দরের সংবাদ">
      {products.length === 0 ? (
        <p className="ticker-message">
          নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর
        </p>
      ) : (
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy} aria-hidden={copy === 1}>
              {products.map((product) => (
                <span key={product.id}>
                  {product.image} {product.nameBn} · {bn(product.today)} টাকা/
                  {units[product.unit]} ·{" "}
                  <b className={product.change.dir}>
                    {product.change.dir === "up"
                      ? "▲"
                      : product.change.dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {bn(Math.abs(product.change.pct))}%
                  </b>
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
