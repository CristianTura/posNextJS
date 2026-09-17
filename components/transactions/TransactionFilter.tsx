"use client"
import { getSalesByDate } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react"
import "react-calendar/dist/Calendar.css"
import TransactionSummary from "./TransactionSummary";
import { formatCurrency } from "@/src/utils";
// import Calendar from "react-calendar"
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false })

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TransactionFilter() {
    const [date, setDate] = useState<Value>(new Date())
    const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd')

    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    const total = data?.reduce((acc, transaction) => acc + +transaction.total, 0) || 0

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
            <div className="lg:sticky lg:top-10">
                <Calendar 
                    value={date}
                    onChange={setDate}
                    // locale="es"
                />
            </div>
            <div>
                {isLoading && <div>Cargando...</div>}
                {data && data.length > 0 ? data?.map((transaction) => (
                    <TransactionSummary key={transaction.id}  transaction={transaction}/>
                )) : !isLoading && <p className="text-lg text-center">No hay ventas en esta fecha</p>}

                <p className="text-lg font-semibold my-5 text-right">
                    Total del día: {''}
                    <span className="font-normal">{formatCurrency(total)}</span>
                </p>
            </div>
        </div>
    )
}
