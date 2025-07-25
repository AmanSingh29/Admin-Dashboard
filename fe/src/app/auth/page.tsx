import AuthForm from "@/components/AuthForm";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const isLoggedIn = await getSession();
  if (isLoggedIn) {
    redirect("/");
  }
  return (
    <section className="flex h-full w-screen sm:w-full items-center justify-center bg-gray-100 p-4 mt-12">
      <AuthForm />
    </section>
  );
}
