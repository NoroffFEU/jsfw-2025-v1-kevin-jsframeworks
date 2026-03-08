import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, ProductNotFoundError } from "@/lib/api";
import AddToCartButton from "@/components/cart/addToCartBtn";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

function hasDiscount(price: number, discountedPrice: number) {
  return discountedPrice < price;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;

  try {
    product = await getProductById(id);
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      notFound();
    }

    throw error;
  }

  const productHasDiscount = hasDiscount(product.price, product.discountedPrice);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={product.image.url}
            alt={product.image.alt}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-sm text-slate-500">Rating: {product.rating}/5</p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {product.title}
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-2xl font-bold text-slate-900">
              {product.discountedPrice.toFixed(2)} kr
            </span>

            {productHasDiscount && (
              <span className="text-lg text-slate-500 line-through">
                {product.price.toFixed(2)} kr
              </span>
            )}
          </div>

          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <AddToCartButton
            product={{
              productId: product.id,
              title: product.title,
              price: product.price,
              discountedPrice: product.discountedPrice,
              image: product.image,
            }}
          />
        </div>
      </div>

      <section className="mt-14">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Reviews</h2>

        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-slate-900">
                    {review.username}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Rating: {review.rating}/5
                  </p>
                </div>
                <p className="text-slate-600">{review.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">No reviews yet for this product.</p>
        )}
      </section>
    </div>
  );
}