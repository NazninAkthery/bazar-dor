export const bn = (number) => Number(number).toLocaleString("bn-BD", { maximumFractionDigits: 1 });
export const units = { kg: "কেজি", liter: "লিটার", litre: "লিটার", dozen: "ডজন", piece: "পিস", pcs: "পিস" };
const servers = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];
export async function getProducts() {
  for (const server of servers) {
    try {
      const response = await fetch(`${server}/products`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) });
      if (!response.ok) continue;
      const data = await response.json();
      if (Array.isArray(data)) return data;
    } catch { /* Try the next assignment API if one is unavailable. */ }
  }
  throw new Error("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
}
export function getCategories(products) {
  return products.filter((p, index) => products.findIndex((item) => item.category === p.category) === index)
    .map((p) => ({ slug: p.category, name: p.categoryNameBn, icon: p.categoryIcon }));
}
