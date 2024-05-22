import React, { useEffect, useState } from "react";
import { setOpenModal } from "@/redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useEditSubCategoryMutation,
  useGetSubCategoryQuery,
  useGetCategoryQuery,
} from "@/redux/services/ecommerceApi";
import { useRouter } from "next/navigation";

interface Inputs {
  sub_category: string;
  category: number;
  category_name: string;
}

interface Category {
  id: number;
  category: string;
  active: boolean;
  SubCategories: any;
}

interface SubCategory {
  id: number;
  sub_category: string;
  active: boolean;
}

interface IndexedSubCategory extends SubCategory {
  [key: string]: any;
}

function EditSubCategory() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [inputs, setInputs] = useState<Inputs>({
    sub_category: "",
    category: 0,
    category_name: "",
  });

  const {
    data: dataSubCategory = [] as SubCategory[],
    isLoading: isLoading3,
    isError: isError3,
  } = useGetSubCategoryQuery();

  const [filteredSubCategories, setFilteredSubCategories] = useState<
    IndexedSubCategory[]
  >([]);

  const idSubCategory = useAppSelector((state) => state.getIdData.SubCategory);

  const [error, setError] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);

  const [editSubCategory] = useEditSubCategoryMutation();

  const { data = [] as Category[], isLoading, isError } = useGetCategoryQuery();

  useEffect(() => {
    const filteredSubCategories = (dataSubCategory as SubCategory[]).find(
      (e) => e.id === idSubCategory
    );

    const category = (data as Category[]).find((el) => {
      return el.SubCategories.some((e: any) => e.id === idSubCategory);
    });

    if (filteredSubCategories) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        ...filteredSubCategories,
        category: category?.id || 0,
        category_name: category?.category || "",
      }));
      setFilteredSubCategories([filteredSubCategories]);
    }
  }, [dataSubCategory, data, idSubCategory]);

  const isActiveCategory = (data as Category[]).some(
    (el) => el.active && el.id === inputs["category"]
  );

  console.log(isActiveCategory);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading2(true);

    try {
      await editSubCategory({ id: idSubCategory, data: inputs }).then(
        (response: any) => {
          if (response?.data) {
            dispatch(setOpenModal());
            window.location.reload();
          }
        }
      );
    } catch (error) {
      console.error("Error al crear una categoria:", error);
    }

    setIsLoading2(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >, // Cambiado a incluir HTMLSelectElement
    fieldName: keyof Inputs
  ) => {
    const value = e.target.value;
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
          <div>
            <label
              htmlFor=""
              className="block text-lg font-medium text-gray-700"
            >
              Subcategoria
            </label>
            <input
              disabled={isLoading}
              name="sub_category"
              type="text"
              id="subCategory"
              onChange={(e) => handleChange(e, "sub_category")}
              className="mt-2 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
              placeholder="Nombre de la subcategoria"
              value={inputs["sub_category"] as string}
            />
          </div>
          <div className="">
            <label
              htmlFor=""
              className="block text-lg font-medium text-gray-700"
            >
              Enlace categoria
            </label>
            <select
              name="category"
              className="mt-2 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
              id=""
              onChange={(e) => handleChange(e, "category")}
              defaultValue="SELECCIONA UNA CATEGORIA" // Usando defaultValue para seleccionar la opción inicial
            >
              {isActiveCategory && (
                <option selected disabled value={inputs["category"]}>
                  {inputs["category_name"]}
                </option>
              )}
              {(data as Category[])?.map((el, index) => {
                return el.active ? (
                  <option key={index} value={el.id}>
                    {el.category}
                  </option>
                ) : null;
              })}
            </select>
          </div>
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

export default EditSubCategory;
