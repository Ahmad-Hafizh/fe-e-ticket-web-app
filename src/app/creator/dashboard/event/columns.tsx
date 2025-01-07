import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export type Event = {
  title: string;
  imgEvent: string;
  startDate: string;
  startTime: string;
  endDate: string;
};
export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'startDate',
    header: 'Date',
    cell: ({ row }) => {
      const formatedDate = new Date(row.getValue('startDate')).toLocaleDateString('id', { day: '2-digit', month: 'long', year: 'numeric' });
      return formatedDate;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Status',
    cell: ({ row }) => {
      if (new Date().getTime() > new Date(row.getValue('endDate')).getTime()) {
        return <span className="py-1 px-2 rounded-full bg-red-400">Unactive</span>;
      } else {
        return <span className="py-1 px-2 rounded-full bg-green-400">Active</span>;
      }
    },
  },
  {
    id: 'actions',
    cell: ({}) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
