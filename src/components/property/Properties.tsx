"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "./PropertyCard";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { Spinner } from "@nextui-org/react";

export default function Properties({ user }: { user: User | null }) {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Array<PropertyType> | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFetched = useRef<boolean>(false);

  const supabase = createClientComponentClient();

  useEffect(() => {
    console.log("The search params....", searchParams.get("state"));
    fetchProperties();

    isFetched.current = true;
  }, [searchParams]);

  // * Fetch properties
  const fetchProperties = async () => {
    setLoading(true);
    const query = supabase
      .from("properties")
      .select("id ,title,images,price,state,city,type,created_at,user_id");
    if (searchParams.get("state") != null && searchParams.get("state") != "") {
      query.ilike("state", `%${searchParams.get("state")}%`);
    }
    if (searchParams.get("city") != null && searchParams.get("city") != "") {
      query.ilike("city", `%${searchParams.get("city")}%`);
    }
    const { data: propertyData, error } = await query;

    if (user != null) {
      // Query to fetch saved properties for the user
      const { data: savedPropertiesData, error: savedPropertiesError } =
        await supabase
          .from("saved")
          .select("property_id")
          .eq("user_id", user?.id);

      setLoading(false);

      if (error || savedPropertiesError) {
        toast.error(error?.message || savedPropertiesError?.message, {
          theme: "colored",
        });
      } else {
        // Merge the propertiesData and savedPropertiesData based on the property ID
        const propertiesWithSavedFlag = propertyData?.map((property) => ({
          ...property,
          isSaved: savedPropertiesData.some(
            (savedProperty) => savedProperty.property_id === property.id
          ),
        }));

        console.log("The merge properties are", propertiesWithSavedFlag);

        setProperties(propertiesWithSavedFlag);
      }
    } else {
      setLoading(false);
      setProperties(propertyData!);
    }
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner color="primary" />
        </div>
      )}
      {/* *Load Properties */}
      <div className="px-2 md:px-12 lg:px-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
        {properties &&
          properties?.length > 0 &&
          properties.map((item) => (
            <PropertyCard property={item} key={item.id} />
          ))}
      </div>
    </>
  );
}
