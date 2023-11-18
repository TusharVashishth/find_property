import { bytesToMb } from "@/helper";
import * as yup from "yup";

export const propertySchema = yup.object({
  title: yup.string().min(5).max(150).required(),
  price: yup.number().required().typeError("Price should be a number."),
  state: yup.string().required(),
  city: yup.string().required(),
  description: yup.string().min(20).max(1000).required(),
  type: yup.string().required(),
  images: yup
    .mixed<FileList>()
    .test(
      "imageType",
      "All images must be an valid image.these image types are supported ,png,jpg,jpeg,svg,webp",
      (files: any) => {
        let isValid = true;
        // console.log("The image type is", files);
        for (let i = 0; i < files?.length; i++) {
          if (
            files[i]?.type === "image/png" ||
            files[i]?.type === "image/jpg" ||
            files[i]?.type === "image/jpeg" ||
            files[i]?.type === "image/svg+xml" ||
            files[i]?.type === "image/webp"
          ) {
            isValid = true;
          } else {
            isValid = false;
            break;
          }
        }
        console.log("The is valid is", isValid);
        return isValid;
      }
    )
    .test(
      "imageSize",
      "Image size should not be greater than 2 MB",
      (files: any) => {
        let isValid = true;
        for (let i = 0; i < files?.length; i++) {
          if (bytesToMb(files[i]?.size) <= 2) {
            isValid = true;
          } else {
            isValid = false;
            break;
          }
        }
        return isValid;
      }
    )
    .test("imagesCount", "You can upload max 2 images", (files: any) => {
      let isValid = files?.length <= 5;
      return isValid;
    })
    .required(),
});

export type PropertySchemaType = yup.InferType<typeof propertySchema>;
