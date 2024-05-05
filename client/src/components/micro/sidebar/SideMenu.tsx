import React from "react";
import {
  BuildingStorefrontIcon,
  InboxStackIcon,
  NewspaperIcon,
  ArrowTrendingUpIcon,
  ArrowLeftCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import Link from "next/link";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

interface props {
  isClose: boolean;
  item: string;
}

function SideMenu({ isClose, item }: props) {
   const cookies = new Cookies();
   const token = cookies.get("token_user");
  const menuOptions = [
    {
      active: "TIENDA",
      name: "TIENDA",
      icon: <BuildingStorefrontIcon className={`${isClose ? "w-6" : ""}`} />,
      link: `/dashboard/admin/${token ? jwtDecode(token)?.id : 0}/tienda`,
    },
    {
      active: "STOCK",
      name: "STOCK",
      icon: <InboxStackIcon className={`${isClose ? "w-6" : ""}`} />,
      link: `/dashboard/admin/${token ? jwtDecode(token)?.id : 0}/stock`,
    },
    {
      active: "ORDER",
      name: "ORDENES DE COMPRA",
      icon: <NewspaperIcon className={`${isClose ? "w-6" : ""}`} />,
      link: `/dashboard/admin/${token ? jwtDecode(token)?.id : 0}/order`,
    },
  ];
  return (
    <div className="flex flex-col h-max select-none transition-all ease-out">
      <div className={`mt-40`}>
        {menuOptions.map((el, index) => (
          <Tooltip
            key={index}
            // options
            title={el.name}
            position="right"
            trigger="mouseenter "
          >
           <Link href={el.link}>
            <div
              className={`grid grid-cols-12 p-4 cursor-pointer transition-all ease-out duration-150 ${
                item.toUpperCase() == el.ACT ? "text-cyan-300" : ""
              }
         ${
           isClose
             ? "w-14 h-14 hover:bg-black hover:text-white hover:bg-opacity-20 hover:rounded-full hover:transition-all hover:duration-150 hover:ease-in-out m-auto"
             : " hover:bg-black hover:bg-opacity-30 hover:text-white hover:rounded-sm hover:transition-all hover:duration-150 hover:ease-in-out"
         }`}
            >
              <div
                className={` ${
                  isClose
                    ? "invisible col-span-3"
                    : "visible col-span-10 transition-opacity ease-in duration-1000"
                }`}
                style={{ opacity: isClose ? 0 : 1 }}
              >
                <p>{el.name}</p>
              </div>
              <div className={`cols-span-2 ${isClose ? "-ml-1.5" : ""}`}>
                <span>{el.icon}</span>
              </div>
            </div>
            </Link>
          </Tooltip>
        ))}
      </div>

      {/* OPCIONES DE USUARIO Y REGRESAR A LA PAGINA */}
      <div
        className={`flex h-96 mt-14 ${
          isClose
            ? "flex-col justify-end ml-4 gap-5"
            : "justify-between flex-row mr-5 ml-3 items-end"
        }`}
      >
          <Link href={'/'}>
        <div className="flex flex-row items-center cursor-pointer hover:transition-all hover:duration-200 hover:ease-in-out hover:text-xl transition-all ease-out duration-150 group">
            <Tooltip
              // options
              title="HOME"
              position="right"
              trigger="mouseenter "
              className={`${
                isClose
                  ? "w-10 h-10 hover:bg-black hover:text-white hover:bg-opacity-20 hover:rounded-full hover:transition-all hover:duration-150 hover:ease-in-out"
                  : ""
              }`}
            >
              <span>
                <ArrowLeftCircleIcon
                  className={`${
                    isClose
                      ? "w-10 ease-in"
                      : "w-7 group-hover:w-8 group-hover:transition-all group-hover:duration-200 group-hover:ease-in-out group-hover:text-xl transition-all ease-out duration-300"
                  }`}
                />
              </span>
            </Tooltip>
            <div
              className={`${
                isClose
                  ? "invisible"
                  : "visible transition-all ease-in duration-1000"
              }`}
            >
              <p className="transition-opacity ease-in duration-1000">
                {isClose ? "" : "HOME"}
              </p>
            </div>
        </div>
          </Link>
        <div className="flex flex-row items-center cursor-pointer">
          <Tooltip
            // options
            title="PERFIL"
            position="right"
            trigger="mouseenter "
            className={`${
              isClose
                ? "w-10 h-10 hover:bg-black hover:text-white hover:bg-opacity-20 hover:rounded-full hover:transition-all hover:duration-150 hover:ease-in-out"
                : ""
            }`}
          >
            <span>
              <UserCircleIcon
                className={`${
                  isClose
                    ? "w-10 ease-in"
                    : "w-7 transition-all ease-in duration-300"
                }`}
              />
            </span>
          </Tooltip>
          <div className={`${isClose ? "invisible" : "visible"}`}>
            <p className="transition-opacity ease-in duration-1000">
              {isClose ? "" : "CRISTIAN"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
