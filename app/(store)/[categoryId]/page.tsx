import { CategoryWithProductsResponseSchema } from "@/src/schemas";
import ProductCard from "@/components/products/ProductCard";
import { redirect } from "next/navigation";

type Params = Promise<{
  categoryId: string;
}>;

async function getProducts(categoryId: string) {
  const response = await fetch(`${process.env.API_URL}/categories/${categoryId}?products=true`);
  const data = await response.json();
  console.log(data);
  if(!response.ok) {
    redirect('/1');
  }
  const products = CategoryWithProductsResponseSchema.parse(data);
  return products;
}

export default async function StorePage({ params }: { params: Params }) {
  const { categoryId } = await params;
  const category = await getProducts(categoryId);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {category.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
