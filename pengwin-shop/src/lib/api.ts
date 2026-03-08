import type {
  Product,
  ProductsResponse,
  SingleProductResponse,
} from "@/types/product";

const BASE_URL = "https://v2.api.noroff.dev";

export class ProductNotFoundError extends Error {
  constructor(message = "Product not found") {
    super(message);
    this.name = "ProductNotFoundError";
  }
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/online-shop`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: ProductsResponse = await response.json();
  return result.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/online-shop/${id}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    throw new ProductNotFoundError();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result: SingleProductResponse = await response.json();
  return result.data;
}