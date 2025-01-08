import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import React from 'react';

interface IAlertDialog {
  open: boolean;
  setOpen: () => void;
  title: string;
  desc: string;
  onCancel?: () => void;
  onContinue?: () => void;
  trigger?: string;
}

export const AlertDialogComponent: React.FC<IAlertDialog> = ({ open, title, desc, onCancel, onContinue, trigger, setOpen }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        {trigger ?? <AlertDialogTrigger>Open</AlertDialogTrigger>}
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {onCancel && <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>}
          {onContinue && <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
