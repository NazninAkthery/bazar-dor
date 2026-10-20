import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/lib/products";
import ProductList from "@/components/ProductList";
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const products = await getProducts();
  const category = getCategories(products).find((c) => c.slug === slug);
  if (!category) notFound();
  return (
    <ProductList
      title={`${category.icon} ${category.name}`}
      subtitle="এই বিভাগের আজকের বাজারদর"
      products={products.filter((p) => p.category === slug)}
    />
  );
}
