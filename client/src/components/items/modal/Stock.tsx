"use client";
import { setOpenModal } from "@/redux/features/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  useCreateProductMutation,
  useGetCategoryQuery,
  useGetSubCategoryQuery,
} from "@/redux/services/ecommerceApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface inputs {
  name: string;
  label: string;
  type: string;
}

interface Category {
  id: any;
  category: string;
  image: string;
  SubCategories: any;
}

interface SubCategory {
  id: any;
  sub_category: string;
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
    [key: string]: string | File | boolean | [];
  }>({
    name: "",
    price: "",
    stock: "",
    code: "",
    file: "",
    description: "",
    codeEnabled: false,
    category: "",
  });

   const {
     data: dataCategory = [] as Category[],
     isLoading: categoryL,
     isError: categoryErr,
   } = useGetCategoryQuery();
   const {
     data: dataSubCategory = [] as SubCategory[],
     isLoading: subCategoryL,
     isError: subCategoryErr,
   } = useGetSubCategoryQuery();

  const [errors, setErrors] = useState<any>("");
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [createProduct] = useCreateProductMutation();

  const { data: data, isLoading, isError } = useGetCategoryQuery();

    const [selectedSubCategories, setSelectedSubCategories] = useState<
      string[]
    >([]);


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
    if (typeof inputs.category === "string") {
      formData.append("category", inputs.category);
    }
    if (Array.isArray(selectedSubCategories)) {
      formData.append("subCategory", selectedSubCategories.join(","));
    }

    e.preventDefault();
    setIsLoading2(true);

    try {
      await createProduct(formData).then((response: any) => {
        if (response?.data) {
          dispatch(setOpenModal());
          window.location.reload();
          
        }
      });
    } catch (error) {
      console.error("Error al crear una categoria:", error);
    }

    setIsLoading2(false);
  };


  // Evento onChange para los checkboxes de subcategorías
  const handleSubCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    subCategoryId: string
  ) => {
    const isChecked = e.target.checked;
    // Si el checkbox está marcado, agregamos la subcategoría a la lista de seleccionados
    // Si el checkbox está desmarcado, la removemos de la lista
    setSelectedSubCategories((prevSelectedSubCategories) => {
      if (isChecked) {
        return [...prevSelectedSubCategories, subCategoryId];
      } else {
        return prevSelectedSubCategories.filter((id) => id !== subCategoryId);
      }
    });
  };

  // Función principal de handleChange
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

    if (fieldName === "category") {
      // Filtrar subcategorías cuando cambie la categoría seleccionada
      const filteredSubs =
        (
          (dataCategory as Category[]).find(
            (cat) => cat.id == e.target.value
          ) || {}
        ).SubCategories || [];
      setFilteredSubCategories(filteredSubs);
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
          <div className="">
            {inputsList.map((el, index) => (
              <div key={index}>
                {el.name == "code" ? (
                  <div className="mb-2" key={index}>
                    <input
                      className="h-5 w-5 xl:mt-2" // Clases para aumentar el tamaño del checkbox
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
                  className="mt-2 mb-5 xl:mb-0 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
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
            <div className="mb-5">
              <h3 className="mt-5 mb-2 block text-lg font-medium text-gray-700">
                CATEGORIAS
              </h3>
              <div className="flex flex-row flex-wrap gap-2">
                {(dataCategory as Category[])?.map((el, i) => (
                  <div key={i}>
                    <input
                      className="hidden category"
                      id={`radio_${i}`}
                      type="radio"
                      name="category"
                      value={el.id}
                      onChange={(e) => handleChange(e, "category")}
                    />
                    <label
                      className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer hover:border-cyan-300 focus:border-cyan-300"
                      htmlFor={`radio_${i}`}
                    >
                      <span className="text-xs font-semibold uppercase">
                        {el.category}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[35.5rem]">
              <h3 className="mt-5 mb-2 block text-lg font-medium text-gray-700">
                SUBCATEGORIAS
              </h3>
              <div className="flex flex-row flex-wrap gap-2">
                {(filteredSubCategories as SubCategory[]).map(
                  (subCategory, index) => (
                    <div key={index}>
                      <input
                        className="hidden category-checkbox"
                        id={`checkbox_${index}`}
                        type="checkbox"
                        name={`subCategory[${index}]`}
                        value={subCategory.id}
                        // Evento onChange actualizado para llamar a handleSubCategoryChange
                        onChange={(e) =>
                          handleSubCategoryChange(e, subCategory.id)
                        }
                      />
                      <label
                        className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer hover:border-cyan-300 focus:border-cyan-300"
                        htmlFor={`checkbox_${index}`}
                      >
                        <span className="text-xs font-semibold uppercase">
                          {subCategory.sub_category}
                        </span>
                      </label>
                    </div>
                  )
                )}
              </div>
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
