import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    type PaginationState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    showColumnVisibility?: boolean
    searchProps?: {
        search: string
        placeholder?: string
        onSearchChange: (value: string) => void
    }
    paginationProps?: {
        pagination: PaginationState
        onPaginationChange: (updater: PaginationState) => void
    }
    rowSelectionProps?: {
        rowSelection: Record<string, boolean>
        onRowSelectionChange: (updater: Record<string, boolean>) => void
    }
}

// TODO: need to pass isLoading prop to show loading state
// can also pass loading skeleton or a progess bar component

function DataTable<TData, TValue>({
    columns,
    data,
    showColumnVisibility = true,
    searchProps,
    paginationProps,
    rowSelectionProps,
    additionalComponents = [],
}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: paginationProps?.onPaginationChange,
        onRowSelectionChange: rowSelectionProps?.onRowSelectionChange,
        state: {
            pagination: paginationProps?.pagination || { pageIndex: 0, pageSize: 10 },
            columnVisibility,
            rowSelection: rowSelectionProps?.rowSelection || {},
        },
    })

    return (
        <div className="w-full">
            {/* Top controls */}

            {showColumnVisibility && (
                <div className="flex items-center py-4">
                    {searchProps &&
                        <Input
                            placeholder={searchProps.placeholder || "Search"}
                            value={searchProps.search || ""}
                            onChange={(event) =>
                                searchProps.onSearchChange(event.target.value)
                            }
                            className="max-w-sm"
                        />}

                    {additionalComponents.map((Component, index) => (
                        <div key={index} className="ml-4">
                            {Component}
                        </div>
                    ))}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer / Pagination */}
            {paginationProps && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-muted-foreground flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" >
                                Records per page {table.getState().pagination.pageSize}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <DropdownMenuItem key={pageSize} onClick={() => table.setPageSize(pageSize)}>
                                    {pageSize}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default DataTable;