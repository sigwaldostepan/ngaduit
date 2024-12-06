import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";

type ConfirmationDialogProps = {
  description: string;
  cancelButtonText?: string;
  dialogTrigger: React.ReactNode;
  confirmButton: React.ReactNode;
};

export const ConfirmationDialog = ({
  description,
  cancelButtonText = "Cancel",
  dialogTrigger,
  confirmButton,
}: ConfirmationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left text-2xl">Tunggu doeloe</DialogTitle>
        </DialogHeader>
        <p className="text-base">{description}</p>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost">{cancelButtonText}</Button>
          </DialogClose>
          {confirmButton}
        </div>
      </DialogContent>
    </Dialog>
  );
};
