import React from "react";
import Image from "next/image";
interface Props {
  size: number;
  image: any;
}

function Logo({ size, image }: Props) {
  return (
    <div className="">
      <Image alt="logo" src={image} height={size} width={size} />
    </div>
  );
}

export default Logo;
