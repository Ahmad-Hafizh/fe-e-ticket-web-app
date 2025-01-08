import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { ScanEye } from 'lucide-react';
import { basicGetApi } from '@/app/config/axios';
import { toast } from '@/hooks/use-toast';

export type Transaction = {
  transaction_id: number;
  date: string;
  event: string;
  isPaid: boolean;
  payment_method: string;
  total_amount: number;
  payment_proof: string | null;
};
const acceptTransaction = async (id: number) => {
  try {
    const token = localStorage.getItem('tkn') || sessionStorage.getItem('tkn');
    const response = await basicGetApi.patch(`/transaction/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast({
      title: response.data.message,
      description: 'thank you for accepting the order',
    });
  } catch (error) {
    console.log(error);
  }
};
export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const formatedDate = new Date(row.getValue('date')).toLocaleDateString('id', { day: '2-digit', month: 'long', year: 'numeric' });
      return formatedDate;
    },
  },
  {
    accessorKey: 'event',
    header: 'Event',
  },
  {
    accessorKey: 'total_amount',
    header: 'Total Amount',
    cell: ({ row }) => {
      return parseInt(row.getValue('total_amount')).toLocaleString('id', { style: 'currency', currency: 'IDR' });
    },
  },
  {
    accessorKey: 'payment_method',
    header: 'Payment Method',
  },
  {
    accessorKey: 'isPaid',
    header: 'Status',
    cell: ({ row }) => {
      if (row.getValue('isPaid')) {
        return <p className="bg-green-700 py-1 px-2 rounded-full text-white w-fit">Paid</p>;
      } else {
        return <p className="bg-red-700 py-1 px-2 rounded-full text-white w-fit">Unpaid</p>;
      }
    },
  },
  {
    accessorKey: 'payment_proof',
    header: 'Proof',
    cell: ({ row }) => {
      if (row.getValue('payment_proof')) {
        return (
          <Link href={row.getValue('payment_proof')} target="blank">
            <ScanEye />
            <p>See Proof</p>
          </Link>
        );
      } else {
        return <p>Not Available</p>;
      }
    },
  },
  {
    accessorKey: 'transaction_id',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Detail</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button type="button" onClick={() => acceptTransaction(row.getValue('transaction_id'))}>
                Accept
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
