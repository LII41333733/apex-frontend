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
import { TradeStatus } from "@/constants";
import { dateFormatFull } from "@/utils/dateFormatFull";
import StatusBadge from "./StatusBadge";
import { dollar } from "@/utils/dollar";

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

export const columns: ColumnDef<Trade>[] = [
  {
    id: "orderId",
    accessorKey: "orderId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Order ID
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue id="orderId" value={row.original.orderId} />,
  },
  {
    id: "recoveryId",
    accessorKey: "recoveryId",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Recovery ID
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.recoveryId} />,
  },
  {
    id: "lossId",
    accessorKey: "lossId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Loss ID
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.lossId} />,
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
        value={<StatusBadge status={row.original.status as TradeStatus} />}
      />
    ),
  },
  {
    id: "option",
    accessorKey: "option",
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
        id="option"
        value={convertTickerWithExpiration(row.original.option) || "-"}
      />
    ),
  },
  {
    id: "balance",
    accessorKey: "balance",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Balance
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue
        id="balance"
        value={
          row.original.balance ? `$${row.original.balance.toFixed(2)}` : "-"
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
    id: "tradeResult",
    accessorKey: "tradeResult",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Result
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.tradeResult} />,
  },
  {
    id: "wins",
    accessorKey: "wins",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Wins
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.wins} />,
  },
  {
    id: "losses",
    accessorKey: "losses",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Losses
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.losses} />,
  },
  {
    id: "lossStreak",
    accessorKey: "lossStreak",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Loss Streak
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.lossStreak} />,
  },
  // {
  //   id: "symbol",
  //   accessorKey: "symbol",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Symbol
  //       <CaretSortIcon className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  //   cell: ({ row }) => <CellValue value={row.original.symbol} />,
  // },
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
    id: "limitPrice",
    accessorKey: "limitPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Limit Price
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue value={row.original.limitPrice} addDecimals />
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
        Trigger Price
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.fillPrice} addDecimals />,
  },
  {
    id: "quantity",
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Quantity
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <CellValue value={row.original.quantity} />,
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
    id: "finalized",
    accessorKey: "finalized",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Finalized?
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <CellValue value={row.original.finalized ? "Yes" : "No"} />
    ),
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
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("status")}</div>
  //     ),
  //   },
  //   {
  //     accessorKey: "email",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Email
  //           <CaretSortIcon className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  //   },
  //   {
  //     accessorKey: "amount",
  //     header: () => <div className="text-left">Amount</div>,
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("amount"));

  //       // Format the amount as a dollar amount
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(amount);

  //       return <div className="text-keft font-medium">{formatted}</div>;
  //     },
  //   },
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => <></>,
  //   },
];

export function Trades() {
  const { trades } = useAppSelector((state) => state.trades);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
