import {
  FloatingLabelInput,
  FloatingPasswordInput,
} from "@/components/elements";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "@/lib/auth";
import {
  RegisterInputSchema,
  registerInputSchema,
} from "../schemas/register-schema";
import { Spinner } from "@/components/ui/spinner";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterInputSchema>({
    resolver: zodResolver(registerInputSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { mutateAsync: register, isPending } = useRegister({
    onSuccess: () => {
      toast.success("Login berhasil", {
        description: "Lagi mindahin kamu ke halaman login",
      });

      navigate("/auth/login");
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => register(values))}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput id="name" label="Nama" {...field} />
                </FormControl>
                {fieldState.error ? (
                  <FormMessage className="text-xs" />
                ) : (
                  <FormDescription>
                    Biar bisa kenal dan sayang sama kamu
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput id="email" label="Email" {...field} />
                </FormControl>
                {fieldState.error ? (
                  <FormMessage className="text-xs" />
                ) : (
                  <FormDescription>Contoh : emailguwa@mail.com</FormDescription>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <FloatingPasswordInput
                    id="password"
                    label="Password"
                    {...field}
                  />
                </FormControl>
                {fieldState.error ? (
                  <FormMessage className="text-xs" />
                ) : (
                  <FormDescription>
                    Password minimal 8 karakter yach
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Daftarin akuhh"}
          </Button>
        </form>
      </Form>
    </>
  );
};
