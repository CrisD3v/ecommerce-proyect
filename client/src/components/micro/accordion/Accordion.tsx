import React, { useState } from "react";
import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { idCategory, idSubCategory } from "@/redux/features/getIdData";

interface AccordionProps {
  title: string;
  children: React.ReactNode; // Agregamos esta línea para incluir children en las props
  functionCategory: () => void;
  id: any;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  functionCategory,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const getIdCategories = () => {
    dispatch(idCategory(id));
  };

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-md mb-4">
      <div className="flex items-center w-full">
        <Tooltip id="tooltip-edit" content="EDITAR" place="bottom" />
        <button
          type="button"
          className="px-4 py-4 text-cyan-400"
          data-tooltip-id="tooltip-edit"
          onClick={() => {
            functionCategory();
            getIdCategories();
          }}
        >
          <PencilSquareIcon className="w-5" />
        </button>
        <div
          className="w-full flex items-center justify-between px-4 py-2 cursor-pointer transition-colors duration-300 ease-in-out"
          onClick={toggleAccordion}
        >
          <h2 className="text-lg font-medium">{title}</h2>

          <ChevronDownIcon
            className={`${
              isOpen ? "transform rotate-180" : ""
            } w-6 h-6 transition-transform duration-300 ease-in-out`}
          />
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all ease-in-out duration-300 ${
          isOpen ? "max-h-[1000px] duration-700" : "max-h-0 "
        } `}
      >
        <div className="px-4 py-2 border-t transition-all ease-in-out duration-700 border-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

interface props {
  data: any;
  loading: any;
  functionSubCategory: () => void;
  functionCategory: () => void;
}

const MyAccordion: React.FC<props> = ({
  data,
  loading,
  functionCategory,
  functionSubCategory,
}) => {
  const isOpenMenu = useAppSelector((state) => state.openMenu.openMenu);
  const dispatch = useAppDispatch();

  const getIdSubCategories = (id: any) => {
    dispatch(idSubCategory(id));
  };
  return (
    <div
      className={`${
        isOpenMenu ? "w-[77rem] xl:w-[60rem]" : " xl:w-[47rem] w-[90rem]"
      } transition-all ease-in-out duration-500`}
    >
      {loading ? (
        <div className="">
          <p>CARGANDO...</p>
        </div>
      ) : (
        data.map((el: any, index: number) => (
          <div className="" key={index}>
            <Accordion
              title={el.category}
              functionCategory={() => functionCategory()}
              id={el.id}
            >
              {el.SubCategories && el.SubCategories.length > 0 ? (
                el.SubCategories.map((e: any, i: number) => (
                  <div
                    className="flex m-2 p-2 w-full justify-between items-center border-b-2"
                    key={i}
                  >
                    <p className="">{e.sub_category}</p>
                    <div className="">
                      <Tooltip
                        id="tooltip-edit2"
                        content="EDITAR"
                        place="top"
                      />

                      <button
                        type="button"
                        className="p-2 text-white bg-cyan-400 rounded-md"
                        data-tooltip-id="tooltip-edit2"
                        onClick={() => {
                          functionSubCategory();
                          getIdSubCategories(e.id);
                        }}
                      >
                        <PencilSquareIcon className="w-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="">
                  <p className="m-2 p-2 font-bold text-red-500">
                    NO HAY SUBCATEGORIAS REGISTRADAS
                  </p>
                </div>
              )}
            </Accordion>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAccordion;
