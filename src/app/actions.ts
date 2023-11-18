"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function saveProperty(preState: any, formData: FormData) {
  const supabase = createServerComponentClient({ cookies });

  //   * User unsaved the property
  if (formData.get("type") === "0") {
    const { error: deleteError } = await supabase
      .from("saved")
      .delete()
      .match({
        user_id: formData.get("user_id"),
        property_id: formData.get("property_id"),
      });
    if (deleteError) {
      return { error: deleteError.message };
    }
  } else if (formData.get("type") === "1") {
    const { error: saveError } = await supabase.from("saved").insert({
      user_id: formData.get("user_id"),
      property_id: formData.get("property_id"),
    });

    if (saveError) {
      return { error: saveError.message };
    }
  }
}
