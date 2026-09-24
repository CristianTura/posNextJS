"use server"
import { ErrorResponseSchema, Product, ProductFormSchema, SuccessResponseSchema } from "@/src/schemas"

type ActionStateType = {
    success: string
    errors: string[]
}

export async function editProductAction(id: Product['id'], prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
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
    
    const url = `${process.env.API_URL}/products/${id}`
    const response = await fetch(url, {
        method: 'PUT',
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
        success: 'Producto actualizado correctamente',
        errors: []
    }
}