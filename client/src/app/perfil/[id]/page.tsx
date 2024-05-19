import FormPerfil from "@/components/micro/formAccount/FormPerfil";
import React from "react";


function page({ params }: { params: { id: string} }) {
   
  
  return (
    <div className="bg-rose-50 w-full h-screen transition-all ease-in-out">
      <FormPerfil id={params.id}/>
    </div>
  );
}

export default page;
