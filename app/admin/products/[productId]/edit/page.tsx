import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { ProductSchema } from "@/src/schemas";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(productId: string) {
    const url = `${process.env.API_URL}/products/${productId}`
    const res = await fetch(url)
    if(!res.ok) {
        notFound()
    }
    const data = await res.json()
    return ProductSchema.parse(data)
}

type Params = Promise<{ productId: string }>

export default async function EditProductPage({ params }: { params: Params }) {

    const { productId } = await params;
    const product = await getProduct(productId);
    
    return (
        <div>
            <Link
                href="/admin/products?page=1"
                className="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10"
            >
                Volver
            </Link>
            <Heading>Editar Producto: {product.name}</Heading>
            <EditProductForm  productId={productId}>
                <ProductForm 
                    product={product}
                />
            </EditProductForm>
        </div>
    )
}
