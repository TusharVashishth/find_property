import React from "react";
import { Button, Image } from "@nextui-org/react";
import { X } from "lucide-react";

export default function ImagePreview({ imageUrl }: { imageUrl: string }) {
  return (
    <div>
      <Image
        src={imageUrl}
        width={250}
        alt="Property Image"
        className="object-contain"
      />
    </div>
  );
}
