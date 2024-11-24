import { Head } from "@/components/seo/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <>
      <Head title="Login" />
      <main className="container mx-auto">
        <section className="w-full min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
            <CardHeader className="text-center">
              <CardTitle>Gas Login</CardTitle>
              <CardDescription>Sudah saatnya ngatur duit kamu.</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              <p className="mt-4 text-sm">
                Belom punya akun?{" "}
                <Link
                  to="/auth/register"
                  className="text-primary font-semibold transition-colors hover:text-primary/80"
                >
                  Daftar dulu sob
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};
