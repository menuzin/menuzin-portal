import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import InboxView from "@/components/admin/InboxView";

export default async function AdminInboxPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  
  if (!adminSession || adminSession !== "valid") {
    redirect("/admin/login");
  }

  return <InboxView />;
}
