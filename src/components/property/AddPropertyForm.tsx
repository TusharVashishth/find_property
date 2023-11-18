"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { stateList } from "@/config/states";
import { getCities } from "@/helper";
import ImagePreview from "../common/ImagePreview";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PropertySchemaType,
  propertySchema,
} from "@/validation/propertySchema";
import { useRouter } from "next/navigation";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import Env from "@/config/Env";
import { toast } from "react-toastify";
export default function AddPropertyForm({ user }: { user: User }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [cities, setCities] = useState<Array<CityType> | []>([]);
  const [previewImages, setPreviewImages] = useState<Array<string> | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PropertySchemaType>({
    resolver: yupResolver(propertySchema),
  });

  const handleStateChange = (state: any) => {
    const filterCities = getCities(state);
    setCities(filterCities);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("The user is", await supabase.auth.getUser());
    const files = event.target.files;
    let urls = [];
    if (files != undefined && files.length > 0) {
      for (let index = 0; index < files.length; index++) {
        const imageUrl = URL.createObjectURL(files[index]);
        urls.push(imageUrl);
      }
      setValue("images", files!);
    }
    setPreviewImages(urls);
  };

  // * Add Property
  const addProperty = async (payload: PropertySchemaType) => {
    console.log("The payload is", payload);
    let uploadedImagesUrl = [];
    setLoading(true);
    // * Upload images
    for (let i = 0; i < payload.images?.length; i++) {
      // * Generate unique path
      const uniquePath = user.id + "/" + uuidv4();
      const { data: imgData, error: imgErr } = await supabase.storage
        .from(Env.S3_BUCKET)
        .upload(uniquePath, payload.images[i]);
      if (imgErr) {
        toast.error(imgErr.message, { theme: "colored" });

        // * check if any image uploaded then delete it
        if (uploadedImagesUrl.length > 0) {
          await supabase.storage.from(Env.S3_BUCKET).remove(uploadedImagesUrl);
        }
        setLoading(false);
        break;
      }
      // * Add image path in array
      uploadedImagesUrl.push(imgData.path);
    }

    // * Add entry to property table
    const { error } = await supabase.from("properties").insert({
      user_id: user.id,
      title: payload.title,
      description: payload.description,
      images: uploadedImagesUrl,
      price: payload.price,
      state: payload.state,
      city: payload.city,
      type: payload.type,
    });

    if (error) {
      setLoading(false);
      toast.error(error.message, { theme: "colored" });
      // * check if any image uploaded then delete it
      if (uploadedImagesUrl.length > 0) {
        await supabase.storage.from(Env.S3_BUCKET).remove(uploadedImagesUrl);
      }
      return;
    }
    toast.success("Property listed successfully!", { theme: "colored" });
    router.push("/dashboard");
  };

  return (
    <>
      <form onSubmit={handleSubmit(addProperty)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-5">
            <Input label="Title" type="text" {...register("title")} />
            <span className="text-danger-400">{errors.title?.message}</span>
          </div>

          <div className="mb-5">
            <Input label="Price" type="number" {...register("price")} />
            <span className="text-danger-400">{errors.price?.message}</span>
          </div>
          <div className="mb-5">
            <Autocomplete
              defaultItems={stateList}
              label="States"
              placeholder="select state"
              className="text-foreground"
              onSelectionChange={handleStateChange}
              {...register("state")}
            >
              {(state) => (
                <AutocompleteItem key={state.key} className="text-foreground">
                  {state.value}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <span className="text-danger-400">{errors.state?.message}</span>
          </div>
          <div className="mb-5">
            <Autocomplete
              defaultItems={cities}
              label="Cities"
              placeholder="select city"
              className="text-foreground"
              {...register("city")}
            >
              {(state) => (
                <AutocompleteItem key={state.name} className="text-foreground">
                  {state.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <span className="text-danger-400">{errors.city?.message}</span>
          </div>
          <div className="mb-5">
            <Input
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
            <span className="text-danger-400">{errors.images?.message}</span>
          </div>
          <div className="mb-5">
            <Select
              label="Select Type"
              className="text-foreground"
              {...register("type")}
            >
              <SelectItem key="1" value="1" className="text-foreground">
                Rent
              </SelectItem>
              <SelectItem key="2" value="2" className="text-foreground">
                Sale
              </SelectItem>
            </Select>
            <span className="text-danger-400">{errors.type?.message}</span>
          </div>
        </div>
        <div className="mb-5">
          <Textarea label="Description" {...register("description")}></Textarea>
          <span className="text-danger-400">{errors.description?.message}</span>
        </div>

        <Button
          color="primary"
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? <Spinner color="white" /> : "Submit"}
        </Button>
      </form>
      {/* * Image Preview */}
      <div className="flex items-center justify-center space-x-6 overflow-x-auto">
        {previewImages.length > 0 &&
          previewImages.map((item, index) => (
            <ImagePreview imageUrl={item} key={index} />
          ))}
      </div>
    </>
  );
}
