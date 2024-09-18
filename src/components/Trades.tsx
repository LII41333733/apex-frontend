import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Trade from "@/interfaces/Trade";
import { useAppSelector } from "@/state/hooks";
import convertTickerWithExpiration from "@/utils/convertTickerWithExpiration";
import { BaseTradeStatus, TradeStatus } from "@/constants";
import { dateFormatFull } from "@/utils/dateFormatFull";
import StatusBadge from "./StatusBadge";
import { dollar } from "@/utils/dollar";
import BaseTrade from "@/interfaces/BaseTrade";

const CellValue: React.FC<{
  id?: string;
  value?: any;
  addDecimals?: boolean;
}> = ({ id, value, addDecimals }) => {
  return (
    <div className={`table-data ${id}`}>
      {value === null ? "-" : addDecimals ? value.toFixed(2) : value}
    </div>
  );
};

export const columns: ColumnDef<BaseTrade>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue id="orderId" value={row.original.id} />,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue
        id="status"
        value={<StatusBadge status={row.original.status as BaseTradeStatus} />}
      />
    ),
  },
  {
    id: "trimStatus",
    accessorKey: "trimStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trim Status
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue id="trimStatus" value={row.original.trimStatus} />
    ),
  },
  {
    id: "riskType",
    accessorKey: "riskType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue id="riskType" value={row.original.riskType} />
    ),
  },
  {
    id: "optionsymbol",
    accessorKey: "optionSymbol",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Option
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue
        id="optionSymbol"
        value={convertTickerWithExpiration(row.original.optionSymbol) || "-"}
      />
    ),
  },
  {
    id: "preTradeBalance",
    accessorKey: "preTradeBalance",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pre-Bal
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue
        id="preTradeBalance"
        value={
          row.original.preTradeBalance
            ? `$${row.original.preTradeBalance.toFixed(2)}`
            : "-"
        }
      />
    ),
  },
  {
    id: "postTradeBalance",
    accessorKey: "postTradeBalance",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Post-Bal
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue
        id="postTradeBalance"
        value={
          row.original.postTradeBalance
            ? `$${row.original.postTradeBalance.toFixed(2)}`
            : "-"
        }
      />
    ),
  },
  {
    id: "pl",
    accessorKey: "pl",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        P/L
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue value={row.original.pl ? dollar(row.original.pl) : "-"} />
    ),
  },
  {
    id: "stopPrice",
    accessorKey: "stopPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stop Price
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.stopPrice} addDecimals />,
  },
  {
    id: "trim1Price",
    accessorKey: "trim1Price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trim 1
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue value={row.original.trim1Price} addDecimals />
    ),
  },
  {
    id: "trim2Price",
    accessorKey: "trim2Price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trim 2
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue value={row.original.trim2Price} addDecimals />
    ),
  },
  {
    id: "fillPrice",
    accessorKey: "fillPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fill Price
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.fillPrice} addDecimals />,
  },
  {
    id: "lastPrice",
    accessorKey: "lastPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Price
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.lastPrice} addDecimals />,
  },
  {
    id: "runnersFloorPrice",
    accessorKey: "runnersFloorPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Runners Floor
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue value={row.original.runnersFloorPrice} addDecimals />
    ),
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        #
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.quantity} />,
  },
  {
    id: "trim1Quantity",
    accessorKey: "trim1Quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trim 1 #
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.trim1Quantity} />,
  },
  {
    id: "trim2Quantity",
    accessorKey: "trim2Quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trim 2 #
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.trim2Quantity} />,
  },
  {
    id: "runnersQuantity",
    accessorKey: "runnersQuantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Run #
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.runnersQuantity} />,
  },
  {
    id: "runnersDelta",
    accessorKey: "runnersDelta",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Run Δ
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.runnersDelta} />,
  },
  {
    id: "tradeAmount",
    accessorKey: "tradeAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trade Amount
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.tradeAmount} />,
  },
  {
    id: "openDate",
    accessorKey: "openDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Opened
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue id="openDate" value={dateFormatFull(row.original.openDate)} />
    ),
  },
  {
    id: "closeDate",
    accessorKey: "closeDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Closed
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue
        id="closeDate"
        value={dateFormatFull(row.original.closeDate)}
      />
    ),
  },
  {
    id: "maxPrice",
    accessorKey: "maxPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Max Price
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.maxPrice} />,
  },
];

export function Trades() {
  const { trades } = useAppSelector((state) => state.trades);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  console.log(trades);

  const table = useReactTable({
    data: trades,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div id="trades-table" className="w-full">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
    </div>
  );
}
