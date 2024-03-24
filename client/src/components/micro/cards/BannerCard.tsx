import Image from "next/image";
import Banner from "@/../public/banner_loquelefalta3.png";
import React from "react";

function BannerCard() {
  return (
    <div className="col-start-2 col-end-12 overflow-hidden">
      <div className="border-2 rounded-xl">
        <Image
          src={Banner}
          alt="banner"
          className="object-cover w-full h-96 rounded-xl select-none"
        />
      </div>
    </div>
  );
}

export default BannerCard;
