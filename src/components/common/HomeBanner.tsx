"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import FollowUs from "./FollowUs";
import Link from "next/link";
export default function HomeBanner() {
  return (
    <div className="w-screen h-[500px] md:h-[300px] lg:h-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center items-start flex-col px-14">
          <h1 className="text-primary-500 text-3xl lg:text-5xl font-extrabold">
            Real estate without the hassle
          </h1>
          <p className="text-lg font-semibold">
            Buy or sell your home on your own terms without any agent and
            without any commision.
          </p>

          <Link
            href="/add-property"
            className="bg-primary-500 rounded-xl text-white p-2.5 w-full text-center"
          >
            List your property
          </Link>

          {/* Follow us  */}
          <FollowUs />
        </div>
        <div>
          <Image
            src="/images/city.svg"
            width={100}
            height={100}
            alt="city"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
