"use client";
import React, { useEffect, useState } from "react";
import MenuTabs from "../menus/MenuTab";
import FormDTienda from "./FormDTienda";
import FormDCategory from "./FormDCategory";
import { useGetCategoryQuery } from "@/redux/services/ecommerceApi";


function ContentDTienda() {
  const [activeTab, setActiveTab] = useState<string>("CATEGORIAS");
  const { data: data, isLoading, isError } = useGetCategoryQuery();
  console.log(data)
  return (
    <div className="flex flex-row overflow-hidden select-none">
      <div className="w-96">
        <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="m-10 w-full h-full">
        {activeTab === "SHOP" ? (
          <FormDTienda />
        ) : (
          <FormDCategory data={data} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}

export default ContentDTienda;
