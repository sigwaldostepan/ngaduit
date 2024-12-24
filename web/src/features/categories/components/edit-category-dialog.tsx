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
import * as React from 'react';
import { Category } from '@/types/api';
import { EditCategoryForm } from './edit-category-form';

type EditCategoryDialogProps = {
  category: Category;
  description?: string;
  dialogTrigger: React.ReactNode;
  title: string;
};

export const EditCategoryDialog = ({
  category,
  description,
  dialogTrigger,
  title,
}: EditCategoryDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4 space-y-0">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <EditCategoryForm category={category} />

        <DialogClose asChild>
          <Button variant="ghost">Ga jadi deh</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
