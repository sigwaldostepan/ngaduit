import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { AddAccountForm } from "./add-account-form";

type AddAccountDialogProps = {
  title: string;
  description?: string;
  dialogTrigger: React.ReactNode;
};

export const AddAccountDialog = ({ title, description, dialogTrigger }: AddAccountDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4 space-y-0">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <AddAccountForm />

        <DialogClose asChild>
          <Button variant="ghost">Ga jadi deh</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
