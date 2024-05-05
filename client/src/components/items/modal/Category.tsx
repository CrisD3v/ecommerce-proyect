import { useAppDispatch } from "@/redux/hooks";
import { useCreateCategoryMutation } from "@/redux/services/ecommerceApi";
import React, { useState } from "react";
import FormData from "form-data";
import { setOpenModal } from "@/redux/features/modalSlice";

interface inputs {
  name: string;
  label: string;
  type: string;
}

function Category() {
  const dispatch = useAppDispatch();
  const inputsList: inputs[] = [
    { name: "category", label: "Categoria", type: "text" },
    { name: "file", label: "Imagen de Categoria", type: "file" },
  ];

  const [inputs, setInputs] = useState<{ [key: string]: string | File | null }>({
    category: "",
    file: null,
  });

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("category", inputs.category);
      if (inputs.file instanceof File) {
        formData.append("file", inputs.file);
      }


      await createCategory(formData).then((response: any) => {
        if (response?.data) {
          dispatch(setOpenModal());
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error al crear una categoria:", error);
    }

    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    const target = e.target as HTMLInputElement; // Aserto de tipo para HTMLInputElement
    const value = target.type === "file" ? (target.files ? target.files[0] : null) : target.value;
    setInputs({ ...inputs, [fieldName]: value });
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {inputsList.map((el, index) => (
            <div key={index}>
              <label
                htmlFor="nameShop"
                className="block text-lg font-medium text-gray-700"
              >
                {el.label}
              </label>
              <input
                disabled={isLoading}
                name={el.name}
                type={el.type}
                id={el.name}
                onChange={(e) => handleChange(e, el.name)}
                className="mt-2 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
                placeholder="Nombre de la categoria"
              />
            </div>
          ))}
          <div className="flex justify-center mr-4">
            <button
              disabled={isLoading}
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200"
            >
              {isLoading ? "..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Category;
