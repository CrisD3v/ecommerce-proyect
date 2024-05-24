import React from "react";
interface MenuTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
function MenuTabUsers({activeTab,setActiveTab}:MenuTabsProps) {
  return (
    <div className="flex justify-center w-full gap-10  flex-row ">
      <button
        className={`text-lg font-semibold focus:outline-none outline-none border-b-2 hover:text-sky-300 transition-all ease-in-out duration-500 ${
          activeTab === "Iniciar"
            ? "text-cyan-400 border-cyan-300"
            : "text-gray-700 border-transparent"
        }`}
        onClick={() => setActiveTab("Iniciar")}
      >
        <p className="">Iniciar Sesión</p>
      </button>
      <button
        className={`text-lg font-semibold focus:outline-none border-b-2 outline-none hover:text-sky-300 transition-all ease-in-out duration-500 ${
          activeTab === "Registrar"
            ? "text-cyan-400 border-cyan-300"
            : "text-gray-700 border-transparent"
        }`}
        onClick={() => setActiveTab("Registrar")}
      >
        <p className="">Registrarse</p>
      </button>
    </div>
  );
}

export default MenuTabUsers;
