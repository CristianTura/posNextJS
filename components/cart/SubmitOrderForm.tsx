import { submitOrderAction } from "@/actions/submit-order-action"
import { useStore } from "@/src/store"
import { useActionState, useEffect, useRef } from "react"
import { toast } from "react-toastify"

export default function SubmitOrderForm() {
    const total = useStore((state) => state.total)
    const coupon = useStore((state) => state.coupon?.name) || ""
    const contents = useStore((state) => state.contents)
    const clearOrder = useStore((state) => state.clearOrder)
    const isSubmitting = useRef(false)
    const order = {
        total,
        coupon,
        contents
    }

    const submitOrderWithData = submitOrderAction.bind(null, order)
    const [state, dispatch] = useActionState(submitOrderWithData, {
        success: "",
        errors: []
    })

    useEffect(() => {
        if (state.errors.length) {
            state.errors.forEach((error) => {
                toast.error(error)
            })
            isSubmitting.current = false
        }
        if (state.success) {
            toast.success(state.success)
            clearOrder()
            isSubmitting.current = false
        }
    }, [state])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSubmitting.current) return
        isSubmitting.current = true
        dispatch()
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <input 
                type="submit" 
                value="Confirmar compra" 
                className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3 cursor-pointer"
            />
        </form>
    )
}
