"use client"

import { ColumnDef } from "@tanstack/react-table"

export type TableOrder = {
    id: string | null
    total: string | null
    status: string | null
    email: string | null
    date: string | null
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