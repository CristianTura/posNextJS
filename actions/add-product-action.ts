"use server"
import { ErrorResponseSchema, ProductFormSchema, SuccessResponseSchema } from "@/src/schemas"

type ActionStateType = {
    success: string
    errors: string[]
}

export async function addProductAction(prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
    const product = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId'),
    })

    if(!product.success){
        return {
            errors: product.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/products`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product.data)
    })
    const result = await response.json()
    if(!response.ok) {
        const errors = ErrorResponseSchema.parse(result)
        return {
            success: '',
            errors: errors.message.map((error) => error)
        }
    }

    return {
        success: 'Producto creado correctamente',
        errors: []
    }
}