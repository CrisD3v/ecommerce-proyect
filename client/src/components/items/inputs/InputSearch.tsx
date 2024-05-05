"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface Props {
  placeHolder: string;
  radius: string;
  colorIcon: string;
  colorBorder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPressFunct: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function InputSearch({ placeHolder, radius, colorIcon, colorBorder, onChange, onKeyPressFunct }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex flex-row w-full ${radius} border-2 focus-within:border-sky-400 transition duration-300 opacity-80 ease-in`}
    >
      <div className="">
        <input
          type="text"
          placeholder={placeHolder}
          className={`p-2 pl-3 w-96 outline-none`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={onChange}
          onKeyDown={onKeyPressFunct}
        />
      </div>

      <div className={`w-9 p-1 cursor-pointer`}>
        <MagnifyingGlassIcon
          className={`${isFocused ? `text-cyan-500` : "text-slate-900"}`}
        />
      </div>
    </div>
  );
}

export default InputSearch;
