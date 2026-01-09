import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import SettingsView from "@/components/admin/SettingsView";

export default async function AdminSettingsPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  
  if (!adminSession || adminSession !== "valid") {
    redirect("/admin/login");
  }

  return <SettingsView />;
}
