import Options from "@/components/items/text/Options.text";
import React, { ReactNode } from "react";

interface Props {
  text: string;
  icon: ReactNode;
}

function NavIcons({ text, icon }: Props) {
  return (
    <div
      className={`flex justify-center items-center flex-col cursor-pointer hover:text-cyan-500`}
    >
      <span>{icon}</span>
      <Options text={text} />
    </div>
  );
}

export default NavIcons;
