"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  AvatarGroup,
  Avatar,
} from "@nextui-org/react";
import { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DeleteProperty from "./DeleteProperty";
import { toast } from "react-toastify";
import { formatDate, getImageUrl } from "@/helper";

export default function UserProperties({ user }: { user: User }) {
  const supabase = createClientComponentClient();
  const isFetched = useRef<boolean>(false);
  const [properties, setProperties] = useState<Array<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    if (!isFetched.current) {
      fetchProperties();
      isFetched.current = true;
    }
  }, []);
  // * Fetch user properties
  const fetchProperties = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("properties")
      .select("id,title,state,city,created_at,images")
      .eq("user_id", user.id);

    console.log("The properties are", data);
    setProperties(data);
    setLoading(false);
  };

  //   * Delete Property
  const deleteProperty = async (id: number) => {
    setDeleteLoading(true);
    const { error } = await supabase.from("properties").delete().eq("id", id);
    setDeleteLoading(false);
    if (error) {
      toast.error(error.message, { theme: "colored" });
    } else {
      toast.success("Property deleted successfully!", { theme: "colored" });
      fetchProperties();
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <h1 className="text-3xl font-bold">Your Properties</h1>
      {properties != null && properties?.length > 0 && (
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Images</TableColumn>
            <TableColumn>State</TableColumn>
            <TableColumn>City</TableColumn>
            <TableColumn>Created_at</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody items={properties}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {" "}
                  <AvatarGroup isBordered>
                    {item?.images?.map((image: string) => (
                      <Avatar src={getImageUrl(image)} key={image} />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{formatDate(item.created_at)}</TableCell>
                <TableCell>
                  <DeleteProperty
                    deleteCallback={deleteProperty}
                    loading={deleteLoading}
                    id={item.id}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
