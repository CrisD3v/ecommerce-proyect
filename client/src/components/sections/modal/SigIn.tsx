"use client";
import React, { useState, useEffect } from "react";
import { useSigninMutation } from "@/redux/services/ecommerceApi";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenModal } from "@/redux/features/modalSlice";

interface Credentials {
  name: string;
  label: string;
  type: string;
}

function SignIn() {
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const inputs: Credentials[] = [
    { name: "email", label: "Correo", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
  ];

  const [credentials, setCredentials] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [login] = useSigninMutation();

  const openModal = () => {
    dispatch(setOpenModal()); // Dispatch del action creator para cambiar el estado de isClicked
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(credentials).then((response: any) => {
        if (response?.data) {
          cookies.set("token_user", response.data.token, { path: "/" });
          setError(false);
          router.refresh();
          openModal(); // close ModaL
        }
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(true);
    }

    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setCredentials({ ...credentials, [fieldName]: e.target.value });
  };

  return (
    <div className="mt-5 transition-all ease-in-out duration-500">
      <h2 className="text-xl font-semibold mb-4 text-center">Iniciar sesión</h2>
      {error && (
        <h3 className="text-xl text-red-500 font-semibold mb-4 text-center">
          Credenciales inválidas!
        </h3>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-center items-center flex-col"
      >
        {inputs.map((el, index) => (
          <div className="mb-4 w-6/12" key={index}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={el.name}
            >
              {el.label}
            </label>
            <input
              type={el.type}
              id={el.name}
              name={el.name}
              value={credentials[el.name]}
              onChange={(e) => handleChange(e, el.name)}
              disabled={isLoading}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                error ? "border-red-500 transition-all ease-in" : ""
              }`}
            />
          </div>
        ))}
        <div className="flex justify-end w-6/12 mb-10">
          <a href="#">
            <p className="text-xs text-blue-600 cursor-pointer hover:underline">
              ¿Olvidaste la contraseña?
            </p>
          </a>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-sky-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
