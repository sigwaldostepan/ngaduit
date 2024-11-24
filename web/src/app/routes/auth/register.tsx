import { Head } from "@/components/seo/head";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <Head title="Register" />
      <main className="container mx-auto">
        <section className="w-full min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
            <CardHeader className="text-center">
              <CardTitle>Daftar Dulu Brok</CardTitle>
              <CardDescription>
                Gas daftar biar bisa ngatur duit kamu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
              <p className="mt-4 text-sm">
                Udah pernah daftar?{" "}
                <Link
                  to="/auth/login"
                  className="text-primary font-semibold transition-colors hover:text-primary/80"
                >
                  Login sini
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};
