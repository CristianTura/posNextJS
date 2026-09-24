"use client"

import { editProductAction } from "@/actions/edit-product-action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function EditProductForm({ children, productId }: { children: React.ReactNode, productId: string }) {

    const router = useRouter()
    
    const submitOrderWithData = editProductAction.bind(null, +productId)
    const [ state, dispatch ] = useActionState(submitOrderWithData, {
        errors: [],
        success: ''
    })

    useEffect(() => {
            if (state.errors.length) {
                state.errors.forEach((error) => {
                    toast.error(error)
                })
            }
            if (state.success) {
                toast.success(state.success)
                router.push('/admin/products')
            }
        }, [state])
    

    return (
        <form className="space-y-5" 
            action={dispatch}
        >
            {children}
            <input
                type="submit"
                className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
                value="Actualizar Producto"
            />
        </form>
    )
}
