import { getProducts } from "@/lib/products";
export async function GET() {
  try {
    const products = await getProducts();
    return Response.json(
      products
        .slice(0, 8)
        .map(({ id, nameBn, image, today, unit, change }) => ({
          id,
          nameBn,
          image,
          today,
          unit,
          change,
        })),
    );
  } catch {
    return Response.json({ error: "দাম লোড করা যায়নি" }, { status: 503 });
  }
}
