"use client";
import InputSearch from "@/components/items/inputs/InputSearch";
import Logo from "@/components/items/logo/Logo";
import Options from "@/components/items/text/Options.text";
import NavIcons from "@/components/micro/navIcons/NavIcons";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import LogoEm from "../../../../public/logo2.png";
import LoginModal from "@/components/micro/modal/LoginModal";

function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

      <div className="col-start-11 flex justify-center items-center">
        <div className="" onClick={openModal}>
          <NavIcons text="Iniciar" icon={<UserIcon className="w-6" />} />
        </div>
      </div>

      <div className="col-start-12 flex justify-center items-center">
        <NavIcons text="Carrito" icon={<ShoppingCartIcon className="w-6" />} />
      </div>
      {/* Renderizar el modal solo si isModalOpen es verdadero */}
      {isModalOpen && <LoginModal type="signin" onClose={closeModal} />}
    </div>
  );
}

export default Nav;
