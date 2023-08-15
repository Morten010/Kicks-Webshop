"use client"

import { ColumnDef } from "@tanstack/react-table"

export type TableOrder = {
    id: number
    total: string
    status: string
    email: string
    date: string
}

export const columns: ColumnDef<TableOrder>[] = [
    {
        accessorKey: "id",
        header: "Order",
    },
    {
        accessorKey: "date",
        header: "Date",
        },
    {
        accessorKey: "email",
        header: "Customer",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "total",
        header: "Total",
    },
]