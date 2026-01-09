import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  
  if (!adminSession || adminSession !== "valid") {
    redirect("/admin/login");
  }

  // Redirect to content page
  redirect("/admin/content");
}
