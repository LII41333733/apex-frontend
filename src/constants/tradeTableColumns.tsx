import * as React from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import convertTickerWithExpiration from '@/utils/convertTickerWithExpiration';
import { TradeStatus } from '@/constants';
import { dateFormatFull } from '@/utils/dateFormatFull';
import StatusBadge from '../components/StatusBadge';
import { dollar } from '@/utils/dollar';
import BaseTrade from '@/interfaces/BaseTrade';
import CellValue from '@/components/CellValue';

export const tradeTableColumns: ColumnDef<BaseTrade>[] = [
    // {
    //   id: "id",
    //   accessorKey: "id",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       ID
    //       <CaretSortIcon className="ml-2 h-4 w-3" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => <CellValue id="orderId" value={row.original.id} />,
    // },
    {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Status
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <StatusBadge status={row.original.status as TradeStatus} />
        ),
    },
    // {
    //   id: "trimStatus",
    //   accessorKey: "trimStatus",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Trim Status
    //       <CaretSortIcon className="ml-2 h-4 w-3" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => (
    //     <CellValue id="trimStatus" value={row.original.trimStatus} />
    //   ),
    // },
    {
        id: 'riskType',
        accessorKey: 'riskType',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Type
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue
                id='riskType'
                value={row.original.riskType}
                className='italic'
            />
        ),
    },
    {
        id: 'optionsymbol',
        accessorKey: 'optionSymbol',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Option
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue
                id='optionSymbol'
                value={
                    convertTickerWithExpiration(row.original.optionSymbol) ||
                    '-'
                }
            />
        ),
    },
    {
        id: 'preTradeBalance',
        accessorKey: 'preTradeBalance',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Pre-Bal
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue
                id='preTradeBalance'
                value={
                    row.original.preTradeBalance
                        ? `${dollar(row.original.preTradeBalance)}`
                        : '-'
                }
            />
        ),
    },
    {
        id: 'postTradeBalance',
        accessorKey: 'postTradeBalance',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Post-Bal
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue
                id='postTradeBalance'
                value={
                    row.original.postTradeBalance
                        ? `${dollar(row.original.postTradeBalance)}`
                        : '-'
                }
            />
        ),
    },
    {
        id: 'pl',
        accessorKey: 'pl',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                P/L
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue
                value={row.original.pl ? dollar(row.original.pl) : '-'}
            />
        ),
    },
    {
        id: 'stopPrice',
        accessorKey: 'stopPrice',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Stop
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue value={row.original.stopPrice} addDecimals />
        ),
    },
    {
        id: 'trim1Price',
        accessorKey: 'trim1Price',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Trim 1
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue value={row.original.trim1Price} addDecimals />
        ),
    },
    {
        id: 'trim2Price',
        accessorKey: 'trim2Price',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Trim 2
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue value={row.original.trim2Price} addDecimals />
        ),
    },
    {
        id: 'fillPrice',
        accessorKey: 'fillPrice',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Fill
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue value={row.original.fillPrice} addDecimals />
        ),
    },
    {
        id: 'lastPrice',
        accessorKey: 'lastPrice',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Last
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue value={row.original.lastPrice} addDecimals />
        ),
    },
    {
        id: 'runnersFloorPrice',
        accessorKey: 'runnersFloorPrice',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                R Floor
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue
                id='runnersFloorPrice'
                value={row.original.runnersFloorPrice}
                addDecimals
            />
        ),
    },
    {
        id: 'quantity',
        accessorKey: 'quantity',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                #
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => <CellValue value={row.original.quantity} />,
    },
    {
        id: 'trim1Quantity',
        accessorKey: 'trim1Quantity',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                T1 #
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => <CellValue value={row.original.trim1Quantity} />,
    },
    {
        id: 'trim2Quantity',
        accessorKey: 'trim2Quantity',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                T2 #
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => <CellValue value={row.original.trim2Quantity} />,
    },
    {
        id: 'runnersQuantity',
        accessorKey: 'runnersQuantity',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                R #
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => <CellValue value={row.original.runnersQuantity} />,
    },
    // {
    //   id: "runnersDelta",
    //   accessorKey: "runnersDelta",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Run Δ
    //       <CaretSortIcon className="ml-2 h-4 w-3" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => <CellValue value={row.original.runnersDelta} />,
    // },
    {
        id: 'tradeAmount',
        accessorKey: 'tradeAmount',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Amount
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue value={dollar(row.original.tradeAmount)} />
        ),
    },
    {
        id: 'maxPrice',
        accessorKey: 'maxPrice',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Max
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => <CellValue value={row.original.maxPrice} />,
    },
    {
        id: 'openDate',
        accessorKey: 'openDate',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Opened
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue
                id='openDate'
                className='min-w-[8rem]'
                value={dateFormatFull(row.original.openDate)}
            />
        ),
    },
    {
        id: 'closeDate',
        accessorKey: 'closeDate',
        header: ({ column }) => (
            <Button
                className='text-xs'
                variant='ghost'
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Closed
                <CaretSortIcon className='ml-2 h-4 w-3' />
            </Button>
        ),
        cell: ({ row }) => (
            <CellValue
                id='closeDate'
                className='min-w-[8rem]'
                value={
                    row.original.closeDate === null
                        ? '-'
                        : dateFormatFull(row.original.closeDate)
                }
            />
        ),
    },
];
