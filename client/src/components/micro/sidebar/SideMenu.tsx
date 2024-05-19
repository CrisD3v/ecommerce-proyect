import React, { useEffect, useState } from "react";
import {
  BuildingStorefrontIcon,
  InboxStackIcon,
  NewspaperIcon,
  ArrowTrendingUpIcon,
  ArrowLeftCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Link from "next/link";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useGetUserQuery } from "@/redux/services/ecommerceApi";

interface props {
  isClose: boolean;
  item: string;
}

interface JwtPayload {
  id: string; // Ensure the 'id' type is correct as per your usage
}

interface User {
  name: string;
  RolId: number;
}

function SideMenu({ isClose, item }: props) {
  const cookies = new Cookies();
  const token = cookies.get("token_user");
    const [userData, setUserData] = useState<User | null>(null);
    const userQueryResult = useGetUserQuery({
      id: token ? (jwtDecode(token) as JwtPayload).id ?? "" : "",
    });
    const {
      data: response,
      isLoading,
      isError,
    } = token
      ? userQueryResult
      : { data: null, isLoading: null, isError: null };

    useEffect(() => {
      if (token && !isLoading && !isError && response) {
        if ("name" in response && "RolId" in response) {
          setUserData(response as User);
        } else {
          console.error("La respuesta no tiene la forma esperada:", response);
        }
      }
    }, [token, isLoading, isError, response]);
  const menuOptions = [
    {
      active: "TIENDA",
      name: "TIENDA",
      icon: <BuildingStorefrontIcon className={`${isClose ? "w-6" : ""}`} />,
      link: `/dashboard/admin/${
        token ? (jwtDecode(token) as JwtPayload).id ?? 0 : 0
      }/tienda`,
    },
    {
      active: "STOCK",
      name: "STOCK",
      icon: <InboxStackIcon className={`${isClose ? "w-6" : ""}`} />,
      link: `/dashboard/admin/${
        token ? (jwtDecode(token) as JwtPayload).id ?? 0 : 0
      }/stock`,
    },
    {
      active: "ORDER",
      name: "ORDENES DE COMPRA",
      icon: <NewspaperIcon className={`${isClose ? "w-6" : ""}`} />,
      link: `/dashboard/admin/${
        token ? (jwtDecode(token) as JwtPayload).id ?? 0 : 0
      }/order`,
    },
  ];
  return (
    <div className="flex flex-col h-max xl:h-[40rem] select-none transition-all ease-out">
      <div className={`mt-40`}>
        {menuOptions.map((el, index) => (
          <div
            key={index}
            data-tooltip-id="tooltip-menu2"
            data-tooltip-content={el.name}
          >
            <Link href={el.link}>
              <div
                className={`grid grid-cols-12 p-4 cursor-pointer transition-all ease-out duration-150 ${
                  item.toUpperCase() == el.active ? "text-cyan-300" : ""
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
          </div>
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
        <Link href={"/"}>
          <div className="flex flex-row items-center cursor-pointer hover:transition-all hover:duration-200 hover:ease-in-out hover:text-xl transition-all ease-out duration-150 group">
            <div
              // options
              data-tooltip-id="tooltip-menu2"
              data-tooltip-content="HOME"
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
                      : "w-7  group-hover:transition-all transition-all ease-out duration-300"
                  }`}
                />
              </span>
            </div>
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
        <Link href={`/perfil/${token ? (jwtDecode(token) as JwtPayload).id ?? 0 : 0}`}>
        <div className="flex flex-row items-center cursor-pointer">
          <Tooltip id="tooltip-menu2" place="right" />
          <div
            data-tooltip-id="tooltip-menu2"
            data-tooltip-content="PERFIL"
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
          </div>
          <div className={`${isClose ? "invisible" : "visible"}`}>
            <p className="transition-opacity ease-in duration-1000">
              {isClose ? "" : `${userData ? userData.name : ''}`}
            </p>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
