"use client";
import InputSearch from "@/components/items/inputs/InputSearch";
import Logo from "@/components/items/logo/Logo";
import Options from "@/components/items/text/Options.text";
import NavIcons from "@/components/micro/navIcons/NavIcons";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import LogoEm from "../../../../public/logo2.png";
import LoginModal from "@/components/micro/modal/LoginModal";
import Cookies from "universal-cookie";
import { useGetUserQuery } from "@/redux/services/ecommerceApi"; // Importa el hook generado para el endpoint
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setOpenModal } from "@/redux/features/modalSlice";
import { setOpenMenuCart } from "@/redux/features/isClickedSideCart";
import NavUserIcon from "@/components/micro/navIcons/NavUserIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SideCart from "./SideCart";

interface props {
  route: string;
}

function Nav({ route }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const modalIsOpen = useAppSelector((state) => state.openModal.openModal);
  const cartMenuIsOpen = useAppSelector(
    (state) => state.openMenuCart.openMenuCart
  );
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(setOpenModal()); // Dispatch del action creator para cambiar el estado de isClicked
  };

  const openMenuCart = () => {
    dispatch(setOpenMenuCart());
  };

  const cookies = new Cookies();
  const token = cookies.get("token_user");
  const userQueryResult = useGetUserQuery({
    id: token ? jwtDecode(token)?.id : null,
  });
  const {
    data: response,
    isLoading,
    isError,
  } = token ? userQueryResult : { data: null, isLoading: null, isError: null };

  useEffect(() => {
    if (token && !isLoading && !isError && response) {
      setUserData(response);
    }
  }, [token, isLoading, isError, response]);
  const logout = () => {
    cookies.remove("token_user", { path: "/" });
    setUserData(null);
    if (route != "main") router.push("/");
    router.refresh();
  };


  const menuUser = [
    { name: "Perfil", function: null, link: "" },
    {
      name: "Dashboard",
      function: null,
      link: `/dashboard/admin/${token ? jwtDecode(token)?.id : 0}/tienda`,
    },
    { name: "Cerrar sesión", function: () => logout(), link: "" }, // Sin los paréntesis después de logout
  ];

  const filteredMenu = menuUser.filter((el) => {
    if (el.name === "Dashboard" && (userData ? userData.RolId : 0) !== 1) {
      return false; // Si el usuario no tiene el RoleId igual a 1, filtramos el elemento "Dashboard"
    }
    return true; // Mantenemos todos los demás elementos del menú
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="max-h-96 border-2 overflow-hidden grid grid-cols-12 select-none">
      <div className="m-4 ml-10 w-max flex ">
        <Logo size={100} image={LogoEm} />
        <div className="m-4 flex justify-center items-center">
          <h1 className="font-bold font-sans text-sm text-cyan-400">
            LO QUE LE FATA
          </h1>
        </div>
      </div>

      <div className="col-start-5 col-end-9 flex justify-center items-center">
        <div className="w-max">
          <InputSearch
            placeHolder="Search All"
            radius="rounded"
            colorIcon="red-900"
            colorBorder="red-900"
          />
        </div>
      </div>

      <div className="col-start-11 row-start-1 flex justify-center items-center">
        <div className="" onClick={openMenuCart}>
          <NavIcons
            text="Carrito"
            icon={<ShoppingCartIcon className="w-6" />}
          />
        </div>
      </div>

      <div className="col-start-12 row-start-1 flex justify-center items-center">
        <div className="" onClick={userData ? toggleDropdown : openModal}>
          {userData ? (
            <NavUserIcon text={userData.name} icon="" />
          ) : (
            <NavIcons text={"Iniciar"} icon={<UserIcon className="w-6" />} />
          )}
        </div>

        {userData ? (
          <div className="mt-5">
            {isOpen && (
              <div className="absolute right-0 mt-5 w-48 bg-white rounded-lg shadow-lg">
                <ul className="py-1">
                  {filteredMenu.map((el, index) => (
                    <Link href={el.link} key={index}>
                      <li className="cursor-pointer">
                        <a
                          onClick={el.function}
                          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
                        >
                          {el.name}
                        </a>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      {modalIsOpen && route != "main" ? (
        <LoginModal type="signin" onClose={openModal} />
      ) : (
        ""
      )}

      {cartMenuIsOpen ? <SideCart onClose={openMenuCart} /> : ""}
    </div>
  );
}

export default Nav;
