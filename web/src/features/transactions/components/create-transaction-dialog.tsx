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
import { CreateTransactionForm } from './create-transaction-form';

type CreateTransactionDialogProps = {
  dialogTrigger: React.ReactNode;
  title: string;
  description?: string;
};
export const CreateTransactionDialog = ({
  dialogTrigger,
  title,
  description,
}: CreateTransactionDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <CreateTransactionForm />

        <DialogClose asChild>
          <Button variant="ghost">Ga jadi deh</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
