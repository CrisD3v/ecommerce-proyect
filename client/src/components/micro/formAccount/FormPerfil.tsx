import React from "react";
import { ArrowLongLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { useGetUserQuery } from "@/redux/services/ecommerceApi"; // Importa el hook generado para el endpoint
import Link from "next/link";

interface Inputs {
  name: string;
  label: string;
  type: string;
}
interface Props {
  id: any;
}
function FormPerfil({ id }: Props) {
//   const userQueryResult = useGetUserQuery({id:id});
//   const { data: response, isLoading, isError } = userQueryResult;
  const inputsList: Inputs[] = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "last_name", label: "Apellido", type: "text" },
    { name: "email", label: "Correo", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
    { name: "password", label: "Confirmar contraseña", type: "password" },
  ];
  return (
    <form action="" className="flex justify-center items-center h-full">
      <div className=" bg-white rounded-md h-[50rem] w-[70rem] flex items-center flex-col">
        <div className="relative right-[30.5rem] top-5">
          <Link
            href="/"
            className="flex w-max gap-2 hover:text-cyan-400 cursor-pointer select-none"
          >
            <ArrowLongLeftIcon className="w-5" />
            <p>Regresar</p>
          </Link>
        </div>
        <div className="bg-rose-50  border-red-500 relative bottom-24 rounded-full w-[16rem] h-[16rem] flex justify-center">
          <div className="w-full flex flex-col justify-center items-center">
            <UserCircleIcon className="w-full text-white" />
          </div>
        </div>
        <div className=" relative bottom-14 flex flex-col justify-center items-center  w-[69rem] h-[150rem] ">
          {inputsList.map((el, index) => (
            <div key={index} className="w-[30rem]">
              <label
                htmlFor={el.name}
                className="block text-lg font-medium text-gray-700"
              >
                {el.label}
              </label>
              <input
                name={el.name}
                type={el.type}
                id={el.name}
                className="mt-2 mb-5 xl:mb-0 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
                placeholder={el.label}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center relative bottom-8">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200">
            GUARDAR
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormPerfil;
