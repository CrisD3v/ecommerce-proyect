"use client";
import React, { useState, useEffect } from "react";
import { useSignupMutation } from "@/redux/services/ecommerceApi";
import { useAppDispatch } from "@/redux/hooks";
import { setOpenModal } from "@/redux/features/modalSlice";

interface Credentials {
  name: string;
  label: string;
  type: string;
}

function SignUp() {
  const dispatch = useAppDispatch();
  const inputs: Credentials[] = [
    { name: "name", label: "Nombre", type: "text" },
    { name: "lastName", label: "Apellido", type: "text" },
    { name: "phone", label: "Telefono", type: "number" },
    { name: "user", label: "Usuario", type: "text" },
    { name: "email", label: "Correo", type: "email" },
    { name: "password", label: "Contraseña", type: "password" },
    { name: "rolId", label: "", type: "hidden" },
  ];

  const [credentials, setCredentials] = useState<{
    [key: string]: string | number;
  }>({
    name: "",
    lastName: "",
    phone: "",
    user: "",
    email: "",
    password: "",
    rolId: "2",
  });

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [register] = useSignupMutation();

  const openModal = () => {
    dispatch(setOpenModal()); // Dispatch del action creator para cambiar el estado de isClicked
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(credentials).then((response: any) => {
        if (response?.data) {
          openModal(); // close ModaL
        }
      });
    } catch (error) {
      console.error("Error al registrarse:", error);
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
      <h2 className="text-xl font-semibold mb-4 text-center">Registrarse</h2>
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
        <button
          type="submit"
          disabled={isLoading}
          className="bg-sky-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? "Registrandose..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
