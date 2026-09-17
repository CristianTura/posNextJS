import { TransactionsResponseSchema } from "./schemas"

export async function getSalesByDate(date: string){
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`
    const response = await fetch(url)
    const data = await response.json()

    const transactions = TransactionsResponseSchema.parse(data)

    return transactions
}