import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { useEffect, useState } from "react";
  import { ChevronLeft, ChevronRight, CirclePlus, Search } from "lucide-react";
import ButtonExcelExport from "@/components/custom/ButtonExcelExport/ButtonExcelExport";
  
  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setShowDialogAdd:React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  export function DataTableApprover<TData, TValue>({
    columns,
    data,
    setShowDialogAdd
  }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10); // Set initial rows per page
  
    const [pagination, setPagination] = useState({
      pageIndex: 0, // Initial page index
      pageSize: rowsPerPage, // Initial page size
    });
  
    const table = useReactTable({
      data,
      columns,
      autoResetPageIndex: false,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      globalFilterFn: "includesString",
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        globalFilter,
        pagination,
      },
      onPaginationChange: setPagination,
    });
  
    // Handle rows per page change
    const handleRowsPerPageChange = (value: string) => {
      const newPageSize = Number(value);
      setRowsPerPage(newPageSize);
      setPagination({
        ...pagination,
        pageSize: newPageSize,
      });
    };
  
    useEffect(() => {}, [data]);
  
    return (
      <div className="px-4">
        <div className="my-2 flex items-center gap-x-2">
          <Button size={"sm"} onClick={() => setShowDialogAdd(true)} className="bg-[#107EDB] text-white hover:bg-[#1c77c2]">
            <CirclePlus /> Add
          </Button>
          <ButtonExcelExport data={data} fileName="Approver"/>
        
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex justify-between items-center gap-x-2 w-full my-2">
            <div>
              <p className="text-[14px] mb-2 text-gray-800">
                รายชื่อผู้อนุมัติ | List of Aprover ({data?.length} รายการ)
              </p>
            </div>
            <div className="relative">
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                type="text"
                className="pr-10 py-3 text-lg"
                placeholder="ค้นหา"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>
          <div></div>
        </div>
  
        {/* Select rows per page */}
  
        <div className="w-full">
          <div className="shadow-smooth">
            <div className="relative h-[50vh] overflow-auto">
              <Table className="w-full relative text-[13px]">
                <TableHeader className="sticky top-0 z-10 bg-[#0E7FDB] hover:bg-[#0e7fdbf3]">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="h-10 overflow-clip relative text-center text-white"
                        >
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
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                       
                        className="text-center"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="text-[13px] text-center"
                          >
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
          </div>
        </div>
  
        {/* Pagination */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              type="button"
            >
              <ChevronLeft />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next <ChevronRight />
            </Button>
          </div>
  
          {/* Page Information */}
          <div className="text-sm flex gap-x-2 items-center">
            <div className="flex items-center py-2">
              <Select
                value={rowsPerPage.toString()}
                onValueChange={handleRowsPerPageChange}
              >
                <SelectTrigger>
                  <SelectValue>{rowsPerPage} rows / page</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[10, 25, 50, 100].map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <span className="text-[13px]">
              Page {pagination.pageIndex + 1} of {table.getPageCount()} pages
            </span>
          </div>
        </div>
      </div>
    );
  }
  