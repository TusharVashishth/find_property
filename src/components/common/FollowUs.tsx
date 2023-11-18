import React from "react";
import Image from "next/image";

export default function FollowUs() {
  return (
    <div className="mt-5">
      <h1 className="text-2xl font-bold">Follow us on</h1>
      <div className="grid grid-cols-4 gap-4 mt-2">
        <Image
          src="/images/instagram.png"
          width={40}
          height={40}
          alt="instagram"
        />
        <Image
          src="/images/facebook.png"
          width={40}
          height={40}
          alt="facebook"
        />
        <Image src="/images/twitter.png" width={40} height={40} alt="twitter" />
        <Image src="/images/youtube.png" width={40} height={40} alt="youtube" />
      </div>
    </div>
  );
}
