import Options from "@/components/items/text/Options.text";
import React, { ReactNode } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Props {
  text: string;
  icon: string;
}

function NavUserIcon({ text, icon }: Props) {
  const URL_BASE = process.env.URL_BASE;
  return (
    <div
      className={`flex justify-center items-center flex-col cursor-pointer hover:text-cyan-500`}
    >
      <span>
            <UserCircleIcon className="w-6"/>
      </span>
      <Options text={text} />
    </div>
  );
}

export default NavUserIcon;
