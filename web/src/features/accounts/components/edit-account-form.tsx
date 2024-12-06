import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editAccountSchema, EditAccountSchema } from "../schemas/edit-account-schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FloatingLabelInput } from "@/components/elements";
import { Button } from "@/components/ui/button";
import { useEditAccount } from "../api/edit-account";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export type EditAccountFormProps = {
  accountId: string;
  initialName: string;
  initialBalance: number;
};

export const EditAccountForm = ({
  accountId,
  initialBalance,
  initialName,
}: EditAccountFormProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: editAccount, isPending } = useEditAccount({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
  const form = useForm<EditAccountSchema>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      name: initialName,
      balance: initialBalance,
    },
  });

  const onSubmit = async (values: EditAccountSchema) => {
    toast.promise(editAccount({ accountId, payload: values }), {
      loading: "Sabar y, lg ngeditin datany",
      success: "Akun rekeningmu berhasil diedit",
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput id="name" label="Nama akun rekening lu" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    id="balance"
                    label="Saldo akun lu"
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                    value={field.value?.toString()}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full font-bold" disabled={isPending}>
            Edit akun
          </Button>
        </form>
      </Form>
    </>
  );
};
