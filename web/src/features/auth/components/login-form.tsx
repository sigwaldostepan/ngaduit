import {
  FloatingLabelInput,
  FloatingPasswordInput,
} from "@/components/elements";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "@/lib/auth";
import { LoginInputSchema, loginInputSchema } from "../schemas/login-schema";
import { Spinner } from "@/components/ui/spinner";
import { useStore } from "@/store";

export const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<LoginInputSchema>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onLogin = useStore((state) => state.onLogin);
  const { mutateAsync: login, isPending } = useLogin({
    onSuccess: ({ data }) => {
      onLogin(data);

      toast.success("Login berhasil", {
        description: "Lagi mindahin kamu ke dashboard",
      });

      navigate("/dashboard");
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => login(values))}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput id="email" label="Email" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingPasswordInput
                    id="password"
                    label="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Login gaskan"}
          </Button>
        </form>
      </Form>
    </>
  );
};
