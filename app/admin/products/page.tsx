import ProductsTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import { ProductsResponseSchema } from '@/src/schemas'
import { isValidPage } from '@/src/utils'
import { redirect } from 'next/navigation'
import Pagination from '@/components/ui/Pagination'
import Link from 'next/link'

async function getProducts(take: number, skip: number) {
  const response = await fetch(`${process.env.API_URL}/products?take=${take}&skip=${skip}`)
  const data = await response.json()
  return ProductsResponseSchema.parse(data)
}
type SearchParams = Promise<{ page: number }>

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const { page } = await searchParams
  
  if(!isValidPage(+page)) redirect('/admin/products?page=1')

  const productsPerPage = 10;
  const skip = (+page - 1) * productsPerPage;
  const { products, total } = await getProducts(productsPerPage, skip)
  const totalPages = Math.ceil(total / productsPerPage)

  if(+page > totalPages) redirect('/admin/products?page=1')

  return (
    <>
      <Link 
        href="/admin/products/new" 
        className="rounded bg-green-400 hover:bg-green-500 font-bold py-2 px-10"
      >
        Nuevo Producto
      </Link>
      <Heading>Administrar Productos</Heading>
      <ProductsTable products={products} />
      <Pagination totalPages={totalPages} page={+page} path="/admin/products" />
    </>
  )
}
