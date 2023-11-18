import AppNav from "@/components/common/AppNav";
import HomeBanner from "@/components/common/HomeBanner";
import Properties from "@/components/property/Properties";
import StateCityFilter from "@/components/StateCityFilter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "pure-react-carousel/dist/react-carousel.es.css";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

  return (
    <>
      <div className="h-screen w-screen">
        <AppNav user={data.user} />
        <HomeBanner />
        <StateCityFilter />

        <Properties user={data.user} />
      </div>
    </>
  );
}
