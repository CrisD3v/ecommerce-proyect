"use client";
import React, { useState } from "react";
import Logo from "@/components/items/logo/Logo";
import SideMenu from "@/components/micro/sidebar/SideMenu";
import LogoEm from "@/../public/logo2.png";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenMenu } from "@/redux/features/isClickedMenuSide";

interface props {
  item: string;
}

function SideBar({ item }: props) {
  const dispatch = useAppDispatch();
  const [close, setClose] = useState(false);
  const handleHiddenMenu = () => {
    dispatch(setOpenMenu());
    setClose(!close);
    console.log(close);
  };
  return (
    <div
      className={`bg-blue-400 bg-opacity-10 h-screen transition-all duration-500 ease-in-out shadow-2xl ${
        close ? "w-20" : "w-72"
      } overflow-hidden`}
    >
      <Tooltip id="tooltip-menu" place="right" />
      <div className="m-4 ml-5 w-max flex ">
        {/* <div className="flex mt-2">
          <Logo size={100} image={LogoEm} />
          <div className="m-4 flex justify-center items-center">
          <h1 className="font-bold font-sans text-sm text-cyan-400">
          LO QUE LE FATA
          </h1>
          </div>
        </div> */}
        <div
          data-tooltip-id="tooltip-menu2"
          data-tooltip-content={close ? "EXPANDIR EL MENÚ" : "CONTRAER EL MENÚ"}
        >
          <div
            className="cursor-pointer hover:bg-black hover:text-white hover:bg-opacity-20 hover:rounded-full hover:transition-all hover:duration-150 hover:ease-in-out transition-all ease-out duration-150 w-10 h-10 flex items-center justify-center"
            onClick={handleHiddenMenu}
          >
            <span>
              <Bars3Icon className="w-6" />
            </span>
          </div>
        </div>
      </div>

      <SideMenu isClose={close} item={item} />
    </div>
  );
}

export default SideBar;
