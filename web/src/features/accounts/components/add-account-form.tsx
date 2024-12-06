import { FloatingLabelInput } from "@/components/elements";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { addAccountSchema, AddAccountSchema } from "../schemas/add-account-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAddAccount } from "../api/add-account";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const AddAccountForm = () => {
  const form = useForm<AddAccountSchema>({
    resolver: zodResolver(addAccountSchema),
    defaultValues: {
      name: "",
      balance: 0,
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync: addAccount, isPending } = useAddAccount({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const onSubmit = (values: AddAccountSchema) => {
    toast.promise(addAccount(values), {
      loading: "Sedang nambahin rekening ini ke akun kamu",
      success: "Akun rekening berhasil ditambahin",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput id="name" label="Nama akun rekening" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="balance"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FloatingLabelInput
                  id="balance"
                  label="Saldo akun rekening"
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(Number(event.target.value))}
                  value={field.value.toString()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold" disabled={isPending}>
          Buat akun
        </Button>
      </form>
    </Form>
  );
};
