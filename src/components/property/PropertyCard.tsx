"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import { getImageUrl } from "@/helper";
import Image from "next/image";
import { Heart } from "lucide-react";
import { saveProperty } from "@/app/actions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export default function PropertyCard({ property }: { property: PropertyType }) {
  const [isSaved, setSaved] = useState<string>("0");
  const [formState, FormAction] = useFormState(saveProperty, { error: null });

  useEffect(() => {
    toast.error(formState?.error, { theme: "colored" });
  }, [formState]);

  return (
    <div>
      <Card
        isBlurred
        className="py-4 w-[400px] h-[400px] border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
      >
        <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-start">
          <div>
            <p className="text-lg uppercase font-bold">{property.title}</p>
            <small>
              {property.state} - {property.city}
            </small>
          </div>

          <Chip
            color={property.type == 1 ? "primary" : "danger"}
            variant="shadow"
            size="sm"
          >
            {property.type == 1 ? "Sale" : "Rent"}
          </Chip>
        </CardHeader>
        <CardBody className=" py-2">
          <CarouselProvider
            naturalSlideWidth={105}
            naturalSlideHeight={65}
            totalSlides={property.images.length}
            orientation="horizontal"
          >
            <Slider>
              {property.images?.map((item, index) => (
                <Slide index={index} key={index}>
                  <Image
                    src={getImageUrl(item)}
                    alt="image"
                    className="object-cover  rounded-lg w-full "
                    height={100}
                    width={100}
                  />
                </Slide>
              ))}
            </Slider>
          </CarouselProvider>
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <h4 className="font-bold text-small">₹{property.price}</h4>
          <form action={FormAction}>
            <input type="hidden" name="property_id" value={property.id} />
            <input type="hidden" name="user_id" value={property.user_id} />
            <input type="hidden" name="type" value={isSaved} />
            {isSaved === "1" || property?.isSaved ? (
              <Button
                isIconOnly
                color="default"
                size="sm"
                type="submit"
                onClick={() => setSaved("0")}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-red-500 cursor-pointer"
                >
                  <path
                    d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            ) : (
              <Button
                isIconOnly
                color="default"
                size="sm"
                type="submit"
                onClick={() => setSaved("1")}
              >
                <Heart size={26} type="submit" />
              </Button>
            )}
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
