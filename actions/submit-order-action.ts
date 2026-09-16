"use server"
import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { revalidatePath, revalidateTag } from "next/cache"

export async function submitOrderAction(data: unknown) {
    const order = OrderSchema.parse(data)
    const url = `${process.env.API_URL}/transactions`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    const result = await response.json()
    if(!response.ok) {
        const errors = ErrorResponseSchema.parse(result)
        return {
            success: '',
            errors: errors.message.map((error) => error)
        }
    }
    const success = SuccessResponseSchema.parse(result)

    // Clear cache
    // revalidateTag('products-by-category', "max")
    revalidatePath('/(store)/[categoryId]', 'page')

    return {
        success: success.message,
        errors: []
    }
}