import ProductsView from "@/components/products/productsView";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  return <ProductsView products={products} />;
}