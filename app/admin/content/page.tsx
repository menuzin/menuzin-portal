import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ContentEditor from "@/components/admin/ContentEditor";

export default async function AdminContentPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;
  
  if (!adminSession || adminSession !== "valid") {
    redirect("/admin/login");
  }

  return <ContentEditor />;
}
