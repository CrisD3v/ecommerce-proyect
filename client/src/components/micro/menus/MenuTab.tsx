import React from "react";

interface MenuTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-start justify-center gap-5  mb-8 mt-2 flex-col  h-96 w-64 static">
      
      <button
        className={`text-lg font-semibold focus:outline-none w-full border-r-2 border-transparent ${
          activeTab === "CATEGORIAS"
            ? "text-cyan-400  border-cyan-300"
            : "text-gray-700"
        }`}
        onClick={() => setActiveTab("CATEGORIAS")}
      >
        <p className="">Administrar Categorías</p>
      </button>
    </div>
  );
};

export default MenuTabs;
