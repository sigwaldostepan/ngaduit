import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EditTransactionForm } from './edit-transaction-form';
import { Transaction } from '@/types/api';

type EditTransactionDialogProps = {
  transaction: Transaction;
  dialogTrigger: React.ReactNode;
  title: string;
  description?: string;
};
export const EditTransactionDialog = ({
  transaction,
  dialogTrigger,
  title,
  description,
}: EditTransactionDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <EditTransactionForm transaction={transaction} />

        <DialogClose asChild>
          <Button variant="ghost">Ga jadi deh</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
