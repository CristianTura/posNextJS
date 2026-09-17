import Heading from "@/components/ui/Heading"
import TransactionFilter from "@/components/transactions/TransactionFilter"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import { getSalesByDate } from "@/src/api"

export default async function SalesPage() {
    const queryClient = new QueryClient()

    const formattedDate = format(new Date(), 'yyyy-MM-dd')

    await queryClient.prefetchQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

  return (
    <>
      <Heading>Ventas</Heading>
      <p className="font-semibold">En esta sección puedes ver las ventas del día, utiliza el calendario para filtrar por fecha</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  )
}
