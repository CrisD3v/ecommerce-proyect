import React from "react";
import FormPerfil from "@/components/micro/formAccount/FormPerfil";


function page({ params }: { params: { id: any} }) {
   
  
  return (
    <div className="bg-rose-50 w-full h-screen transition-all ease-in-out">
      <FormPerfil id={params.id}/>
    </div>
  );
}

export default page;
