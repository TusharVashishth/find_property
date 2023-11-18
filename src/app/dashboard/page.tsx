import type { Metadata } from "next";
import AppNav from "@/components/common/AppNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UserProperties from "@/components/property/UserProperties";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User Dashboard.",
};

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();
  return (
    <div>
      <AppNav user={data.user} />
      <div className="container mx-auto mt-5">
        <UserProperties user={data.user!} />
      </div>
    </div>
  );
}
