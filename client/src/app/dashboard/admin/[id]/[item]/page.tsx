import ContentDOrder from "@/components/micro/content/ContentDOrder";
import ContentDStock from "@/components/micro/content/ContentDStock";
import ContentDTienda from "@/components/micro/content/ContentDTienda";
import SideBar from "@/components/sections/navegation/SideBar";
import React from "react";

function page({ params }: { params: { id: string , item: string} }) {
  return (
    <div className="flex flex-row w-full overflow-hidden h-screen bg-rose-50">
      {/* SIDEBAR CON HIDDEN */}
      <div className="">
        <SideBar item={params.item} />
      </div>
      <div className="w-full flex flex-col">
        <div className=" h-16 w-full sticky">
          <div className="flex mt-2">
            <div className="mt-6 ml-7 flex justify-center items-center">
              <h1 className="font-bold font-sans text-xl text-cyan-400">
                LO QUE LE FATA
              </h1>
            </div>
          </div>
        </div>
        <div className="w-screen">
          {/* CONTENIDO */}
          {params.item === "tienda" && <ContentDTienda />}
          {params.item === "stock" && <ContentDStock />}
          {params.item === "order" && <ContentDOrder />}
          {/* CONTENIDO DEL SIDEBAR */}
        </div>
      </div>
    </div>
  );
}

export default page;
