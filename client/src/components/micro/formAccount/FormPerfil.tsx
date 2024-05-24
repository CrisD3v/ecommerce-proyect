"use client";
import React, { useEffect, useState } from "react";
import { ArrowLongLeftIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import {
  useGetUserQuery,
  useEditUserMutation,
} from "@/redux/services/ecommerceApi"; // Importa el hook generado para el endpoint
import Link from "next/link";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface Inputs {
  name: string;
  label: string;
  type: string;
}

interface Props {
  id: any;
}

interface Users {
  name: string;
  lastName: string;
  phone: string;
  user: string;
  email: string;
}

interface User {
  [key: string]: any; // Esto permite cualquier clave de tipo string con valor de cualquier tipo
  name: string;
  RolId: number;
}

interface JwtPayload {
  id: string; // Ensure the 'id' type is correct as per your usage
}

function FormPerfil({ id }: Props) {
  const [userData, setUserData] = useState<User | null>(null);

  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("token_user");
  const userQueryResult = useGetUserQuery({
    id: token ? (jwtDecode(token) as JwtPayload).id ?? "" : "",
  });
  const {
    data: response,
    isLoading,
    isError,
  } = token ? userQueryResult : { data: null, isLoading: null, isError: null };

  useEffect(() => {
    if (token && !isLoading && !isError && response) {
      if ("name" in response && "RolId" in response) {
        setUserData(response as User);
      } else {
        console.error("La respuesta no tiene la forma esperada:", response);
      }
    }
  }, [token, isLoading, isError, response]);

  const inputsList: Inputs[] = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "lastName", label: "Apellido", type: "text" },
    { name: "phone", label: "Teléfono", type: "number" },
    { name: "user", label: "Usuario", type: "text" },
    { name: "email", label: "Correo", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
  ];

  const [credentials, setCredentials] = useState<{ [key: string]: string }>({
    name: "",
    lastName: "",
    phone: "",
    user: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);

  const [updatePerfil] = useEditUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading2(true);

    try {
      await updatePerfil({ id: id, data: credentials }).then(
        (response: any) => {
          if (response?.data) {
            router.refresh();
            setError(false);
            window.location.reload();
          }
        }
      );
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(true);
    }

    setIsLoading2(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setCredentials({ ...credentials, [fieldName]: e.target.value });
  };

  const disabled = false; // Reemplaza esto con la lógica adecuada
  const unabled = false; // Reemplaza esto con la lógica adecuada

  return (
    <form
      className="flex justify-center items-center h-full"
      onSubmit={handleSubmit}
    >
      <div className="bg-white rounded-md h-[50rem] w-[70rem] flex items-center flex-col">
        <div className="relative right-[30.5rem] top-5">
          <Link
            href="/"
            className="flex w-max gap-2 hover:text-cyan-400 cursor-pointer select-none"
          >
            <ArrowLongLeftIcon className="w-5" />
            <p>Regresar</p>
          </Link>
        </div>
        <div className="bg-rose-50 border-red-500 relative bottom-24 rounded-full w-[16rem] h-[16rem] flex justify-center">
          <div className="w-full flex flex-col justify-center items-center">
            <UserCircleIcon className="w-full text-white" />
          </div>
        </div>
        <div className="relative bottom-[4.5rem] flex flex-col justify-center items-center w-[69rem] h-[34rem]">
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
                defaultValue={
                  el.name !== "password"
                    ? userData
                      ? userData[el.name as keyof User] || ""
                      : ""
                    : ""
                }
                onChange={(e) => handleChange(e, el.name)}
                className="mt-2 mb-5 xl:mb-0 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
                placeholder={el.label}
                required={el.name !== "password" ? !!disabled : !!unabled}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center relative bottom-12 bg-rose-50 w-[10rem] h-[10rem]  rounded-md">
          <div className="mt-3">
            <button className="bg-rose-50inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200">
              GUARDAR
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormPerfil;
