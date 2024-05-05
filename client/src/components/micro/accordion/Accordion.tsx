import React, { useState } from "react";
import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { useAppSelector } from "@/redux/hooks";

interface AccordionProps {
  title: string;
  children: React.ReactNode; // Agregamos esta línea para incluir children en las props
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-md mb-4">
      <div className="flex items-center w-full">
        <Tooltip
       
          title="EDITAR"
          position="bottom"
          trigger="mouseenter"
          html={
            <button
              type="button"
              className="px-4 py-4 text-cyan-400"
            >
              <PencilSquareIcon className="w-5" />
            </button>
          }
        >
        </Tooltip>
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
}

const MyAccordion: React.FC<props> = ({ data, loading }) => {
   const isOpenMenu = useAppSelector((state) => state.openMenu.openMenu);
  return (
    <div className={`${isOpenMenu ? "w-[75rem]" : "w-[88rem]"} transition-all ease-in-out duration-500`}>
      {loading ? (
        <div className="">
          <p>CARGANDO...</p>
        </div>
      ) : (
        data.map((el:any, index:number) => (
          <div className="" key={index}>
            <Accordion title={el.category}>
              {el.SubCategories && el.SubCategories.length > 0 ? (
                el.SubCategories.map((e:any, i:number) => (
                  <div
                    className="flex m-2 p-2 w-full justify-between items-center border-b-2"
                    key={i}
                  >
                    <p className="">{e.sub_category}</p>
                    <div className="">
                      <Tooltip
                        // options
                        title="EDITAR"
                        position="top"
                        trigger="mouseenter"
                        html={
                          <button
                            type="button"
                            className="p-2 text-white bg-cyan-400 rounded-md"
                          >
                            <PencilSquareIcon className="w-4" />
                          </button>
                        }
                      >
                      </Tooltip>
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
