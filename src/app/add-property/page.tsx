import AddPropertyForm from "@/components/property/AddPropertyForm";
import AppNav from "@/components/common/AppNav";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

// * SEO
export const metadata: Metadata = {
  title: "Add Property",
  description: "Here you can add your property",
};

export default async function AddProperty() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <AppNav user={data.user} />
      <div className="flex justify-center items-center h-screen px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="hidden lg:flex justify-start items-center flex-col">
            <Image
              src="/images/apartment.svg"
              width={100}
              height={100}
              alt="Apartment"
              className="w-[700px] mt-[-100px]"
            />
            <h1 className="text-3xl font-bold">
              Sell / Rent your property easily.
            </h1>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">List your property</h1>
            <AddPropertyForm user={data.user!} />
          </div>
        </div>
      </div>
    </div>
  );
}
