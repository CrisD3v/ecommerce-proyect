"use client";
import { setOpenModal } from "@/redux/features/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  useCreateProductMutation,
  useGetCategoryQuery,
} from "@/redux/services/ecommerceApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface inputs {
  name: string;
  label: string;
  type: string;
}

function Stock() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const inputsList: inputs[] = [
    { name: "name", label: "Nombre del producto", type: "text" },
    { name: "price", label: "Precio del producto", type: "text" },
    { name: "stock", label: "Cantidad", type: "number" },
    { name: "code", label: "Codigo del producto", type: "text" },
    { name: "file", label: "Imagen del producto", type: "file" },
  ];

  const [inputs, setInputs] = useState<{
    [key: string]: string | File | boolean;
  }>({
    name: "",
    price: "",
    stock: "",
    code: "",
    file: "",
    description: "",
    codeEnabled: false,
  });

  const [errors, setErrors] = useState<any>("");
  const [isLoading2, setIsLoading2] = useState<boolean>(false);

  const [createProduct] = useCreateProductMutation();

  const { data: data, isLoading, isError } = useGetCategoryQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    const formData = new FormData();
    if (typeof inputs.name === "string") {
      formData.append("name", inputs.name);
    }
    if (typeof inputs.price === "string") {
      formData.append("price", inputs.price);
    }
    if (typeof inputs.stock === "string") {
      formData.append("stock", inputs.stock);
    }
    if (typeof inputs.code === "string") {
      formData.append("code", inputs.code);
    }
    if (inputs.file instanceof File) {
      formData.append("file", inputs.file);
    }
    if (typeof inputs.description === "string") {
      formData.append("description", inputs.description);
    }

    e.preventDefault();
    setIsLoading2(true);

    try {
      await createProduct(formData).then((response: any) => {
        if (response?.data) {
          dispatch(setOpenModal());
          window.location.reload();
          console.log(response.data);
        }
      });
    } catch (error) {
      console.error("Error al crear una categoria:", error);
    }

    setIsLoading2(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    let value: string | File = "";
    if (fieldName === "code") {
      // Limitar el código a 14 caracteres
      value = e.target.value.slice(0, 14);
    } else {
      // Para otros campos, simplemente asignar el valor
      if (e.target instanceof HTMLInputElement && e.target.type === "file") {
        value = e.target.files ? e.target.files[0] : e.target.value;
      } else {
        value = e.target.value;
      }
    }
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: fieldName === "file" ? value : (value as string),
    }));
    // Actualizar codeEnabled solo si el campo es "code"
    if (fieldName === "code") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        codeEnabled: true,
      }));
    }
  };

  return (
    <div>
      <div className="w-full xl:h-full flex justify-center items-center">
        <div className="error">
          <span>{errors}</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            {inputsList.map((el, index) => (
              <div key={index}>
                {el.name == "code" ? (
                  <div className="mb-2" key={index}>
                    <input
                      className="h-5 w-5" // Clases para aumentar el tamaño del checkbox
                      type="checkbox"
                      id="manualCodeInput"
                      onChange={(e) =>
                        setInputs((prevInputs) => ({
                          ...prevInputs,
                          codeEnabled: e.target.checked,
                        }))
                      }
                    />
                    <label htmlFor="manualCodeInput" className="ml-2">
                      Ingresar código manualmente
                    </label>
                  </div>
                ) : null}
                <label
                  htmlFor="nameShop"
                  className="block text-lg font-medium text-gray-700"
                >
                  {el.label}
                </label>
                <input
                  disabled={
                    isLoading || (el.name === "code" && !inputs.codeEnabled)
                  }
                  name={el.name}
                  type={el.type}
                  id={el.name}
                  onChange={(e) => handleChange(e, el.name)}
                  className="mt-2 mb-5 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
                  placeholder={el.label}
                  maxLength={el.name === "code" ? 14 : undefined}
                />
              </div>
            ))}
            <div className="">
              <label
                htmlFor="nameShop"
                className="block text-lg font-medium text-gray-700"
              >
                Descripcion del producto
              </label>
              <textarea
                name="description"
                id=""
                cols={30}
                rows={5}
                onChange={(e) => handleChange(e, "description")}
                className="mt-2 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center mr-4">
            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200"
            >
              {isLoading ? "..." : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Stock;
