import { getUser } from "@/lib/fetchers/users";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  if (!user.name) {
    redirect("/onboarding");
  }

  return redirect("/articles");
}
